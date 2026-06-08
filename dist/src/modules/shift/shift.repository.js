"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftRepository = exports.softDelete = exports.getOrderStats = exports.endShift = exports.create = exports.getActiveShift = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// SELECT FIELDS
// ============================================
const shiftSelectFields = {
    shift_id: true,
    user_id: true,
    start_cash: true,
    end_cash: true,
    sold_total: true,
    start_time: true,
    end_time: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    _count: {
        select: {
            orders: true,
        },
    },
};
// ============================================
// FIND ALL SHIFTS
// ============================================
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { user_id, start_date, end_date, is_active } = filter;
        const where = {
            deleted_at: null,
        };
        // Filter by user
        if (user_id) {
            where.user_id = user_id;
        }
        // Filter by active status
        if (is_active !== null && is_active !== undefined) {
            if (is_active) {
                where.end_time = null; // Active = no end time
            }
            else {
                where.end_time = { not: null }; // Closed = has end time
            }
        }
        // Filter by date range
        if (start_date || end_date) {
            where.start_time = {};
            if (start_date) {
                where.start_time.gte = new Date(start_date);
            }
            if (end_date) {
                const endDateTime = new Date(end_date);
                endDateTime.setHours(23, 59, 59, 999);
                where.start_time.lte = endDateTime;
            }
        }
        const shifts = await prisma.shift.findMany({
            where,
            select: shiftSelectFields,
            orderBy: { start_time: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return shifts.map((shift) => ({
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
// ============================================
// COUNT SHIFTS
// ============================================
const count = async (filter) => {
    try {
        const { user_id, start_date, end_date, is_active } = filter;
        const where = {
            deleted_at: null,
        };
        if (user_id) {
            where.user_id = user_id;
        }
        if (is_active !== null && is_active !== undefined) {
            if (is_active) {
                where.end_time = null;
            }
            else {
                where.end_time = { not: null };
            }
        }
        if (start_date || end_date) {
            where.start_time = {};
            if (start_date) {
                where.start_time.gte = new Date(start_date);
            }
            if (end_date) {
                const endDateTime = new Date(end_date);
                endDateTime.setHours(23, 59, 59, 999);
                where.start_time.lte = endDateTime;
            }
        }
        return await prisma.shift.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
// ============================================
// FIND BY ID
// ============================================
const findById = async (shiftId) => {
    try {
        const shift = await prisma.shift.findUnique({
            where: {
                shift_id: shiftId,
                deleted_at: null,
            },
            select: shiftSelectFields,
        });
        if (!shift)
            return null;
        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
// ============================================
// GET ACTIVE SHIFT FOR USER
// ============================================
const getActiveShift = async (userId) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                user_id: userId,
                end_time: null,
                deleted_at: null,
            },
            select: shiftSelectFields,
            orderBy: { start_time: 'desc' },
        });
        if (!shift)
            return null;
        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getActiveShift = getActiveShift;
// ============================================
// CREATE SHIFT (Start Shift)
// ============================================
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const shift = await client.shift.create({
            data: {
                user_id: data.user_id,
                start_cash: data.start_cash,
                start_time: data.start_time,
            },
            select: shiftSelectFields,
        });
        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
// ============================================
// END SHIFT (Update with end data)
// ============================================
const endShift = async (shiftId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const shift = await client.shift.update({
            where: { shift_id: shiftId },
            data: {
                end_cash: data.end_cash,
                sold_total: data.sold_total,
                end_time: data.end_time,
            },
            select: shiftSelectFields,
        });
        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.endShift = endShift;
// ============================================
// GET ORDER STATS FOR SHIFT
// ============================================
const getOrderStats = async (shiftId) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                shift_id: shiftId,
                deleted_at: null,
            },
            select: {
                status: true,
                payment_type: true,
                total_amount: true,
            },
        });
        const total_orders = orders.length;
        const completed_orders = orders.filter((o) => o.status === 'COMPLETED').length;
        const cancelled_orders = orders.filter((o) => o.status === 'CANCELLED').length;
        const pending_orders = orders.filter((o) => o.status === 'PENDING').length;
        const completedOrders = orders.filter((o) => o.status === 'COMPLETED');
        console.log('--- DEBUG ORDER STATS ---');
        console.log('Shift:', shiftId);
        console.log('Total Orders:', total_orders);
        console.log('Completed Orders:', completedOrders.length);
        completedOrders.forEach(o => {
            console.log(`Order ${o.total_amount}: Payment=${o.payment_type} (${typeof o.payment_type}), Status=${o.status}`);
        });
        const total_sales = completedOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        // Robust calculation with logging
        const cash_sales = completedOrders
            .filter((o) => {
            const pType = String(o.payment_type || '').toUpperCase().trim();
            const isMatch = pType === 'CASH';
            if (!isMatch)
                console.error(`[DEBUG] Skipped Order (Not CASH): PType='${o.payment_type}' -> '${pType}'`);
            return isMatch;
        })
            .reduce((sum, o) => sum + Number(o.total_amount), 0);
        const qris_sales = completedOrders
            .filter((o) => {
            const pType = String(o.payment_type || '').toUpperCase().trim();
            return pType === 'QRIS';
        })
            .reduce((sum, o) => sum + Number(o.total_amount), 0);
        console.error(`[DEBUG] RESULT: Cash Sales = ${cash_sales}, QRIS Sales = ${qris_sales}, Total = ${total_sales}`);
        return {
            total_orders,
            completed_orders,
            cancelled_orders,
            pending_orders,
            cash_sales,
            qris_sales,
            total_sales,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getOrderStats = getOrderStats;
// ============================================
// SOFT DELETE SHIFT
// ============================================
const softDelete = async (shiftId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.shift.update({
            where: { shift_id: shiftId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
exports.shiftRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    getActiveShift: exports.getActiveShift,
    create: exports.create,
    endShift: exports.endShift,
    getOrderStats: exports.getOrderStats,
    softDelete: exports.softDelete,
};
exports.default = exports.shiftRepository;
//# sourceMappingURL=shift.repository.js.map