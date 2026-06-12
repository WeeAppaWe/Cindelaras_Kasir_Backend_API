// Dashboard module types

// ============================================
// KPI TYPES
// ============================================

/**
 * KPI: Omset Hari Ini
 */
export interface RevenueKPI {
    today: number;
    yesterday: number;
    change_amount: number;
    change_percentage: number | null; // null jika kemarin = 0
}

/**
 * KPI: Total Transaksi Hari Ini
 */
export interface TransactionKPI {
    today: number;
    yesterday: number;
    change: number; // selisih jumlah transaksi vs kemarin
}

/**
 * KPI: Estimasi Profit
 * Gross profit = revenue - COGS (menu.cost × qty)
 */
export interface ProfitKPI {
    gross_profit: number;
    total_revenue: number;
    total_cogs: number;
    margin_percentage: number; // persen margin kotor
}

/**
 * KPI: Stok Menipis
 */
export interface LowStockKPI {
    count: number; // jumlah bahan dengan stock_qty < min_stock (termasuk habis)
}

// ============================================
// SALES TREND TYPES
// ============================================

/** Satu titik data harian pada tren penjualan */
export interface SalesTrendDataPoint {
    date: string;              // YYYY-MM-DD
    label: string;             // label pendek untuk sumbu X, misal "06 Jun"
    revenue: number;           // total omset order COMPLETED
    transaction_count: number; // jumlah order COMPLETED
}

/** Response untuk endpoint GET /dashboard/sales-trend */
export interface DashboardSalesTrendResponse {
    period_days: number;  // 7 | 14 | 30
    start_date: string;   // YYYY-MM-DD
    end_date: string;     // YYYY-MM-DD
    data: SalesTrendDataPoint[];
}

// ============================================
// TOP MENU TYPES
// ============================================

/** Satu baris menu terlaris */
export interface TopMenuItem {
    rank: number;          // urutan 1–5
    menu_id: string;
    menu_name: string;
    category_name: string;
    qty_sold: number;      // total porsi terjual
    revenue: number;       // total omset menu ini (price × qty)
    margin_percentage: number; // (1 - cost/price) × 100, dibulatkan 2 desimal
}

/** Response untuk endpoint GET /dashboard/top-menus */
export interface DashboardTopMenusResponse {
    date: string;         // YYYY-MM-DD
    total_items: number;  // jumlah item yang dikembalikan (max 5)
    items: TopMenuItem[];
}

// ============================================
// RESPONSE TYPES
// ============================================

/**
 * Response untuk endpoint GET /dashboard/kpi
 */
export interface DashboardKPIResponse {
    date: string;       // tanggal hari ini (YYYY-MM-DD)
    revenue: RevenueKPI;
    transactions: TransactionKPI;
    profit: ProfitKPI;
    low_stock: LowStockKPI;
}

// ============================================
// INTERNAL REPOSITORY RETURN TYPES
// ============================================

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
    price: number; // harga jual — untuk menghitung margin di service
    cost: number;  // HPP — untuk menghitung margin di service
}

// ============================================
// STOCK STATUS TYPES
// ============================================

/** Enum status persediaan bahan */
export enum StockStatus {
    AMAN = 'AMAN',       // stock_qty >= min_stock
    MENIPIS = 'MENIPIS', // 0 < stock_qty < min_stock
    KRITIS = 'KRITIS',   // stock_qty <= 0
}

/** Satu kategori status pada radial chart */
export interface StockStatusCategory {
    status: StockStatus;
    count: number;           // jumlah bahan dalam kategori ini
    percentage: number;      // persen terhadap total (dibulatkan 2 desimal)
}

/** Response untuk endpoint GET /dashboard/stock-status */
export interface DashboardStockStatusResponse {
    total_ingredients: number;
    categories: StockStatusCategory[]; // selalu 3 item: AMAN, MENIPIS, KRITIS
}

/** Row yang dikembalikan oleh query stock status dari repository */
export interface StockStatusRow {
    status: StockStatus;
    count: number;
}

// ============================================
// RECENT STOCK MOVEMENTS TYPES
// ============================================

/** Satu baris mutasi stok terbaru */
export interface RecentStockMovementItem {
    stock_movement_id: string;
    created_at: Date;            // waktu mutasi — FE format sesuai kebutuhan
    ingredient_name: string;     // nama bahan
    stock_type_name: string;     // tipe mutasi, misal IN_PURCHASE, OUT_SALES
    qty: number;                 // jumlah yang bergerak (positif = masuk, negatif = keluar)
    current_stock: number;       // saldo stok setelah mutasi ini
}

/** Response untuk endpoint GET /dashboard/recent-stock-movements */
export interface DashboardRecentStockMovementsResponse {
    total_items: number;                   // jumlah item yang dikembalikan (max 10)
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
