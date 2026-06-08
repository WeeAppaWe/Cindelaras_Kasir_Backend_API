"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRepository = exports.softDelete = exports.update = exports.create = exports.findByName = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for supplier queries
const supplierSelectFields = {
    supplier_id: true,
    name: true,
    phone: true,
    address: true,
    created_at: true,
    updated_at: true,
};
// Select fields with count
const supplierWithCountSelect = {
    ...supplierSelectFields,
    _count: {
        select: {
            stock_movements: true,
        },
    },
};
/**
 * Find all suppliers with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }
        const suppliers = await prisma.supplier.findMany({
            where,
            select: supplierWithCountSelect,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return suppliers;
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count suppliers with filters
 */
const count = async (filter) => {
    try {
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }
        return await prisma.supplier.count({ where });
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find supplier by ID
 */
const findById = async (supplierId) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                supplier_id: supplierId,
                deleted_at: null,
            },
            select: supplierWithCountSelect,
        });
        return supplier;
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find supplier by name (for validation - check duplicate)
 */
const findByName = async (name, excludeSupplierId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };
        if (excludeSupplierId) {
            where.supplier_id = { not: excludeSupplierId };
        }
        const supplier = await prisma.supplier.findFirst({
            where,
            select: supplierSelectFields,
        });
        return supplier;
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
/**
 * Create new supplier
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const supplier = await client.supplier.create({
            data,
            select: supplierSelectFields,
        });
        return supplier;
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update supplier by ID
 */
const update = async (supplierId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const supplier = await client.supplier.update({
            where: { supplier_id: supplierId },
            data,
            select: supplierSelectFields,
        });
        return supplier;
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete supplier (set deleted_at)
 */
const softDelete = async (supplierId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.supplier.update({
            where: { supplier_id: supplierId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Supplier Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
exports.supplierRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.supplierRepository;
//# sourceMappingURL=supplier.repository.js.map