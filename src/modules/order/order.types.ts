// ============================================
// ORDER TYPES
// ============================================

// Enums
export enum PaymentType {
    CASH = 'CASH',
    QRIS = 'QRIS',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

// ============================================
// FILTERS & PAGINATION
// ============================================

export interface OrderFilter {
    search?: string | null;
    status?: string | null;
    payment_type?: string | null;
    shift_id?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

export interface OrderPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// ============================================
// REQUEST TYPES
// ============================================

export interface OrderItemInput {
    menu_id: string;
    qty: number;
    price: number;
}

export interface CreateOrderRequest {
    customer_name: string;
    customer_phone?: string;
    payment_type: PaymentType;
    items: OrderItemInput[];
}

export interface ConfirmPaymentRequest {
    paid_amount?: number; // Optional for QRIS (defaults to total)
}

// ============================================
// RESPONSE TYPES
// ============================================

export interface OrderListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: OrderWithDetails[];
}

export interface CreateOrderResponse {
    order: OrderWithDetails;
    change_amount: number;
    message: string;
}

export interface ConfirmPaymentResponse {
    success: boolean;
    message: string;
    order: OrderWithDetails;
}

export interface CancelOrderResponse {
    success: boolean;
    message: string;
}

// ============================================
// DATA MODELS
// ============================================

export interface OrderItemWithMenu {
    order_item_id: string;
    menu_id: string;
    qty: number;
    price: number;
    subtotal: number;
    menu: {
        menu_id: string;
        name: string;
        image_url: string | null;
    };
}

export interface OrderWithUser {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string | null;
    customer_phone: string | null;
    receipt: string | null;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    updated_at: Date | null;
    user: {
        user_id: string;
        name: string;
    };
    _count?: {
        order_items: number;
    };
}

export interface OrderWithDetails extends OrderWithUser {
    order_items: OrderItemWithMenu[];
    shift?: {
        shift_id: string;
        start_time: Date;
        end_time: Date | null;
    };
}

export interface OrderSummary {
    order_id: string;
    order_number: string;
    customer_name: string | null;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    items_count: number;
}

// ============================================
// SHIFT RELATED
// ============================================

export interface ActiveShift {
    shift_id: string;
    user_id: string;
    start_cash: number;
    start_time: Date;
}

// ============================================
// RECEIPT TYPES
// ============================================

export enum ReceiptFormat {
    TEXT = 'text',
    ESCPOS = 'escpos',
    PDF = 'pdf',
    IMAGE = 'image',
}

export interface ReceiptData {
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
    subtotal: number;
    total: number;
    payment_type: string;
    paid_amount: number;
    change_amount: number;
    status: string;
}

export interface ReceiptResponse {
    format: string;
    content: string;
    data: ReceiptData;
}

