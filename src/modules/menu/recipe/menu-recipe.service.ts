import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';
import getPrismaClient from '../../../../database/postgres.connection';
import { AuthenticatedRequest } from '../../../../types';
import menuRecipeRepository from './menu-recipe.repository';
import menuRepository from '../menu.repository';
import hppService from '../../hpp/hpp.service';
import {
    CreateRecipeRequest,
    UpdateRecipeRequest,
    BulkRecipeRequest,
    RecipeListResponse,
    RecipeWithIngredient,
    DeleteRecipeResponse,
    AddRecipeResponse,
} from './menu-recipe.types';

const prisma = getPrismaClient();

/**
 * Get all recipes for a menu
 */
export const getByMenuId = async (req: AuthenticatedRequest): Promise<RecipeListResponse> => {
    try {
        const menuId = req.params.menu_id;

        // Check if menu exists
        const menu = await menuRepository.findById(menuId);
        if (!menu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        const recipes = await menuRecipeRepository.findByMenuId(menuId);
        const hppResult = await hppService.calculateMenuHPP(menuId);

        return {
            menu_id: menuId,
            recipes,
            total_hpp: hppResult.total_hpp,
        };
    } catch (error) {
        console.error(`--- Recipe Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Add recipe to menu
 */
export const addRecipe = async (req: AuthenticatedRequest): Promise<AddRecipeResponse> => {
    try {
        const menuId = req.params.menu_id;
        const body: CreateRecipeRequest = req.body;

        // Check if menu exists
        const menu = await menuRepository.findById(menuId);
        if (!menu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        // Check if ingredient exists
        const ingredient = await prisma.ingredient.findUnique({
            where: { ingredient_id: body.ingredient_id, deleted_at: null },
        });
        if (!ingredient) {
            throw new ErrorValidationException('Bahan baku tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan baku tidak ditemukan' },
            ]);
        }

        // Check if ingredient already in recipe
        const existingRecipe = await menuRecipeRepository.findByMenuAndIngredient(menuId, body.ingredient_id);
        if (existingRecipe) {
            throw new ErrorDataAlreadyExistException('Bahan baku sudah ada dalam resep');
        }

        // Create recipe and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const recipe = await menuRecipeRepository.create(
                {
                    menu_id: menuId,
                    ingredient_id: body.ingredient_id,
                    qty_needed: body.qty_needed,
                },
                transaction
            );

            // Update menu HPP within transaction
            const newHPP = await hppService.updateMenuCost(menuId, transaction);

            return {
                recipe,
                new_hpp: newHPP
            };
        });

        return result;
    } catch (error) {
        console.error(`--- Recipe Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update recipe qty
 */
export const updateRecipe = async (req: AuthenticatedRequest): Promise<AddRecipeResponse> => {
    try {
        const { menu_id: menuId, recipe_id: recipeId } = req.params;
        const body: UpdateRecipeRequest = req.body;

        // Check if recipe exists
        const existingRecipe = await menuRecipeRepository.findById(recipeId);
        if (!existingRecipe) {
            throw new ErrorNotFoundException('Resep tidak ditemukan');
        }

        // Verify recipe belongs to menu
        if (existingRecipe.menu_id !== menuId) {
            throw new ErrorValidationException('Resep tidak ditemukan pada menu ini', [
                { location: 'params', field: 'recipe_id', message: 'Resep tidak ditemukan pada menu ini' },
            ]);
        }

        // Update recipe and HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const recipe = await menuRecipeRepository.update(recipeId, {
                qty_needed: body.qty_needed,
            }, transaction);

            // Update menu HPP within transaction
            const newHPP = await hppService.updateMenuCost(menuId, transaction);

            return {
                recipe,
                new_hpp: newHPP
            };
        });

        return result;
    } catch (error) {
        console.error(`--- Recipe Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Remove recipe from menu
 */
export const removeRecipe = async (req: AuthenticatedRequest): Promise<DeleteRecipeResponse> => {
    try {
        const { menu_id: menuId, recipe_id: recipeId } = req.params;

        // Check if recipe exists
        const existingRecipe = await menuRecipeRepository.findById(recipeId);
        if (!existingRecipe) {
            throw new ErrorNotFoundException('Resep tidak ditemukan');
        }

        // Verify recipe belongs to menu
        if (existingRecipe.menu_id !== menuId) {
            throw new ErrorValidationException('Resep tidak ditemukan pada menu ini', [
                { location: 'params', field: 'recipe_id', message: 'Resep tidak ditemukan pada menu ini' },
            ]);
        }

        // Soft delete recipe and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            await menuRecipeRepository.softDelete(recipeId, transaction);

            // Update menu HPP within transaction
            const newHPP = await hppService.updateMenuCost(menuId, transaction);

            return newHPP;
        });

        return {
            success: true,
            message: 'Bahan berhasil dihapus dari resep',
            new_hpp: result,
        };
    } catch (error) {
        console.error(`--- Recipe Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Bulk add/replace recipes for a menu
 */
export const bulkUpdateRecipes = async (req: AuthenticatedRequest): Promise<RecipeListResponse> => {
    try {
        const menuId = req.params.menu_id;
        const body: BulkRecipeRequest = req.body;

        // Check if menu exists
        const menu = await menuRepository.findById(menuId);
        if (!menu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        // Validate all ingredients exist
        const ingredientIds = body.recipes.map((r) => r.ingredient_id);
        const ingredients = await prisma.ingredient.findMany({
            where: { ingredient_id: { in: ingredientIds }, deleted_at: null },
        });

        if (ingredients.length !== ingredientIds.length) {
            throw new ErrorValidationException('Beberapa bahan baku tidak ditemukan', [
                { location: 'body', field: 'recipes', message: 'Beberapa bahan baku tidak ditemukan' },
            ]);
        }

        // Check for duplicate ingredients in request
        const uniqueIngredients = new Set(ingredientIds);
        if (uniqueIngredients.size !== ingredientIds.length) {
            throw new ErrorValidationException('Terdapat bahan baku duplikat', [
                { location: 'body', field: 'recipes', message: 'Terdapat bahan baku duplikat dalam permintaan' },
            ]);
        }

        // Replace all recipes and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Delete existing recipes
            console.log(`[DEBUG] Deleting all recipes for menu_id: ${menuId}`);
            await menuRecipeRepository.deleteByMenuId(menuId, transaction);
            console.log(`[DEBUG] Deleted. Now creating ${body.recipes.length} new recipes`);

            // Create new recipes using createMany for better performance
            const recipesData = body.recipes.map(recipe => ({
                menu_id: menuId,
                ingredient_id: recipe.ingredient_id,
                qty_needed: recipe.qty_needed,
            }));

            await transaction.menuRecipe.createMany({
                data: recipesData,
                skipDuplicates: true, // Skip if duplicate exists (safety net)
            });
            console.log(`[DEBUG] Created ${body.recipes.length} recipes successfully`);

            // Update menu HPP within transaction
            await hppService.updateMenuCost(menuId, transaction);

            // Return latest state (read within transaction to ensure consistency)
            const recipes = await menuRecipeRepository.findByMenuId(menuId, transaction);
            const hppResult = await hppService.calculateMenuHPP(menuId, transaction);

            return {
                menu_id: menuId,
                recipes,
                total_hpp: hppResult.total_hpp,
            };
        });

        return result;
    } catch (error) {
        console.error(`--- Recipe Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const menuRecipeService = {
    getByMenuId,
    addRecipe,
    updateRecipe,
    removeRecipe,
    bulkUpdateRecipes,
};

export default menuRecipeService;



