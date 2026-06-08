"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opnameSchemas = exports.opnameListQuerySchema = exports.opnameIdParamSchema = exports.applyAdjustmentSchema = exports.changeStatusSchema = exports.updateOpnameSchema = exports.createOpnameSchema = exports.opnameItemSchema = exports.OpnameStatus = void 0;
const zod_1 = require("zod");
// ============================================
// CONSTANTS (matches values in database)
// ============================================
/**
 * Opname status - matches 'stock_opnames.status' column in database
 */
var OpnameStatus;
(function (OpnameStatus) {
    OpnameStatus["DRAFT"] = "DRAFT";
    OpnameStatus["COMPLETED"] = "COMPLETED";
    OpnameStatus["APPLIED"] = "APPLIED";
    OpnameStatus["CANCELLED"] = "CANCELLED";
})(OpnameStatus || (exports.OpnameStatus = OpnameStatus = {}));
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Opname item schema (single item in opname)
 */
exports.opnameItemSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    physical_qty: zod_1.z
        .number()
        .min(0, 'Jumlah fisik tidak boleh negatif'),
});
/**
 * Create opname schema
 */
exports.createOpnameSchema = zod_1.z.object({
    opname_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
    notes: zod_1.z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional(),
    items: zod_1.z
        .array(exports.opnameItemSchema)
        .min(1, 'Minimal harus ada 1 item opname'),
});
/**
 * Update opname schema
 */
exports.updateOpnameSchema = zod_1.z.object({
    notes: zod_1.z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional(),
    items: zod_1.z
        .array(exports.opnameItemSchema)
        .min(1, 'Minimal harus ada 1 item opname')
        .optional(),
});
/**
 * Change status schema
 */
exports.changeStatusSchema = zod_1.z.object({
    status: zod_1.z
        .enum([OpnameStatus.COMPLETED, OpnameStatus.CANCELLED], {
        message: 'Status harus COMPLETED atau CANCELLED',
    }),
});
/**
 * Apply adjustment schema (just confirmation, no body needed)
 */
exports.applyAdjustmentSchema = zod_1.z.object({}).optional();
/**
 * Opname ID param schema
 */
exports.opnameIdParamSchema = zod_1.z.object({
    stock_opname_id: zod_1.z
        .string()
        .uuid('Format stock_opname_id tidak valid'),
});
/**
 * Query params schema for list opnames
 */
exports.opnameListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    status: zod_1.z.enum([
        OpnameStatus.DRAFT,
        OpnameStatus.COMPLETED,
        OpnameStatus.APPLIED,
        OpnameStatus.CANCELLED,
    ]).optional(),
    start_date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD').optional(),
    end_date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD').optional(),
});
// Export schemas
exports.opnameSchemas = {
    create: exports.createOpnameSchema,
    update: exports.updateOpnameSchema,
    changeStatus: exports.changeStatusSchema,
    applyAdjustment: exports.applyAdjustmentSchema,
    opnameIdParam: exports.opnameIdParamSchema,
    listQuery: exports.opnameListQuerySchema,
    item: exports.opnameItemSchema,
};
exports.default = exports.opnameSchemas;
//# sourceMappingURL=opname.schema.js.map