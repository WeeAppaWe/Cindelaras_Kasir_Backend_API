import { z } from 'zod';

// ============================================
// CONSTANTS
// ============================================

/**
 * Ingredient type - RAW for raw materials
 */
export enum IngredientType {
    RAW = 'RAW',
    SEMI = 'SEMI',
}

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create raw ingredient schema
 */
export const createRawIngredientSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama bahan baku minimal 2 karakter')
        .max(100, 'Nama bahan baku maksimal 100 karakter'),
    unit_id: z
        .string()
        .uuid('Format unit_id tidak valid'),
    stock_qty: z
        .number()
        .min(0, 'Stok tidak boleh negatif')
        .default(0)
        .optional(),
    min_stock: z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif'),
    avg_cost: z
        .number()
        .min(0, 'Harga rata-rata tidak boleh negatif')
        .default(0)
        .optional(),
});

/**
 * Update raw ingredient schema
 */
export const updateRawIngredientSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama bahan baku minimal 2 karakter')
        .max(100, 'Nama bahan baku maksimal 100 karakter')
        .optional(),
    unit_id: z
        .string()
        .uuid('Format unit_id tidak valid')
        .optional(),
    min_stock: z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif')
        .optional(),
    avg_cost: z
        .number()
        .min(0, 'Harga rata-rata tidak boleh negatif')
        .optional(),
});

/**
 * Ingredient ID param schema
 */
export const ingredientIdParamSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});

/**
 * Query params schema for list raw ingredients
 */
export const rawIngredientListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    unit_id: z.string().uuid('Format unit_id tidak valid').optional(),
    low_stock: z.coerce.boolean().optional(),
});

/**
 * Query params schema for raw ingredient references
 */
export const rawIngredientReferenceQuerySchema = z.object({});

// Infer types from schemas
export type CreateRawIngredientInput = z.infer<typeof createRawIngredientSchema>;
export type UpdateRawIngredientInput = z.infer<typeof updateRawIngredientSchema>;
export type IngredientIdParam = z.infer<typeof ingredientIdParamSchema>;
export type RawIngredientListQuery = z.infer<typeof rawIngredientListQuerySchema>;
export type RawIngredientReferenceQuery = z.infer<typeof rawIngredientReferenceQuerySchema>;

// Export schemas
export const rawIngredientSchemas = {
    create: createRawIngredientSchema,
    update: updateRawIngredientSchema,
    ingredientIdParam: ingredientIdParamSchema,
    listQuery: rawIngredientListQuerySchema,
    referenceQuery: rawIngredientReferenceQuerySchema,
};

export default rawIngredientSchemas;
