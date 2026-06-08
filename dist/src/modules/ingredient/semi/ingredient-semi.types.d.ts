export declare enum IngredientType {
    RAW = "RAW",
    SEMI = "SEMI"
}
export interface SemiIngredientFilter {
    search?: string | null;
    unit_id?: string | null;
}
export interface SemiIngredientPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateSemiIngredientRequest {
    name: string;
    unit_id: string;
    min_stock: number;
    target_yield?: number;
}
export interface UpdateSemiIngredientRequest {
    name?: string;
    unit_id?: string;
    min_stock?: number;
    target_yield?: number;
}
export interface CompositionItem {
    ingredient_composition_id: string;
    child_id: string;
    qty_needed: any;
    child_ingredient: {
        ingredient_id: string;
        name: string;
        avg_cost: any;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
}
export interface SemiIngredientWithRelations {
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
export interface SemiIngredientWithCompositions extends SemiIngredientWithRelations {
    child_compositions: CompositionItem[];
    total_hpp?: number;
    target_yield?: number;
}
export interface SemiIngredientListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: SemiIngredientWithRelations[];
}
export type SemiIngredientDetailResponse = SemiIngredientWithCompositions;
export type CreateSemiIngredientResponse = SemiIngredientWithRelations;
export type UpdateSemiIngredientResponse = SemiIngredientWithRelations;
export interface DeleteSemiIngredientResponse {
    success: boolean;
    message: string;
}
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}
export interface SemiIngredientHPPResult {
    total_hpp: number;
    target_yield: number;
    hpp_per_unit: number;
    composition_count: number;
    compositions: {
        ingredient_name: string;
        qty_needed: number;
        unit_name: string;
        unit_cost: number;
        subtotal: number;
    }[];
}
//# sourceMappingURL=ingredient-semi.types.d.ts.map