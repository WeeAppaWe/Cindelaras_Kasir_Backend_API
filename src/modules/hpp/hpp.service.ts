import { calculateHPP, calculateMarginPercent, calculateProfit, roundCurrency } from '../../../utility/cost-calculation.utility';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import hppRepository from './hpp.repository';
import { HPPCalculationResult, MenuCostSummary, RecipeWithCost } from './hpp.types';
import { Prisma } from '../../generated/prisma/client';

/**
 * Get recipes with ingredient cost for a menu
 */
export const getMenuRecipesWithCost = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<RecipeWithCost[]> => {
    try {
        const recipes = await hppRepository.findRecipesByMenuId(menuId, transaction);

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
    } catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};

/**
 * Calculate HPP for a menu based on its recipes
 */
export const calculateMenuHPP = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<HPPCalculationResult> => {
    try {
        const recipes = await getMenuRecipesWithCost(menuId, transaction);

        const recipeItems = recipes.map((r) => ({
            ingredient_id: r.ingredient_id,
            qty_needed: r.qty_needed,
            avg_cost: r.ingredient.avg_cost,
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));

        return {
            menu_id: menuId,
            total_hpp: totalHPP,
            recipe_count: recipes.length,
            recipes: recipes.map((r) => ({
                ingredient_name: r.ingredient.name,
                qty_needed: r.qty_needed,
                unit_name: r.ingredient.unit.name,
                unit_cost: r.ingredient.avg_cost,
                subtotal: roundCurrency(r.qty_needed * r.ingredient.avg_cost),
            })),
        };
    } catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};

/**
 * Update menu cost (HPP) in database
 */
export const updateMenuCost = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<number> => {
    try {
        const hppResult = await calculateMenuHPP(menuId, transaction);

        await hppRepository.updateMenuCost(menuId, hppResult.total_hpp, transaction);

        return hppResult.total_hpp;
    } catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};

/**
 * Get complete cost summary for a menu
 */
export const getMenuCostSummary = async (menuId: string): Promise<MenuCostSummary> => {
    try {
        const menu = await hppRepository.findMenuPriceAndCost(menuId);

        if (!menu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        const price = menu.price;
        const hpp = menu.cost;

        return {
            hpp,
            price,
            margin_percent: roundCurrency(calculateMarginPercent(price, hpp)),
            profit: roundCurrency(calculateProfit(price, hpp)),
        };
    } catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};

/**
 * Calculate HPP from provided recipes (for preview before saving)
 */
export const calculateHPPFromRecipes = async (
    recipes: { ingredient_id: string; qty_needed: number }[]
): Promise<number> => {
    try {
        if (!recipes || recipes.length === 0) {
            return 0;
        }

        // Get ingredient costs from repository
        const ingredientIds = recipes.map((r) => r.ingredient_id);
        const ingredients = await hppRepository.findIngredientCostsByIds(ingredientIds);

        const ingredientCostMap = new Map(
            ingredients.map((i) => [i.ingredient_id, i.avg_cost])
        );

        const recipeItems = recipes.map((r) => ({
            ingredient_id: r.ingredient_id,
            qty_needed: r.qty_needed,
            avg_cost: ingredientCostMap.get(r.ingredient_id) || 0,
        }));

        return roundCurrency(calculateHPP(recipeItems));
    } catch (error) {
        console.error('--- HPP Service Error:', error);
        throw error;
    }
};

export const hppService = {
    getMenuRecipesWithCost,
    calculateMenuHPP,
    updateMenuCost,
    getMenuCostSummary,
    calculateHPPFromRecipes,
};

export default hppService;
