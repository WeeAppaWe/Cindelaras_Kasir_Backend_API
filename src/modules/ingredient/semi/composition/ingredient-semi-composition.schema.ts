import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create composition schema
 */
export const createCompositionSchema = z.object({
    child_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty_needed: z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});

/**
 * Update composition schema
 */
export const updateCompositionSchema = z.object({
    qty_needed: z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});

/**
 * Bulk add compositions schema
 */
export const bulkAddCompositionsSchema = z.object({
    compositions: z.array(
        z.object({
            child_id: z.string().uuid('Format ingredient_id tidak valid'),
            qty_needed: z.number().positive('Jumlah harus lebih dari 0'),
        })
    ).min(1, 'Minimal 1 bahan dalam komposisi'),
    target_yield: z.number().min(0.01, 'Target yield harus lebih dari 0').default(1).optional(),
});

/**
 * Parent ingredient ID param schema
 */
export const parentIngredientIdParamSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});

/**
 * Composition ID param schema
 */
export const compositionIdParamSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    composition_id: z
        .string()
        .uuid('Format composition_id tidak valid'),
});

/**
 * HPP Preview request schema
 */
export const hppPreviewSchema = z.object({
    compositions: z.array(
        z.object({
            ingredient_id: z.string().uuid('Format ingredient_id tidak valid'),
            qty_needed: z.number().positive('Jumlah harus lebih dari 0'),
        })
    ).min(1, 'Minimal 1 bahan untuk preview HPP'),
    target_yield: z.number().min(0.01, 'Target yield harus lebih dari 0').default(1).optional(),
});

// Infer types from schemas
export type CreateCompositionInput = z.infer<typeof createCompositionSchema>;
export type UpdateCompositionInput = z.infer<typeof updateCompositionSchema>;
export type BulkAddCompositionsInput = z.infer<typeof bulkAddCompositionsSchema>;
export type ParentIngredientIdParam = z.infer<typeof parentIngredientIdParamSchema>;
export type CompositionIdParam = z.infer<typeof compositionIdParamSchema>;
export type HPPPreviewInput = z.infer<typeof hppPreviewSchema>;

// Export schemas
export const compositionSchemas = {
    create: createCompositionSchema,
    update: updateCompositionSchema,
    bulkAdd: bulkAddCompositionsSchema,
    parentIngredientIdParam: parentIngredientIdParamSchema,
    compositionIdParam: compositionIdParamSchema,
    hppPreview: hppPreviewSchema,
};

export default compositionSchemas;
