import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { DailyOrderSummary, SalesTrendRow, TopMenuRow, StockStatus, StockStatusRow, RecentStockMovementRow } from './dashboard.types';

const prisma = getPrismaClient();

/**
 * Build start-of-day and end-of-day Date objects for a given date string (YYYY-MM-DD)
 */
const buildDayRange = (dateStr: string) => {
    const start = new Date(dateStr);
    start.setHours(0, 0, 0, 0);

    const end = new Date(dateStr);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

/**
 * Get completed orders for a given day — returns revenue, transaction count, and COGS
 * COGS dihitung dari menu.cost × qty (bukan recipe avg_cost) agar konsisten dengan report financial
 */
export const getDailyOrderSummary = async (dateStr: string): Promise<DailyOrderSummary> => {
    try {
        const { start, end } = buildDayRange(dateStr);

        const orders = await prisma.order.findMany({
            where: {
                status: 'COMPLETED',
                deleted_at: null,
                created_at: { gte: start, lte: end },
            },
            select: {
                total_amount: true,
                order_items: {
                    where: { deleted_at: null },
                    select: {
                        qty: true,
                        menu: {
                            select: { cost: true },
                        },
                    },
                },
            },
        });

        let totalRevenue = 0;
        let totalCOGS = 0;

        for (const order of orders) {
            totalRevenue += Number(order.total_amount);
            for (const item of order.order_items) {
                totalCOGS += item.qty * Number(item.menu?.cost ?? 0);
            }
        }

        return {
            total_revenue: Math.round(totalRevenue),
            transaction_count: orders.length,
            total_cogs: Math.round(totalCOGS),
        };
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count ingredients with stock_qty < min_stock (low stock atau habis)
 */
export const getLowStockCount = async (): Promise<number> => {
    try {
        const result = await prisma.$queryRaw<[{ count: bigint }]>`
            SELECT COUNT(*) as count
            FROM ingredients
            WHERE deleted_at IS NULL
              AND stock_qty < min_stock
        `;

        return Number(result[0].count);
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get daily revenue and transaction count for a date range (sales trend chart)
 * Returns one row per day — days without orders are NOT included (handled in service)
 */
export const getSalesTrend = async (
    startDate: string,
    endDate: string
): Promise<SalesTrendRow[]> => {
    try {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const rows = await prisma.$queryRaw<Array<{ date: Date; revenue: number; transaction_count: bigint }>>`
            SELECT
                DATE(created_at) AS date,
                SUM(total_amount)::numeric AS revenue,
                COUNT(*) AS transaction_count
            FROM orders
            WHERE status = 'COMPLETED'
              AND deleted_at IS NULL
              AND created_at >= ${start}
              AND created_at <= ${end}
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at) ASC
        `;

        return rows.map((row) => ({
            date: row.date instanceof Date
                ? row.date.toISOString().split('T')[0]
                : String(row.date),
            revenue: Math.round(Number(row.revenue)),
            transaction_count: Number(row.transaction_count),
        }));
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get top 5 menus by qty_sold for a given day
 * Returns menu_id, name, category, qty_sold, revenue, price, cost
 * price and cost are passed through so service can compute margin_percentage
 */
export const getTopMenus = async (dateStr: string): Promise<TopMenuRow[]> => {
    try {
        const { start, end } = buildDayRange(dateStr);

        const rows = await prisma.$queryRaw<Array<{
            menu_id: string;
            menu_name: string;
            category_name: string;
            qty_sold: bigint;
            revenue: number;
            price: number;
            cost: number;
        }>>`
            SELECT
                m.menu_id,
                m.name          AS menu_name,
                c.name          AS category_name,
                SUM(oi.qty)     AS qty_sold,
                SUM(oi.subtotal)::numeric AS revenue,
                m.price::numeric          AS price,
                m.cost::numeric           AS cost
            FROM order_items oi
            INNER JOIN orders   o ON o.order_id  = oi.order_id
            INNER JOIN menus    m ON m.menu_id   = oi.menu_id
            INNER JOIN categories c ON c.category_id = m.category_id
            WHERE o.status     = 'COMPLETED'
              AND o.deleted_at IS NULL
              AND oi.deleted_at IS NULL
              AND o.created_at >= ${start}
              AND o.created_at <= ${end}
            GROUP BY m.menu_id, m.name, c.name, m.price, m.cost
            ORDER BY qty_sold DESC
            LIMIT 5
        `;

        return rows.map((row) => ({
            menu_id: row.menu_id,
            menu_name: row.menu_name,
            category_name: row.category_name,
            qty_sold: Number(row.qty_sold),
            revenue: Math.round(Number(row.revenue)),
            price: Number(row.price),
            cost: Number(row.cost),
        }));
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

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
export const getStockStatusCounts = async (): Promise<StockStatusRow[]> => {
    try {
        const rows = await prisma.$queryRaw<Array<{ status: string; count: bigint }>>`
            SELECT
                CASE
                    WHEN stock_qty <= 0            THEN 'KRITIS'
                    WHEN stock_qty < min_stock     THEN 'MENIPIS'
                    ELSE                                'AMAN'
                END AS status,
                COUNT(*) AS count
            FROM ingredients
            WHERE deleted_at IS NULL
            GROUP BY status
        `;

        return rows.map((row) => ({
            status: row.status as StockStatus,
            count: Number(row.count),
        }));
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get 10 most recent stock movements
 * Returns created_at, ingredient name, stock type name, qty, current_stock
 * Ordered by created_at descending (latest first)
 */
export const getRecentStockMovements = async (): Promise<RecentStockMovementRow[]> => {
    try {
        const rows = await prisma.stockMovement.findMany({
            where: { deleted_at: null },
            select: {
                stock_movement_id: true,
                created_at: true,
                qty: true,
                current_stock: true,
                ingredient: {
                    select: { name: true },
                },
                stock_type: {
                    select: { name: true },
                },
            },
            orderBy: { created_at: 'desc' },
            take: 10,
        });

        return rows.map((row) => ({
            stock_movement_id: row.stock_movement_id,
            created_at: row.created_at,
            ingredient_name: row.ingredient.name,
            stock_type_name: row.stock_type.name,
            qty: Number(row.qty),
            current_stock: Number(row.current_stock),
        }));
    } catch (error) {
        console.error('--- Dashboard Repository Error:', error);
        handlePrismaError(error);
    }
};

export const dashboardRepository = {
    getDailyOrderSummary,
    getLowStockCount,
    getSalesTrend,
    getTopMenus,
    getStockStatusCounts,
    getRecentStockMovements,
};

export default dashboardRepository;
