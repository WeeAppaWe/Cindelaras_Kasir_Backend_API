import { z } from 'zod';

// ============================================
// STOCK IN SCHEMA (Barang Masuk dari Supplier)
// ============================================

export const stockInSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    supplier_id: z
        .string()
        .uuid('Format supplier_id tidak valid'),
    qty: z
        .number()
        .positive('Jumlah harus positif'),
    unit_cost: z
        .number()
        .nonnegative('Harga per unit tidak boleh negatif'),
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional()
        .nullable(),
});

// ============================================
// STOCK OUT SCHEMA (Barang Keluar - Rusak/Kedaluarsa)
// ============================================

export const STOCK_OUT_REASONS = ['DAMAGED', 'EXPIRED', 'OTHER'] as const;

export const stockOutSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty: z
        .number()
        .positive('Jumlah harus positif'),
    reason: z
        .string()
        .refine(
            (val) => (STOCK_OUT_REASONS as readonly string[]).includes(val),
            { message: `Alasan harus ${STOCK_OUT_REASONS.join(', ')}` }
        ),
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional()
        .nullable(),
});

// ============================================
// PARAM SCHEMAS
// ============================================

export const stockMovementIdParamSchema = z.object({
    stock_movement_id: z
        .string()
        .uuid('Format stock_movement_id tidak valid'),
});

export const ingredientIdParamSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});

// ============================================
// QUERY SCHEMAS
// ============================================

export const stockMovementListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    ingredient_id: z.string().uuid('Format ingredient_id tidak valid').optional(),
    supplier_id: z.string().uuid('Format supplier_id tidak valid').optional(),
    stock_type_id: z.string().uuid('Format stock_type_id tidak valid').optional(),
    date_from: z.coerce.date().optional(),
    date_to: z.coerce.date().optional(),
});

// ============================================
// INFERRED TYPES
// ============================================

export type StockInInput = z.infer<typeof stockInSchema>;
export type StockOutInput = z.infer<typeof stockOutSchema>;
export type StockMovementIdParam = z.infer<typeof stockMovementIdParamSchema>;
export type IngredientIdParam = z.infer<typeof ingredientIdParamSchema>;
export type StockMovementListQuery = z.infer<typeof stockMovementListQuerySchema>;

// ============================================
// EXPORT SCHEMAS
// ============================================

export const inventorySchemas = {
    stockIn: stockInSchema,
    stockOut: stockOutSchema,
    stockMovementIdParam: stockMovementIdParamSchema,
    ingredientIdParam: ingredientIdParamSchema,
    listQuery: stockMovementListQuerySchema,
};

export default inventorySchemas;
