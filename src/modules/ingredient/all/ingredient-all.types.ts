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
    avg_cost: any; // Prisma Decimal — harga per unit untuk kalkulasi subtotal di frontend
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
