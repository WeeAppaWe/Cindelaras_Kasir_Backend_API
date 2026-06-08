// Receipt types for receipt generation utility

/**
 * Data yang diperlukan untuk generate receipt
 */
export interface ReceiptDataForGenerator {
    store_name: string;
    store_address: string;
    store_phone?: string;
    store_logo?: string;
    receipt_header?: string;
    receipt_footer?: string;
    order_id: string;
    receipt: string | null;
    order_date: string;
    order_time: string;
    cashier_name: string;
    customer_name: string | null;
    customer_phone: string | null;
    items: Array<{
        name: string;
        qty: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    payment_type: string;
    paid_amount: number;
    change_amount: number;
}
