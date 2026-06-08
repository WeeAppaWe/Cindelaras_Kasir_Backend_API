import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create recipe schema
 */
export const createRecipeSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty_needed: z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});

/**
 * Update recipe schema
 */
export const updateRecipeSchema = z.object({
    qty_needed: z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});

/**
 * Bulk recipe schema (for adding multiple at once)
 */
export const bulkRecipeSchema = z.object({
    recipes: z.array(
        z.object({
            ingredient_id: z.string().uuid('Format ingredient_id tidak valid'),
            qty_needed: z.number().positive('Jumlah harus lebih dari 0'),
        })
    ).min(1, 'Minimal 1 resep diperlukan'),
});

/**
 * Recipe ID param schema
 */
export const recipeIdParamSchema = z.object({
    menu_id: z
        .string()
        .uuid('Format menu_id tidak valid'),
    recipe_id: z
        .string()
        .uuid('Format recipe_id tidak valid'),
});

/**
 * Menu ID param schema (for recipe context)
 */
export const menuRecipeParamSchema = z.object({
    menu_id: z
        .string()
        .uuid('Format menu_id tidak valid'),
});

// Infer types from schemas
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
export type BulkRecipeInput = z.infer<typeof bulkRecipeSchema>;
export type RecipeIdParam = z.infer<typeof recipeIdParamSchema>;
export type MenuRecipeParam = z.infer<typeof menuRecipeParamSchema>;

// Export schemas
export const menuRecipeSchemas = {
    create: createRecipeSchema,
    update: updateRecipeSchema,
    bulk: bulkRecipeSchema,
    recipeIdParam: recipeIdParamSchema,
    menuRecipeParam: menuRecipeParamSchema,
};

export default menuRecipeSchemas;

