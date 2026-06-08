"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hppRepository = exports.findIngredientCostsByIds = exports.updateMenuCost = exports.findMenuPriceAndCost = exports.findRecipesByMenuId = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// REPOSITORY FUNCTIONS
// ============================================
/**
 * Find all recipes for a menu with ingredient cost data
 */
const findRecipesByMenuId = async (menuId, transaction) => {
    try {
        const client = transaction || prisma;
        const recipes = await client.menuRecipe.findMany({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
            select: {
                menu_recipe_id: true,
                ingredient_id: true,
                qty_needed: true,
                ingredient: {
                    select: {
                        name: true,
                        avg_cost: true,
                        unit: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return recipes.map((r) => ({
            menu_recipe_id: r.menu_recipe_id,
            ingredient_id: r.ingredient_id,
            qty_needed: Number(r.qty_needed),
            ingredient: {
                name: r.ingredient.name,
                avg_cost: Number(r.ingredient.avg_cost),
                unit: {
                    name: r.ingredient.unit.name,
                },
            },
        }));
    }
    catch (error) {
        console.error('--- HPP Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findRecipesByMenuId = findRecipesByMenuId;
/**
 * Find menu price and cost by ID
 */
const findMenuPriceAndCost = async (menuId) => {
    try {
        const menu = await prisma.menu.findUnique({
            where: { menu_id: menuId },
            select: {
                menu_id: true,
                price: true,
                cost: true,
            },
        });
        if (!menu)
            return null;
        return {
            menu_id: menu.menu_id,
            price: Number(menu.price),
            cost: Number(menu.cost),
        };
    }
    catch (error) {
        console.error('--- HPP Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findMenuPriceAndCost = findMenuPriceAndCost;
/**
 * Update menu cost (HPP)
 */
const updateMenuCost = async (menuId, cost, transaction) => {
    try {
        const client = transaction || prisma;
        await client.menu.update({
            where: { menu_id: menuId },
            data: { cost },
        });
    }
    catch (error) {
        console.error('--- HPP Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateMenuCost = updateMenuCost;
/**
 * Find ingredient costs by IDs
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
                avg_cost: true,
            },
        });
        return ingredients.map((i) => ({
            ingredient_id: i.ingredient_id,
            avg_cost: Number(i.avg_cost),
        }));
    }
    catch (error) {
        console.error('--- HPP Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findIngredientCostsByIds = findIngredientCostsByIds;
// ============================================
// EXPORT
// ============================================
exports.hppRepository = {
    findRecipesByMenuId: exports.findRecipesByMenuId,
    findMenuPriceAndCost: exports.findMenuPriceAndCost,
    updateMenuCost: exports.updateMenuCost,
    findIngredientCostsByIds: exports.findIngredientCostsByIds,
};
exports.default = exports.hppRepository;
//# sourceMappingURL=hpp.repository.js.map