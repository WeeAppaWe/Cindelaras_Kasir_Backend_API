import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { CashMovementFilter, CashMovementPaginationOptions, CashMovementData, CashMovementWithShift } from './cash-movement.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for cash movement queries
const cashMovementSelectFields = {
    cash_movement_id: true,
    shift_id: true,
    type: true,
    amount: true,
    note: true,
    created_at: true,
    updated_at: true,
};

// Select fields with shift info
const cashMovementWithShiftSelectFields = {
    ...cashMovementSelectFields,
    shift: {
        select: {
            shift_id: true,
            start_time: true,
            end_time: true,
        },
    },
};

/**
 * Find all cash movements with pagination and filters
 */
export const findAll = async (
    options: CashMovementPaginationOptions,
    filter: CashMovementFilter
): Promise<CashMovementWithShift[]> => {
    try {
        const { pagination } = options;

        const where: Prisma.CashMovementWhereInput = {
            deleted_at: null,
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        if (filter.type) {
            where.type = filter.type;
        }

        const data = await prisma.cashMovement.findMany({
            where,
            select: cashMovementWithShiftSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return data.map((item) => ({
            ...item,
            amount: Number(item.amount),
        })) as CashMovementWithShift[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count cash movements with filters
 */
export const count = async (filter: CashMovementFilter): Promise<number> => {
    try {
        const where: Prisma.CashMovementWhereInput = {
            deleted_at: null,
        };

        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }

        if (filter.type) {
            where.type = filter.type;
        }

        return await prisma.cashMovement.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find cash movement by ID
 */
export const findById = async (cashMovementId: string): Promise<CashMovementWithShift | null> => {
    try {
        const data = await prisma.cashMovement.findFirst({
            where: {
                cash_movement_id: cashMovementId,
                deleted_at: null,
            },
            select: cashMovementWithShiftSelectFields,
        });

        if (!data) return null;

        return {
            ...data,
            amount: Number(data.amount),
        } as CashMovementWithShift;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new cash movement
 */
export const create = async (
    data: Prisma.CashMovementUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<CashMovementWithShift> => {
    try {
        const client = transaction || prisma;

        const cashMovement = await client.cashMovement.create({
            data,
            select: cashMovementWithShiftSelectFields,
        });

        return {
            ...cashMovement,
            amount: Number(cashMovement.amount),
        } as CashMovementWithShift;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get summary of cash movements by shift
 */
export const getSummaryByShift = async (shiftId: string): Promise<{ total_in: number; total_out: number }> => {
    try {
        const result = await prisma.cashMovement.groupBy({
            by: ['type'],
            where: {
                shift_id: shiftId,
                deleted_at: null,
            },
            _sum: {
                amount: true,
            },
        });

        let total_in = 0;
        let total_out = 0;

        result.forEach((item) => {
            if (item.type === 'IN') {
                total_in = Number(item._sum.amount) || 0;
            } else if (item.type === 'OUT') {
                total_out = Number(item._sum.amount) || 0;
            }
        });

        return { total_in, total_out };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get active shift for user
 */
export const getActiveShift = async (userId: string) => {
    try {
        return await prisma.shift.findFirst({
            where: {
                user_id: userId,
                end_time: null,
                deleted_at: null,
            },
            select: {
                shift_id: true,
                user_id: true,
                start_cash: true,
                start_time: true,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const cashMovementRepository = {
    findAll,
    count,
    findById,
    create,
    getSummaryByShift,
    getActiveShift,
};

export default cashMovementRepository;
