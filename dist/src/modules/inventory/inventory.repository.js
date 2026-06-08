"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRepository = exports.findByIngredientId = exports.updateIngredientStock = exports.findSupplierById = exports.findIngredientById = exports.findStockTypeByName = exports.findAllStockTypes = exports.create = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// SELECT FIELDS
// ============================================
const stockMovementSelectFields = {
    stock_movement_id: true,
    supplier_id: true,
    ingredient_id: true,
    user_id: true,
    stock_type_id: true,
    qty: true,
    unit_cost: true,
    current_stock: true,
    notes: true,
    created_at: true,
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
    supplier: {
        select: {
            supplier_id: true,
            name: true,
        },
    },
    stock_type: {
        select: {
            stock_type_id: true,
            name: true,
        },
    },
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
};
// ============================================
// REPOSITORY FUNCTIONS
// ============================================
/**
 * Find all stock movements with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const where = {
            deleted_at: null,
        };
        // Apply filters
        if (filter.search) {
            where.OR = [
                { ingredient: { name: { contains: filter.search, mode: 'insensitive' } } },
                { notes: { contains: filter.search, mode: 'insensitive' } },
            ];
        }
        if (filter.ingredient_id) {
            where.ingredient_id = filter.ingredient_id;
        }
        if (filter.supplier_id) {
            where.supplier_id = filter.supplier_id;
        }
        if (filter.stock_type_id) {
            where.stock_type_id = filter.stock_type_id;
        }
        if (filter.date_from || filter.date_to) {
            where.created_at = {};
            if (filter.date_from) {
                where.created_at.gte = filter.date_from;
            }
            if (filter.date_to) {
                where.created_at.lte = filter.date_to;
            }
        }
        const movements = await prisma.stockMovement.findMany({
            where,
            select: stockMovementSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return movements;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count stock movements with filters
 */
const count = async (filter) => {
    try {
        const where = {
            deleted_at: null,
        };
        if (filter.search) {
            where.OR = [
                { ingredient: { name: { contains: filter.search, mode: 'insensitive' } } },
                { notes: { contains: filter.search, mode: 'insensitive' } },
            ];
        }
        if (filter.ingredient_id) {
            where.ingredient_id = filter.ingredient_id;
        }
        if (filter.supplier_id) {
            where.supplier_id = filter.supplier_id;
        }
        if (filter.stock_type_id) {
            where.stock_type_id = filter.stock_type_id;
        }
        if (filter.date_from || filter.date_to) {
            where.created_at = {};
            if (filter.date_from) {
                where.created_at.gte = filter.date_from;
            }
            if (filter.date_to) {
                where.created_at.lte = filter.date_to;
            }
        }
        return await prisma.stockMovement.count({ where });
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find stock movement by ID
 */
const findById = async (stockMovementId) => {
    try {
        const movement = await prisma.stockMovement.findUnique({
            where: {
                stock_movement_id: stockMovementId,
                deleted_at: null,
            },
            select: stockMovementSelectFields,
        });
        return movement;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Create new stock movement
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const movement = await client.stockMovement.create({
            data,
            select: stockMovementSelectFields,
        });
        return movement;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Find stock types
 */
const findAllStockTypes = async () => {
    try {
        const stockTypes = await prisma.stockType.findMany({
            where: { deleted_at: null },
            select: {
                stock_type_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
        return stockTypes;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllStockTypes = findAllStockTypes;
/**
 * Find stock type by name
 */
const findStockTypeByName = async (name) => {
    try {
        const stockType = await prisma.stockType.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
            },
        });
        return stockType;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findStockTypeByName = findStockTypeByName;
/**
 * Find ingredient by ID
 */
const findIngredientById = async (ingredientId) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                stock_qty: true,
                avg_cost: true,
                unit: {
                    select: {
                        unit_measure_id: true,
                        name: true,
                    },
                },
            },
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findIngredientById = findIngredientById;
/**
 * Find supplier by ID
 */
const findSupplierById = async (supplierId) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                supplier_id: supplierId,
                deleted_at: null,
            },
            select: {
                supplier_id: true,
                name: true,
            },
        });
        return supplier;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findSupplierById = findSupplierById;
/**
 * Update ingredient stock quantity and avg_cost
 */
const updateIngredientStock = async (ingredientId, stockQty, avgCost, transaction) => {
    try {
        const client = transaction || prisma;
        const updateData = {
            stock_qty: stockQty,
        };
        if (avgCost !== undefined) {
            updateData.avg_cost = avgCost;
        }
        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: updateData,
        });
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateIngredientStock = updateIngredientStock;
/**
 * Get stock movements by ingredient (for history)
 */
const findByIngredientId = async (ingredientId, options) => {
    try {
        const movements = await prisma.stockMovement.findMany({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: stockMovementSelectFields,
            orderBy: { created_at: 'desc' },
            take: options.pagination.limit,
            skip: options.pagination.offset,
        });
        return movements;
    }
    catch (error) {
        console.error('--- Inventory Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByIngredientId = findByIngredientId;
exports.inventoryRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    create: exports.create,
    findAllStockTypes: exports.findAllStockTypes,
    findStockTypeByName: exports.findStockTypeByName,
    findIngredientById: exports.findIngredientById,
    findSupplierById: exports.findSupplierById,
    updateIngredientStock: exports.updateIngredientStock,
    findByIngredientId: exports.findByIngredientId,
};
exports.default = exports.inventoryRepository;
//# sourceMappingURL=inventory.repository.js.map