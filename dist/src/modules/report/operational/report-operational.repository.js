"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportOperationalRepository = exports.getMenuPerformanceData = exports.getUsersWithOrderStats = exports.getShiftsWithOrderCounts = exports.getAllOrdersForPeriod = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// HELPER FUNCTIONS
// ============================================
const buildDateRangeFilter = (filter) => {
    const startDate = new Date(filter.start_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(filter.end_date);
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
};
// ============================================
// GET ALL ORDERS FOR PERIOD (All statuses)
// ============================================
const getAllOrdersForPeriod = async (filter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        const where = {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getAllOrdersForPeriod = getAllOrdersForPeriod;
// ============================================
// GET SHIFTS FOR PERIOD WITH ORDER COUNTS
// ============================================
const getShiftsWithOrderCounts = async (filter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        const where = {
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
                        payment_type: true,
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getShiftsWithOrderCounts = getShiftsWithOrderCounts;
// ============================================
// GET USERS WITH ORDER AGGREGATES
// ============================================
const getUsersWithOrderStats = async (filter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        // Build base where clause
        const orderWhere = {
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
        const shiftWhere = {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getUsersWithOrderStats = getUsersWithOrderStats;
// ============================================
// GET MENU PERFORMANCE DATA
// ============================================
const getMenuPerformanceData = async (filter, limit = 20) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        // Build base where clause
        const orderWhere = {
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
        const menuMap = new Map();
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
                }
                else {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getMenuPerformanceData = getMenuPerformanceData;
// ============================================
// EXPORT REPOSITORY
// ============================================
exports.reportOperationalRepository = {
    getAllOrdersForPeriod: exports.getAllOrdersForPeriod,
    getShiftsWithOrderCounts: exports.getShiftsWithOrderCounts,
    getUsersWithOrderStats: exports.getUsersWithOrderStats,
    getMenuPerformanceData: exports.getMenuPerformanceData,
};
exports.default = exports.reportOperationalRepository;
//# sourceMappingURL=report-operational.repository.js.map