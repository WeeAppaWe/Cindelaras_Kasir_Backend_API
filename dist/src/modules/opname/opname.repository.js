"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opnameRepository = exports.createStockMovement = exports.getOpnameItems = exports.updateIngredientStock = exports.getIngredientsForOpname = exports.getIngredientStock = exports.softDelete = exports.addItems = exports.deleteItems = exports.updateStatus = exports.update = exports.create = exports.findByIdWithDetails = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for opname list queries
const opnameListSelectFields = {
    stock_opname_id: true,
    opname_date: true,
    status: true,
    notes: true,
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
            items: true,
        },
    },
};
// Select fields for opname detail queries (with items)
const opnameDetailSelectFields = {
    stock_opname_id: true,
    opname_date: true,
    status: true,
    notes: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    items: {
        where: {
            deleted_at: null,
        },
        select: {
            stock_opname_item_id: true,
            ingredient_id: true,
            system_qty: true,
            physical_qty: true,
            difference: true,
            ingredient: {
                select: {
                    ingredient_id: true,
                    name: true,
                    unit: {
                        select: {
                            unit_measure_id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            ingredient: {
                name: 'asc',
            },
        },
    },
};
/**
 * Find all stock opnames with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, status, start_date, end_date } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by notes
        if (search) {
            where.notes = { contains: search, mode: 'insensitive' };
        }
        // Filter by status
        if (status) {
            where.status = status;
        }
        // Filter by date range
        if (start_date || end_date) {
            where.opname_date = {};
            if (start_date) {
                where.opname_date.gte = new Date(start_date);
            }
            if (end_date) {
                where.opname_date.lte = new Date(end_date);
            }
        }
        const opnames = await prisma.stockOpname.findMany({
            where,
            select: opnameListSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return opnames;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count stock opnames with filters
 */
const count = async (filter) => {
    try {
        const { search, status, start_date, end_date } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by notes
        if (search) {
            where.notes = { contains: search, mode: 'insensitive' };
        }
        // Filter by status
        if (status) {
            where.status = status;
        }
        // Filter by date range
        if (start_date || end_date) {
            where.opname_date = {};
            if (start_date) {
                where.opname_date.gte = new Date(start_date);
            }
            if (end_date) {
                where.opname_date.lte = new Date(end_date);
            }
        }
        return await prisma.stockOpname.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find stock opname by ID
 */
const findById = async (opnameId) => {
    try {
        const opname = await prisma.stockOpname.findUnique({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: opnameListSelectFields,
        });
        return opname;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find stock opname by ID with full details (including items)
 */
const findByIdWithDetails = async (opnameId) => {
    try {
        const opname = await prisma.stockOpname.findUnique({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: opnameDetailSelectFields,
        });
        if (!opname)
            return null;
        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByIdWithDetails = findByIdWithDetails;
/**
 * Create new stock opname with items
 */
const create = async (data, items, transaction) => {
    try {
        const client = transaction || prisma;
        // Create opname header
        const opname = await client.stockOpname.create({
            data: {
                user_id: data.user_id,
                opname_date: data.opname_date,
                status: data.status,
                notes: data.notes,
                items: {
                    create: items.map((item) => ({
                        ingredient_id: item.ingredient_id,
                        system_qty: item.system_qty,
                        physical_qty: item.physical_qty,
                        difference: item.difference,
                    })),
                },
            },
            select: opnameDetailSelectFields,
        });
        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update stock opname
 */
const update = async (opnameId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const opname = await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data,
            select: opnameDetailSelectFields,
        });
        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Update opname status
 */
const updateStatus = async (opnameId, status, transaction) => {
    try {
        const client = transaction || prisma;
        const opname = await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data: { status },
            select: opnameListSelectFields,
        });
        return opname;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateStatus = updateStatus;
/**
 * Delete all items of an opname (for replacement)
 */
const deleteItems = async (opnameId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.stockOpnameItem.updateMany({
            where: { stock_opname_id: opnameId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.deleteItems = deleteItems;
/**
 * Add items to opname
 */
const addItems = async (opnameId, items, transaction) => {
    try {
        const client = transaction || prisma;
        await client.stockOpnameItem.createMany({
            data: items.map((item) => ({
                stock_opname_id: opnameId,
                ingredient_id: item.ingredient_id,
                system_qty: item.system_qty,
                physical_qty: item.physical_qty,
                difference: item.difference,
            })),
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.addItems = addItems;
/**
 * Soft delete stock opname
 */
const softDelete = async (opnameId, transaction) => {
    try {
        const client = transaction || prisma;
        // Soft delete header
        await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data: { deleted_at: new Date() },
        });
        // Soft delete items
        await client.stockOpnameItem.updateMany({
            where: { stock_opname_id: opnameId },
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
 * Get ingredient current stock by ID
 */
const getIngredientStock = async (ingredientId, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredient = await client.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: { stock_qty: true },
        });
        return ingredient ? Number(ingredient.stock_qty) : null;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getIngredientStock = getIngredientStock;
/**
 * Get all ingredients for opname form
 */
const getIngredientsForOpname = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: { deleted_at: null },
            select: {
                ingredient_id: true,
                name: true,
                stock_qty: true,
                unit: {
                    select: {
                        unit_measure_id: true,
                        name: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        return ingredients.map((ing) => ({
            ...ing,
            stock_qty: Number(ing.stock_qty),
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getIngredientsForOpname = getIngredientsForOpname;
/**
 * Update ingredient stock (for adjustment)
 */
const updateIngredientStock = async (ingredientId, newStockQty, transaction) => {
    try {
        const client = transaction || prisma;
        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: { stock_qty: newStockQty },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateIngredientStock = updateIngredientStock;
/**
 * Get opname items for adjustment
 */
const getOpnameItems = async (opnameId, transaction) => {
    try {
        const client = transaction || prisma;
        const items = await client.stockOpnameItem.findMany({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                physical_qty: true,
                difference: true,
            },
        });
        return items.map((item) => ({
            ingredient_id: item.ingredient_id,
            physical_qty: Number(item.physical_qty),
            difference: Number(item.difference),
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getOpnameItems = getOpnameItems;
/**
 * Create stock movement record (for adjustment audit trail)
 */
const createStockMovement = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        await client.stockMovement.create({
            data: {
                ingredient_id: data.ingredient_id,
                user_id: data.user_id,
                stock_type_id: data.stock_type_id,
                qty: data.qty,
                current_stock: data.current_stock,
                notes: data.notes ?? null,
            },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.createStockMovement = createStockMovement;
exports.opnameRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByIdWithDetails: exports.findByIdWithDetails,
    create: exports.create,
    update: exports.update,
    updateStatus: exports.updateStatus,
    deleteItems: exports.deleteItems,
    addItems: exports.addItems,
    softDelete: exports.softDelete,
    getIngredientStock: exports.getIngredientStock,
    getIngredientsForOpname: exports.getIngredientsForOpname,
    updateIngredientStock: exports.updateIngredientStock,
    getOpnameItems: exports.getOpnameItems,
    createStockMovement: exports.createStockMovement,
};
exports.default = exports.opnameRepository;
//# sourceMappingURL=opname.repository.js.map