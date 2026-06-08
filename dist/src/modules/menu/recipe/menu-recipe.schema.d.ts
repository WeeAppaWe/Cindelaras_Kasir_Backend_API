import { z } from 'zod';
/**
 * Create recipe schema
 */
export declare const createRecipeSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    qty_needed: z.ZodNumber;
}, z.core.$strip>;
/**
 * Update recipe schema
 */
export declare const updateRecipeSchema: z.ZodObject<{
    qty_needed: z.ZodNumber;
}, z.core.$strip>;
/**
 * Bulk recipe schema (for adding multiple at once)
 */
export declare const bulkRecipeSchema: z.ZodObject<{
    recipes: z.ZodArray<z.ZodObject<{
        ingredient_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Recipe ID param schema
 */
export declare const recipeIdParamSchema: z.ZodObject<{
    menu_id: z.ZodString;
    recipe_id: z.ZodString;
}, z.core.$strip>;
/**
 * Menu ID param schema (for recipe context)
 */
export declare const menuRecipeParamSchema: z.ZodObject<{
    menu_id: z.ZodString;
}, z.core.$strip>;
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
export type BulkRecipeInput = z.infer<typeof bulkRecipeSchema>;
export type RecipeIdParam = z.infer<typeof recipeIdParamSchema>;
export type MenuRecipeParam = z.infer<typeof menuRecipeParamSchema>;
export declare const menuRecipeSchemas: {
    create: z.ZodObject<{
        ingredient_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>;
    update: z.ZodObject<{
        qty_needed: z.ZodNumber;
    }, z.core.$strip>;
    bulk: z.ZodObject<{
        recipes: z.ZodArray<z.ZodObject<{
            ingredient_id: z.ZodString;
            qty_needed: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    recipeIdParam: z.ZodObject<{
        menu_id: z.ZodString;
        recipe_id: z.ZodString;
    }, z.core.$strip>;
    menuRecipeParam: z.ZodObject<{
        menu_id: z.ZodString;
    }, z.core.$strip>;
};
export default menuRecipeSchemas;
//# sourceMappingURL=menu-recipe.schema.d.ts.map