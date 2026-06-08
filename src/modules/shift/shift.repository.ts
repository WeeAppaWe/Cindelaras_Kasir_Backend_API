import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    ShiftFilter,
    ShiftPaginationOptions,
    ShiftWithUser,
    ShiftOrderStats,
} from './shift.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

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

export const findAll = async (
    options: ShiftPaginationOptions,
    filter: ShiftFilter
): Promise<ShiftWithUser[]> => {
    try {
        const { pagination } = options;
        const { user_id, start_date, end_date, is_active } = filter;

        const where: Prisma.ShiftWhereInput = {
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
            } else {
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
        })) as ShiftWithUser[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// COUNT SHIFTS
// ============================================

export const count = async (filter: ShiftFilter): Promise<number> => {
    try {
        const { user_id, start_date, end_date, is_active } = filter;

        const where: Prisma.ShiftWhereInput = {
            deleted_at: null,
        };

        if (user_id) {
            where.user_id = user_id;
        }

        if (is_active !== null && is_active !== undefined) {
            if (is_active) {
                where.end_time = null;
            } else {
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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// FIND BY ID
// ============================================

export const findById = async (shiftId: string): Promise<ShiftWithUser | null> => {
    try {
        const shift = await prisma.shift.findUnique({
            where: {
                shift_id: shiftId,
                deleted_at: null,
            },
            select: shiftSelectFields,
        });

        if (!shift) return null;

        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        } as ShiftWithUser;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ACTIVE SHIFT FOR USER
// ============================================

export const getActiveShift = async (userId: string): Promise<ShiftWithUser | null> => {
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

        if (!shift) return null;

        return {
            ...shift,
            start_cash: Number(shift.start_cash),
            end_cash: shift.end_cash ? Number(shift.end_cash) : null,
            sold_total: shift.sold_total ? Number(shift.sold_total) : null,
        } as ShiftWithUser;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// CREATE SHIFT (Start Shift)
// ============================================

export const create = async (
    data: {
        user_id: string;
        start_cash: number;
        start_time: Date;
    },
    transaction?: Prisma.TransactionClient
): Promise<ShiftWithUser> => {
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
        } as ShiftWithUser;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// END SHIFT (Update with end data)
// ============================================

export const endShift = async (
    shiftId: string,
    data: {
        end_cash: number;
        sold_total: number;
        end_time: Date;
    },
    transaction?: Prisma.TransactionClient
): Promise<ShiftWithUser> => {
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
        } as ShiftWithUser;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ORDER STATS FOR SHIFT
// ============================================

export const getOrderStats = async (shiftId: string): Promise<ShiftOrderStats> => {
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
                if (!isMatch) console.error(`[DEBUG] Skipped Order (Not CASH): PType='${o.payment_type}' -> '${pType}'`);
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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// SOFT DELETE SHIFT
// ============================================

export const softDelete = async (
    shiftId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.shift.update({
            where: { shift_id: shiftId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const shiftRepository = {
    findAll,
    count,
    findById,
    getActiveShift,
    create,
    endShift,
    getOrderStats,
    softDelete,
};

export default shiftRepository;
