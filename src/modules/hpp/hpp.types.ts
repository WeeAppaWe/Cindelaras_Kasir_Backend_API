// HPP (Harga Pokok Penjualan) module types

// ============================================
// REPOSITORY TYPES
// ============================================

export interface MenuRecipeWithIngredient {
    menu_recipe_id: string;
    ingredient_id: string;
    qty_needed: number;
    ingredient: {
        name: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
}

export interface MenuPriceAndCost {
    menu_id: string;
    price: number;
    cost: number;
}

export interface IngredientCost {
    ingredient_id: string;
    avg_cost: number;
}

// ============================================
// SERVICE TYPES
// ============================================

export interface RecipeWithCost {
    menu_recipe_id: string;
    ingredient_id: string;
    qty_needed: number;
    ingredient: {
        name: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
}

export interface HPPCalculationResult {
    menu_id: string;
    total_hpp: number;
    recipe_count: number;
    recipes: {
        menu_recipe_id: string;
        ingredient_id: string;
        ingredient_name: string;
        qty_needed: number;
        unit_name: string;
        unit_cost: number;
        subtotal: number;
    }[];
}

export interface MenuCostSummary {
    hpp: number;
    price: number;
    margin_percent: number;
    profit: number;
}
