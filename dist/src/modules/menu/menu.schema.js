"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSchemas = exports.menuListQuerySchema = exports.menuIdParamSchema = exports.updateMenuSchema = exports.createMenuSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create menu schema
 */
exports.createMenuSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama menu minimal 2 karakter')
        .max(100, 'Nama menu maksimal 100 karakter'),
    category_id: zod_1.z
        .string()
        .uuid('Format category_id tidak valid'),
    price: zod_1.z
        .number()
        .min(0, 'Harga tidak boleh negatif'),
    description: zod_1.z
        .string()
        .max(500, 'Deskripsi maksimal 500 karakter')
        .optional()
        .nullable(),
    image_url: zod_1.z
        .string()
        .max(255, 'URL gambar maksimal 255 karakter')
        .refine((val) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'), { message: 'Format URL gambar tidak valid. Harus berupa URL lengkap atau path relatif' })
        .optional()
        .nullable(),
    is_available: zod_1.z
        .boolean()
        .default(true)
        .optional(),
});
/**
 * Update menu schema
 */
exports.updateMenuSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama menu minimal 2 karakter')
        .max(100, 'Nama menu maksimal 100 karakter')
        .optional(),
    category_id: zod_1.z
        .string()
        .uuid('Format category_id tidak valid')
        .optional(),
    price: zod_1.z
        .number()
        .min(0, 'Harga tidak boleh negatif')
        .optional(),
    description: zod_1.z
        .string()
        .max(500, 'Deskripsi maksimal 500 karakter')
        .optional()
        .nullable(),
    image_url: zod_1.z
        .string()
        .max(255, 'URL gambar maksimal 255 karakter')
        .refine((val) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'), { message: 'Format URL gambar tidak valid. Harus berupa URL lengkap atau path relatif' })
        .optional()
        .nullable(),
    is_available: zod_1.z
        .boolean()
        .optional(),
});
/**
 * Menu ID param schema
 */
exports.menuIdParamSchema = zod_1.z.object({
    menu_id: zod_1.z
        .string()
        .uuid('Format menu_id tidak valid'),
});
/**
 * Query params schema for list menus
 */
exports.menuListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    category_id: zod_1.z.string().uuid('Format category_id tidak valid').optional(),
    is_available: zod_1.z.preprocess((val) => val === 'true' ? true : val === 'false' ? false : undefined, zod_1.z.boolean().optional()),
});
// Export schemas
exports.menuSchemas = {
    create: exports.createMenuSchema,
    update: exports.updateMenuSchema,
    menuIdParam: exports.menuIdParamSchema,
    listQuery: exports.menuListQuerySchema,
};
exports.default = exports.menuSchemas;
//# sourceMappingURL=menu.schema.js.map