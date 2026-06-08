export interface ReportFilter {
    start_date: string;
    end_date: string;
    shift_id?: string | null;
    user_id?: string | null;
}
export interface ReportPeriod {
    start_date: string;
    end_date: string;
}
export interface CashierPerformanceItem {
    user_id: string;
    name: string;
    total_shifts: number;
    total_transactions: number;
    total_sales: number;
    average_per_transaction: number;
    cancelled_orders: number;
    cancellation_rate: number;
}
export interface CashierPerformanceResponse {
    period: ReportPeriod;
    total_cashiers: number;
    cashiers: CashierPerformanceItem[];
}
export interface ShiftSummaryItem {
    shift_id: string;
    user: {
        user_id: string;
        name: string;
    };
    date: string;
    start_time: string;
    end_time: string | null;
    duration_minutes: number | null;
    start_cash: number;
    end_cash: number | null;
    sold_total: number | null;
    cash_difference: number | null;
    transaction_count: number;
    status: 'ACTIVE' | 'CLOSED';
}
export interface ShiftSummaryResponse {
    period: ReportPeriod;
    total_shifts: number;
    active_shifts: number;
    closed_shifts: number;
    shifts: ShiftSummaryItem[];
}
export interface HourlyStats {
    date: string;
    hour: number;
    transaction_count: number;
    total_sales: number;
}
export interface DailyStats {
    date: string;
    day_name: string;
    transaction_count: number;
    total_sales: number;
}
export interface TransactionStatsResponse {
    period: ReportPeriod;
    total_transactions: number;
    total_sales: number;
    average_per_transaction: number;
    peak_hour: number;
    busiest_day: string;
    hourly_breakdown: HourlyStats[];
    daily_breakdown: DailyStats[];
}
export interface MenuPerformanceItem {
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
    cost: number;
    profit: number;
    margin_percentage: number;
}
export interface MenuPerformanceResponse {
    period: ReportPeriod;
    total_menus_sold: number;
    total_revenue: number;
    total_profit: number;
    menus: MenuPerformanceItem[];
}
export interface OrderStatusSummary {
    status: string;
    count: number;
    percentage: number;
}
export interface OrderItem {
    order_id: string;
    order_number: string;
    date: string;
    time: string;
    user: {
        user_id: string;
        name: string;
    };
    total_amount: number;
    payment_method: string;
    status: string;
}
export interface OrderStatusResponse {
    period: ReportPeriod;
    total_orders: number;
    summary: OrderStatusSummary[];
    orders: OrderItem[];
}
export interface FullOperationalReportResponse {
    period: ReportPeriod;
    cashier_summary: {
        total_cashiers: number;
        top_performer: CashierPerformanceItem | null;
    };
    shift_summary: {
        total_shifts: number;
        active_shifts: number;
        closed_shifts: number;
    };
    transaction_stats: {
        total_transactions: number;
        total_sales: number;
        average_per_transaction: number;
        peak_hour: number;
        busiest_day: string;
    };
    order_status: OrderStatusSummary[];
    top_menus: MenuPerformanceItem[];
}
//# sourceMappingURL=report-operational.types.d.ts.map