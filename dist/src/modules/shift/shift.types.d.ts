export declare enum ShiftStatus {
    ACTIVE = "ACTIVE",
    CLOSED = "CLOSED"
}
export interface ShiftFilter {
    user_id?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    is_active?: boolean | null;
}
export interface ShiftPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface StartShiftRequest {
    start_cash: number;
}
export interface EndShiftRequest {
    end_cash: number;
    notes?: string;
}
export interface ShiftListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: ShiftWithUser[];
}
export interface StartShiftResponse {
    success: boolean;
    message: string;
    shift: ShiftWithUser;
}
export interface EndShiftResponse {
    success: boolean;
    message: string;
    summary: ShiftSummary;
}
export interface ActiveShiftResponse {
    is_active: boolean;
    shift: ShiftWithUser | null;
}
export interface ShiftWithUser {
    shift_id: string;
    user_id: string;
    start_cash: number;
    end_cash: number | null;
    sold_total: number | null;
    start_time: Date;
    end_time: Date | null;
    created_at: Date;
    updated_at: Date | null;
    user: {
        user_id: string;
        name: string;
    };
    _count?: {
        orders: number;
    };
}
export interface ShiftWithDetails extends ShiftWithUser {
    orders_count: number;
    cash_sales: number;
    qris_sales: number;
}
export interface ShiftSummary {
    shift_id: string;
    user_name: string;
    start_time: Date;
    end_time: Date;
    start_cash: number;
    end_cash: number;
    sold_total: number;
    expected_cash: number;
    difference: number;
    total_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    cash_sales: number;
    qris_sales: number;
}
export interface ShiftOrderStats {
    total_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    pending_orders: number;
    cash_sales: number;
    qris_sales: number;
    total_sales: number;
}
//# sourceMappingURL=shift.types.d.ts.map