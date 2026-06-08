import { z } from 'zod';
/**
 * Ingredient type - RAW for raw materials
 */
export declare enum IngredientType {
    RAW = "RAW",
    SEMI = "SEMI"
}
/**
 * Create raw ingredient schema
 */
export declare const createRawIngredientSchema: z.ZodObject<{
    name: z.ZodString;
    unit_id: z.ZodString;
    stock_qty: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    min_stock: z.ZodNumber;
    avg_cost: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, z.core.$strip>;
/**
 * Update raw ingredient schema
 */
export declare const updateRawIngredientSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    unit_id: z.ZodOptional<z.ZodString>;
    min_stock: z.ZodOptional<z.ZodNumber>;
    avg_cost: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Ingredient ID param schema
 */
export declare const ingredientIdParamSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list raw ingredients
 */
export declare const rawIngredientListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    unit_id: z.ZodOptional<z.ZodString>;
    low_stock: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type CreateRawIngredientInput = z.infer<typeof createRawIngredientSchema>;
export type UpdateRawIngredientInput = z.infer<typeof updateRawIngredientSchema>;
export type IngredientIdParam = z.infer<typeof ingredientIdParamSchema>;
export type RawIngredientListQuery = z.infer<typeof rawIngredientListQuerySchema>;
export declare const rawIngredientSchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
        unit_id: z.ZodString;
        stock_qty: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        min_stock: z.ZodNumber;
        avg_cost: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        unit_id: z.ZodOptional<z.ZodString>;
        min_stock: z.ZodOptional<z.ZodNumber>;
        avg_cost: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    ingredientIdParam: z.ZodObject<{
        ingredient_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        unit_id: z.ZodOptional<z.ZodString>;
        low_stock: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    }, z.core.$strip>;
};
export default rawIngredientSchemas;
//# sourceMappingURL=ingredient-raw.schema.d.ts.map