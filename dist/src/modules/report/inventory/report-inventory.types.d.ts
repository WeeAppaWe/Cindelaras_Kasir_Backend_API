export interface ReportFilter {
    start_date: string;
    end_date: string;
    ingredient_id?: string | null;
    supplier_id?: string | null;
    ingredient_type?: 'raw' | 'semi' | null;
}
export interface ReportPeriod {
    start_date: string;
    end_date: string;
}
export type StockStatus = 'NORMAL' | 'LOW' | 'OUT';
export interface CurrentStockItem {
    ingredient_id: string;
    name: string;
    type: string;
    unit: string;
    current_stock: number;
    min_stock: number;
    avg_cost: number;
    stock_value: number;
    status: StockStatus;
}
export interface CurrentStockResponse {
    total_items: number;
    total_value: number;
    low_stock_count: number;
    out_of_stock_count: number;
    items: CurrentStockItem[];
}
export interface MovementByType {
    stock_type: string;
    stock_type_name: string;
    qty: number;
    value: number;
    transaction_count: number;
}
export interface StockMovementSummaryResponse {
    period: ReportPeriod;
    total_in: {
        qty: number;
        value: number;
        by_type: MovementByType[];
    };
    total_out: {
        qty: number;
        value: number;
        by_type: MovementByType[];
    };
    adjustments: {
        qty: number;
        value: number;
        by_type: MovementByType[];
    };
    shrinkage: {
        damaged_qty: number;
        damaged_value: number;
        expired_qty: number;
        expired_value: number;
        total_value: number;
    };
}
export interface StockAlertItem {
    ingredient_id: string;
    name: string;
    type: string;
    unit: string;
    current_stock: number;
    min_stock: number;
    shortage: number;
    status: 'LOW' | 'OUT';
    last_restock_date: string | null;
}
export interface StockAlertsResponse {
    total_alerts: number;
    low_stock_items: StockAlertItem[];
    out_of_stock_items: StockAlertItem[];
}
export interface ValuationByType {
    type: string;
    item_count: number;
    total_qty: number;
    total_value: number;
    percentage: number;
}
export interface InventoryValuationResponse {
    total_items: number;
    total_value: number;
    by_ingredient_type: ValuationByType[];
    top_value_items: CurrentStockItem[];
}
export interface OpnameHistoryItem {
    stock_opname_id: string;
    opname_date: string;
    user: {
        user_id: string;
        name: string;
    };
    status: string;
    total_items: number;
    total_difference: number;
    notes: string | null;
}
export interface OpnameHistoryResponse {
    period: ReportPeriod;
    total_opnames: number;
    opnames: OpnameHistoryItem[];
}
export interface MovementCardItem {
    date: string;
    stock_type: string;
    description: string;
    in_qty: number | null;
    out_qty: number | null;
    balance: number;
    unit_cost: number | null;
    user: string;
}
export interface IngredientMovementCardResponse {
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        unit: string;
    };
    period: ReportPeriod;
    opening_balance: number;
    closing_balance: number;
    total_in: number;
    total_out: number;
    movements: MovementCardItem[];
}
export interface FullInventoryReportResponse {
    total_items: number;
    total_value: number;
    low_stock_count: number;
    out_of_stock_count: number;
    items: CurrentStockItem[];
}
//# sourceMappingURL=report-inventory.types.d.ts.map