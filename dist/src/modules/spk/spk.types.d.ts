/**
 * Konfigurasi untuk analisa SPK
 */
export interface SPKConfig {
    target_days: number;
    buffer_percent: number;
    lookback_days: number;
}
/**
 * Data pemakaian bahan per hari
 */
export interface DailyUsage {
    date: string;
    qty: number;
}
/**
 * Hasil forecast per ingredient
 */
export interface IngredientForecast {
    ingredient_id: string;
    name: string;
    type: string;
    unit: string;
    daily_usages: DailyUsage[];
    wma_daily_average: number;
}
/**
 * Hasil kalkulasi kebutuhan per ingredient
 */
export interface IngredientCalculation {
    ingredient_id: string;
    name: string;
    type: string;
    unit: string;
    wma_daily_average: number;
    target_days: number;
    base_requirement: number;
    safety_stock: number;
    total_requirement: number;
    current_stock: number;
    suggested_order: number;
}
/**
 * Item dengan data supplier dan harga
 */
export interface EnrichedOrderItem {
    ingredient_id: string;
    name: string;
    type: string;
    unit: string;
    wma_daily_average: number;
    current_stock: number;
    min_stock: number;
    suggested_qty: number;
    avg_cost: number;
    estimated_cost: number;
    supplier_id: string | null;
    supplier_name: string | null;
}
/**
 * Item dalam grouped output
 */
export interface SupplierOrderItem {
    ingredient_id: string;
    name: string;
    unit: string;
    suggested_qty: number;
    unit_price: number;
    estimated_cost: number;
}
/**
 * Grouped output per supplier
 */
export interface SupplierGroup {
    supplier_id: string | null;
    supplier_name: string;
    contact?: string | null;
    items: SupplierOrderItem[];
    total_items: number;
    total_estimated_cost: number;
}
/**
 * Full SPK analysis response
 */
export interface SPKAnalysisResponse {
    config: SPKConfig;
    analysis_date: string;
    lookback_period: {
        start_date: string;
        end_date: string;
    };
    summary: {
        total_ingredients_analyzed: number;
        total_needing_restock: number;
        total_estimated_cost: number;
        total_suppliers: number;
    };
    by_supplier: SupplierGroup[];
    all_items: EnrichedOrderItem[];
}
/**
 * Ingredient data for SPK
 */
export interface IngredientData {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    unit_name: string;
}
/**
 * Last supplier for ingredient (from stock movements)
 */
export interface IngredientSupplier {
    ingredient_id: string;
    supplier_id: string;
    supplier_name: string;
    supplier_contact: string | null;
}
//# sourceMappingURL=spk.types.d.ts.map