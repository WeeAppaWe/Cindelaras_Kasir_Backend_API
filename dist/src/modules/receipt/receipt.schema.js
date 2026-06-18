"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptSchemas = exports.previewPdfSchema = exports.sendReceiptSchema = exports.orderIdParamSchema = void 0;
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
/**
 * Preview PDF request schema
 */
exports.previewPdfSchema = zod_1.z.object({
    store_name: zod_1.z.string().default(''),
    store_address: zod_1.z.string().default(''),
    store_phone: zod_1.z.string().default(''),
    store_logo: zod_1.z.string().default(''),
    receipt_header: zod_1.z.string().default(''),
    receipt_footer: zod_1.z.string().default(''),
});
// Export schemas
exports.receiptSchemas = {
    orderIdParam: exports.orderIdParamSchema,
    sendReceipt: exports.sendReceiptSchema,
    previewPdf: exports.previewPdfSchema,
};
exports.default = exports.receiptSchemas;
//# sourceMappingURL=receipt.schema.js.map