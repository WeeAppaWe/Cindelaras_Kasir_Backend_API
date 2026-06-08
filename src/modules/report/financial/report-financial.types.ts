// ============================================
// FINANCIAL REPORT TYPES
// ============================================

// ============================================
// FILTER & QUERY TYPES
// ============================================

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

// ============================================
// REVENUE SUMMARY
// ============================================

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

// ============================================
// PAYMENT BREAKDOWN
// ============================================

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

// ============================================
// CASH FLOW
// ============================================

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

// ============================================
// TOP MENUS
// ============================================

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

// ============================================
// SALES BY CATEGORY
// ============================================

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

// ============================================
// FULL REPORT
// ============================================

export interface FullFinancialReportResponse {
    period: ReportPeriod;
    summary: {
        revenue: RevenueSummary;
        transaction_count: number;
        average_transaction_value: number;
    };
    payment_breakdown: {
        total_transactions: number;
        total_amount: number;
        by_payment_type: PaymentTypeDetail[];
    };
    cash_flow: {
        opening_cash: number;
        cash_in: CashInDetails;
        cash_out: CashOutDetails;
        closing_cash: number;
        expected_cash: number;
        difference: number;
    };
    top_menus: TopMenuItem[];
    sales_by_category: SalesByCategoryItem[];
}
