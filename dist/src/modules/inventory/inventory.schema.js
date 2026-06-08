"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySchemas = exports.stockMovementListQuerySchema = exports.ingredientIdParamSchema = exports.stockMovementIdParamSchema = exports.stockOutSchema = exports.STOCK_OUT_REASONS = exports.stockInSchema = void 0;
const zod_1 = require("zod");
// ============================================
// STOCK IN SCHEMA (Barang Masuk dari Supplier)
// ============================================
exports.stockInSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    supplier_id: zod_1.z
        .string()
        .uuid('Format supplier_id tidak valid'),
    qty: zod_1.z
        .number()
        .positive('Jumlah harus positif'),
    unit_cost: zod_1.z
        .number()
        .nonnegative('Harga per unit tidak boleh negatif'),
    notes: zod_1.z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional()
        .nullable(),
});
// ============================================
// STOCK OUT SCHEMA (Barang Keluar - Rusak/Kedaluarsa)
// ============================================
exports.STOCK_OUT_REASONS = ['DAMAGED', 'EXPIRED', 'OTHER'];
exports.stockOutSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty: zod_1.z
        .number()
        .positive('Jumlah harus positif'),
    reason: zod_1.z
        .string()
        .refine((val) => exports.STOCK_OUT_REASONS.includes(val), { message: `Alasan harus ${exports.STOCK_OUT_REASONS.join(', ')}` }),
    notes: zod_1.z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional()
        .nullable(),
});
// ============================================
// PARAM SCHEMAS
// ============================================
exports.stockMovementIdParamSchema = zod_1.z.object({
    stock_movement_id: zod_1.z
        .string()
        .uuid('Format stock_movement_id tidak valid'),
});
exports.ingredientIdParamSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});
// ============================================
// QUERY SCHEMAS
// ============================================
exports.stockMovementListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    ingredient_id: zod_1.z.string().uuid('Format ingredient_id tidak valid').optional(),
    supplier_id: zod_1.z.string().uuid('Format supplier_id tidak valid').optional(),
    stock_type_id: zod_1.z.string().uuid('Format stock_type_id tidak valid').optional(),
    date_from: zod_1.z.coerce.date().optional(),
    date_to: zod_1.z.coerce.date().optional(),
});
// ============================================
// EXPORT SCHEMAS
// ============================================
exports.inventorySchemas = {
    stockIn: exports.stockInSchema,
    stockOut: exports.stockOutSchema,
    stockMovementIdParam: exports.stockMovementIdParamSchema,
    ingredientIdParam: exports.ingredientIdParamSchema,
    listQuery: exports.stockMovementListQuerySchema,
};
exports.default = exports.inventorySchemas;
//# sourceMappingURL=inventory.schema.js.map