// Semi Ingredient module types (Bahan Setengah Jadi)

// Ingredient type enum
export enum IngredientType {
    RAW = 'RAW',
    SEMI = 'SEMI',
}

// Filter options for semi ingredient queries
export interface SemiIngredientFilter {
    search?: string | null;
    unit_id?: string | null;
}

// Pagination options
export interface SemiIngredientPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create semi ingredient request
export interface CreateSemiIngredientRequest {
    name: string;
    unit_id: string;
    min_stock: number;
    target_yield?: number; // Target hasil produksi (default 1)
}

// Update semi ingredient request
export interface UpdateSemiIngredientRequest {
    name?: string;
    unit_id?: string;
    min_stock?: number;
    target_yield?: number;
}

// Composition item for semi ingredient
export interface CompositionItem {
    ingredient_composition_id: string;
    child_id: string;
    qty_needed: any; // Prisma Decimal
    child_ingredient: {
        ingredient_id: string;
        name: string;
        avg_cost: any; // Prisma Decimal
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
}

// Semi ingredient with relations - data returned from database
export interface SemiIngredientWithRelations {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: any; // Prisma Decimal
    min_stock: any; // Prisma Decimal
    avg_cost: any; // Prisma Decimal (HPP per unit)
    created_at: Date;
    updated_at?: Date | null;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}

// Semi ingredient with compositions
export interface SemiIngredientWithCompositions extends SemiIngredientWithRelations {
    child_compositions: CompositionItem[];
    total_hpp?: number;
    target_yield?: number;
}

// Semi ingredient list response
export interface SemiIngredientListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: SemiIngredientWithRelations[];
}

// Semi ingredient detail response (includes compositions)
export type SemiIngredientDetailResponse = SemiIngredientWithCompositions;

// Create semi ingredient response
export type CreateSemiIngredientResponse = SemiIngredientWithRelations;

// Update semi ingredient response
export type UpdateSemiIngredientResponse = SemiIngredientWithRelations;

// Delete semi ingredient response
export interface DeleteSemiIngredientResponse {
    success: boolean;
    message: string;
}

// Unit measure reference (for dropdown/selection)
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}

// Produce semi ingredient request
export interface ProduceSemiIngredientRequest {
    qty: number;
    notes?: string;
}

// Deducted ingredient info in produce result
export interface ProduceDeductedIngredient {
    ingredient_id: string;
    ingredient_name: string;
    qty_deducted: number;
    remaining_stock: number;
}

// Result for produce semi ingredient
export interface ProduceSemiIngredientResult {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    unit: { unit_measure_id: string; name: string };
    produced_qty: number;
    deducted_ingredients: ProduceDeductedIngredient[];
}

// HPP calculation result for semi ingredient
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

// Create and produce semi ingredient request (all-in-one)
export interface CreateAndProduceSemiIngredientRequest {
    name: string;
    unit_id: string;
    min_stock: number;
    qty: number;
    notes?: string;
    compositions: { child_id: string; qty_needed: number }[];
}

// Result for create-and-produce semi ingredient
export interface CreateAndProduceSemiIngredientResult {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    unit: { unit_measure_id: string; name: string };
    produced_qty: number;
    compositions: any[]; // CompositionWithDetails[]
    deducted_ingredients: ProduceDeductedIngredient[];
}
