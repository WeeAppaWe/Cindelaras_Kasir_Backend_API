import { z } from 'zod';
/**
 * Report filter schema for query parameters
 */
export declare const reportInventoryFilterSchema: z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
    ingredient_id: z.ZodOptional<z.ZodString>;
    supplier_id: z.ZodOptional<z.ZodString>;
    ingredient_type: z.ZodOptional<z.ZodEnum<{
        raw: "raw";
        semi: "semi";
    }>>;
}, z.core.$strip>;
/**
 * Current stock query schema (no date filter needed)
 */
export declare const currentStockQuerySchema: z.ZodObject<{
    ingredient_type: z.ZodOptional<z.ZodEnum<{
        raw: "raw";
        semi: "semi";
    }>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        all: "all";
        out: "out";
        low: "low";
    }>>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
/**
 * Ingredient movement card schema
 */
export declare const ingredientCardQuerySchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    start_date: z.ZodString;
    end_date: z.ZodString;
}, z.core.$strip>;
export type ReportInventoryFilterInput = z.infer<typeof reportInventoryFilterSchema>;
export type CurrentStockQueryInput = z.infer<typeof currentStockQuerySchema>;
export type IngredientCardQueryInput = z.infer<typeof ingredientCardQuerySchema>;
export declare const reportInventorySchemas: {
    filter: z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        ingredient_id: z.ZodOptional<z.ZodString>;
        supplier_id: z.ZodOptional<z.ZodString>;
        ingredient_type: z.ZodOptional<z.ZodEnum<{
            raw: "raw";
            semi: "semi";
        }>>;
    }, z.core.$strip>;
    currentStock: z.ZodObject<{
        ingredient_type: z.ZodOptional<z.ZodEnum<{
            raw: "raw";
            semi: "semi";
        }>>;
        status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            all: "all";
            out: "out";
            low: "low";
        }>>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
    ingredientCard: z.ZodObject<{
        ingredient_id: z.ZodString;
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, z.core.$strip>;
};
export default reportInventorySchemas;
//# sourceMappingURL=report-inventory.schema.d.ts.map