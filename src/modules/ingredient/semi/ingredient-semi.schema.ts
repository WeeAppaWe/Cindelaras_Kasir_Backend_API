import { z } from 'zod';

// ============================================
// CONSTANTS
// ============================================

/**
 * Ingredient type - SEMI for semi-finished materials
 */
export enum IngredientType {
    RAW = 'RAW',
    SEMI = 'SEMI',
}

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create semi ingredient schema
 */
export const createSemiIngredientSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama bahan setengah jadi minimal 2 karakter')
        .max(100, 'Nama bahan setengah jadi maksimal 100 karakter'),
    unit_id: z
        .string()
        .uuid('Format unit_id tidak valid'),
    min_stock: z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif'),
    target_yield: z
        .number()
        .min(0.01, 'Target yield harus lebih dari 0')
        .default(1)
        .optional(),
});

/**
 * Update semi ingredient schema
 */
export const updateSemiIngredientSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama bahan setengah jadi minimal 2 karakter')
        .max(100, 'Nama bahan setengah jadi maksimal 100 karakter')
        .optional(),
    unit_id: z
        .string()
        .uuid('Format unit_id tidak valid')
        .optional(),
    min_stock: z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif')
        .optional(),
    target_yield: z
        .number()
        .min(0.01, 'Target yield harus lebih dari 0')
        .optional(),
});

/**
 * Ingredient ID param schema
 */
export const semiIngredientIdParamSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});

/**
 * Query params schema for list semi ingredients
 */
export const semiIngredientListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    unit_id: z.string().uuid('Format unit_id tidak valid').optional(),
});

/**
 * Query params schema for semi ingredient references
 */
export const semiIngredientReferenceQuerySchema = z.object({});

/**
 * Produce semi ingredient schema
 */
export const produceSemiIngredientSchema = z.object({
    qty: z.number().min(0.01, 'Qty produksi harus lebih dari 0'),
    notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
});

/**
 * Create and produce semi ingredient schema (all-in-one)
 */
export const createAndProduceSemiIngredientSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama bahan setengah jadi minimal 2 karakter')
        .max(100, 'Nama bahan setengah jadi maksimal 100 karakter'),
    unit_id: z
        .string()
        .uuid('Format unit_id tidak valid'),
    min_stock: z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif'),
    qty: z
        .number()
        .min(0.01, 'Qty produksi harus lebih dari 0'),
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional(),
    compositions: z
        .array(
            z.object({
                child_id: z.string().uuid('Format child_id tidak valid'),
                qty_needed: z.number().min(0.01, 'Qty bahan harus lebih dari 0'),
            })
        )
        .min(1, 'Minimal satu komposisi diperlukan'),
});

// Infer types from schemas
export type CreateSemiIngredientInput = z.infer<typeof createSemiIngredientSchema>;
export type UpdateSemiIngredientInput = z.infer<typeof updateSemiIngredientSchema>;
export type SemiIngredientIdParam = z.infer<typeof semiIngredientIdParamSchema>;
export type SemiIngredientListQuery = z.infer<typeof semiIngredientListQuerySchema>;
export type ProduceSemiIngredientInput = z.infer<typeof produceSemiIngredientSchema>;
export type CreateAndProduceSemiIngredientInput = z.infer<typeof createAndProduceSemiIngredientSchema>;
export type SemiIngredientReferenceQuery = z.infer<typeof semiIngredientReferenceQuerySchema>;

// Export schemas
export const semiIngredientSchemas = {
    create: createSemiIngredientSchema,
    update: updateSemiIngredientSchema,
    ingredientIdParam: semiIngredientIdParamSchema,
    listQuery: semiIngredientListQuerySchema,
    produce: produceSemiIngredientSchema,
    createAndProduce: createAndProduceSemiIngredientSchema,
    referenceQuery: semiIngredientReferenceQuerySchema,
};

export default semiIngredientSchemas;
