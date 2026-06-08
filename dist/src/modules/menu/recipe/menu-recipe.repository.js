"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRecipeRepository = exports.deleteByMenuId = exports.softDelete = exports.update = exports.create = exports.findByMenuAndIngredient = exports.findById = exports.findByMenuId = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for recipe queries
const recipeSelectFields = {
    menu_recipe_id: true,
    menu_id: true,
    ingredient_id: true,
    qty_needed: true,
    created_at: true,
    updated_at: true,
};
// Select fields with ingredient details
const recipeWithIngredientSelectFields = {
    ...recipeSelectFields,
    ingredient: {
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
    },
};
/**
 * Find all recipes for a menu
 */
const findByMenuId = async (menuId, transaction) => {
    try {
        const client = transaction || prisma;
        const recipes = await client.menuRecipe.findMany({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
            select: recipeWithIngredientSelectFields,
            orderBy: { created_at: 'asc' },
        });
        return recipes.map((r) => ({
            menu_recipe_id: r.menu_recipe_id,
            menu_id: r.menu_id,
            ingredient_id: r.ingredient_id,
            qty_needed: Number(r.qty_needed),
            created_at: r.created_at,
            updated_at: r.updated_at,
            ingredient: {
                ingredient_id: r.ingredient.ingredient_id,
                name: r.ingredient.name,
                stock_qty: Number(r.ingredient.stock_qty),
                avg_cost: Number(r.ingredient.avg_cost),
                unit: r.ingredient.unit,
            },
            subtotal: Number(r.qty_needed) * Number(r.ingredient.avg_cost),
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByMenuId = findByMenuId;
/**
 * Find recipe by ID
 */
const findById = async (recipeId) => {
    try {
        const recipe = await prisma.menuRecipe.findUnique({
            where: {
                menu_recipe_id: recipeId,
                deleted_at: null,
            },
            select: recipeWithIngredientSelectFields,
        });
        if (!recipe)
            return null;
        return {
            menu_recipe_id: recipe.menu_recipe_id,
            menu_id: recipe.menu_id,
            ingredient_id: recipe.ingredient_id,
            qty_needed: Number(recipe.qty_needed),
            created_at: recipe.created_at,
            updated_at: recipe.updated_at,
            ingredient: {
                ingredient_id: recipe.ingredient.ingredient_id,
                name: recipe.ingredient.name,
                stock_qty: Number(recipe.ingredient.stock_qty),
                avg_cost: Number(recipe.ingredient.avg_cost),
                unit: recipe.ingredient.unit,
            },
            subtotal: Number(recipe.qty_needed) * Number(recipe.ingredient.avg_cost),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find recipe by menu and ingredient (for duplicate check)
 */
const findByMenuAndIngredient = async (menuId, ingredientId, excludeRecipeId) => {
    try {
        const where = {
            menu_id: menuId,
            ingredient_id: ingredientId,
            deleted_at: null,
        };
        if (excludeRecipeId) {
            where.menu_recipe_id = { not: excludeRecipeId };
        }
        const recipe = await prisma.menuRecipe.findFirst({
            where,
            select: recipeSelectFields,
        });
        if (!recipe)
            return null;
        return {
            ...recipe,
            qty_needed: Number(recipe.qty_needed),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByMenuAndIngredient = findByMenuAndIngredient;
/**
 * Create new recipe
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const recipe = await client.menuRecipe.create({
            data: {
                menu_id: data.menu_id,
                ingredient_id: data.ingredient_id,
                qty_needed: data.qty_needed,
            },
            select: recipeWithIngredientSelectFields,
        });
        return {
            menu_recipe_id: recipe.menu_recipe_id,
            menu_id: recipe.menu_id,
            ingredient_id: recipe.ingredient_id,
            qty_needed: Number(recipe.qty_needed),
            created_at: recipe.created_at,
            updated_at: recipe.updated_at,
            ingredient: {
                ingredient_id: recipe.ingredient.ingredient_id,
                name: recipe.ingredient.name,
                stock_qty: Number(recipe.ingredient.stock_qty),
                avg_cost: Number(recipe.ingredient.avg_cost),
                unit: recipe.ingredient.unit,
            },
            subtotal: Number(recipe.qty_needed) * Number(recipe.ingredient.avg_cost),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update recipe qty
 */
const update = async (recipeId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const recipe = await client.menuRecipe.update({
            where: { menu_recipe_id: recipeId },
            data: { qty_needed: data.qty_needed },
            select: recipeWithIngredientSelectFields,
        });
        return {
            menu_recipe_id: recipe.menu_recipe_id,
            menu_id: recipe.menu_id,
            ingredient_id: recipe.ingredient_id,
            qty_needed: Number(recipe.qty_needed),
            created_at: recipe.created_at,
            updated_at: recipe.updated_at,
            ingredient: {
                ingredient_id: recipe.ingredient.ingredient_id,
                name: recipe.ingredient.name,
                stock_qty: Number(recipe.ingredient.stock_qty),
                avg_cost: Number(recipe.ingredient.avg_cost),
                unit: recipe.ingredient.unit,
            },
            subtotal: Number(recipe.qty_needed) * Number(recipe.ingredient.avg_cost),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete recipe
 */
const softDelete = async (recipeId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.menuRecipe.update({
            where: { menu_recipe_id: recipeId },
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
 * Delete all recipes for a menu (hard delete for bulk update)
 * This deletes ALL rows including soft-deleted ones to avoid unique constraint issues
 */
const deleteByMenuId = async (menuId, transaction) => {
    try {
        const client = transaction || prisma;
        // Hard delete ALL rows (including soft-deleted) to avoid unique constraint issues
        // No deleted_at filter - we want to clean everything
        await client.menuRecipe.deleteMany({
            where: { menu_id: menuId },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.deleteByMenuId = deleteByMenuId;
exports.menuRecipeRepository = {
    findByMenuId: exports.findByMenuId,
    findById: exports.findById,
    findByMenuAndIngredient: exports.findByMenuAndIngredient,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    deleteByMenuId: exports.deleteByMenuId,
};
exports.default = exports.menuRecipeRepository;
//# sourceMappingURL=menu-recipe.repository.js.map