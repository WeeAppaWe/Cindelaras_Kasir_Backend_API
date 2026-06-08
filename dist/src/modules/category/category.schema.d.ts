import { z } from 'zod';
/**
 * Create category schema
 */
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Update category schema
 */
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Category ID param schema
 */
export declare const categoryIdParamSchema: z.ZodObject<{
    category_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list categories
 */
export declare const categoryListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryIdParam = z.infer<typeof categoryIdParamSchema>;
export type CategoryListQuery = z.infer<typeof categoryListQuerySchema>;
export declare const categorySchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    categoryIdParam: z.ZodObject<{
        category_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default categorySchemas;
//# sourceMappingURL=category.schema.d.ts.map