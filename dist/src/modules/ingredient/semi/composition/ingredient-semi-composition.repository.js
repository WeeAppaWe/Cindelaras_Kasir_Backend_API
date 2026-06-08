"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositionRepository = exports.findIngredientCostsByIds = exports.findAvailableRawIngredients = exports.softDeleteByParentId = exports.softDelete = exports.update = exports.createMany = exports.create = exports.findByParentAndChild = exports.findById = exports.findByParentId = void 0;
const postgres_connection_1 = __importDefault(require("../../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for composition queries
const compositionSelectFields = {
    ingredient_composition_id: true,
    parent_id: true,
    child_id: true,
    qty_needed: true,
    child_ingredient: {
        select: {
            ingredient_id: true,
            name: true,
            type: true,
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
};
/**
 * Find all compositions for a parent semi ingredient
 */
const findByParentId = async (parentId, transaction) => {
    try {
        const client = transaction || prisma;
        const compositions = await client.ingredientComposition.findMany({
            where: {
                parent_id: parentId,
                deleted_at: null,
            },
            select: compositionSelectFields,
            orderBy: { child_ingredient: { name: 'asc' } },
        });
        return compositions;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByParentId = findByParentId;
/**
 * Find composition by ID
 */
const findById = async (compositionId, transaction) => {
    try {
        const client = transaction || prisma;
        const composition = await client.ingredientComposition.findUnique({
            where: {
                ingredient_composition_id: compositionId,
                deleted_at: null,
            },
            select: compositionSelectFields,
        });
        return composition;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find composition by parent and child (check duplicate)
 */
const findByParentAndChild = async (parentId, childId, excludeCompositionId) => {
    try {
        const where = {
            parent_id: parentId,
            child_id: childId,
            deleted_at: null,
        };
        if (excludeCompositionId) {
            where.ingredient_composition_id = { not: excludeCompositionId };
        }
        const composition = await prisma.ingredientComposition.findFirst({
            where,
            select: compositionSelectFields,
        });
        return composition;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByParentAndChild = findByParentAndChild;
/**
 * Create new composition
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const composition = await client.ingredientComposition.create({
            data,
            select: compositionSelectFields,
        });
        return composition;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Create many compositions (bulk)
 */
const createMany = async (compositions, transaction) => {
    try {
        const client = transaction || prisma;
        const result = await client.ingredientComposition.createMany({
            data: compositions,
        });
        return result.count;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.createMany = createMany;
/**
 * Update composition by ID
 */
const update = async (compositionId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const composition = await client.ingredientComposition.update({
            where: { ingredient_composition_id: compositionId },
            data,
            select: compositionSelectFields,
        });
        return composition;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete composition by ID
 */
const softDelete = async (compositionId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.ingredientComposition.update({
            where: { ingredient_composition_id: compositionId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
/**
 * Soft delete all compositions for a parent
 */
const softDeleteByParentId = async (parentId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.ingredientComposition.updateMany({
            where: {
                parent_id: parentId,
                deleted_at: null,
            },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDeleteByParentId = softDeleteByParentId;
/**
 * Find all available RAW ingredients (for composition selection)
 */
const findAvailableRawIngredients = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                type: 'RAW',
                deleted_at: null,
            },
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
            orderBy: { name: 'asc' },
        });
        return ingredients;
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAvailableRawIngredients = findAvailableRawIngredients;
/**
 * Find ingredient costs by IDs (for HPP calculation)
 */
const findIngredientCostsByIds = async (ingredientIds) => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                ingredient_id: { in: ingredientIds },
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                avg_cost: true,
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
            unit_name: i.unit.name,
        }));
    }
    catch (error) {
        console.error('--- Composition Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findIngredientCostsByIds = findIngredientCostsByIds;
exports.compositionRepository = {
    findByParentId: exports.findByParentId,
    findById: exports.findById,
    findByParentAndChild: exports.findByParentAndChild,
    create: exports.create,
    createMany: exports.createMany,
    update: exports.update,
    softDelete: exports.softDelete,
    softDeleteByParentId: exports.softDeleteByParentId,
    findAvailableRawIngredients: exports.findAvailableRawIngredients,
    findIngredientCostsByIds: exports.findIngredientCostsByIds,
};
exports.default = exports.compositionRepository;
//# sourceMappingURL=ingredient-semi-composition.repository.js.map