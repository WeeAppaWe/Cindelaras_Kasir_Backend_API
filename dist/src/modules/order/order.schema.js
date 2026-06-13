"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptQuerySchema = exports.ReceiptFormat = exports.orderListQuerySchema = exports.orderIdParamSchema = exports.confirmPaymentSchema = exports.createOrderSchema = exports.orderItemSchema = exports.OrderType = exports.OrderStatus = exports.PaymentType = void 0;
const zod_1 = require("zod");
// ============================================
// ENUMS
// ============================================
exports.PaymentType = {
    CASH: 'CASH',
    QRIS: 'QRIS',
};
exports.OrderStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
};
exports.OrderType = {
    DINE_IN: 'DINE_IN',
    TAKE_AWAY: 'TAKE_AWAY',
};
// ============================================
// ORDER ITEM SCHEMA
// ============================================
exports.orderItemSchema = zod_1.z.object({
    menu_id: zod_1.z.string().uuid({ message: 'Format menu ID tidak valid' }),
    qty: zod_1.z.number().int().min(1, { message: 'Quantity minimal 1' }),
    price: zod_1.z.number().min(0, { message: 'Harga tidak boleh negatif' }),
});
// ============================================
// CREATE ORDER SCHEMA (Checkout)
// ============================================
exports.createOrderSchema = zod_1.z.object({
    customer_name: zod_1.z.string()
        .min(1, { message: 'Nama pelanggan wajib diisi' })
        .max(50, { message: 'Nama pelanggan maksimal 50 karakter' }),
    customer_phone: zod_1.z.string()
        .max(20, { message: 'Nomor telepon maksimal 20 karakter' })
        .regex(/^[0-9+\-\s]*$/, { message: 'Format nomor telepon tidak valid' })
        .optional(),
    payment_type: zod_1.z.enum([exports.PaymentType.CASH, exports.PaymentType.QRIS], {
        message: 'Tipe pembayaran harus CASH atau QRIS',
    }),
    order_type: zod_1.z.enum([exports.OrderType.DINE_IN, exports.OrderType.TAKE_AWAY], {
        message: 'Tipe pesanan harus DINE_IN atau TAKE_AWAY',
    }).default(exports.OrderType.DINE_IN),
    items: zod_1.z.array(exports.orderItemSchema)
        .min(1, { message: 'Minimal 1 item dalam pesanan' }),
});
// ============================================
// CONFIRM PAYMENT SCHEMA (for QRIS)
// ============================================
exports.confirmPaymentSchema = zod_1.z.object({
    paid_amount: zod_1.z.number()
        .min(0, { message: 'Jumlah bayar tidak boleh negatif' })
        .optional(),
});
// ============================================
// PARAM SCHEMAS
// ============================================
exports.orderIdParamSchema = zod_1.z.object({
    order_id: zod_1.z.string().uuid({ message: 'Format order ID tidak valid' }),
});
// ============================================
// LIST QUERY SCHEMA
// ============================================
exports.orderListQuerySchema = zod_1.z.object({
    batch: zod_1.z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(zod_1.z.number().min(1))
        .optional(),
    size: zod_1.z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(zod_1.z.number().min(1).max(100))
        .optional(),
    search: zod_1.z.string().optional(),
    status: zod_1.z.enum([exports.OrderStatus.PENDING, exports.OrderStatus.COMPLETED, exports.OrderStatus.CANCELLED]).optional(),
    payment_type: zod_1.z.enum([exports.PaymentType.CASH, exports.PaymentType.QRIS]).optional(),
    order_type: zod_1.z.enum([exports.OrderType.DINE_IN, exports.OrderType.TAKE_AWAY]).optional(),
    shift_id: zod_1.z.string().uuid({ message: 'Format shift ID tidak valid' }).optional(),
    start_date: zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    end_date: zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
});
// ============================================
// RECEIPT SCHEMA
// ============================================
exports.ReceiptFormat = {
    TEXT: 'text',
    ESCPOS: 'escpos',
    PDF: 'pdf',
    IMAGE: 'image',
};
exports.receiptQuerySchema = zod_1.z.object({
    format: zod_1.z.enum([exports.ReceiptFormat.TEXT, exports.ReceiptFormat.ESCPOS, exports.ReceiptFormat.PDF, exports.ReceiptFormat.IMAGE])
        .default(exports.ReceiptFormat.TEXT),
});
//# sourceMappingURL=order.schema.js.map