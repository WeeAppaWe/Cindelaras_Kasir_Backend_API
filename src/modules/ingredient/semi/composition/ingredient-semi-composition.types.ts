// Semi Ingredient Composition module types

// Composition item for creating/updating
export interface CreateCompositionRequest {
    child_id: string; // ID bahan baku (RAW ingredient)
    qty_needed: number; // Jumlah yang dibutuhkan
}

// Update composition request
export interface UpdateCompositionRequest {
    qty_needed: number;
}

// Bulk add compositions request
export interface BulkAddCompositionsRequest {
    compositions: CreateCompositionRequest[];
    target_yield?: number; // Target hasil produksi
}

// Composition with child ingredient details
export interface CompositionWithDetails {
    ingredient_composition_id: string;
    parent_id: string;
    child_id: string;
    qty_needed: any; // Prisma Decimal
    child_ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: any; // Prisma Decimal
        stock_qty: any; // Prisma Decimal
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
    subtotal?: number; // qty_needed * avg_cost
}

// Composition list response
export interface CompositionListResponse {
    parent_ingredient: {
        ingredient_id: string;
        name: string;
    };
    total_hpp: number;
    compositions: CompositionWithDetails[];
}

// Create composition response
export type CreateCompositionResponse = CompositionWithDetails;

// Update composition response
export type UpdateCompositionResponse = CompositionWithDetails;

// Delete composition response
export interface DeleteCompositionResponse {
    success: boolean;
    message: string;
}

// Available raw ingredients for composition (dropdown)
export interface AvailableRawIngredient {
    ingredient_id: string;
    name: string;
    type: string; // RAW or SEMI
    avg_cost: any;
    stock_qty: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}

// HPP Preview request
export interface HPPPreviewRequest {
    compositions: {
        ingredient_id: string;
        qty_needed: number;
    }[];
    target_yield?: number;
}

// HPP Preview response
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
