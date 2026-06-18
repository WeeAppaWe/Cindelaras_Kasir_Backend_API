import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Order ID param schema
 */
export const orderIdParamSchema = z.object({
  order_id: z.string().uuid('Format order_id tidak valid'),
});

/**
 * Send receipt request schema
 */
export const sendReceiptSchema = z.object({
  phone: z
    .string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit')
    .regex(/^[0-9+]+$/, 'Nomor telepon hanya boleh angka'),
});

// Infer types from schemas
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type SendReceiptInput = z.infer<typeof sendReceiptSchema>;

/**
 * Preview PDF request schema
 */
export const previewPdfSchema = z.object({
  store_name: z.string().default(''),
  store_address: z.string().default(''),
  store_phone: z.string().default(''),
  store_logo: z.string().default(''),
  receipt_header: z.string().default(''),
  receipt_footer: z.string().default(''),
});

export type PreviewPdfInput = z.infer<typeof previewPdfSchema>;

// Export schemas
export const receiptSchemas = {
  orderIdParam: orderIdParamSchema,
  sendReceipt: sendReceiptSchema,
  previewPdf: previewPdfSchema,
};

export default receiptSchemas;
