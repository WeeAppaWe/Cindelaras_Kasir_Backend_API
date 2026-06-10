import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import { Prisma } from '../../../generated/prisma/client';
import { ReportFilter } from './report-financial.types';

const prisma = getPrismaClient();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Build date range filter for queries
 */
const buildDateRangeFilter = (filter: ReportFilter) => {
    const startDate = new Date(filter.start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(filter.end_date);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
};

// ============================================
// GET COMPLETED ORDERS FOR PERIOD
// ============================================

export const getCompletedOrdersForPeriod = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.OrderWhereInput = {
            status: 'COMPLETED',
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        if (filter.user_id) {
            where.user_id = filter.user_id;
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                order_items: {
                    include: {
                        menu: {
                            include: {
                                category: true,
                                recipes: {
                                    include: {
                                        ingredient: true,
                                    },
                                },
                            },
                        },
                    },
                },
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });

        return orders;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET CASH MOVEMENTS FOR PERIOD
// ============================================

export const getCashMovementsForPeriod = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.CashMovementWhereInput = {
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        const cashMovements = await prisma.cashMovement.findMany({
            where,
            orderBy: {
                created_at: 'asc',
            },
        });

        return cashMovements;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET SHIFTS FOR PERIOD
// ============================================

export const getShiftsForPeriod = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.ShiftWhereInput = {
            deleted_at: null,
            start_time: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        if (filter.user_id) {
            where.user_id = filter.user_id;
        }

        const shifts = await prisma.shift.findMany({
            where,
            include: {
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
                cash_movements: {
                    where: {
                        deleted_at: null,
                    },
                },
            },
            orderBy: {
                start_time: 'asc',
            },
        });

        return shifts;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ORDERS FOR FULL REPORT (lean - only fields needed for daily P&L)
// ============================================

export const getOrdersForFullReport = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.OrderWhereInput = {
            status: 'COMPLETED',
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        if (filter.user_id) {
            where.user_id = filter.user_id;
        }

        const orders = await prisma.order.findMany({
            where,
            select: {
                order_id: true,
                total_amount: true,
                created_at: true,
                order_items: {
                    where: { deleted_at: null },
                    select: {
                        qty: true,
                        menu: {
                            select: {
                                cost: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });

        return orders;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET CASH MOVEMENTS (OUT) FOR FULL REPORT
// ============================================

export const getCashMovementsOutForFullReport = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.CashMovementWhereInput = {
            type: 'OUT',
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        const cashMovements = await prisma.cashMovement.findMany({
            where,
            select: {
                amount: true,
                created_at: true,
            },
            orderBy: {
                created_at: 'asc',
            },
        });

        return cashMovements;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ORDER ITEMS AGGREGATED BY MENU
// ============================================

export const getOrderItemsAggregatedByMenu = async (filter: ReportFilter, limit: number = 10) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        // Build base where clause for orders
        const orderWhere: Prisma.OrderWhereInput = {
            status: 'COMPLETED',
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            orderWhere.shift_id = filter.shift_id;
        }

        if (filter.user_id) {
            orderWhere.user_id = filter.user_id;
        }

        // Get order IDs that match the filter
        const orders = await prisma.order.findMany({
            where: orderWhere,
            select: { order_id: true },
        });

        const orderIds = orders.map(o => o.order_id);

        if (orderIds.length === 0) {
            return [];
        }

        // Aggregate order items by menu
        const aggregated = await prisma.orderItem.groupBy({
            by: ['menu_id'],
            where: {
                order_id: { in: orderIds },
                deleted_at: null,
            },
            _sum: {
                qty: true,
                subtotal: true,
            },
            orderBy: {
                _sum: {
                    subtotal: 'desc',
                },
            },
            take: limit,
        });

        // Get menu details
        const menuIds = aggregated.map(a => a.menu_id);
        const menus = await prisma.menu.findMany({
            where: {
                menu_id: { in: menuIds },
            },
            include: {
                category: true,
            },
        });

        // Combine data
        return aggregated.map(a => {
            const menu = menus.find(m => m.menu_id === a.menu_id);
            return {
                menu_id: a.menu_id,
                name: menu?.name || 'Unknown',
                category: menu?.category?.name || 'Unknown',
                qty_sold: a._sum.qty || 0,
                revenue: Number(a._sum.subtotal) || 0,
            };
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ORDER ITEMS AGGREGATED BY CATEGORY
// ============================================

export const getOrderItemsAggregatedByCategory = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        // Build base where clause for orders
        const orderWhere: Prisma.OrderWhereInput = {
            status: 'COMPLETED',
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.shift_id) {
            orderWhere.shift_id = filter.shift_id;
        }

        if (filter.user_id) {
            orderWhere.user_id = filter.user_id;
        }

        // Get orders with items
        const orders = await prisma.order.findMany({
            where: orderWhere,
            include: {
                order_items: {
                    where: { deleted_at: null },
                    include: {
                        menu: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });

        // Aggregate by category
        const categoryMap = new Map<string, {
            category_id: string;
            category_name: string;
            qty_sold: number;
            revenue: number;
        }>();

        for (const order of orders) {
            for (const item of order.order_items) {
                const categoryId = item.menu.category_id;
                const categoryName = item.menu.category?.name || 'Unknown';

                const existing = categoryMap.get(categoryId);
                if (existing) {
                    existing.qty_sold += item.qty;
                    existing.revenue += Number(item.subtotal);
                } else {
                    categoryMap.set(categoryId, {
                        category_id: categoryId,
                        category_name: categoryName,
                        qty_sold: item.qty,
                        revenue: Number(item.subtotal),
                    });
                }
            }
        }

        // Convert to array and sort by revenue
        return Array.from(categoryMap.values()).sort((a, b) => b.revenue - a.revenue);
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// EXPORT REPOSITORY
// ============================================

export const reportFinancialRepository = {
    getCompletedOrdersForPeriod,
    getOrdersForFullReport,
    getCashMovementsForPeriod,
    getCashMovementsOutForFullReport,
    getShiftsForPeriod,
    getOrderItemsAggregatedByMenu,
    getOrderItemsAggregatedByCategory,
};

export default reportFinancialRepository;
