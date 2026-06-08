"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawIngredientRepository = exports.countLowStock = exports.findLowStock = exports.findUnitMeasureById = exports.findAllUnitMeasures = exports.softDelete = exports.update = exports.create = exports.findByName = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const ingredient_raw_types_1 = require("./ingredient-raw.types");
const prisma = (0, postgres_connection_1.default)();
// Select fields for raw ingredient queries
const rawIngredientSelectFields = {
    ingredient_id: true,
    name: true,
    type: true,
    stock_qty: true,
    min_stock: true,
    avg_cost: true,
    created_at: true,
    updated_at: true,
    unit: {
        select: {
            unit_measure_id: true,
            name: true,
        },
    },
};
/**
 * Find all raw ingredients with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, unit_id } = filter;
        const where = {
            deleted_at: null,
            type: ingredient_raw_types_1.IngredientType.RAW, // Only raw ingredients
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        // Filter by unit
        if (unit_id) {
            where.unit_id = unit_id;
        }
        // Note: low_stock filtering is handled by findLowStock() with raw query
        const ingredients = await prisma.ingredient.findMany({
            where,
            select: rawIngredientSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return ingredients;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count raw ingredients with filters
 */
const count = async (filter) => {
    try {
        const { search, unit_id } = filter;
        const where = {
            deleted_at: null,
            type: ingredient_raw_types_1.IngredientType.RAW,
        };
        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        // Filter by unit
        if (unit_id) {
            where.unit_id = unit_id;
        }
        return await prisma.ingredient.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find raw ingredient by ID
 */
const findById = async (ingredientId) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: ingredient_raw_types_1.IngredientType.RAW,
            },
            select: rawIngredientSelectFields,
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find raw ingredient by name (for validation - check duplicate)
 */
const findByName = async (name, excludeIngredientId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            type: ingredient_raw_types_1.IngredientType.RAW,
            deleted_at: null,
        };
        // Exclude specific ingredient (for update validation)
        if (excludeIngredientId) {
            where.ingredient_id = { not: excludeIngredientId };
        }
        const ingredient = await prisma.ingredient.findFirst({
            where,
            select: rawIngredientSelectFields,
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
/**
 * Create new raw ingredient
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredient = await client.ingredient.create({
            data: {
                ...data,
                type: ingredient_raw_types_1.IngredientType.RAW, // Ensure type is RAW
            },
            select: rawIngredientSelectFields,
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update raw ingredient by ID
 */
const update = async (ingredientId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredient = await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data,
            select: rawIngredientSelectFields,
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete raw ingredient (set deleted_at)
 */
const softDelete = async (ingredientId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
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
 * Get all unit measures (for dropdown/selection)
 */
const findAllUnitMeasures = async () => {
    try {
        return await prisma.unitMeasure.findMany({
            where: { deleted_at: null },
            select: {
                unit_measure_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllUnitMeasures = findAllUnitMeasures;
/**
 * Find unit measure by ID
 */
const findUnitMeasureById = async (unitMeasureId) => {
    try {
        return await prisma.unitMeasure.findUnique({
            where: {
                unit_measure_id: unitMeasureId,
                deleted_at: null,
            },
            select: {
                unit_measure_id: true,
                name: true,
            },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findUnitMeasureById = findUnitMeasureById;
/**
 * Get low stock raw ingredients (stock_qty < min_stock)
 */
const findLowStock = async () => {
    try {
        // Use raw query to compare stock_qty with min_stock
        const ingredients = await prisma.$queryRaw `
            SELECT 
                i.ingredient_id,
                i.name,
                i.type,
                i.stock_qty,
                i.min_stock,
                i.avg_cost,
                i.created_at,
                i.updated_at,
                json_build_object(
                    'unit_measure_id', u.unit_measure_id,
                    'name', u.name
                ) as unit
            FROM ingredients i
            JOIN unit_measures u ON i.unit_id = u.unit_measure_id
            WHERE i.deleted_at IS NULL
              AND i.type = 'RAW'
              AND i.stock_qty < i.min_stock
            ORDER BY (i.stock_qty / NULLIF(i.min_stock, 0)) ASC
        `;
        return ingredients;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findLowStock = findLowStock;
/**
 * Count low stock raw ingredients
 */
const countLowStock = async () => {
    try {
        const result = await prisma.$queryRaw `
            SELECT COUNT(*) as count
            FROM ingredients
            WHERE deleted_at IS NULL
              AND type = 'RAW'
              AND stock_qty < min_stock
        `;
        return Number(result[0].count);
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.countLowStock = countLowStock;
exports.rawIngredientRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    findAllUnitMeasures: exports.findAllUnitMeasures,
    findUnitMeasureById: exports.findUnitMeasureById,
    findLowStock: exports.findLowStock,
    countLowStock: exports.countLowStock,
};
exports.default = exports.rawIngredientRepository;
//# sourceMappingURL=ingredient-raw.repository.js.map