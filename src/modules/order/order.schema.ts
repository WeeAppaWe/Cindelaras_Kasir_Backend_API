import { z } from 'zod';

// ============================================
// ENUMS
// ============================================

export const PaymentType = {
    CASH: 'CASH',
    QRIS: 'QRIS',
} as const;

export const OrderStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export const OrderType = {
    DINE_IN: 'DINE_IN',
    TAKE_AWAY: 'TAKE_AWAY',
} as const;

// ============================================
// ORDER ITEM SCHEMA
// ============================================

export const orderItemSchema = z.object({
    menu_id: z.string().uuid({ message: 'Format menu ID tidak valid' }),
    qty: z.number().int().min(1, { message: 'Quantity minimal 1' }),
    price: z.number().min(0, { message: 'Harga tidak boleh negatif' }),
});

// ============================================
// CREATE ORDER SCHEMA (Checkout)
// ============================================

export const createOrderSchema = z.object({
    customer_name: z.string()
        .min(1, { message: 'Nama pelanggan wajib diisi' })
        .max(50, { message: 'Nama pelanggan maksimal 50 karakter' }),
    customer_phone: z.string()
        .max(20, { message: 'Nomor telepon maksimal 20 karakter' })
        .regex(/^[0-9+\-\s]*$/, { message: 'Format nomor telepon tidak valid' })
        .optional(),
    payment_type: z.enum([PaymentType.CASH, PaymentType.QRIS], {
        message: 'Tipe pembayaran harus CASH atau QRIS',
    }),
    order_type: z.enum([OrderType.DINE_IN, OrderType.TAKE_AWAY], {
        message: 'Tipe pesanan harus DINE_IN atau TAKE_AWAY',
    }).default(OrderType.DINE_IN),
    items: z.array(orderItemSchema)
        .min(1, { message: 'Minimal 1 item dalam pesanan' }),
});

// ============================================
// CONFIRM PAYMENT SCHEMA (for QRIS)
// ============================================

export const confirmPaymentSchema = z.object({
    paid_amount: z.number()
        .min(0, { message: 'Jumlah bayar tidak boleh negatif' })
        .optional(),
});

// ============================================
// PARAM SCHEMAS
// ============================================

export const orderIdParamSchema = z.object({
    order_id: z.string().uuid({ message: 'Format order ID tidak valid' }),
});

// ============================================
// LIST QUERY SCHEMA
// ============================================

export const orderListQuerySchema = z.object({
    batch: z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().min(1))
        .optional(),
    size: z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().min(1).max(100))
        .optional(),
    search: z.string().optional(),
    status: z.enum([OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELLED]).optional(),
    payment_type: z.enum([PaymentType.CASH, PaymentType.QRIS]).optional(),
    order_type: z.enum([OrderType.DINE_IN, OrderType.TAKE_AWAY]).optional(),
    shift_id: z.string().uuid({ message: 'Format shift ID tidak valid' }).optional(),
    start_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    end_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
});

// ============================================
// RECEIPT SCHEMA
// ============================================

export const ReceiptFormat = {
    TEXT: 'text',
    ESCPOS: 'escpos',
    PDF: 'pdf',
    IMAGE: 'image',
} as const;

export const receiptQuerySchema = z.object({
    format: z.enum([ReceiptFormat.TEXT, ReceiptFormat.ESCPOS, ReceiptFormat.PDF, ReceiptFormat.IMAGE])
        .default(ReceiptFormat.TEXT),
});

// ============================================
// EXPORT TYPES
// ============================================

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
export type ReceiptQuery = z.infer<typeof receiptQuerySchema>;

