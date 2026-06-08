import { AuthenticatedRequest } from '../../../../types';
import reportInventoryRepository from './report-inventory.repository';
import {
    ReportFilter,
    ReportPeriod,
    StockStatus,
    CurrentStockItem,
    CurrentStockResponse,
    MovementByType,
    StockMovementSummaryResponse,
    StockAlertItem,
    StockAlertsResponse,
    InventoryValuationResponse,
    ValuationByType,
    OpnameHistoryItem,
    OpnameHistoryResponse,
    MovementCardItem,
    IngredientMovementCardResponse,
    FullInventoryReportResponse,
} from './report-inventory.types';

// ============================================
// STOCK TYPE CATEGORIES
// ============================================

const STOCK_IN_TYPES = ['IN_PURCHASE', 'IN_PRODUCTION'];
const STOCK_OUT_TYPES = ['OUT_SALES', 'OUT_PRODUCTION', 'OUT_DAMAGED', 'OUT_EXPIRED'];
const ADJUSTMENT_TYPES = ['ADJUSTMENT_OPNAME'];
const SHRINKAGE_TYPES = ['OUT_DAMAGED', 'OUT_EXPIRED'];

// ============================================
// HELPER FUNCTIONS
// ============================================

const extractFilter = (req: AuthenticatedRequest): ReportFilter => {
    return {
        start_date: req.query.start_date as string,
        end_date: req.query.end_date as string,
        ingredient_id: (req.query.ingredient_id as string) || null,
        supplier_id: (req.query.supplier_id as string) || null,
        ingredient_type: (req.query.ingredient_type as 'raw' | 'semi') || null,
    };
};

const createPeriod = (filter: ReportFilter): ReportPeriod => ({
    start_date: filter.start_date,
    end_date: filter.end_date,
});

const getStockStatus = (currentStock: number, minStock: number): StockStatus => {
    if (currentStock <= 0) return 'OUT';
    if (currentStock < minStock) return 'LOW';
    return 'NORMAL';
};

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

// ============================================
// GET CURRENT STOCK
// ============================================

export const getCurrentStock = async (req: AuthenticatedRequest): Promise<CurrentStockResponse> => {
    try {
        const ingredientType = (req.query.ingredient_type as 'raw' | 'semi') || null;
        const status = (req.query.status as 'all' | 'low' | 'out') || 'all';
        const limit = parseInt(req.query.limit as string) || 100;

        const ingredients = await reportInventoryRepository.getAllIngredientsWithStatus(
            ingredientType,
            status,
            limit
        );

        if (!ingredients || ingredients.length === 0) {
            return {
                total_items: 0,
                total_value: 0,
                low_stock_count: 0,
                out_of_stock_count: 0,
                items: [],
            };
        }

        const items: CurrentStockItem[] = ingredients.map(i => {
            const currentStock = Number(i.stock_qty);
            const minStock = Number(i.min_stock);
            const avgCost = Number(i.avg_cost);
            const stockValue = currentStock * avgCost;
            const stockStatus = getStockStatus(currentStock, minStock);

            return {
                ingredient_id: i.ingredient_id,
                name: i.name,
                type: i.type,
                unit: i.unit.name,
                current_stock: currentStock,
                min_stock: minStock,
                avg_cost: avgCost,
                stock_value: Math.round(stockValue),
                status: stockStatus,
            };
        });

        const totalValue = items.reduce((sum, i) => sum + i.stock_value, 0);
        const lowStockCount = items.filter(i => i.status === 'LOW').length;
        const outOfStockCount = items.filter(i => i.status === 'OUT').length;

        return {
            total_items: items.length,
            total_value: Math.round(totalValue),
            low_stock_count: lowStockCount,
            out_of_stock_count: outOfStockCount,
            items,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET STOCK MOVEMENT SUMMARY
// ============================================

export const getMovementSummary = async (req: AuthenticatedRequest): Promise<StockMovementSummaryResponse> => {
    try {
        const filter = extractFilter(req);
        const movements = await reportInventoryRepository.getStockMovementsForPeriod(filter);

        if (!movements || movements.length === 0) {
            return {
                period: createPeriod(filter),
                total_in: { qty: 0, value: 0, by_type: [] },
                total_out: { qty: 0, value: 0, by_type: [] },
                adjustments: { qty: 0, value: 0, by_type: [] },
                shrinkage: {
                    damaged_qty: 0,
                    damaged_value: 0,
                    expired_qty: 0,
                    expired_value: 0,
                    total_value: 0,
                },
            };
        }

        // Group by stock type
        const typeMap = new Map<string, { qty: number; value: number; count: number }>();

        for (const m of movements) {
            const typeName = m.stock_type.name;
            const qty = Number(m.qty);
            const value = m.unit_cost ? qty * Number(m.unit_cost) : qty * Number(m.ingredient.avg_cost);

            const existing = typeMap.get(typeName);
            if (existing) {
                existing.qty += qty;
                existing.value += value;
                existing.count += 1;
            } else {
                typeMap.set(typeName, { qty, value, count: 1 });
            }
        }

        const createByType = (types: string[]): MovementByType[] => {
            return types
                .map(t => {
                    const data = typeMap.get(t);
                    if (!data) return null;
                    return {
                        stock_type: t,
                        stock_type_name: t.replace(/_/g, ' '),
                        qty: data.qty,
                        value: Math.round(data.value),
                        transaction_count: data.count,
                    };
                })
                .filter((item): item is MovementByType => item !== null);
        };

        const inByType = createByType(STOCK_IN_TYPES);
        const outByType = createByType(STOCK_OUT_TYPES);
        const adjByType = createByType(ADJUSTMENT_TYPES);

        const totalIn = {
            qty: inByType.reduce((sum, t) => sum + t.qty, 0),
            value: inByType.reduce((sum, t) => sum + t.value, 0),
            by_type: inByType,
        };

        const totalOut = {
            qty: outByType.reduce((sum, t) => sum + t.qty, 0),
            value: outByType.reduce((sum, t) => sum + t.value, 0),
            by_type: outByType,
        };

        const adjustments = {
            qty: adjByType.reduce((sum, t) => sum + t.qty, 0),
            value: adjByType.reduce((sum, t) => sum + t.value, 0),
            by_type: adjByType,
        };

        // Calculate shrinkage
        const damagedData = typeMap.get('OUT_DAMAGED') || { qty: 0, value: 0 };
        const expiredData = typeMap.get('OUT_EXPIRED') || { qty: 0, value: 0 };

        const shrinkage = {
            damaged_qty: damagedData.qty,
            damaged_value: Math.round(damagedData.value),
            expired_qty: expiredData.qty,
            expired_value: Math.round(expiredData.value),
            total_value: Math.round(damagedData.value + expiredData.value),
        };

        return {
            period: createPeriod(filter),
            total_in: totalIn,
            total_out: totalOut,
            adjustments,
            shrinkage,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET STOCK ALERTS
// ============================================

export const getStockAlerts = async (req: AuthenticatedRequest): Promise<StockAlertsResponse> => {
    try {
        // Get all ingredients
        const allIngredients = await reportInventoryRepository.getAllIngredientsWithStatus(null, 'all', 500);

        if (!allIngredients || allIngredients.length === 0) {
            return {
                total_alerts: 0,
                low_stock_items: [],
                out_of_stock_items: [],
            };
        }

        // Filter low and out of stock
        const lowStockIngredients = allIngredients.filter(i => {
            const qty = Number(i.stock_qty);
            const min = Number(i.min_stock);
            return qty > 0 && qty < min;
        });

        const outOfStockIngredients = allIngredients.filter(i => Number(i.stock_qty) <= 0);

        // Get last restock dates
        const alertIds = [
            ...lowStockIngredients.map(i => i.ingredient_id),
            ...outOfStockIngredients.map(i => i.ingredient_id),
        ];

        const restockDates = await reportInventoryRepository.getLastRestockDates(alertIds);

        const mapToAlertItem = (i: typeof allIngredients[0]): StockAlertItem => {
            const currentStock = Number(i.stock_qty);
            const minStock = Number(i.min_stock);
            const lastRestock = restockDates?.get(i.ingredient_id);

            return {
                ingredient_id: i.ingredient_id,
                name: i.name,
                type: i.type,
                unit: i.unit.name,
                current_stock: currentStock,
                min_stock: minStock,
                shortage: Math.max(0, minStock - currentStock),
                status: currentStock <= 0 ? 'OUT' : 'LOW',
                last_restock_date: lastRestock ? formatDate(lastRestock) : null,
            };
        };

        const lowStockItems = lowStockIngredients.map(mapToAlertItem);
        const outOfStockItems = outOfStockIngredients.map(mapToAlertItem);

        return {
            total_alerts: lowStockItems.length + outOfStockItems.length,
            low_stock_items: lowStockItems,
            out_of_stock_items: outOfStockItems,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET INVENTORY VALUATION
// ============================================

export const getInventoryValuation = async (req: AuthenticatedRequest): Promise<InventoryValuationResponse> => {
    try {
        const ingredients = await reportInventoryRepository.getAllIngredientsWithStatus(null, 'all', 500);

        if (!ingredients || ingredients.length === 0) {
            return {
                total_items: 0,
                total_value: 0,
                by_ingredient_type: [],
                top_value_items: [],
            };
        }

        const items: CurrentStockItem[] = ingredients.map(i => {
            const currentStock = Number(i.stock_qty);
            const avgCost = Number(i.avg_cost);
            return {
                ingredient_id: i.ingredient_id,
                name: i.name,
                type: i.type,
                unit: i.unit.name,
                current_stock: currentStock,
                min_stock: Number(i.min_stock),
                avg_cost: avgCost,
                stock_value: Math.round(currentStock * avgCost),
                status: getStockStatus(currentStock, Number(i.min_stock)),
            };
        });

        const totalValue = items.reduce((sum, i) => sum + i.stock_value, 0);

        // Group by type
        const typeMap = new Map<string, { count: number; qty: number; value: number }>();
        for (const item of items) {
            const existing = typeMap.get(item.type);
            if (existing) {
                existing.count += 1;
                existing.qty += item.current_stock;
                existing.value += item.stock_value;
            } else {
                typeMap.set(item.type, {
                    count: 1,
                    qty: item.current_stock,
                    value: item.stock_value,
                });
            }
        }

        const byIngredientType: ValuationByType[] = Array.from(typeMap.entries())
            .map(([type, data]) => ({
                type,
                item_count: data.count,
                total_qty: data.qty,
                total_value: Math.round(data.value),
                percentage: totalValue > 0 ? Math.round((data.value / totalValue) * 10000) / 100 : 0,
            }))
            .sort((a, b) => b.total_value - a.total_value);

        // Top 10 by value
        const topValueItems = [...items]
            .sort((a, b) => b.stock_value - a.stock_value)
            .slice(0, 10);

        return {
            total_items: items.length,
            total_value: Math.round(totalValue),
            by_ingredient_type: byIngredientType,
            top_value_items: topValueItems,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET OPNAME HISTORY
// ============================================

export const getOpnameHistory = async (req: AuthenticatedRequest): Promise<OpnameHistoryResponse> => {
    try {
        const filter = extractFilter(req);
        const opnames = await reportInventoryRepository.getStockOpnamesForPeriod(filter);

        if (!opnames || opnames.length === 0) {
            return {
                period: createPeriod(filter),
                total_opnames: 0,
                opnames: [],
            };
        }

        const opnameItems: OpnameHistoryItem[] = opnames.map(o => ({
            stock_opname_id: o.stock_opname_id,
            opname_date: formatDate(o.opname_date),
            user: {
                user_id: o.user.user_id,
                name: o.user.name,
            },
            status: o.status,
            total_items: o.items.length,
            total_difference: o.items.reduce((sum, i) => sum + Number(i.difference), 0),
            notes: o.notes,
        }));

        return {
            period: createPeriod(filter),
            total_opnames: opnames.length,
            opnames: opnameItems,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET INGREDIENT MOVEMENT CARD
// ============================================

export const getIngredientCard = async (req: AuthenticatedRequest): Promise<IngredientMovementCardResponse | null> => {
    try {
        const ingredientId = req.query.ingredient_id as string;
        const startDate = new Date(req.query.start_date as string);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(req.query.end_date as string);
        endDate.setHours(23, 59, 59, 999);

        const data = await reportInventoryRepository.getIngredientMovements(ingredientId, startDate, endDate);

        if (!data) {
            return null;
        }

        const { ingredient, movements, openingBalance } = data;

        let runningBalance = openingBalance;
        const movementItems: MovementCardItem[] = movements.map(m => {
            const qty = Number(m.qty);
            const isIn = STOCK_IN_TYPES.includes(m.stock_type.name);
            const isOut = STOCK_OUT_TYPES.includes(m.stock_type.name);

            if (isIn) {
                runningBalance += qty;
            } else if (isOut) {
                runningBalance -= qty;
            } else {
                // Adjustment can be positive or negative
                runningBalance = Number(m.current_stock);
            }

            let description = m.stock_type.name.replace(/_/g, ' ');
            if (m.supplier) {
                description += ` - ${m.supplier.name}`;
            }

            return {
                date: formatDate(m.created_at),
                stock_type: m.stock_type.name,
                description,
                in_qty: isIn ? qty : null,
                out_qty: isOut ? qty : null,
                balance: runningBalance,
                unit_cost: m.unit_cost ? Number(m.unit_cost) : null,
                user: m.user.name,
            };
        });

        const totalIn = movementItems.reduce((sum, m) => sum + (m.in_qty || 0), 0);
        const totalOut = movementItems.reduce((sum, m) => sum + (m.out_qty || 0), 0);

        return {
            ingredient: {
                ingredient_id: ingredient.ingredient_id,
                name: ingredient.name,
                type: ingredient.type,
                unit: ingredient.unit.name,
            },
            period: {
                start_date: formatDate(startDate),
                end_date: formatDate(endDate),
            },
            opening_balance: openingBalance,
            closing_balance: runningBalance,
            total_in: totalIn,
            total_out: totalOut,
            movements: movementItems,
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET FULL REPORT
// ============================================

export const getFullReport = async (req: AuthenticatedRequest): Promise<FullInventoryReportResponse> => {
    try {
        const [currentStockData, movementData, alertsData] = await Promise.all([
            getCurrentStock(req),
            getMovementSummary(req),
            getStockAlerts(req),
        ]);

        return {
            current_stock: {
                total_items: currentStockData.total_items,
                total_value: currentStockData.total_value,
                low_stock_count: currentStockData.low_stock_count,
                out_of_stock_count: currentStockData.out_of_stock_count,
            },
            movement_summary: {
                total_in: movementData.total_in.qty,
                total_out: movementData.total_out.qty,
                shrinkage_value: movementData.shrinkage.total_value,
            },
            alerts: {
                low_stock_count: alertsData.low_stock_items.length,
                out_of_stock_count: alertsData.out_of_stock_items.length,
            },
            top_value_items: currentStockData.items
                .sort((a, b) => b.stock_value - a.stock_value)
                .slice(0, 5),
        };
    } catch (error) {
        console.error(`--- Report Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// EXPORT SERVICE
// ============================================

export const reportInventoryService = {
    getCurrentStock,
    getMovementSummary,
    getStockAlerts,
    getInventoryValuation,
    getOpnameHistory,
    getIngredientCard,
    getFullReport,
};

export default reportInventoryService;
