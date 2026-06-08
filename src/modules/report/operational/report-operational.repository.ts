import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import { Prisma } from '../../../generated/prisma/client';
import { ReportFilter } from './report-operational.types';

const prisma = getPrismaClient();

// ============================================
// HELPER FUNCTIONS
// ============================================

const buildDateRangeFilter = (filter: ReportFilter) => {
    const startDate = new Date(filter.start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(filter.end_date);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
};

// ============================================
// GET ALL ORDERS FOR PERIOD (All statuses)
// ============================================

export const getAllOrdersForPeriod = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        const where: Prisma.OrderWhereInput = {
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
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
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
// GET SHIFTS FOR PERIOD WITH ORDER COUNTS
// ============================================

export const getShiftsWithOrderCounts = async (filter: ReportFilter) => {
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
                orders: {
                    where: {
                        deleted_at: null,
                    },
                    select: {
                        order_id: true,
                        status: true,
                        total_amount: true,
                    },
                },
                cash_movements: {
                    where: {
                        deleted_at: null,
                    },
                },
            },
            orderBy: {
                start_time: 'desc',
            },
        });

        return shifts;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET USERS WITH ORDER AGGREGATES
// ============================================

export const getUsersWithOrderStats = async (filter: ReportFilter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        // Build base where clause
        const orderWhere: Prisma.OrderWhereInput = {
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

        // Get all orders with user info
        const orders = await prisma.order.findMany({
            where: orderWhere,
            include: {
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
            },
        });

        // Get shifts for each user in period
        const shiftWhere: Prisma.ShiftWhereInput = {
            deleted_at: null,
            start_time: {
                gte: startDate,
                lte: endDate,
            },
        };

        if (filter.user_id) {
            shiftWhere.user_id = filter.user_id;
        }

        const shifts = await prisma.shift.findMany({
            where: shiftWhere,
            select: {
                shift_id: true,
                user_id: true,
            },
        });

        return { orders, shifts };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET MENU PERFORMANCE DATA
// ============================================

export const getMenuPerformanceData = async (filter: ReportFilter, limit: number = 20) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);

        // Build base where clause
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
                                recipes: {
                                    include: {
                                        ingredient: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        // Aggregate by menu
        const menuMap = new Map<string, {
            menu_id: string;
            name: string;
            category: string;
            qty_sold: number;
            revenue: number;
            cost: number;
        }>();

        for (const order of orders) {
            for (const item of order.order_items) {
                const menuId = item.menu_id;
                const menuName = item.menu.name;
                const categoryName = item.menu.category?.name || 'Unknown';

                // Calculate cost from recipes
                let itemCost = 0;
                for (const recipe of item.menu.recipes) {
                    const ingredientCost = Number(recipe.ingredient.avg_cost);
                    const qtyNeeded = Number(recipe.qty_needed);
                    itemCost += ingredientCost * qtyNeeded;
                }
                const totalCost = itemCost * item.qty;

                const existing = menuMap.get(menuId);
                if (existing) {
                    existing.qty_sold += item.qty;
                    existing.revenue += Number(item.subtotal);
                    existing.cost += totalCost;
                } else {
                    menuMap.set(menuId, {
                        menu_id: menuId,
                        name: menuName,
                        category: categoryName,
                        qty_sold: item.qty,
                        revenue: Number(item.subtotal),
                        cost: totalCost,
                    });
                }
            }
        }

        // Convert to array, sort, and limit
        return Array.from(menuMap.values())
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit);
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// EXPORT REPOSITORY
// ============================================

export const reportOperationalRepository = {
    getAllOrdersForPeriod,
    getShiftsWithOrderCounts,
    getUsersWithOrderStats,
    getMenuPerformanceData,
};

export default reportOperationalRepository;
