import { AuthenticatedRequest } from '../../../types';
import dashboardRepository from './dashboard.repository';
import {
    DashboardKPIResponse,
    DashboardSalesTrendResponse,
    DashboardTopMenusResponse,
    DashboardStockStatusResponse,
    DashboardRecentStockMovementsResponse,
    RevenueKPI,
    TransactionKPI,
    ProfitKPI,
    LowStockKPI,
    SalesTrendDataPoint,
    TopMenuItem,
    StockStatus,
    StockStatusCategory,
    RecentStockMovementItem,
} from './dashboard.types';
import { SALES_TREND_PERIODS } from './dashboard.schema';

// ============================================
// HELPERS
// ============================================

/**
 * Get today's date string (YYYY-MM-DD) in local time
 */
const getTodayDateStr = (): string => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Get yesterday's date string from a given date string (YYYY-MM-DD)
 */
const getYesterdayDateStr = (dateStr: string): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Get start date string N days before a given date (YYYY-MM-DD)
 */
const getStartDateStr = (endDateStr: string, days: number): string => {
    const date = new Date(endDateStr);
    date.setDate(date.getDate() - (days - 1));
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

/**
 * Format date string (YYYY-MM-DD) to short label "DD Mon", e.g. "06 Jun"
 */
const formatDateLabel = (dateStr: string): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const [, mm, dd] = dateStr.split('-');
    return `${dd} ${months[parseInt(mm, 10) - 1]}`;
};

/**
 * Generate all date strings in a range [startDate, endDate] inclusive (YYYY-MM-DD)
 */
const generateDateRange = (startDateStr: string, endDateStr: string): string[] => {
    const dates: string[] = [];
    const current = new Date(startDateStr);
    const end = new Date(endDateStr);

    while (current <= end) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        dates.push(`${yyyy}-${mm}-${dd}`);
        current.setDate(current.getDate() + 1);
    }

    return dates;
};

/**
 * Calculate percentage change — returns null if yesterday value is 0
 */
const calcChangePercentage = (today: number, yesterday: number): number | null => {
    if (yesterday === 0) return null;
    return Math.round(((today - yesterday) / yesterday) * 10000) / 100;
};

/**
 * Calculate menu margin percentage from price and cost
 * margin = (price - cost) / price * 100, rounded to nearest integer
 * Returns 0 if price is 0 (guard against division by zero)
 */
const calcMenuMargin = (price: number, cost: number): number => {
    if (price === 0) return 0;
    return Math.round(((price - cost) / price) * 100);
};

// ============================================
// SERVICES
// ============================================

/**
 * Get 4 KPI cards for the dashboard
 */
export const getKPI = async (req: AuthenticatedRequest): Promise<DashboardKPIResponse> => {
    try {
        const targetDate = (req.query.date as string) || getTodayDateStr();
        const yesterdayDate = getYesterdayDateStr(targetDate);

        // Fetch today + yesterday in parallel, and low stock count
        const [todaySummary, yesterdaySummary, lowStockCount] = await Promise.all([
            dashboardRepository.getDailyOrderSummary(targetDate),
            dashboardRepository.getDailyOrderSummary(yesterdayDate),
            dashboardRepository.getLowStockCount(),
        ]);

        // KPI 1 — Omset Hari Ini
        const revenue: RevenueKPI = {
            today: todaySummary.total_revenue,
            yesterday: yesterdaySummary.total_revenue,
            change_amount: todaySummary.total_revenue - yesterdaySummary.total_revenue,
            change_percentage: calcChangePercentage(
                todaySummary.total_revenue,
                yesterdaySummary.total_revenue
            ),
        };

        // KPI 2 — Total Transaksi
        const transactions: TransactionKPI = {
            today: todaySummary.transaction_count,
            yesterday: yesterdaySummary.transaction_count,
            change: todaySummary.transaction_count - yesterdaySummary.transaction_count,
        };

        // KPI 3 — Estimasi Profit
        const grossProfit = todaySummary.total_revenue - todaySummary.total_cogs;
        const marginPercentage =
            todaySummary.total_revenue > 0
                ? Math.round((grossProfit / todaySummary.total_revenue) * 10000) / 100
                : 0;

        const profit: ProfitKPI = {
            gross_profit: grossProfit,
            total_revenue: todaySummary.total_revenue,
            total_cogs: todaySummary.total_cogs,
            margin_percentage: marginPercentage,
        };

        // KPI 4 — Stok Menipis
        const lowStock: LowStockKPI = {
            count: lowStockCount,
        };

        return {
            date: targetDate,
            revenue,
            transactions,
            profit,
            low_stock: lowStock,
        };
    } catch (error) {
        console.error(`--- Dashboard Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get daily sales trend (revenue + transaction count) for the last N days
 * Days without orders are included as zero-value data points
 */
export const getSalesTrend = async (req: AuthenticatedRequest): Promise<DashboardSalesTrendResponse> => {
    try {
        const rawDays = parseInt(req.query.days as string, 10);
        const periodDays = (SALES_TREND_PERIODS as readonly number[]).includes(rawDays)
            ? (rawDays as 7 | 14 | 30)
            : 7;

        const endDate = getTodayDateStr();
        const startDate = getStartDateStr(endDate, periodDays);

        const rows = await dashboardRepository.getSalesTrend(startDate, endDate);

        // Index rows by date for O(1) lookup — avoids nested loop
        const rowByDate = new Map(rows.map((r) => [r.date, r]));

        const allDates = generateDateRange(startDate, endDate);

        const data: SalesTrendDataPoint[] = allDates.map((date) => {
            const row = rowByDate.get(date);
            return {
                date,
                label: formatDateLabel(date),
                revenue: row?.revenue ?? 0,
                transaction_count: row?.transaction_count ?? 0,
            };
        });

        return {
            period_days: periodDays,
            start_date: startDate,
            end_date: endDate,
            data,
        };
    } catch (error) {
        console.error(`--- Dashboard Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get top 5 best-selling menus for a given day
 * Ordered by qty_sold descending — ties broken by revenue descending (handled by DB)
 */
export const getTopMenus = async (req: AuthenticatedRequest): Promise<DashboardTopMenusResponse> => {
    try {
        const targetDate = (req.query.date as string) || getTodayDateStr();

        const rows = await dashboardRepository.getTopMenus(targetDate);

        const items: TopMenuItem[] = rows.map((row, index) => ({
            rank: index + 1,
            menu_id: row.menu_id,
            menu_name: row.menu_name,
            category_name: row.category_name,
            qty_sold: row.qty_sold,
            revenue: row.revenue,
            margin_percentage: calcMenuMargin(row.price, row.cost),
        }));

        return {
            date: targetDate,
            total_items: items.length,
            items,
        };
    } catch (error) {
        console.error(`--- Dashboard Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get stock status distribution for radial chart
 * Categories: AMAN (>=min_stock), MENIPIS (>0 & <min_stock), KRITIS (<=0)
 * Percentage rounded to 2 decimal places; 0 total returns 0% for all categories
 */
export const getStockStatus = async (): Promise<DashboardStockStatusResponse> => {
    try {
        const rows = await dashboardRepository.getStockStatusCounts();

        // Index rows by status for O(1) lookup — avoids nested loop
        const countByStatus = new Map(rows.map((r) => [r.status, r.count]));

        const amanCount = countByStatus.get(StockStatus.AMAN) ?? 0;
        const menipisCount = countByStatus.get(StockStatus.MENIPIS) ?? 0;
        const kritisCount = countByStatus.get(StockStatus.KRITIS) ?? 0;
        const total = amanCount + menipisCount + kritisCount;

        const toPercentage = (count: number): number => {
            if (total === 0) return 0;
            return Math.round((count / total) * 10000) / 100;
        };

        const categories: StockStatusCategory[] = [
            {
                status: StockStatus.AMAN,
                count: amanCount,
                percentage: toPercentage(amanCount),
            },
            {
                status: StockStatus.MENIPIS,
                count: menipisCount,
                percentage: toPercentage(menipisCount),
            },
            {
                status: StockStatus.KRITIS,
                count: kritisCount,
                percentage: toPercentage(kritisCount),
            },
        ];

        return {
            total_ingredients: total,
            categories,
        };
    } catch (error) {
        console.error(`--- Dashboard Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get 10 most recent stock movements for dashboard activity table
 * Returns: created_at, ingredient_name, stock_type_name, qty, current_stock
 * Ordered by created_at descending (latest first)
 */
export const getRecentStockMovements = async (): Promise<DashboardRecentStockMovementsResponse> => {
    try {
        const rows = await dashboardRepository.getRecentStockMovements();

        const items: RecentStockMovementItem[] = rows.map((row) => ({
            stock_movement_id: row.stock_movement_id,
            created_at: row.created_at,
            ingredient_name: row.ingredient_name,
            stock_type_name: row.stock_type_name,
            qty: row.qty,
            current_stock: row.current_stock,
        }));

        return {
            total_items: items.length,
            items,
        };
    } catch (error) {
        console.error(`--- Dashboard Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const dashboardService = {
    getKPI,
    getSalesTrend,
    getTopMenus,
    getStockStatus,
    getRecentStockMovements,
};

export default dashboardService;
