"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashMovementSchemas = exports.cashMovementListQuerySchema = exports.cashMovementIdParamSchema = exports.createCashMovementSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create cash movement schema
 */
exports.createCashMovementSchema = zod_1.z.object({
    type: zod_1.z
        .enum(['IN', 'OUT'], { message: 'Tipe mutasi harus IN atau OUT' }),
    amount: zod_1.z
        .number()
        .positive('Jumlah harus lebih dari 0'),
    note: zod_1.z
        .string()
        .max(255, 'Catatan maksimal 255 karakter')
        .optional(),
});
/**
 * Cash movement ID param schema
 */
exports.cashMovementIdParamSchema = zod_1.z.object({
    cash_movement_id: zod_1.z
        .string()
        .uuid('Format cash_movement_id tidak valid'),
});
/**
 * Query params schema for list cash movements
 */
exports.cashMovementListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    type: zod_1.z.enum(['IN', 'OUT']).optional(),
    shift_id: zod_1.z.string().uuid('Format shift_id tidak valid').optional(),
});
// Export schemas
exports.cashMovementSchemas = {
    create: exports.createCashMovementSchema,
    cashMovementIdParam: exports.cashMovementIdParamSchema,
    listQuery: exports.cashMovementListQuerySchema,
};
exports.default = exports.cashMovementSchemas;
//# sourceMappingURL=cash-movement.schema.js.map