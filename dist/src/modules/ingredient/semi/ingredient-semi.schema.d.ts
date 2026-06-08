import { z } from 'zod';
/**
 * Ingredient type - SEMI for semi-finished materials
 */
export declare enum IngredientType {
    RAW = "RAW",
    SEMI = "SEMI"
}
/**
 * Create semi ingredient schema
 */
export declare const createSemiIngredientSchema: z.ZodObject<{
    name: z.ZodString;
    unit_id: z.ZodString;
    min_stock: z.ZodNumber;
    target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, z.core.$strip>;
/**
 * Update semi ingredient schema
 */
export declare const updateSemiIngredientSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    unit_id: z.ZodOptional<z.ZodString>;
    min_stock: z.ZodOptional<z.ZodNumber>;
    target_yield: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Ingredient ID param schema
 */
export declare const semiIngredientIdParamSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list semi ingredients
 */
export declare const semiIngredientListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    unit_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateSemiIngredientInput = z.infer<typeof createSemiIngredientSchema>;
export type UpdateSemiIngredientInput = z.infer<typeof updateSemiIngredientSchema>;
export type SemiIngredientIdParam = z.infer<typeof semiIngredientIdParamSchema>;
export type SemiIngredientListQuery = z.infer<typeof semiIngredientListQuerySchema>;
export declare const semiIngredientSchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
        unit_id: z.ZodString;
        min_stock: z.ZodNumber;
        target_yield: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        unit_id: z.ZodOptional<z.ZodString>;
        min_stock: z.ZodOptional<z.ZodNumber>;
        target_yield: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    ingredientIdParam: z.ZodObject<{
        ingredient_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        unit_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default semiIngredientSchemas;
//# sourceMappingURL=ingredient-semi.schema.d.ts.map