"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptSchemas = exports.sendReceiptSchema = exports.orderIdParamSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Order ID param schema
 */
exports.orderIdParamSchema = zod_1.z.object({
    order_id: zod_1.z.string().uuid('Format order_id tidak valid'),
});
/**
 * Send receipt request schema
 */
exports.sendReceiptSchema = zod_1.z.object({
    phone: zod_1.z
        .string()
        .min(10, 'Nomor telepon minimal 10 digit')
        .max(15, 'Nomor telepon maksimal 15 digit')
        .regex(/^[0-9+]+$/, 'Nomor telepon hanya boleh angka'),
});
// Export schemas
exports.receiptSchemas = {
    orderIdParam: exports.orderIdParamSchema,
    sendReceipt: exports.sendReceiptSchema,
};
exports.default = exports.receiptSchemas;
//# sourceMappingURL=receipt.schema.js.map