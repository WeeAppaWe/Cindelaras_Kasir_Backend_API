export interface StockMovementFilter {
    search?: string | null;
    ingredient_id?: string | null;
    supplier_id?: string | null;
    stock_type_id?: string | null;
    date_from?: Date | null;
    date_to?: Date | null;
}
export interface StockMovementPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
interface BaseStockMovementRequest {
    ingredient_id: string;
    qty: number;
    notes?: string;
}
export interface StockInRequest extends BaseStockMovementRequest {
    supplier_id: string;
    unit_cost: number;
}
export interface StockOutRequest extends BaseStockMovementRequest {
    reason: 'DAMAGED' | 'EXPIRED' | 'OTHER';
}
export interface StockMovementData {
    stock_movement_id: string;
    supplier_id: string | null;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: number;
    unit_cost: number | null;
    current_stock: number;
    notes: string | null;
    created_at: Date;
}
export interface StockMovementWithDetails extends StockMovementData {
    ingredient: {
        ingredient_id: string;
        name: string;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
    supplier: {
        supplier_id: string;
        name: string;
    } | null;
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    user: {
        user_id: string;
        name: string;
    };
}
export interface StockTypeData {
    stock_type_id: string;
    name: string;
}
export interface StockMovementListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: StockMovementWithDetails[];
}
export type StockMovementCreateResponse = StockMovementWithDetails;
export interface IngredientStockSummary {
    ingredient_id: string;
    ingredient_name: string;
    unit_name: string;
    current_stock: number;
    total_in: number;
    total_out: number;
    last_movement_date: Date | null;
}
export {};
//# sourceMappingURL=inventory.types.d.ts.map