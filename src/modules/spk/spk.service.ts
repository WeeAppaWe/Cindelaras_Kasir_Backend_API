import { AuthenticatedRequest } from '../../../types';
import spkRepository from './spk.repository';
import { calculateWMAFromDataPoints } from '../../../utility/wma-calculation.utility';
import {
    SPKConfig,
    DailyUsage,
    IngredientForecast,
    IngredientCalculation,
    EnrichedOrderItem,
    SupplierGroup,
    SPKAnalysisResponse,
    IngredientData,
    IngredientSupplier,
} from './spk.types';

// ============================================
// HELPERS
// ============================================

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};



/**
 * Generate date range array
 */
const generateDateRange = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        dates.push(formatDate(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
};

// ============================================
// TAHAP 1: EXTRACT CONFIG
// ============================================

const extractConfig = (req: AuthenticatedRequest): SPKConfig => {
    return {
        target_days: parseInt(req.query.target_days as string) || 7,
        buffer_percent: parseFloat(req.query.buffer_percent as string) || 10,
        lookback_days: parseInt(req.query.lookback_days as string) || 30,
    };
};

// ============================================
// TAHAP 2: FORECASTING (Recipe Explosion + WMA)
// ============================================

const calculateForecasts = async (
    lookbackDays: number,
    ingredientType?: 'raw' | 'semi' | 'all' | null
): Promise<Map<string, IngredientForecast>> => {
    // Calculate date range
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - lookbackDays);
    startDate.setHours(0, 0, 0, 0);

    // Get orders with recipes
    const orders = await spkRepository.getOrderItemsWithRecipes(startDate, endDate);

    if (!orders || orders.length === 0) {
        return new Map();
    }

    // Generate all dates in range
    const allDates = generateDateRange(startDate, endDate);

    // Recipe explosion: Calculate ingredient usage per day
    const ingredientUsageMap = new Map<string, Map<string, number>>(); // ingredient_id -> date -> qty
    const ingredientInfoMap = new Map<string, { name: string; type: string; unit: string }>();

    for (const order of orders) {
        const orderDate = formatDate(order.created_at);

        for (const orderItem of order.order_items) {
            const menuQty = orderItem.qty;

            for (const recipe of orderItem.menu.recipes) {
                const ingredientId = recipe.ingredient_id;
                const usageQty = Number(recipe.qty_needed) * menuQty;
                const ingredient = recipe.ingredient;

                // Filter by ingredient type if specified
                if (ingredientType && ingredientType !== 'all' && ingredient.type !== ingredientType) {
                    continue;
                }

                // Store ingredient info
                if (!ingredientInfoMap.has(ingredientId)) {
                    ingredientInfoMap.set(ingredientId, {
                        name: ingredient.name,
                        type: ingredient.type,
                        unit: ingredient.unit.name,
                    });
                }

                // Accumulate daily usage
                if (!ingredientUsageMap.has(ingredientId)) {
                    ingredientUsageMap.set(ingredientId, new Map());
                }

                const dateUsageMap = ingredientUsageMap.get(ingredientId)!;
                const currentUsage = dateUsageMap.get(orderDate) || 0;
                dateUsageMap.set(orderDate, currentUsage + usageQty);
            }
        }
    }

    // Build forecasts with WMA
    const forecasts = new Map<string, IngredientForecast>();

    for (const [ingredientId, dateUsageMap] of ingredientUsageMap) {
        const info = ingredientInfoMap.get(ingredientId)!;

        // Build daily usages array (include 0 for days with no usage)
        const dailyUsages: DailyUsage[] = allDates.map(date => ({
            date,
            qty: dateUsageMap.get(date) || 0,
        }));

        // Calculate WMA using utility
        const dataPoints = dailyUsages.map(d => ({ date: d.date, value: d.qty }));
        const wmaResult = calculateWMAFromDataPoints(dataPoints);
        const wmaAverage = wmaResult.average;

        forecasts.set(ingredientId, {
            ingredient_id: ingredientId,
            name: info.name,
            type: info.type,
            unit: info.unit,
            daily_usages: dailyUsages,
            wma_daily_average: Math.round(wmaAverage * 100) / 100,
        });
    }

    return forecasts;
};

// ============================================
// TAHAP 3: CALCULATION
// ============================================

const calculateRequirements = (
    forecasts: Map<string, IngredientForecast>,
    ingredients: IngredientData[],
    config: SPKConfig
): IngredientCalculation[] => {
    const calculations: IngredientCalculation[] = [];

    for (const ingredient of ingredients) {
        const forecast = forecasts.get(ingredient.ingredient_id);
        const wmaDaily = forecast?.wma_daily_average || 0;

        // Calculate requirements
        const baseRequirement = wmaDaily * config.target_days;
        const safetyStock = baseRequirement * (config.buffer_percent / 100);
        const totalRequirement = baseRequirement + safetyStock;
        const currentStock = ingredient.stock_qty;
        const suggestedOrder = Math.max(0, Math.ceil(totalRequirement - currentStock));

        calculations.push({
            ingredient_id: ingredient.ingredient_id,
            name: ingredient.name,
            type: ingredient.type,
            unit: ingredient.unit_name,
            wma_daily_average: wmaDaily,
            target_days: config.target_days,
            base_requirement: Math.round(baseRequirement * 100) / 100,
            safety_stock: Math.round(safetyStock * 100) / 100,
            total_requirement: Math.round(totalRequirement * 100) / 100,
            current_stock: currentStock,
            suggested_order: suggestedOrder,
        });
    }

    return calculations;
};

// ============================================
// TAHAP 4: ENRICHMENT
// ============================================

const enrichItems = (
    calculations: IngredientCalculation[],
    ingredients: IngredientData[],
    suppliers: Map<string, IngredientSupplier>
): EnrichedOrderItem[] => {
    const ingredientMap = new Map(ingredients.map(i => [i.ingredient_id, i]));
    const enrichedItems: EnrichedOrderItem[] = [];

    for (const calc of calculations) {
        // Skip if no order needed
        if (calc.suggested_order <= 0) continue;

        const ingredient = ingredientMap.get(calc.ingredient_id);
        if (!ingredient) continue;

        const supplierInfo = suppliers.get(calc.ingredient_id);
        const estimatedCost = calc.suggested_order * ingredient.avg_cost;

        enrichedItems.push({
            ingredient_id: calc.ingredient_id,
            name: calc.name,
            type: calc.type,
            unit: calc.unit,
            wma_daily_average: calc.wma_daily_average,
            current_stock: calc.current_stock,
            min_stock: ingredient.min_stock,
            suggested_qty: calc.suggested_order,
            avg_cost: ingredient.avg_cost,
            estimated_cost: Math.round(estimatedCost),
            supplier_id: supplierInfo?.supplier_id || null,
            supplier_name: supplierInfo?.supplier_name || null,
        });
    }

    return enrichedItems;
};

// ============================================
// TAHAP 5: GROUPING BY SUPPLIER
// ============================================

const groupBySupplier = (
    items: EnrichedOrderItem[],
    suppliers: Map<string, IngredientSupplier>
): SupplierGroup[] => {
    const supplierMap = new Map<string | null, SupplierGroup>();

    for (const item of items) {
        const supplierId = item.supplier_id;
        const supplierInfo = supplierId ? suppliers.get(item.ingredient_id) : null;

        if (!supplierMap.has(supplierId)) {
            supplierMap.set(supplierId, {
                supplier_id: supplierId,
                supplier_name: item.supplier_name || 'Tanpa Supplier',
                contact: supplierInfo?.supplier_contact || null,
                items: [],
                total_items: 0,
                total_estimated_cost: 0,
            });
        }

        const group = supplierMap.get(supplierId)!;
        group.items.push({
            ingredient_id: item.ingredient_id,
            name: item.name,
            unit: item.unit,
            suggested_qty: item.suggested_qty,
            unit_price: item.avg_cost,
            estimated_cost: item.estimated_cost,
        });
        group.total_items += 1;
        group.total_estimated_cost += item.estimated_cost;
    }

    // Convert to array and sort by cost (highest first)
    return Array.from(supplierMap.values())
        .sort((a, b) => b.total_estimated_cost - a.total_estimated_cost);
};

// ============================================
// MAIN: RUN SPK ANALYSIS
// ============================================

export const runAnalysis = async (req: AuthenticatedRequest): Promise<SPKAnalysisResponse> => {
    try {
        // Tahap 1: Extract config
        const config = extractConfig(req);
        const ingredientType = (req.query.ingredient_type as 'raw' | 'semi' | 'all') || 'all';

        // Calculate date range for response
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - config.lookback_days);

        // Tahap 2: Forecasting (Recipe Explosion + WMA)
        const forecasts = await calculateForecasts(config.lookback_days, ingredientType);

        // Get all ingredients
        const ingredients = await spkRepository.getAllIngredients(ingredientType);

        if (!ingredients || ingredients.length === 0) {
            return {
                config,
                analysis_date: formatDate(new Date()),
                lookback_period: {
                    start_date: formatDate(startDate),
                    end_date: formatDate(endDate),
                },
                summary: {
                    total_ingredients_analyzed: 0,
                    total_needing_restock: 0,
                    total_estimated_cost: 0,
                    total_suppliers: 0,
                },
                by_supplier: [],
                all_items: [],
            };
        }

        // Get last suppliers for ingredients
        const ingredientIds = ingredients.map(i => i.ingredient_id);
        const supplierData = await spkRepository.getLastSupplierForIngredients(ingredientIds);
        const supplierMap = new Map<string, IngredientSupplier>();
        if (supplierData) {
            for (const s of supplierData) {
                supplierMap.set(s.ingredient_id, s);
            }
        }

        // Tahap 3: Calculation
        const calculations = calculateRequirements(forecasts, ingredients, config);

        // Tahap 4: Enrichment
        const enrichedItems = enrichItems(calculations, ingredients, supplierMap);

        // Tahap 5: Grouping
        const bySupplier = groupBySupplier(enrichedItems, supplierMap);

        // Calculate summary
        const totalEstimatedCost = enrichedItems.reduce((sum, item) => sum + item.estimated_cost, 0);
        const uniqueSuppliers = new Set(enrichedItems.map(i => i.supplier_id).filter(s => s !== null));

        return {
            config,
            analysis_date: formatDate(new Date()),
            lookback_period: {
                start_date: formatDate(startDate),
                end_date: formatDate(endDate),
            },
            summary: {
                total_ingredients_analyzed: ingredients.length,
                total_needing_restock: enrichedItems.length,
                total_estimated_cost: totalEstimatedCost,
                total_suppliers: uniqueSuppliers.size + (bySupplier.some(g => g.supplier_id === null) ? 1 : 0),
            },
            by_supplier: bySupplier,
            all_items: enrichedItems,
        };
    } catch (error) {
        console.error(`--- SPK Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// EXPORT SERVICE
// ============================================

export const spkService = {
    runAnalysis,
};

export default spkService;
