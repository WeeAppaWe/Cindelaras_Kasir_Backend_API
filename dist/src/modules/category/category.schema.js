"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchemas = exports.categoryListQuerySchema = exports.categoryIdParamSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create category schema
 */
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama kategori minimal 2 karakter')
        .max(50, 'Nama kategori maksimal 50 karakter'),
});
/**
 * Update category schema
 */
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama kategori minimal 2 karakter')
        .max(50, 'Nama kategori maksimal 50 karakter')
        .optional(),
});
/**
 * Category ID param schema
 */
exports.categoryIdParamSchema = zod_1.z.object({
    category_id: zod_1.z
        .string()
        .uuid('Format category_id tidak valid'),
});
/**
 * Query params schema for list categories
 */
exports.categoryListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
});
// Export schemas
exports.categorySchemas = {
    create: exports.createCategorySchema,
    update: exports.updateCategorySchema,
    categoryIdParam: exports.categoryIdParamSchema,
    listQuery: exports.categoryListQuerySchema,
};
exports.default = exports.categorySchemas;
//# sourceMappingURL=category.schema.js.map