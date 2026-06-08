import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import { RecipeData, RecipeWithIngredient } from './menu-recipe.types';
import { Prisma } from '../../../generated/prisma/client';

const prisma = getPrismaClient();

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
export const findByMenuId = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<RecipeWithIngredient[]> => {
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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find recipe by ID
 */
export const findById = async (recipeId: string): Promise<RecipeWithIngredient | null> => {
    try {
        const recipe = await prisma.menuRecipe.findUnique({
            where: {
                menu_recipe_id: recipeId,
                deleted_at: null,
            },
            select: recipeWithIngredientSelectFields,
        });

        if (!recipe) return null;

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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find recipe by menu and ingredient (for duplicate check)
 */
export const findByMenuAndIngredient = async (
    menuId: string,
    ingredientId: string,
    excludeRecipeId?: string
): Promise<RecipeData | null> => {
    try {
        const where: Prisma.MenuRecipeWhereInput = {
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

        if (!recipe) return null;

        return {
            ...recipe,
            qty_needed: Number(recipe.qty_needed),
        };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new recipe
 */
export const create = async (
    data: { menu_id: string; ingredient_id: string; qty_needed: number },
    transaction?: Prisma.TransactionClient
): Promise<RecipeWithIngredient> => {
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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update recipe qty
 */
export const update = async (
    recipeId: string,
    data: { qty_needed: number },
    transaction?: Prisma.TransactionClient
): Promise<RecipeWithIngredient> => {
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
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete recipe
 */
export const softDelete = async (
    recipeId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.menuRecipe.update({
            where: { menu_recipe_id: recipeId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Delete all recipes for a menu (hard delete for bulk update)
 * This deletes ALL rows including soft-deleted ones to avoid unique constraint issues
 */
export const deleteByMenuId = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        // Hard delete ALL rows (including soft-deleted) to avoid unique constraint issues
        // No deleted_at filter - we want to clean everything
        await client.menuRecipe.deleteMany({
            where: { menu_id: menuId },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const menuRecipeRepository = {
    findByMenuId,
    findById,
    findByMenuAndIngredient,
    create,
    update,
    softDelete,
    deleteByMenuId,
};

export default menuRecipeRepository;

