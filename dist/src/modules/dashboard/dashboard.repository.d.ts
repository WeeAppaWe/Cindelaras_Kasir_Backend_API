import { DailyOrderSummary, SalesTrendRow, TopMenuRow, StockStatusRow, RecentStockMovementRow } from './dashboard.types';
/**
 * Get completed orders for a given day — returns revenue, transaction count, and COGS
 * COGS dihitung dari menu.cost × qty (bukan recipe avg_cost) agar konsisten dengan report financial
 */
export declare const getDailyOrderSummary: (dateStr: string) => Promise<DailyOrderSummary>;
/**
 * Count ingredients with stock_qty < min_stock (low stock atau habis)
 */
export declare const getLowStockCount: () => Promise<number>;
/**
 * Get daily revenue and transaction count for a date range (sales trend chart)
 * Returns one row per day — days without orders are NOT included (handled in service)
 */
export declare const getSalesTrend: (startDate: string, endDate: string) => Promise<SalesTrendRow[]>;
/**
 * Get top 5 menus by qty_sold for a given day
 * Returns menu_id, name, category, qty_sold, revenue, price, cost
 * price and cost are passed through so service can compute margin_percentage
 */
export declare const getTopMenus: (dateStr: string) => Promise<TopMenuRow[]>;
/**
 * Get stock status counts grouped by AMAN / MENIPIS / KRITIS
 *
 * Threshold:
 *   KRITIS  — stock_qty <= 0
 *   MENIPIS — stock_qty > 0 AND stock_qty < min_stock
 *   AMAN    — stock_qty >= min_stock
 *
 * Uses a single aggregation query — no per-row loop in application code
 */
export declare const getStockStatusCounts: () => Promise<StockStatusRow[]>;
/**
 * Get 10 most recent stock movements
 * Returns created_at, ingredient name, stock type name, qty, current_stock
 * Ordered by created_at descending (latest first)
 */
export declare const getRecentStockMovements: () => Promise<RecentStockMovementRow[]>;
export declare const dashboardRepository: {
    getDailyOrderSummary: (dateStr: string) => Promise<DailyOrderSummary>;
    getLowStockCount: () => Promise<number>;
    getSalesTrend: (startDate: string, endDate: string) => Promise<SalesTrendRow[]>;
    getTopMenus: (dateStr: string) => Promise<TopMenuRow[]>;
    getStockStatusCounts: () => Promise<StockStatusRow[]>;
    getRecentStockMovements: () => Promise<RecentStockMovementRow[]>;
};
export default dashboardRepository;
//# sourceMappingURL=dashboard.repository.d.ts.map