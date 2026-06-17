import { AuthenticatedRequest } from '../../../types';
import { DashboardKPIResponse, DashboardSalesTrendResponse, DashboardTopMenusResponse, DashboardStockStatusResponse, DashboardRecentStockMovementsResponse } from './dashboard.types';
/**
 * Get 4 KPI cards for the dashboard
 */
export declare const getKPI: (req: AuthenticatedRequest) => Promise<DashboardKPIResponse>;
/**
 * Get daily sales trend (revenue + transaction count) for the last N days
 * Days without orders are included as zero-value data points
 */
export declare const getSalesTrend: (req: AuthenticatedRequest) => Promise<DashboardSalesTrendResponse>;
/**
 * Get top 5 best-selling menus for all-time
 * Ordered by qty_sold descending — ties broken by revenue descending (handled by DB)
 */
export declare const getTopMenus: (_req: AuthenticatedRequest) => Promise<DashboardTopMenusResponse>;
/**
 * Get stock status distribution for radial chart
 * Categories: AMAN (>=min_stock), MENIPIS (>0 & <min_stock), KRITIS (<=0)
 * Percentage rounded to 2 decimal places; 0 total returns 0% for all categories
 */
export declare const getStockStatus: () => Promise<DashboardStockStatusResponse>;
/**
 * Get 10 most recent stock movements for dashboard activity table
 * Returns: created_at, ingredient_name, stock_type_name, qty, current_stock
 * Ordered by created_at descending (latest first)
 */
export declare const getRecentStockMovements: () => Promise<DashboardRecentStockMovementsResponse>;
export declare const dashboardService: {
    getKPI: (req: AuthenticatedRequest) => Promise<DashboardKPIResponse>;
    getSalesTrend: (req: AuthenticatedRequest) => Promise<DashboardSalesTrendResponse>;
    getTopMenus: (_req: AuthenticatedRequest) => Promise<DashboardTopMenusResponse>;
    getStockStatus: () => Promise<DashboardStockStatusResponse>;
    getRecentStockMovements: () => Promise<DashboardRecentStockMovementsResponse>;
};
export default dashboardService;
//# sourceMappingURL=dashboard.service.d.ts.map