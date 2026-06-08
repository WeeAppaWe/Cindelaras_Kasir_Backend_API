"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRepository = exports.hasOrders = exports.softDelete = exports.update = exports.create = exports.findByName = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for menu queries
const menuSelectFields = {
    menu_id: true,
    name: true,
    price: true,
    cost: true,
    description: true,
    image_url: true,
    is_available: true,
    created_at: true,
    updated_at: true,
    category: {
        select: {
            category_id: true,
            name: true,
        },
    },
};
// Select fields with recipe count
const menuWithCountSelectFields = {
    ...menuSelectFields,
    _count: {
        select: {
            recipes: true,
        },
    },
};
/**
 * Find all menus with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, category_id, is_available } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        // Filter by category
        if (category_id) {
            where.category_id = category_id;
        }
        // Filter by availability
        if (is_available !== undefined && is_available !== null) {
            where.is_available = is_available;
        }
        const menus = await prisma.menu.findMany({
            where,
            select: menuWithCountSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return menus.map((menu) => ({
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
            _count: menu._count,
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count menus with filters
 */
const count = async (filter) => {
    try {
        const { search, category_id, is_available } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        // Filter by category
        if (category_id) {
            where.category_id = category_id;
        }
        // Filter by availability
        if (is_available !== undefined && is_available !== null) {
            where.is_available = is_available;
        }
        return await prisma.menu.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find menu by ID
 */
const findById = async (menuId) => {
    try {
        const menu = await prisma.menu.findUnique({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
            select: menuSelectFields,
        });
        if (!menu)
            return null;
        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find menu by name (for validation - check duplicate)
 */
const findByName = async (name, excludeMenuId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };
        // Exclude specific menu (for update validation)
        if (excludeMenuId) {
            where.menu_id = { not: excludeMenuId };
        }
        const menu = await prisma.menu.findFirst({
            where,
            select: menuSelectFields,
        });
        if (!menu)
            return null;
        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
/**
 * Create new menu
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const menu = await client.menu.create({
            data,
            select: menuSelectFields,
        });
        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update menu by ID
 */
const update = async (menuId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const menu = await client.menu.update({
            where: { menu_id: menuId },
            data,
            select: menuSelectFields,
        });
        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete menu (set deleted_at)
 */
const softDelete = async (menuId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.menu.update({
            where: { menu_id: menuId },
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
 * Check if menu has orders (for delete validation)
 */
const hasOrders = async (menuId) => {
    try {
        const count = await prisma.orderItem.count({
            where: {
                menu_id: menuId,
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
exports.hasOrders = hasOrders;
exports.menuRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    hasOrders: exports.hasOrders,
};
exports.default = exports.menuRepository;
//# sourceMappingURL=menu.repository.js.map