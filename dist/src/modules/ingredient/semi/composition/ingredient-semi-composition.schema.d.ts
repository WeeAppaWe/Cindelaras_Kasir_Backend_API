import { z } from 'zod';
/**
 * Create composition schema
 */
export declare const createCompositionSchema: z.ZodObject<{
    child_id: z.ZodString;
    qty_needed: z.ZodNumber;
}, z.core.$strip>;
/**
 * Update composition schema
 */
export declare const updateCompositionSchema: z.ZodObject<{
    qty_needed: z.ZodNumber;
}, z.core.$strip>;
/**
 * Bulk add compositions schema
 */
export declare const bulkAddCompositionsSchema: z.ZodObject<{
    compositions: z.ZodArray<z.ZodObject<{
        child_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>>;
    target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, z.core.$strip>;
/**
 * Parent ingredient ID param schema
 */
export declare const parentIngredientIdParamSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
}, z.core.$strip>;
/**
 * Composition ID param schema
 */
export declare const compositionIdParamSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    composition_id: z.ZodString;
}, z.core.$strip>;
/**
 * HPP Preview request schema
 */
export declare const hppPreviewSchema: z.ZodObject<{
    compositions: z.ZodArray<z.ZodObject<{
        ingredient_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>>;
    target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, z.core.$strip>;
export type CreateCompositionInput = z.infer<typeof createCompositionSchema>;
export type UpdateCompositionInput = z.infer<typeof updateCompositionSchema>;
export type BulkAddCompositionsInput = z.infer<typeof bulkAddCompositionsSchema>;
export type ParentIngredientIdParam = z.infer<typeof parentIngredientIdParamSchema>;
export type CompositionIdParam = z.infer<typeof compositionIdParamSchema>;
export type HPPPreviewInput = z.infer<typeof hppPreviewSchema>;
export declare const compositionSchemas: {
    create: z.ZodObject<{
        child_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>;
    update: z.ZodObject<{
        qty_needed: z.ZodNumber;
    }, z.core.$strip>;
    bulkAdd: z.ZodObject<{
        compositions: z.ZodArray<z.ZodObject<{
            child_id: z.ZodString;
            qty_needed: z.ZodNumber;
        }, z.core.$strip>>;
        target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, z.core.$strip>;
    parentIngredientIdParam: z.ZodObject<{
        ingredient_id: z.ZodString;
    }, z.core.$strip>;
    compositionIdParam: z.ZodObject<{
        ingredient_id: z.ZodString;
        composition_id: z.ZodString;
    }, z.core.$strip>;
    hppPreview: z.ZodObject<{
        compositions: z.ZodArray<z.ZodObject<{
            ingredient_id: z.ZodString;
            qty_needed: z.ZodNumber;
        }, z.core.$strip>>;
        target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, z.core.$strip>;
};
export default compositionSchemas;
//# sourceMappingURL=ingredient-semi-composition.schema.d.ts.map