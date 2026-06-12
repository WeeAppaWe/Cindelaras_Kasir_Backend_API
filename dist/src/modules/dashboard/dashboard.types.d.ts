/**
 * KPI: Omset Hari Ini
 */
export interface RevenueKPI {
    today: number;
    yesterday: number;
    change_amount: number;
    change_percentage: number | null;
}
/**
 * KPI: Total Transaksi Hari Ini
 */
export interface TransactionKPI {
    today: number;
    yesterday: number;
    change: number;
}
/**
 * KPI: Estimasi Profit
 * Gross profit = revenue - COGS (menu.cost × qty)
 */
export interface ProfitKPI {
    gross_profit: number;
    total_revenue: number;
    total_cogs: number;
    margin_percentage: number;
}
/**
 * KPI: Stok Menipis
 */
export interface LowStockKPI {
    count: number;
}
/** Satu titik data harian pada tren penjualan */
export interface SalesTrendDataPoint {
    date: string;
    label: string;
    revenue: number;
    transaction_count: number;
}
/** Response untuk endpoint GET /dashboard/sales-trend */
export interface DashboardSalesTrendResponse {
    period_days: number;
    start_date: string;
    end_date: string;
    data: SalesTrendDataPoint[];
}
/** Satu baris menu terlaris */
export interface TopMenuItem {
    rank: number;
    menu_id: string;
    menu_name: string;
    category_name: string;
    qty_sold: number;
    revenue: number;
    margin_percentage: number;
}
/** Response untuk endpoint GET /dashboard/top-menus */
export interface DashboardTopMenusResponse {
    date: string;
    total_items: number;
    items: TopMenuItem[];
}
/**
 * Response untuk endpoint GET /dashboard/kpi
 */
export interface DashboardKPIResponse {
    date: string;
    revenue: RevenueKPI;
    transactions: TransactionKPI;
    profit: ProfitKPI;
    low_stock: LowStockKPI;
}
export interface DailyOrderSummary {
    total_revenue: number;
    transaction_count: number;
    total_cogs: number;
}
/** Row yang dikembalikan oleh query tren penjualan */
export interface SalesTrendRow {
    date: string;
    revenue: number;
    transaction_count: number;
}
/** Row yang dikembalikan oleh query top menus */
export interface TopMenuRow {
    menu_id: string;
    menu_name: string;
    category_name: string;
    qty_sold: number;
    revenue: number;
    price: number;
    cost: number;
}
/** Enum status persediaan bahan */
export declare enum StockStatus {
    AMAN = "AMAN",// stock_qty >= min_stock
    MENIPIS = "MENIPIS",// 0 < stock_qty < min_stock
    KRITIS = "KRITIS"
}
/** Satu kategori status pada radial chart */
export interface StockStatusCategory {
    status: StockStatus;
    count: number;
    percentage: number;
}
/** Response untuk endpoint GET /dashboard/stock-status */
export interface DashboardStockStatusResponse {
    total_ingredients: number;
    categories: StockStatusCategory[];
}
/** Row yang dikembalikan oleh query stock status dari repository */
export interface StockStatusRow {
    status: StockStatus;
    count: number;
}
/** Satu baris mutasi stok terbaru */
export interface RecentStockMovementItem {
    stock_movement_id: string;
    created_at: Date;
    ingredient_name: string;
    stock_type_name: string;
    qty: number;
    current_stock: number;
}
/** Response untuk endpoint GET /dashboard/recent-stock-movements */
export interface DashboardRecentStockMovementsResponse {
    total_items: number;
    items: RecentStockMovementItem[];
}
/** Row yang dikembalikan oleh repository sebelum di-map */
export interface RecentStockMovementRow {
    stock_movement_id: string;
    created_at: Date;
    ingredient_name: string;
    stock_type_name: string;
    qty: number;
    current_stock: number;
}
//# sourceMappingURL=dashboard.types.d.ts.map