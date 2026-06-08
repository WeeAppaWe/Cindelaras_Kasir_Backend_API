"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportInventorySchemas = exports.ingredientCardQuerySchema = exports.currentStockQuerySchema = exports.reportInventoryFilterSchema = void 0;
const zod_1 = require("zod");
// ============================================
// FILTER SCHEMAS
// ============================================
/**
 * Report filter schema for query parameters
 */
exports.reportInventoryFilterSchema = zod_1.z.object({
    start_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    ingredient_id: zod_1.z
        .string()
        .uuid({ message: 'Format ingredient_id tidak valid' })
        .optional(),
    supplier_id: zod_1.z
        .string()
        .uuid({ message: 'Format supplier_id tidak valid' })
        .optional(),
    ingredient_type: zod_1.z
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
exports.currentStockQuerySchema = zod_1.z.object({
    ingredient_type: zod_1.z
        .enum(['raw', 'semi'])
        .optional(),
    status: zod_1.z
        .enum(['all', 'low', 'out'])
        .optional()
        .default('all'),
    limit: zod_1.z.coerce.number().min(1).max(500).default(100).optional(),
});
/**
 * Ingredient movement card schema
 */
exports.ingredientCardQuerySchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid({ message: 'Format ingredient_id tidak valid' }),
    start_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: zod_1.z
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
// EXPORT SCHEMAS
// ============================================
exports.reportInventorySchemas = {
    filter: exports.reportInventoryFilterSchema,
    currentStock: exports.currentStockQuerySchema,
    ingredientCard: exports.ingredientCardQuerySchema,
};
exports.default = exports.reportInventorySchemas;
//# sourceMappingURL=report-inventory.schema.js.map