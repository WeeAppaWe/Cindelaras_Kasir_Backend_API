"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierSchemas = exports.supplierListQuerySchema = exports.supplierIdParamSchema = exports.updateSupplierSchema = exports.createSupplierSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create supplier schema
 */
exports.createSupplierSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama supplier minimal 2 karakter')
        .max(100, 'Nama supplier maksimal 100 karakter'),
    phone: zod_1.z
        .string()
        .max(20, 'Nomor telepon maksimal 20 karakter')
        .regex(/^[0-9+\-\s()]*$/, 'Format nomor telepon tidak valid')
        .optional()
        .nullable(),
    address: zod_1.z
        .string()
        .max(500, 'Alamat maksimal 500 karakter')
        .optional()
        .nullable(),
});
/**
 * Update supplier schema
 */
exports.updateSupplierSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama supplier minimal 2 karakter')
        .max(100, 'Nama supplier maksimal 100 karakter')
        .optional(),
    phone: zod_1.z
        .string()
        .max(20, 'Nomor telepon maksimal 20 karakter')
        .regex(/^[0-9+\-\s()]*$/, 'Format nomor telepon tidak valid')
        .optional()
        .nullable(),
    address: zod_1.z
        .string()
        .max(500, 'Alamat maksimal 500 karakter')
        .optional()
        .nullable(),
});
/**
 * Supplier ID param schema
 */
exports.supplierIdParamSchema = zod_1.z.object({
    supplier_id: zod_1.z
        .string()
        .uuid('Format supplier_id tidak valid'),
});
/**
 * Query params schema for list suppliers
 */
exports.supplierListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
});
// Export schemas
exports.supplierSchemas = {
    create: exports.createSupplierSchema,
    update: exports.updateSupplierSchema,
    supplierIdParam: exports.supplierIdParamSchema,
    listQuery: exports.supplierListQuerySchema,
};
exports.default = exports.supplierSchemas;
//# sourceMappingURL=supplier.schema.js.map