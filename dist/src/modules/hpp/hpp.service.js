"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hppService = exports.calculateHPPFromRecipes = exports.getMenuCostSummary = exports.updateMenuCost = exports.calculateMenuHPP = exports.getMenuRecipesWithCost = void 0;
const cost_calculation_utility_1 = require("../../../utility/cost-calculation.utility");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const hpp_repository_1 = __importDefault(require("./hpp.repository"));
/**
 * Get recipes with ingredient cost for a menu
 */
const getMenuRecipesWithCost = async (menuId, transaction) => {
    try {
        const recipes = await hpp_repository_1.default.findRecipesByMenuId(menuId, transaction);
        return recipes.map((r) => ({
            menu_recipe_id: r.menu_recipe_id,
            ingredient_id: r.ingredient_id,
            qty_needed: r.qty_needed,
            ingredient: {
                name: r.ingredient.name,
                avg_cost: r.ingredient.avg_cost,
                unit: {
                    name: r.ingredient.unit.name,
                },
            },
        }));
    }
    catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};
exports.getMenuRecipesWithCost = getMenuRecipesWithCost;
/**
 * Calculate HPP for a menu based on its recipes
 */
const calculateMenuHPP = async (menuId, transaction) => {
    try {
        const recipes = await (0, exports.getMenuRecipesWithCost)(menuId, transaction);
        const recipeItems = recipes.map((r) => ({
            ingredient_id: r.ingredient_id,
            qty_needed: r.qty_needed,
            avg_cost: r.ingredient.avg_cost,
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        return {
            menu_id: menuId,
            total_hpp: totalHPP,
            recipe_count: recipes.length,
            recipes: recipes.map((r) => ({
                ingredient_name: r.ingredient.name,
                qty_needed: r.qty_needed,
                unit_name: r.ingredient.unit.name,
                unit_cost: r.ingredient.avg_cost,
                subtotal: (0, cost_calculation_utility_1.roundCurrency)(r.qty_needed * r.ingredient.avg_cost),
            })),
        };
    }
    catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};
exports.calculateMenuHPP = calculateMenuHPP;
/**
 * Update menu cost (HPP) in database
 */
const updateMenuCost = async (menuId, transaction) => {
    try {
        const hppResult = await (0, exports.calculateMenuHPP)(menuId, transaction);
        await hpp_repository_1.default.updateMenuCost(menuId, hppResult.total_hpp, transaction);
        return hppResult.total_hpp;
    }
    catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};
exports.updateMenuCost = updateMenuCost;
/**
 * Get complete cost summary for a menu
 */
const getMenuCostSummary = async (menuId) => {
    try {
        const menu = await hpp_repository_1.default.findMenuPriceAndCost(menuId);
        if (!menu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        const price = menu.price;
        const hpp = menu.cost;
        return {
            hpp,
            price,
            margin_percent: (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateMarginPercent)(price, hpp)),
            profit: (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateProfit)(price, hpp)),
        };
    }
    catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};
exports.getMenuCostSummary = getMenuCostSummary;
/**
 * Calculate HPP from provided recipes (for preview before saving)
 */
const calculateHPPFromRecipes = async (recipes) => {
    try {
        if (!recipes || recipes.length === 0) {
            return 0;
        }
        // Get ingredient costs from repository
        const ingredientIds = recipes.map((r) => r.ingredient_id);
        const ingredients = await hpp_repository_1.default.findIngredientCostsByIds(ingredientIds);
        const ingredientCostMap = new Map(ingredients.map((i) => [i.ingredient_id, i.avg_cost]));
        const recipeItems = recipes.map((r) => ({
            ingredient_id: r.ingredient_id,
            qty_needed: r.qty_needed,
            avg_cost: ingredientCostMap.get(r.ingredient_id) || 0,
        }));
        return (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
    }
    catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};
exports.calculateHPPFromRecipes = calculateHPPFromRecipes;
exports.hppService = {
    getMenuRecipesWithCost: exports.getMenuRecipesWithCost,
    calculateMenuHPP: exports.calculateMenuHPP,
    updateMenuCost: exports.updateMenuCost,
    getMenuCostSummary: exports.getMenuCostSummary,
    calculateHPPFromRecipes: exports.calculateHPPFromRecipes,
};
exports.default = exports.hppService;
//# sourceMappingURL=hpp.service.js.map