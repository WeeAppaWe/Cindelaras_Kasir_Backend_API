import { AuthenticatedRequest } from '../../../../types';
import { RecipeListResponse, DeleteRecipeResponse, AddRecipeResponse } from './menu-recipe.types';
/**
 * Get all recipes for a menu
 */
export declare const getByMenuId: (req: AuthenticatedRequest) => Promise<RecipeListResponse>;
/**
 * Add recipe to menu
 */
export declare const addRecipe: (req: AuthenticatedRequest) => Promise<AddRecipeResponse>;
/**
 * Update recipe qty
 */
export declare const updateRecipe: (req: AuthenticatedRequest) => Promise<AddRecipeResponse>;
/**
 * Remove recipe from menu
 */
export declare const removeRecipe: (req: AuthenticatedRequest) => Promise<DeleteRecipeResponse>;
/**
 * Bulk add/replace recipes for a menu
 */
export declare const bulkUpdateRecipes: (req: AuthenticatedRequest) => Promise<RecipeListResponse>;
export declare const menuRecipeService: {
    getByMenuId: (req: AuthenticatedRequest) => Promise<RecipeListResponse>;
    addRecipe: (req: AuthenticatedRequest) => Promise<AddRecipeResponse>;
    updateRecipe: (req: AuthenticatedRequest) => Promise<AddRecipeResponse>;
    removeRecipe: (req: AuthenticatedRequest) => Promise<DeleteRecipeResponse>;
    bulkUpdateRecipes: (req: AuthenticatedRequest) => Promise<RecipeListResponse>;
};
export default menuRecipeService;
//# sourceMappingURL=menu-recipe.service.d.ts.map