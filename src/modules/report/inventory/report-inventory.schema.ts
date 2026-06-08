import { z } from 'zod';

// ============================================
// FILTER SCHEMAS
// ============================================

/**
 * Report filter schema for query parameters
 */
export const reportInventoryFilterSchema = z.object({
    start_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    ingredient_id: z
        .string()
        .uuid({ message: 'Format ingredient_id tidak valid' })
        .optional(),
    supplier_id: z
        .string()
        .uuid({ message: 'Format supplier_id tidak valid' })
        .optional(),
    ingredient_type: z
        .enum(['raw', 'semi'])
        .optional(),
}).refine((data) => {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    return start <= end;
}, {
    message: 'start_date harus sebelum atau sama dengan end_date',
    path: ['start_date'],
});

/**
 * Current stock query schema (no date filter needed)
 */
export const currentStockQuerySchema = z.object({
    ingredient_type: z
        .enum(['raw', 'semi'])
        .optional(),
    status: z
        .enum(['all', 'low', 'out'])
        .optional()
        .default('all'),
    limit: z.coerce.number().min(1).max(500).default(100).optional(),
});

/**
 * Ingredient movement card schema
 */
export const ingredientCardQuerySchema = z.object({
    ingredient_id: z
        .string()
        .uuid({ message: 'Format ingredient_id tidak valid' }),
    start_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
}).refine((data) => {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    return start <= end;
}, {
    message: 'start_date harus sebelum atau sama dengan end_date',
    path: ['start_date'],
});

// ============================================
// INFERRED TYPES
// ============================================

export type ReportInventoryFilterInput = z.infer<typeof reportInventoryFilterSchema>;
export type CurrentStockQueryInput = z.infer<typeof currentStockQuerySchema>;
export type IngredientCardQueryInput = z.infer<typeof ingredientCardQuerySchema>;

// ============================================
// EXPORT SCHEMAS
// ============================================

export const reportInventorySchemas = {
    filter: reportInventoryFilterSchema,
    currentStock: currentStockQuerySchema,
    ingredientCard: ingredientCardQuerySchema,
};

export default reportInventorySchemas;
