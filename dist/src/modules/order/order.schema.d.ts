import { z } from 'zod';
export declare const PaymentType: {
    readonly CASH: "CASH";
    readonly QRIS: "QRIS";
};
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export declare const orderItemSchema: z.ZodObject<{
    menu_id: z.ZodString;
    qty: z.ZodNumber;
    price: z.ZodNumber;
}, z.core.$strip>;
export declare const createOrderSchema: z.ZodObject<{
    customer_name: z.ZodString;
    customer_phone: z.ZodOptional<z.ZodString>;
    payment_type: z.ZodEnum<{
        CASH: "CASH";
        QRIS: "QRIS";
    }>;
    items: z.ZodArray<z.ZodObject<{
        menu_id: z.ZodString;
        qty: z.ZodNumber;
        price: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const confirmPaymentSchema: z.ZodObject<{
    paid_amount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const orderIdParamSchema: z.ZodObject<{
    order_id: z.ZodString;
}, z.core.$strip>;
export declare const orderListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    size: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        PENDING: "PENDING";
    }>>;
    payment_type: z.ZodOptional<z.ZodEnum<{
        CASH: "CASH";
        QRIS: "QRIS";
    }>>;
    shift_id: z.ZodOptional<z.ZodString>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ReceiptFormat: {
    readonly TEXT: "text";
    readonly ESCPOS: "escpos";
    readonly PDF: "pdf";
    readonly IMAGE: "image";
};
export declare const receiptQuerySchema: z.ZodObject<{
    format: z.ZodDefault<z.ZodEnum<{
        text: "text";
        escpos: "escpos";
        pdf: "pdf";
        image: "image";
    }>>;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
export type OrderIdParam = z.infer<typeof orderIdParamSchema>;
export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
export type ReceiptQuery = z.infer<typeof receiptQuerySchema>;
//# sourceMappingURL=order.schema.d.ts.map