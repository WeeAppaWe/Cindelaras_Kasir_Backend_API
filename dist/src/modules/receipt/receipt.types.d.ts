export interface SendReceiptRequest {
    phone: string;
}
export interface SendReceiptResponse {
    success: boolean;
    message: string;
    receipt_url?: string;
    whatsapp_status?: boolean;
}
export interface ReceiptOrderData {
    order_id: string;
    receipt: string | null;
    customer_name: string | null;
    customer_phone: string | null;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        name: string;
    };
    order_items: Array<{
        qty: number;
        price: number;
        subtotal: number;
        menu: {
            name: string;
        };
    }>;
}
//# sourceMappingURL=receipt.types.d.ts.map