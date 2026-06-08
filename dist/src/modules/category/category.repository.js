"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = exports.hasMenus = exports.softDelete = exports.update = exports.create = exports.findByName = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for category queries
const categorySelectFields = {
    category_id: true,
    name: true,
    created_at: true,
    updated_at: true,
};
// Select fields with menu count
const categoryWithCountSelectFields = {
    ...categorySelectFields,
    _count: {
        select: {
            menus: true,
        },
    },
};
/**
 * Find all categories with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        const categories = await prisma.category.findMany({
            where,
            select: categoryWithCountSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return categories;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count categories with filters
 */
const count = async (filter) => {
    try {
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        return await prisma.category.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find category by ID
 */
const findById = async (categoryId) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                category_id: categoryId,
                deleted_at: null,
            },
            select: categorySelectFields,
        });
        return category;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find category by name (for validation - check duplicate)
 */
const findByName = async (name, excludeCategoryId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };
        // Exclude specific category (for update validation)
        if (excludeCategoryId) {
            where.category_id = { not: excludeCategoryId };
        }
        const category = await prisma.category.findFirst({
            where,
            select: categorySelectFields,
        });
        return category;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
/**
 * Create new category
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const category = await client.category.create({
            data,
            select: categorySelectFields,
        });
        return category;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update category by ID
 */
const update = async (categoryId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const category = await client.category.update({
            where: { category_id: categoryId },
            data,
            select: categorySelectFields,
        });
        return category;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete category (set deleted_at)
 */
const softDelete = async (categoryId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.category.update({
            where: { category_id: categoryId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
/**
 * Check if category has menus (for delete validation)
 */
const hasMenus = async (categoryId) => {
    try {
        const count = await prisma.menu.count({
            where: {
                category_id: categoryId,
                deleted_at: null,
            },
        });
        return count > 0;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.hasMenus = hasMenus;
exports.categoryRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    hasMenus: exports.hasMenus,
};
exports.default = exports.categoryRepository;
//# sourceMappingURL=category.repository.js.map