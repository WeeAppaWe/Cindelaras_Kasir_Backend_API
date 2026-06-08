import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { MenuRecipeWithIngredient, MenuPriceAndCost, IngredientCost } from './hpp.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// ============================================
// REPOSITORY FUNCTIONS
// ============================================

/**
 * Find all recipes for a menu with ingredient cost data
 */
export const findRecipesByMenuId = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<MenuRecipeWithIngredient[]> => {
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
    } catch (error) {
        console.error('--- HPP Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find menu price and cost by ID
 */
export const findMenuPriceAndCost = async (menuId: string): Promise<MenuPriceAndCost | null> => {
    try {
        const menu = await prisma.menu.findUnique({
            where: { menu_id: menuId },
            select: {
                menu_id: true,
                price: true,
                cost: true,
            },
        });

        if (!menu) return null;

        return {
            menu_id: menu.menu_id,
            price: Number(menu.price),
            cost: Number(menu.cost),
        };
    } catch (error) {
        console.error('--- HPP Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update menu cost (HPP)
 */
export const updateMenuCost = async (
    menuId: string,
    cost: number,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.menu.update({
            where: { menu_id: menuId },
            data: { cost },
        });
    } catch (error) {
        console.error('--- HPP Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find ingredient costs by IDs
 */
export const findIngredientCostsByIds = async (
    ingredientIds: string[]
): Promise<IngredientCost[]> => {
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
    } catch (error) {
        console.error('--- HPP Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// EXPORT
// ============================================

export const hppRepository = {
    findRecipesByMenuId,
    findMenuPriceAndCost,
    updateMenuCost,
    findIngredientCostsByIds,
};

export default hppRepository;
