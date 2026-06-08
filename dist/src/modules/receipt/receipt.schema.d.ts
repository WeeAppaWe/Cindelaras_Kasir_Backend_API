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
export declare const receiptSchemas: {
    orderIdParam: z.ZodObject<{
        order_id: z.ZodString;
    }, z.core.$strip>;
    sendReceipt: z.ZodObject<{
        phone: z.ZodString;
    }, z.core.$strip>;
};
export default receiptSchemas;
//# sourceMappingURL=receipt.schema.d.ts.map