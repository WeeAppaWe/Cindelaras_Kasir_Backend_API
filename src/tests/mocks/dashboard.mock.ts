import { DailyOrderSummary, SalesTrendRow, TopMenuRow, StockStatus, StockStatusRow, RecentStockMovementRow } from '../../modules/dashboard/dashboard.types';

// Mock data untuk hari ini
export const mockTodaySummary: DailyOrderSummary = {
    total_revenue: 3865000,
    transaction_count: 52,
    total_cogs: 2280350,
};

// Mock data untuk kemarin
export const mockYesterdaySummary: DailyOrderSummary = {
    total_revenue: 3500000,
    transaction_count: 50,
    total_cogs: 2065000,
};

// Mock saat kemarin = 0 (misal hari pertama buka)
export const mockYesterdayZeroSummary: DailyOrderSummary = {
    total_revenue: 0,
    transaction_count: 0,
    total_cogs: 0,
};

// Mock saat tidak ada transaksi hari ini
export const mockEmptySummary: DailyOrderSummary = {
    total_revenue: 0,
    transaction_count: 0,
    total_cogs: 0,
};

// Expected calculations dari mockTodaySummary vs mockYesterdaySummary
export const expectedRevenue = {
    today: 3865000,
    yesterday: 3500000,
    change_amount: 365000,
    // (365000 / 3500000) * 100 = 10.43%
    change_percentage: 10.43,
};

export const expectedTransactions = {
    today: 52,
    yesterday: 50,
    change: 2,
};

export const expectedProfit = {
    // gross_profit = 3865000 - 2280350 = 1584650
    gross_profit: 1584650,
    total_revenue: 3865000,
    total_cogs: 2280350,
    // margin = Math.round((1584650 / 3865000) * 10000) / 100 = 41
    margin_percentage: 41,
};

export const mockLowStockCount = 3;

// ============================================
// SALES TREND MOCKS
// ============================================

/** Raw rows returned by repository for a 7-day window (some days may have no orders) */
export const mockSalesTrendRows: SalesTrendRow[] = [
    { date: '2024-06-06', revenue: 3200000, transaction_count: 47 },
    { date: '2024-06-07', revenue: 3450000, transaction_count: 51 },
    { date: '2024-06-08', revenue: 3600000, transaction_count: 55 },
    { date: '2024-06-09', revenue: 3800000, transaction_count: 62 },
    { date: '2024-06-10', revenue: 3550000, transaction_count: 58 },
    // 2024-06-11 has no orders — will be filled with zeros by service
    { date: '2024-06-12', revenue: 3100000, transaction_count: 49 },
];

/** Expected service output for the 7-day window ending 2024-06-12 */
export const expectedSalesTrendData = [
    { date: '2024-06-06', label: '06 Jun', revenue: 3200000, transaction_count: 47 },
    { date: '2024-06-07', label: '07 Jun', revenue: 3450000, transaction_count: 51 },
    { date: '2024-06-08', label: '08 Jun', revenue: 3600000, transaction_count: 55 },
    { date: '2024-06-09', label: '09 Jun', revenue: 3800000, transaction_count: 62 },
    { date: '2024-06-10', label: '10 Jun', revenue: 3550000, transaction_count: 58 },
    { date: '2024-06-11', label: '11 Jun', revenue: 0, transaction_count: 0 },
    { date: '2024-06-12', label: '12 Jun', revenue: 3100000, transaction_count: 49 },
];

// ============================================
// TOP MENUS MOCKS
// ============================================

/** Raw rows returned by repository — price & cost included for margin calculation */
export const mockTopMenuRows: TopMenuRow[] = [
    {
        menu_id: 'menu-uuid-001',
        menu_name: 'Ayam Penyet Sambal Bawang',
        category_name: 'Penyetan',
        qty_sold: 86,
        revenue: 2150000,
        price: 25000,
        cost: 14500,  // margin = round((25000-14500)/25000*100) = round(42) = 42
    },
    {
        menu_id: 'menu-uuid-002',
        menu_name: 'Lele Bakar Madu',
        category_name: 'Bebakaran',
        qty_sold: 64,
        revenue: 1536000,
        price: 24000,
        cost: 14880,  // margin = round((24000-14880)/24000*100) = round(38) = 38
    },
    {
        menu_id: 'menu-uuid-003',
        menu_name: 'Ayam Bakar Cindelaras',
        category_name: 'Bebakaran',
        qty_sold: 58,
        revenue: 1740000,
        price: 30000,
        cost: 16500,  // margin = round((30000-16500)/30000*100) = round(45) = 45
    },
    {
        menu_id: 'menu-uuid-004',
        menu_name: 'Es Teh Manis',
        category_name: 'Minuman',
        qty_sold: 112,
        revenue: 560000,
        price: 5000,
        cost: 1950,   // margin = round((5000-1950)/5000*100) = round(61) = 61
    },
    {
        menu_id: 'menu-uuid-005',
        menu_name: 'Nasi Putih',
        category_name: 'Makanan Pokok',
        qty_sold: 50,
        revenue: 250000,
        price: 5000,
        cost: 2000,   // margin = round((5000-2000)/5000*100) = round(60) = 60
    },
];

/** Expected service output — rank added, price/cost stripped, margin_percentage computed */
export const expectedTopMenuItems = [
    {
        rank: 1,
        menu_id: 'menu-uuid-001',
        menu_name: 'Ayam Penyet Sambal Bawang',
        category_name: 'Penyetan',
        qty_sold: 86,
        revenue: 2150000,
        margin_percentage: 42,
    },
    {
        rank: 2,
        menu_id: 'menu-uuid-002',
        menu_name: 'Lele Bakar Madu',
        category_name: 'Bebakaran',
        qty_sold: 64,
        revenue: 1536000,
        margin_percentage: 38,
    },
    {
        rank: 3,
        menu_id: 'menu-uuid-003',
        menu_name: 'Ayam Bakar Cindelaras',
        category_name: 'Bebakaran',
        qty_sold: 58,
        revenue: 1740000,
        margin_percentage: 45,
    },
    {
        rank: 4,
        menu_id: 'menu-uuid-004',
        menu_name: 'Es Teh Manis',
        category_name: 'Minuman',
        qty_sold: 112,
        revenue: 560000,
        margin_percentage: 61,
    },
    {
        rank: 5,
        menu_id: 'menu-uuid-005',
        menu_name: 'Nasi Putih',
        category_name: 'Makanan Pokok',
        qty_sold: 50,
        revenue: 250000,
        margin_percentage: 60,
    },
];

// ============================================
// STOCK STATUS MOCKS
// ============================================

/**
 * Raw rows from repository — 3 rows covering all 3 status categories
 * total = 5 + 3 + 2 = 10 ingredients
 */
export const mockStockStatusRows: StockStatusRow[] = [
    { status: StockStatus.AMAN,    count: 5 },
    { status: StockStatus.MENIPIS, count: 3 },
    { status: StockStatus.KRITIS,  count: 2 },
];

/**
 * Repository returns only AMAN rows (no MENIPIS or KRITIS in DB)
 * Service should fill missing statuses with count=0, percentage=0
 */
export const mockStockStatusRowsOnlyAman: StockStatusRow[] = [
    { status: StockStatus.AMAN, count: 8 },
];

/** Expected service output from mockStockStatusRows (total=10) */
export const expectedStockStatusResponse = {
    total_ingredients: 10,
    categories: [
        { status: StockStatus.AMAN,    count: 5, percentage: 50 },
        { status: StockStatus.MENIPIS, count: 3, percentage: 30 },
        { status: StockStatus.KRITIS,  count: 2, percentage: 20 },
    ],
};

/** Expected output when no ingredients at all (empty DB) */
export const expectedStockStatusEmpty = {
    total_ingredients: 0,
    categories: [
        { status: StockStatus.AMAN,    count: 0, percentage: 0 },
        { status: StockStatus.MENIPIS, count: 0, percentage: 0 },
        { status: StockStatus.KRITIS,  count: 0, percentage: 0 },
    ],
};

// ============================================
// RECENT STOCK MOVEMENTS MOCKS
// ============================================

/** Raw rows returned by repository (10 mutasi terbaru) */
export const mockRecentStockMovementRows: RecentStockMovementRow[] = [
    {
        stock_movement_id: 'sm-uuid-001',
        created_at: new Date('2024-06-15T08:30:00.000Z'),
        ingredient_name: 'Tepung Terigu',
        stock_type_name: 'IN_PURCHASE',
        qty: 50,
        current_stock: 150,
    },
    {
        stock_movement_id: 'sm-uuid-002',
        created_at: new Date('2024-06-15T07:45:00.000Z'),
        ingredient_name: 'Bawang Merah',
        stock_type_name: 'OUT_SALES',
        qty: -2,
        current_stock: 48,
    },
    {
        stock_movement_id: 'sm-uuid-003',
        created_at: new Date('2024-06-15T07:30:00.000Z'),
        ingredient_name: 'Minyak Goreng',
        stock_type_name: 'OUT_PRODUCTION',
        qty: -5,
        current_stock: 20,
    },
    {
        stock_movement_id: 'sm-uuid-004',
        created_at: new Date('2024-06-14T16:00:00.000Z'),
        ingredient_name: 'Gula Pasir',
        stock_type_name: 'ADJUSTMENT',
        qty: 3,
        current_stock: 33,
    },
    {
        stock_movement_id: 'sm-uuid-005',
        created_at: new Date('2024-06-14T12:00:00.000Z'),
        ingredient_name: 'Garam',
        stock_type_name: 'IN_PURCHASE',
        qty: 10,
        current_stock: 25,
    },
];

/** Expected service output (direct mapping — no transformation in service) */
export const expectedRecentStockMovementsResponse = {
    total_items: 5,
    items: mockRecentStockMovementRows.map((row) => ({
        stock_movement_id: row.stock_movement_id,
        created_at: row.created_at,
        ingredient_name: row.ingredient_name,
        stock_type_name: row.stock_type_name,
        qty: row.qty,
        current_stock: row.current_stock,
    })),
};
