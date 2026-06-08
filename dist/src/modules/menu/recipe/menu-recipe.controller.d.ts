import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get All Recipes for a Menu
 * GET /api/menu/:menu_id/recipe
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Add Recipe to Menu
 * POST /api/menu/:menu_id/recipe
 */
export declare const addRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Recipe Qty
 * PUT /api/menu/:menu_id/recipe/:recipe_id
 */
export declare const updateRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Remove Recipe from Menu
 * DELETE /api/menu/:menu_id/recipe/:recipe_id
 */
export declare const removeRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Bulk Update Recipes (Replace All)
 * PUT /api/menu/:menu_id/recipe
 */
export declare const bulkUpdate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const menuRecipeController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    addRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    updateRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    removeRecipe: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    bulkUpdate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default menuRecipeController;
//# sourceMappingURL=menu-recipe.controller.d.ts.map