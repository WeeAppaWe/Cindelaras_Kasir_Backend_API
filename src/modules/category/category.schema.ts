import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create category schema
 */
export const createCategorySchema = z.object({
    name: z
        .string()
        .min(2, 'Nama kategori minimal 2 karakter')
        .max(50, 'Nama kategori maksimal 50 karakter'),
});

/**
 * Update category schema
 */
export const updateCategorySchema = z.object({
    name: z
        .string()
        .min(2, 'Nama kategori minimal 2 karakter')
        .max(50, 'Nama kategori maksimal 50 karakter')
        .optional(),
});

/**
 * Category ID param schema
 */
export const categoryIdParamSchema = z.object({
    category_id: z
        .string()
        .uuid('Format category_id tidak valid'),
});

/**
 * Query params schema for list categories
 */
export const categoryListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
});

// Infer types from schemas
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryIdParam = z.infer<typeof categoryIdParamSchema>;
export type CategoryListQuery = z.infer<typeof categoryListQuerySchema>;

// Export schemas
export const categorySchemas = {
    create: createCategorySchema,
    update: updateCategorySchema,
    categoryIdParam: categoryIdParamSchema,
    listQuery: categoryListQuerySchema,
};

export default categorySchemas;
