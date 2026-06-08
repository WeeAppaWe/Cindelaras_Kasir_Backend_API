export interface CreateCompositionRequest {
    child_id: string;
    qty_needed: number;
}
export interface UpdateCompositionRequest {
    qty_needed: number;
}
export interface BulkAddCompositionsRequest {
    compositions: CreateCompositionRequest[];
    target_yield?: number;
}
export interface CompositionWithDetails {
    ingredient_composition_id: string;
    parent_id: string;
    child_id: string;
    qty_needed: any;
    child_ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: any;
        stock_qty: any;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
    subtotal?: number;
}
export interface CompositionListResponse {
    parent_ingredient: {
        ingredient_id: string;
        name: string;
    };
    total_hpp: number;
    compositions: CompositionWithDetails[];
}
export type CreateCompositionResponse = CompositionWithDetails;
export type UpdateCompositionResponse = CompositionWithDetails;
export interface DeleteCompositionResponse {
    success: boolean;
    message: string;
}
export interface AvailableRawIngredient {
    ingredient_id: string;
    name: string;
    avg_cost: any;
    stock_qty: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
export interface HPPPreviewRequest {
    compositions: {
        ingredient_id: string;
        qty_needed: number;
    }[];
    target_yield?: number;
}
export interface HPPPreviewResponse {
    total_hpp: number;
    target_yield: number;
    hpp_per_unit: number;
    compositions: {
        ingredient_id: string;
        ingredient_name: string;
        qty_needed: number;
        unit_name: string;
        unit_cost: number;
        subtotal: number;
    }[];
}
//# sourceMappingURL=ingredient-semi-composition.types.d.ts.map