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
export interface RevenueSummary {
    total_sales: number;
    total_cogs: number;
    gross_profit: number;
    margin_percentage: number;
}
export interface SummaryResponse {
    period: ReportPeriod;
    revenue: RevenueSummary;
    transaction_count: number;
    average_transaction_value: number;
}
export interface PaymentTypeDetail {
    payment_type: string;
    transaction_count: number;
    total_amount: number;
    percentage: number;
}
export interface PaymentBreakdownResponse {
    period: ReportPeriod;
    total_transactions: number;
    total_amount: number;
    by_payment_type: PaymentTypeDetail[];
}
export interface CashInDetails {
    from_sales: number;
    adjustments: number;
    total: number;
}
export interface CashOutDetails {
    adjustments: number;
    total: number;
}
export interface CashFlowResponse {
    period: ReportPeriod;
    opening_cash: number;
    cash_in: CashInDetails;
    cash_out: CashOutDetails;
    closing_cash: number;
    expected_cash: number;
    difference: number;
}
export interface TopMenuItem {
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
    percentage_of_total: number;
}
export interface TopMenusResponse {
    period: ReportPeriod;
    total_revenue: number;
    top_menus: TopMenuItem[];
}
export interface SalesByCategoryItem {
    category_id: string;
    category_name: string;
    qty_sold: number;
    revenue: number;
    percentage: number;
}
export interface SalesByCategoryResponse {
    period: ReportPeriod;
    total_revenue: number;
    by_category: SalesByCategoryItem[];
}
export interface DailyFinancialItem {
    date: string;
    transaction_count: number;
    total_revenue: number;
    total_cogs: number;
    gross_profit: number;
    expenses: number;
    net_profit: number;
}
export interface FullFinancialReportResponse {
    period: ReportPeriod;
    total_days: number;
    items: DailyFinancialItem[];
}
//# sourceMappingURL=report-financial.types.d.ts.map