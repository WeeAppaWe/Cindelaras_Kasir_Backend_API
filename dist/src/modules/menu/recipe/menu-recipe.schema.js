"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRecipeSchemas = exports.menuRecipeParamSchema = exports.recipeIdParamSchema = exports.bulkRecipeSchema = exports.updateRecipeSchema = exports.createRecipeSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create recipe schema
 */
exports.createRecipeSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty_needed: zod_1.z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});
/**
 * Update recipe schema
 */
exports.updateRecipeSchema = zod_1.z.object({
    qty_needed: zod_1.z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});
/**
 * Bulk recipe schema (for adding multiple at once)
 */
exports.bulkRecipeSchema = zod_1.z.object({
    recipes: zod_1.z.array(zod_1.z.object({
        ingredient_id: zod_1.z.string().uuid('Format ingredient_id tidak valid'),
        qty_needed: zod_1.z.number().positive('Jumlah harus lebih dari 0'),
    })).min(1, 'Minimal 1 resep diperlukan'),
});
/**
 * Recipe ID param schema
 */
exports.recipeIdParamSchema = zod_1.z.object({
    menu_id: zod_1.z
        .string()
        .uuid('Format menu_id tidak valid'),
    recipe_id: zod_1.z
        .string()
        .uuid('Format recipe_id tidak valid'),
});
/**
 * Menu ID param schema (for recipe context)
 */
exports.menuRecipeParamSchema = zod_1.z.object({
    menu_id: zod_1.z
        .string()
        .uuid('Format menu_id tidak valid'),
});
// Export schemas
exports.menuRecipeSchemas = {
    create: exports.createRecipeSchema,
    update: exports.updateRecipeSchema,
    bulk: exports.bulkRecipeSchema,
    recipeIdParam: exports.recipeIdParamSchema,
    menuRecipeParam: exports.menuRecipeParamSchema,
};
exports.default = exports.menuRecipeSchemas;
//# sourceMappingURL=menu-recipe.schema.js.map