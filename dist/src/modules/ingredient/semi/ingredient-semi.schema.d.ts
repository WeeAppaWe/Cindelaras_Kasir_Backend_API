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
/**
 * Query params schema for semi ingredient references
 */
export declare const semiIngredientReferenceQuerySchema: z.ZodObject<{}, z.core.$strip>;
/**
 * Produce semi ingredient schema
 */
export declare const produceSemiIngredientSchema: z.ZodObject<{
    qty: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Create and produce semi ingredient schema (all-in-one)
 */
export declare const createAndProduceSemiIngredientSchema: z.ZodObject<{
    name: z.ZodString;
    unit_id: z.ZodString;
    min_stock: z.ZodNumber;
    qty: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
    compositions: z.ZodArray<z.ZodObject<{
        child_id: z.ZodString;
        qty_needed: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CreateSemiIngredientInput = z.infer<typeof createSemiIngredientSchema>;
export type UpdateSemiIngredientInput = z.infer<typeof updateSemiIngredientSchema>;
export type SemiIngredientIdParam = z.infer<typeof semiIngredientIdParamSchema>;
export type SemiIngredientListQuery = z.infer<typeof semiIngredientListQuerySchema>;
export type ProduceSemiIngredientInput = z.infer<typeof produceSemiIngredientSchema>;
export type CreateAndProduceSemiIngredientInput = z.infer<typeof createAndProduceSemiIngredientSchema>;
export type SemiIngredientReferenceQuery = z.infer<typeof semiIngredientReferenceQuerySchema>;
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
    produce: z.ZodObject<{
        qty: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    createAndProduce: z.ZodObject<{
        name: z.ZodString;
        unit_id: z.ZodString;
        min_stock: z.ZodNumber;
        qty: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
        compositions: z.ZodArray<z.ZodObject<{
            child_id: z.ZodString;
            qty_needed: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    referenceQuery: z.ZodObject<{}, z.core.$strip>;
};
export default semiIngredientSchemas;
//# sourceMappingURL=ingredient-semi.schema.d.ts.map