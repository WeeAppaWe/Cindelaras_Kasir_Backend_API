"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const role_validation_middleware_1 = require("../middleware/role-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const menu_recipe_schema_1 = require("../src/modules/menu/recipe/menu-recipe.schema");
const menu_schema_1 = require("../src/modules/menu/menu.schema");
const menu_recipe_controller_1 = __importDefault(require("../src/modules/menu/recipe/menu-recipe.controller"));
const router = express_1.default.Router();
// All recipe routes require ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Menu Recipe Routes (nested under /api/menu/:menu_id/recipe)
// ============================================
// GET /api/menu/:menu_id/recipe - Get all recipes for a menu
router.get('/menu/:menu_id/recipe', ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), menu_recipe_controller_1.default.showAll);
// POST /api/menu/:menu_id/recipe - Add recipe to menu
router.post('/menu/:menu_id/recipe', ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(menu_recipe_schema_1.createRecipeSchema), menu_recipe_controller_1.default.addRecipe);
// PATCH /api/menu/:menu_id/recipe - Bulk update/replace all recipes
router.patch('/menu/:menu_id/recipe', ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(menu_recipe_schema_1.bulkRecipeSchema), menu_recipe_controller_1.default.bulkUpdate);
// PATCH /api/menu/:menu_id/recipe/:recipe_id - Update specific recipe qty
router.patch('/menu/:menu_id/recipe/:recipe_id', ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(menu_recipe_schema_1.recipeIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(menu_recipe_schema_1.updateRecipeSchema), menu_recipe_controller_1.default.updateRecipe);
// DELETE /api/menu/:menu_id/recipe/:recipe_id - Remove recipe from menu
router.delete('/menu/:menu_id/recipe/:recipe_id', ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(menu_recipe_schema_1.recipeIdParamSchema, 'params'), menu_recipe_controller_1.default.removeRecipe);
exports.default = router;
//# sourceMappingURL=menu-recipe.route.js.map