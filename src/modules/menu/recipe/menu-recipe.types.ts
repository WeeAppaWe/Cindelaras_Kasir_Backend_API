// Menu Recipe module types

// Create recipe request
export interface CreateRecipeRequest {
    ingredient_id: string;
    qty_needed: number;
}

// Update recipe request
export interface UpdateRecipeRequest {
    qty_needed: number;
}

// Bulk create/update recipes request
export interface BulkRecipeRequest {
    recipes: {
        ingredient_id: string;
        qty_needed: number;
    }[];
}

// Recipe data returned from database
export interface RecipeData {
    menu_recipe_id: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: number;
    created_at: Date;
    updated_at: Date | null;
}

// Recipe with ingredient details
export interface RecipeWithIngredient extends RecipeData {
    ingredient: {
        ingredient_id: string;
        name: string;
        stock_qty: number;
        avg_cost: number;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
    subtotal: number;
}

// Recipe list response for a menu
export interface RecipeListResponse {
    menu_id: string;
    recipes: RecipeWithIngredient[];
    total_hpp: number;
}

// Delete recipe response
export interface DeleteRecipeResponse {
    success: boolean;
    message: string;
    new_hpp: number;
}

// Add recipe response
export interface AddRecipeResponse {
    recipe: RecipeWithIngredient;
    new_hpp: number;
}
