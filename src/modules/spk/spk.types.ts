// ============================================
// SPK (SMART PURCHASING) TYPES
// ============================================

// ============================================
// INPUT / CONFIG TYPES
// ============================================

/**
 * Konfigurasi untuk analisa SPK
 */
export interface SPKConfig {
    target_days: number;     // Target hari stok aman (default: 7)
    buffer_percent: number;  // Buffer keamanan dalam % (default: 10)
    lookback_days: number;   // Hari ke belakang untuk analisa (default: 30)
}

// ============================================
// FORECASTING TYPES
// ============================================

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

// ============================================
// CALCULATION TYPES
// ============================================

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
    base_requirement: number;      // wma * target_days
    safety_stock: number;          // base * buffer%
    total_requirement: number;     // base + safety
    current_stock: number;
    suggested_order: number;       // total - current (min 0)
}

// ============================================
// ENRICHED DATA TYPES
// ============================================

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
    estimated_cost: number;        // suggested_qty * avg_cost
    supplier_id: string | null;
    supplier_name: string | null;
}

// ============================================
// OUTPUT / GROUPED TYPES
// ============================================

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

// ============================================
// REPOSITORY DATA TYPES
// ============================================

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

/**
 * Ingredient composition data for recursive recipe explosion (BOM)
 * Represents parent -> child relationship between ingredients
 */
export interface IngredientCompositionData {
    parent_id: string;
    child_id: string;
    qty_needed: number;
}
