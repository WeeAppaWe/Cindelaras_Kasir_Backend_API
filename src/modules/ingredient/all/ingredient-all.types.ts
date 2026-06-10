// All Ingredient module types

// Ingredient type enum
export enum IngredientType {
    RAW = 'RAW',
    SEMI = 'SEMI',
}

// Ingredient reference (for dropdown/selection)
export interface IngredientReference {
    ingredient_id: string;
    name: string;
    type: string;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
