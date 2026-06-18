import { z } from 'zod';
/**
 * Order ID param schema
 */
export declare const orderIdParamSchema: z.ZodObject<{
    order_id: z.ZodString;
}, z.core.$strip>;
/**
 * Send receipt request schema
 */
export declare const sendReceiptSchema: z.ZodObject<{
    phone: z.ZodString;
}, z.core.$strip>;
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type SendReceiptInput = z.infer<typeof sendReceiptSchema>;
/**
 * Preview PDF request schema
 */
export declare const previewPdfSchema: z.ZodObject<{
    store_name: z.ZodDefault<z.ZodString>;
    store_address: z.ZodDefault<z.ZodString>;
    store_phone: z.ZodDefault<z.ZodString>;
    store_logo: z.ZodDefault<z.ZodString>;
    receipt_header: z.ZodDefault<z.ZodString>;
    receipt_footer: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export type PreviewPdfInput = z.infer<typeof previewPdfSchema>;
export declare const receiptSchemas: {
    orderIdParam: z.ZodObject<{
        order_id: z.ZodString;
    }, z.core.$strip>;
    sendReceipt: z.ZodObject<{
        phone: z.ZodString;
    }, z.core.$strip>;
    previewPdf: z.ZodObject<{
        store_name: z.ZodDefault<z.ZodString>;
        store_address: z.ZodDefault<z.ZodString>;
        store_phone: z.ZodDefault<z.ZodString>;
        store_logo: z.ZodDefault<z.ZodString>;
        receipt_header: z.ZodDefault<z.ZodString>;
        receipt_footer: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
};
export default receiptSchemas;
//# sourceMappingURL=receipt.schema.d.ts.map