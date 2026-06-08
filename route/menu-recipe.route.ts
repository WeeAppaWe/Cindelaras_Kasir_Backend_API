import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    createRecipeSchema,
    updateRecipeSchema,
    bulkRecipeSchema,
    recipeIdParamSchema,
    menuRecipeParamSchema,
} from '../src/modules/menu/recipe/menu-recipe.schema';
import { menuIdParamSchema } from '../src/modules/menu/menu.schema';
import menuRecipeController from '../src/modules/menu/recipe/menu-recipe.controller';

const router: Router = express.Router();

// All recipe routes require ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Menu Recipe Routes (nested under /api/menu/:menu_id/recipe)
// ============================================

// GET /api/menu/:menu_id/recipe - Get all recipes for a menu
router.get(
    '/menu/:menu_id/recipe',
    ...adminMiddleware,
    zodValidation(menuIdParamSchema, 'params'),
    menuRecipeController.showAll
);

// POST /api/menu/:menu_id/recipe - Add recipe to menu
router.post(
    '/menu/:menu_id/recipe',
    ...adminMiddleware,
    zodValidation(menuIdParamSchema, 'params'),
    zodValidation(createRecipeSchema),
    menuRecipeController.addRecipe
);

// PATCH /api/menu/:menu_id/recipe - Bulk update/replace all recipes
router.patch(
    '/menu/:menu_id/recipe',
    ...adminMiddleware,
    zodValidation(menuIdParamSchema, 'params'),
    zodValidation(bulkRecipeSchema),
    menuRecipeController.bulkUpdate
);

// PATCH /api/menu/:menu_id/recipe/:recipe_id - Update specific recipe qty
router.patch(
    '/menu/:menu_id/recipe/:recipe_id',
    ...adminMiddleware,
    zodValidation(recipeIdParamSchema, 'params'),
    zodValidation(updateRecipeSchema),
    menuRecipeController.updateRecipe
);

// DELETE /api/menu/:menu_id/recipe/:recipe_id - Remove recipe from menu
router.delete(
    '/menu/:menu_id/recipe/:recipe_id',
    ...adminMiddleware,
    zodValidation(recipeIdParamSchema, 'params'),
    menuRecipeController.removeRecipe
);

export default router;

