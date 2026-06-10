export declare enum IngredientType {
    RAW = "RAW",
    SEMI = "SEMI"
}
export interface RawIngredientFilter {
    search?: string | null;
    unit_id?: string | null;
    low_stock?: boolean | null;
}
export interface RawIngredientPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateRawIngredientRequest {
    name: string;
    unit_id: string;
    stock_qty?: number;
    min_stock: number;
    avg_cost?: number;
}
export interface UpdateRawIngredientRequest {
    name?: string;
    unit_id?: string;
    min_stock?: number;
    avg_cost?: number;
}
export interface RawIngredientWithRelations {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: any;
    min_stock: any;
    avg_cost: any;
    created_at: Date;
    updated_at?: Date | null;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
export interface RawIngredientReference {
    ingredient_id: string;
    name: string;
    type: string;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
export interface RawIngredientListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: RawIngredientWithRelations[];
}
export type RawIngredientDetailResponse = RawIngredientWithRelations;
export type CreateRawIngredientResponse = RawIngredientWithRelations;
export type UpdateRawIngredientResponse = RawIngredientWithRelations;
export interface DeleteRawIngredientResponse {
    success: boolean;
    message: string;
}
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}
export interface LowStockAlertResponse {
    total_count: number;
    records: RawIngredientWithRelations[];
}
//# sourceMappingURL=ingredient-raw.types.d.ts.map