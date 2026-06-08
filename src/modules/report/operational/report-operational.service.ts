import { AuthenticatedRequest } from '../../../../types';
import reportOperationalRepository from './report-operational.repository';
import {
    ReportFilter,
    ReportPeriod,
    CashierPerformanceItem,
    CashierPerformanceResponse,
    ShiftSummaryItem,
    ShiftSummaryResponse,
    TransactionStatsResponse,
    HourlyStats,
    DailyStats,
    MenuPerformanceItem,
    MenuPerformanceResponse,
    OrderStatusSummary,
    OrderItem,
    OrderStatusResponse,
    FullOperationalReportResponse,
} from './report-operational.types';

// ============================================
// HELPER FUNCTIONS
// ============================================

const extractFilter = (req: AuthenticatedRequest): ReportFilter => {
    return {
        start_date: req.query.start_date as string,
        end_date: req.query.end_date as string,
        shift_id: (req.query.shift_id as string) || null,
        user_id: (req.query.user_id as string) || null,
    };
};

const createPeriod = (filter: ReportFilter): ReportPeriod => ({
    start_date: filter.start_date,
    end_date: filter.end_date,
});

const getDayName = (date: Date): string => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
};

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0];
};

// ============================================
// GET CASHIER PERFORMANCE
// ============================================

export const getCashierPerformance = async (req: AuthenticatedRequest): Promise<CashierPerformanceResponse> => {
    try {
        const filter = extractFilter(req);
        const data = await reportOperationalRepository.getUsersWithOrderStats(filter);

        if (!data) {
            return {
                period: createPeriod(filter),
                total_cashiers: 0,
                cashiers: [],
            };
        }

        const { orders, shifts } = data;

        // Group by user
        const userMap = new Map<string, {
            user_id: string;
            name: string;
            total_shifts: number;
            total_transactions: number;
            completed_transactions: number;
            total_sales: number;
            cancelled_orders: number;
        }>();

        // Count shifts per user
        for (const shift of shifts) {
            const userId = shift.user_id;
            const existing = userMap.get(userId);
            if (existing) {
                existing.total_shifts += 1;
            } else {
                userMap.set(userId, {
                    user_id: userId,
                    name: '',
                    total_shifts: 1,
                    total_transactions: 0,
                    completed_transactions: 0,
                    total_sales: 0,
                    cancelled_orders: 0,
                });
            }
        }

        // Count orders per user
        for (const order of orders) {
            const userId = order.user_id;
            const existing = userMap.get(userId);
            if (existing) {
                existing.name = order.user.name;
                existing.total_transactions += 1;
                if (order.status === 'COMPLETED') {
                    existing.completed_transactions += 1;
                    existing.total_sales += Number(order.total_amount);
                }
                if (order.status === 'CANCELLED') {
                    existing.cancelled_orders += 1;
                }
            } else {
                userMap.set(userId, {
                    user_id: userId,
                    name: order.user.name,
                    total_shifts: 0,
                    total_transactions: 1,
                    completed_transactions: order.status === 'COMPLETED' ? 1 : 0,
                    total_sales: order.status === 'COMPLETED' ? Number(order.total_amount) : 0,
                    cancelled_orders: order.status === 'CANCELLED' ? 1 : 0,
                });
            }
        }

        const cashiers: CashierPerformanceItem[] = Array.from(userMap.values())
            .filter(u => u.name !== '') // Only include users with orders
            .map(u => ({
                user_id: u.user_id,
                name: u.name,
                total_shifts: u.total_shifts,
                total_transactions: u.total_transactions,
                total_sales: Math.round(u.total_sales),
                average_per_transaction: u.completed_transactions > 0
                    ? Math.round(u.total_sales / u.completed_transactions)
                    : 0,
                cancelled_orders: u.cancelled_orders,
                cancellation_rate: u.total_transactions > 0
                    ? Math.round((u.cancelled_orders / u.total_transactions) * 10000) / 100
                    : 0,
            }))
            .sort((a, b) => b.total_sales - a.total_sales);

        return {
            period: createPeriod(filter),
            total_cashiers: cashiers.length,
            cashiers,
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET SHIFT SUMMARY
// ============================================

export const getShiftSummary = async (req: AuthenticatedRequest): Promise<ShiftSummaryResponse> => {
    try {
        const filter = extractFilter(req);
        const shifts = await reportOperationalRepository.getShiftsWithOrderCounts(filter);

        if (!shifts) {
            return {
                period: createPeriod(filter),
                total_shifts: 0,
                active_shifts: 0,
                closed_shifts: 0,
                shifts: [],
            };
        }

        const shiftSummaries: ShiftSummaryItem[] = shifts.map(shift => {
            const startTime = new Date(shift.start_time);
            const endTime = shift.end_time ? new Date(shift.end_time) : null;

            let durationMinutes: number | null = null;
            if (endTime) {
                durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
            }

            // Calculate expected cash
            const cashSales = shift.orders
                .filter(o => o.status === 'COMPLETED')
                .reduce((sum, o) => sum + Number(o.total_amount), 0);

            const cashIn = shift.cash_movements
                .filter(cm => cm.type === 'IN')
                .reduce((sum, cm) => sum + Number(cm.amount), 0);

            const cashOut = shift.cash_movements
                .filter(cm => cm.type === 'OUT')
                .reduce((sum, cm) => sum + Number(cm.amount), 0);

            const expectedCash = Number(shift.start_cash) + cashSales + cashIn - cashOut;
            const cashDifference = shift.end_cash
                ? Number(shift.end_cash) - expectedCash
                : null;

            return {
                shift_id: shift.shift_id,
                user: {
                    user_id: shift.user.user_id,
                    name: shift.user.name,
                },
                date: formatDate(startTime),
                start_time: formatTime(startTime),
                end_time: endTime ? formatTime(endTime) : null,
                duration_minutes: durationMinutes,
                start_cash: Math.round(Number(shift.start_cash)),
                end_cash: shift.end_cash ? Math.round(Number(shift.end_cash)) : null,
                sold_total: shift.sold_total ? Math.round(Number(shift.sold_total)) : null,
                cash_difference: cashDifference !== null ? Math.round(cashDifference) : null,
                transaction_count: shift.orders.filter(o => o.status === 'COMPLETED').length,
                status: shift.end_time ? 'CLOSED' : 'ACTIVE',
            };
        });

        const activeShifts = shiftSummaries.filter(s => s.status === 'ACTIVE').length;
        const closedShifts = shiftSummaries.filter(s => s.status === 'CLOSED').length;

        return {
            period: createPeriod(filter),
            total_shifts: shifts.length,
            active_shifts: activeShifts,
            closed_shifts: closedShifts,
            shifts: shiftSummaries,
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET TRANSACTION STATISTICS
// ============================================

export const getTransactionStats = async (req: AuthenticatedRequest): Promise<TransactionStatsResponse> => {
    try {
        const filter = extractFilter(req);
        const orders = await reportOperationalRepository.getAllOrdersForPeriod(filter);

        if (!orders || orders.length === 0) {
            return {
                period: createPeriod(filter),
                total_transactions: 0,
                total_sales: 0,
                average_per_transaction: 0,
                peak_hour: 0,
                busiest_day: '-',
                hourly_breakdown: [],
                daily_breakdown: [],
            };
        }

        // Only count completed orders
        const completedOrders = orders.filter(o => o.status === 'COMPLETED');

        const totalTransactions = completedOrders.length;
        const totalSales = completedOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        const averagePerTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

        // Hourly breakdown (grouped by date + hour)
        const hourlyMap = new Map<string, { date: string; hour: number; count: number; sales: number }>();

        for (const order of completedOrders) {
            const orderDate = new Date(order.created_at);
            const dateStr = formatDate(orderDate);
            const hour = orderDate.getHours();
            const key = `${dateStr}-${hour}`;

            const existing = hourlyMap.get(key);
            if (existing) {
                existing.count += 1;
                existing.sales += Number(order.total_amount);
            } else {
                hourlyMap.set(key, {
                    date: dateStr,
                    hour,
                    count: 1,
                    sales: Number(order.total_amount),
                });
            }
        }

        const hourlyBreakdown: HourlyStats[] = Array.from(hourlyMap.values())
            .map(data => ({
                date: data.date,
                hour: data.hour,
                transaction_count: data.count,
                total_sales: Math.round(data.sales),
            }))
            .sort((a, b) => a.date.localeCompare(b.date) || a.hour - b.hour);

        // Find peak hour (across all dates)
        const hourCountMap = new Map<number, number>();
        for (const item of hourlyBreakdown) {
            const existing = hourCountMap.get(item.hour) || 0;
            hourCountMap.set(item.hour, existing + item.transaction_count);
        }

        let peakHour = 0;
        let maxTransactions = 0;
        for (const [hour, count] of hourCountMap.entries()) {
            if (count > maxTransactions) {
                maxTransactions = count;
                peakHour = hour;
            }
        }

        // Daily breakdown
        const dailyMap = new Map<string, { date: Date; count: number; sales: number }>();

        for (const order of completedOrders) {
            const orderDate = new Date(order.created_at);
            const dateKey = formatDate(orderDate);

            const existing = dailyMap.get(dateKey);
            if (existing) {
                existing.count += 1;
                existing.sales += Number(order.total_amount);
            } else {
                dailyMap.set(dateKey, {
                    date: orderDate,
                    count: 1,
                    sales: Number(order.total_amount),
                });
            }
        }

        const dailyBreakdown: DailyStats[] = Array.from(dailyMap.entries())
            .map(([date, data]) => ({
                date,
                day_name: getDayName(data.date),
                transaction_count: data.count,
                total_sales: Math.round(data.sales),
            }))
            .sort((a, b) => a.date.localeCompare(b.date));

        // Find busiest day of week
        const dayCountMap = new Map<string, number>();
        for (const daily of dailyBreakdown) {
            const existing = dayCountMap.get(daily.day_name) || 0;
            dayCountMap.set(daily.day_name, existing + daily.transaction_count);
        }

        let busiestDay = '-';
        let maxDayCount = 0;
        for (const [day, count] of dayCountMap.entries()) {
            if (count > maxDayCount) {
                maxDayCount = count;
                busiestDay = day;
            }
        }

        return {
            period: createPeriod(filter),
            total_transactions: totalTransactions,
            total_sales: Math.round(totalSales),
            average_per_transaction: Math.round(averagePerTransaction),
            peak_hour: peakHour,
            busiest_day: busiestDay,
            hourly_breakdown: hourlyBreakdown,
            daily_breakdown: dailyBreakdown,
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET MENU PERFORMANCE
// ============================================

export const getMenuPerformance = async (req: AuthenticatedRequest): Promise<MenuPerformanceResponse> => {
    try {
        const filter = extractFilter(req);
        const limit = parseInt(req.query.limit as string) || 20;

        const menuData = await reportOperationalRepository.getMenuPerformanceData(filter, limit);

        if (!menuData || menuData.length === 0) {
            return {
                period: createPeriod(filter),
                total_menus_sold: 0,
                total_revenue: 0,
                total_profit: 0,
                menus: [],
            };
        }

        const totalRevenue = menuData.reduce((sum, m) => sum + m.revenue, 0);
        const totalCost = menuData.reduce((sum, m) => sum + m.cost, 0);
        const totalProfit = totalRevenue - totalCost;

        const menus: MenuPerformanceItem[] = menuData.map(m => {
            const profit = m.revenue - m.cost;
            const marginPercentage = m.revenue > 0 ? (profit / m.revenue) * 100 : 0;

            return {
                menu_id: m.menu_id,
                name: m.name,
                category: m.category,
                qty_sold: m.qty_sold,
                revenue: Math.round(m.revenue),
                cost: Math.round(m.cost),
                profit: Math.round(profit),
                margin_percentage: Math.round(marginPercentage * 100) / 100,
            };
        });

        return {
            period: createPeriod(filter),
            total_menus_sold: menus.reduce((sum, m) => sum + m.qty_sold, 0),
            total_revenue: Math.round(totalRevenue),
            total_profit: Math.round(totalProfit),
            menus,
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET ORDER STATUS SUMMARY
// ============================================

export const getOrderStatus = async (req: AuthenticatedRequest): Promise<OrderStatusResponse> => {
    try {
        const filter = extractFilter(req);
        const orders = await reportOperationalRepository.getAllOrdersForPeriod(filter);

        if (!orders || orders.length === 0) {
            return {
                period: createPeriod(filter),
                total_orders: 0,
                summary: [],
                orders: [],
            };
        }

        // Summary by status
        const statusMap = new Map<string, number>();
        for (const order of orders) {
            const existing = statusMap.get(order.status) || 0;
            statusMap.set(order.status, existing + 1);
        }

        const totalOrders = orders.length;
        const summary: OrderStatusSummary[] = Array.from(statusMap.entries())
            .map(([status, count]) => ({
                status,
                count,
                percentage: Math.round((count / totalOrders) * 10000) / 100,
            }))
            .sort((a, b) => b.count - a.count);

        // Order list
        const orderList: OrderItem[] = orders.map(order => {
            const orderDate = new Date(order.created_at);
            // Generate order number from order_id (last 8 chars)
            const orderNumber = `ORD-${order.order_id.slice(-8).toUpperCase()}`;
            return {
                order_id: order.order_id,
                order_number: orderNumber,
                date: formatDate(orderDate),
                time: formatTime(orderDate),
                user: {
                    user_id: order.user_id,
                    name: order.user.name,
                },
                total_amount: Math.round(Number(order.total_amount)),
                payment_method: order.payment_type || '-',
                status: order.status,
            };
        }).sort((a, b) => {
            // Sort by date desc, then time desc
            const dateCompare = b.date.localeCompare(a.date);
            if (dateCompare !== 0) return dateCompare;
            return b.time.localeCompare(a.time);
        });

        return {
            period: createPeriod(filter),
            total_orders: totalOrders,
            summary,
            orders: orderList,
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET FULL REPORT
// ============================================

export const getFullReport = async (req: AuthenticatedRequest): Promise<FullOperationalReportResponse> => {
    try {
        const filter = extractFilter(req);

        const [cashierData, shiftData, statsData, statusData, menuData] = await Promise.all([
            getCashierPerformance(req),
            getShiftSummary(req),
            getTransactionStats(req),
            getOrderStatus(req),
            getMenuPerformance(req),
        ]);

        return {
            period: createPeriod(filter),
            cashier_summary: {
                total_cashiers: cashierData.total_cashiers,
                top_performer: cashierData.cashiers.length > 0 ? cashierData.cashiers[0] : null,
            },
            shift_summary: {
                total_shifts: shiftData.total_shifts,
                active_shifts: shiftData.active_shifts,
                closed_shifts: shiftData.closed_shifts,
            },
            transaction_stats: {
                total_transactions: statsData.total_transactions,
                total_sales: statsData.total_sales,
                average_per_transaction: statsData.average_per_transaction,
                peak_hour: statsData.peak_hour,
                busiest_day: statsData.busiest_day,
            },
            order_status: statusData.summary,
            top_menus: menuData.menus.slice(0, 5),
        };
    } catch (error) {
        console.error(`--- Report Operational Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// EXPORT SERVICE
// ============================================

export const reportOperationalService = {
    getCashierPerformance,
    getShiftSummary,
    getTransactionStats,
    getMenuPerformance,
    getOrderStatus,
    getFullReport,
};

export default reportOperationalService;
