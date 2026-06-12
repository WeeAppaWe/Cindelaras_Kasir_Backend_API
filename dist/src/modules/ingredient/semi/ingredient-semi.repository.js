"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semiIngredientRepository = exports.findIngredientsByIds = exports.findUnitMeasureById = exports.findAllUnitMeasures = exports.softDelete = exports.updateAvgCost = exports.update = exports.create = exports.findByName = exports.findByIdWithCompositionsAndStock = exports.findByIdWithCompositions = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const ingredient_semi_types_1 = require("./ingredient-semi.types");
const prisma = (0, postgres_connection_1.default)();
// Select fields for semi ingredient queries (without compositions)
const semiIngredientSelectFields = {
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
// Select fields with compositions
const semiIngredientWithCompositionsSelect = {
    ...semiIngredientSelectFields,
    child_compositions: {
        where: { deleted_at: null },
        select: {
            ingredient_composition_id: true,
            child_id: true,
            qty_needed: true,
            child_ingredient: {
                select: {
                    ingredient_id: true,
                    name: true,
                    avg_cost: true,
                    unit: {
                        select: {
                            unit_measure_id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    },
};
// Select fields with compositions AND stock_qty on child ingredient
const semiIngredientWithCompositionsAndStockSelect = {
    ...semiIngredientSelectFields,
    child_compositions: {
        where: { deleted_at: null },
        select: {
            ingredient_composition_id: true,
            child_id: true,
            qty_needed: true,
            child_ingredient: {
                select: {
                    ingredient_id: true,
                    name: true,
                    avg_cost: true,
                    stock_qty: true,
                    unit: {
                        select: {
                            unit_measure_id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    },
};
/**
 * Find all semi ingredients with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, unit_id } = filter;
        const where = {
            deleted_at: null,
            type: ingredient_semi_types_1.IngredientType.SEMI,
        };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        if (unit_id) {
            where.unit_id = unit_id;
        }
        const ingredients = await prisma.ingredient.findMany({
            where,
            select: semiIngredientSelectFields,
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
 * Count semi ingredients with filters
 */
const count = async (filter) => {
    try {
        const { search, unit_id } = filter;
        const where = {
            deleted_at: null,
            type: ingredient_semi_types_1.IngredientType.SEMI,
        };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
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
 * Find semi ingredient by ID (basic info)
 */
const findById = async (ingredientId) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: ingredient_semi_types_1.IngredientType.SEMI,
            },
            select: semiIngredientSelectFields,
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
 * Find semi ingredient by ID with compositions
 */
const findByIdWithCompositions = async (ingredientId) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: ingredient_semi_types_1.IngredientType.SEMI,
            },
            select: semiIngredientWithCompositionsSelect,
        });
        return ingredient;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByIdWithCompositions = findByIdWithCompositions;
/**
 * Find semi ingredient by ID with compositions and child stock_qty
 */
const findByIdWithCompositionsAndStock = async (ingredientId) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: ingredient_semi_types_1.IngredientType.SEMI,
            },
            select: semiIngredientWithCompositionsAndStockSelect,
        });
        return ingredient ?? null;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByIdWithCompositionsAndStock = findByIdWithCompositionsAndStock;
/**
 * Find semi ingredient by name (for validation - check duplicate)
 */
const findByName = async (name, excludeIngredientId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            type: ingredient_semi_types_1.IngredientType.SEMI,
            deleted_at: null,
        };
        if (excludeIngredientId) {
            where.ingredient_id = { not: excludeIngredientId };
        }
        const ingredient = await prisma.ingredient.findFirst({
            where,
            select: semiIngredientSelectFields,
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
 * Create new semi ingredient
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredient = await client.ingredient.create({
            data: {
                ...data,
                type: ingredient_semi_types_1.IngredientType.SEMI,
            },
            select: semiIngredientSelectFields,
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
 * Update semi ingredient by ID
 */
const update = async (ingredientId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredient = await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data,
            select: semiIngredientSelectFields,
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
 * Update avg_cost (HPP per unit) for semi ingredient
 */
const updateAvgCost = async (ingredientId, avgCost, transaction) => {
    try {
        const client = transaction || prisma;
        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: { avg_cost: avgCost },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateAvgCost = updateAvgCost;
/**
 * Soft delete semi ingredient (set deleted_at)
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
 * Find ingredients by IDs — returns stock_qty, avg_cost, unit name
 * Used for create-and-produce validation
 */
const findIngredientsByIds = async (ingredientIds, transaction) => {
    try {
        const client = transaction || prisma;
        const ingredients = await client.ingredient.findMany({
            where: {
                ingredient_id: { in: ingredientIds },
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                avg_cost: true,
                stock_qty: true,
                unit: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return ingredients.map((i) => ({
            ingredient_id: i.ingredient_id,
            name: i.name,
            avg_cost: Number(i.avg_cost),
            stock_qty: Number(i.stock_qty),
            unit_name: i.unit.name,
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findIngredientsByIds = findIngredientsByIds;
exports.semiIngredientRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByIdWithCompositions: exports.findByIdWithCompositions,
    findByIdWithCompositionsAndStock: exports.findByIdWithCompositionsAndStock,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    updateAvgCost: exports.updateAvgCost,
    softDelete: exports.softDelete,
    findAllUnitMeasures: exports.findAllUnitMeasures,
    findUnitMeasureById: exports.findUnitMeasureById,
    findIngredientsByIds: exports.findIngredientsByIds,
};
exports.default = exports.semiIngredientRepository;
//# sourceMappingURL=ingredient-semi.repository.js.map