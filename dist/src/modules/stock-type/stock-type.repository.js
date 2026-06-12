"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockTypeRepository = exports.findByName = exports.findById = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
/**
 * Find all stock types
 */
const findAll = async () => {
    try {
        const stockTypes = await prisma.stockType.findMany({
            where: {
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return stockTypes;
    }
    catch (error) {
        console.error('--- StockType Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Find stock type by ID
 */
const findById = async (stockTypeId) => {
    try {
        const stockType = await prisma.stockType.findUnique({
            where: {
                stock_type_id: stockTypeId,
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
        });
        return stockType;
    }
    catch (error) {
        console.error('--- StockType Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find stock type by name
 */
const findByName = async (name) => {
    try {
        const stockType = await prisma.stockType.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
        });
        return stockType;
    }
    catch (error) {
        console.error('--- StockType Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
exports.stockTypeRepository = {
    findAll: exports.findAll,
    findById: exports.findById,
    findByName: exports.findByName,
};
exports.default = exports.stockTypeRepository;
//# sourceMappingURL=stock-type.repository.js.map