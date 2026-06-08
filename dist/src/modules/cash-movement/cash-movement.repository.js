"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashMovementRepository = exports.getActiveShift = exports.getSummaryByShift = exports.create = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
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
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const where = {
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
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count cash movements with filters
 */
const count = async (filter) => {
    try {
        const where = {
            deleted_at: null,
        };
        if (filter.shift_id) {
            where.shift_id = filter.shift_id;
        }
        if (filter.type) {
            where.type = filter.type;
        }
        return await prisma.cashMovement.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find cash movement by ID
 */
const findById = async (cashMovementId) => {
    try {
        const data = await prisma.cashMovement.findFirst({
            where: {
                cash_movement_id: cashMovementId,
                deleted_at: null,
            },
            select: cashMovementWithShiftSelectFields,
        });
        if (!data)
            return null;
        return {
            ...data,
            amount: Number(data.amount),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Create new cash movement
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const cashMovement = await client.cashMovement.create({
            data,
            select: cashMovementWithShiftSelectFields,
        });
        return {
            ...cashMovement,
            amount: Number(cashMovement.amount),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Get summary of cash movements by shift
 */
const getSummaryByShift = async (shiftId) => {
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
            }
            else if (item.type === 'OUT') {
                total_out = Number(item._sum.amount) || 0;
            }
        });
        return { total_in, total_out };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getSummaryByShift = getSummaryByShift;
/**
 * Get active shift for user
 */
const getActiveShift = async (userId) => {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getActiveShift = getActiveShift;
exports.cashMovementRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    create: exports.create,
    getSummaryByShift: exports.getSummaryByShift,
    getActiveShift: exports.getActiveShift,
};
exports.default = exports.cashMovementRepository;
//# sourceMappingURL=cash-movement.repository.js.map