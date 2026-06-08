import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create menu schema
 */
export const createMenuSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama menu minimal 2 karakter')
        .max(100, 'Nama menu maksimal 100 karakter'),
    category_id: z
        .string()
        .uuid('Format category_id tidak valid'),
    price: z
        .number()
        .min(0, 'Harga tidak boleh negatif'),
    description: z
        .string()
        .max(500, 'Deskripsi maksimal 500 karakter')
        .optional()
        .nullable(),
    image_url: z
        .string()
        .max(255, 'URL gambar maksimal 255 karakter')
        .refine(
            (val) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'),
            { message: 'Format URL gambar tidak valid. Harus berupa URL lengkap atau path relatif' }
        )
        .optional()
        .nullable(),
    is_available: z
        .boolean()
        .default(true)
        .optional(),
});

/**
 * Update menu schema
 */
export const updateMenuSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama menu minimal 2 karakter')
        .max(100, 'Nama menu maksimal 100 karakter')
        .optional(),
    category_id: z
        .string()
        .uuid('Format category_id tidak valid')
        .optional(),
    price: z
        .number()
        .min(0, 'Harga tidak boleh negatif')
        .optional(),
    description: z
        .string()
        .max(500, 'Deskripsi maksimal 500 karakter')
        .optional()
        .nullable(),
    image_url: z
        .string()
        .max(255, 'URL gambar maksimal 255 karakter')
        .refine(
            (val) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'),
            { message: 'Format URL gambar tidak valid. Harus berupa URL lengkap atau path relatif' }
        )
        .optional()
        .nullable(),
    is_available: z
        .boolean()
        .optional(),
});

/**
 * Menu ID param schema
 */
export const menuIdParamSchema = z.object({
    menu_id: z
        .string()
        .uuid('Format menu_id tidak valid'),
});

/**
 * Query params schema for list menus
 */
export const menuListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    category_id: z.string().uuid('Format category_id tidak valid').optional(),
    is_available: z.preprocess(
        (val) => val === 'true' ? true : val === 'false' ? false : undefined,
        z.boolean().optional()
    ),
});

// Infer types from schemas
export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type MenuIdParam = z.infer<typeof menuIdParamSchema>;
export type MenuListQuery = z.infer<typeof menuListQuerySchema>;

// Export schemas
export const menuSchemas = {
    create: createMenuSchema,
    update: updateMenuSchema,
    menuIdParam: menuIdParamSchema,
    listQuery: menuListQuerySchema,
};

export default menuSchemas;
