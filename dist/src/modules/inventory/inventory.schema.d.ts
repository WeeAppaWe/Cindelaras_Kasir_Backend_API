import { z } from 'zod';
export declare const stockInSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    supplier_id: z.ZodString;
    qty: z.ZodNumber;
    unit_cost: z.ZodNumber;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const STOCK_OUT_REASONS: readonly ["DAMAGED", "EXPIRED", "OTHER"];
export declare const stockOutSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    qty: z.ZodNumber;
    reason: z.ZodString;
    notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const stockMovementIdParamSchema: z.ZodObject<{
    stock_movement_id: z.ZodString;
}, z.core.$strip>;
export declare const ingredientIdParamSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
}, z.core.$strip>;
export declare const stockMovementListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    ingredient_id: z.ZodOptional<z.ZodString>;
    supplier_id: z.ZodOptional<z.ZodString>;
    stock_type_id: z.ZodOptional<z.ZodString>;
    date_from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    date_to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type StockInInput = z.infer<typeof stockInSchema>;
export type StockOutInput = z.infer<typeof stockOutSchema>;
export type StockMovementIdParam = z.infer<typeof stockMovementIdParamSchema>;
export type IngredientIdParam = z.infer<typeof ingredientIdParamSchema>;
export type StockMovementListQuery = z.infer<typeof stockMovementListQuerySchema>;
export declare const inventorySchemas: {
    stockIn: z.ZodObject<{
        ingredient_id: z.ZodString;
        supplier_id: z.ZodString;
        qty: z.ZodNumber;
        unit_cost: z.ZodNumber;
        notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    stockOut: z.ZodObject<{
        ingredient_id: z.ZodString;
        qty: z.ZodNumber;
        reason: z.ZodString;
        notes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    stockMovementIdParam: z.ZodObject<{
        stock_movement_id: z.ZodString;
    }, z.core.$strip>;
    ingredientIdParam: z.ZodObject<{
        ingredient_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        ingredient_id: z.ZodOptional<z.ZodString>;
        supplier_id: z.ZodOptional<z.ZodString>;
        stock_type_id: z.ZodOptional<z.ZodString>;
        date_from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        date_to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    }, z.core.$strip>;
};
export default inventorySchemas;
//# sourceMappingURL=inventory.schema.d.ts.map