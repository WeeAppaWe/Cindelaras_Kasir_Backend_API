export interface CreateRecipeRequest {
    ingredient_id: string;
    qty_needed: number;
}
export interface UpdateRecipeRequest {
    qty_needed: number;
}
export interface BulkRecipeRequest {
    recipes: {
        ingredient_id: string;
        qty_needed: number;
    }[];
}
export interface RecipeData {
    menu_recipe_id: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: number;
    created_at: Date;
    updated_at: Date | null;
}
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
export interface RecipeListResponse {
    menu_id: string;
    recipes: RecipeWithIngredient[];
    total_hpp: number;
}
export interface DeleteRecipeResponse {
    success: boolean;
    message: string;
    new_hpp: number;
}
export interface AddRecipeResponse {
    recipe: RecipeWithIngredient;
    new_hpp: number;
}
//# sourceMappingURL=menu-recipe.types.d.ts.map