"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRecipeService = exports.bulkUpdateRecipes = exports.removeRecipe = exports.updateRecipe = exports.addRecipe = exports.getByMenuId = void 0;
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const menu_recipe_repository_1 = __importDefault(require("./menu-recipe.repository"));
const menu_repository_1 = __importDefault(require("../menu.repository"));
const hpp_service_1 = __importDefault(require("../../hpp/hpp.service"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all recipes for a menu
 */
const getByMenuId = async (req) => {
    try {
        const menuId = req.params.menu_id;
        // Check if menu exists
        const menu = await menu_repository_1.default.findById(menuId);
        if (!menu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        const recipes = await menu_recipe_repository_1.default.findByMenuId(menuId);
        const hppResult = await hpp_service_1.default.calculateMenuHPP(menuId);
        return {
            menu_id: menuId,
            recipes,
            total_hpp: hppResult.total_hpp,
        };
    }
    catch (error) {
        console.error(`--- Recipe Service Error: ${error.message}`);
        throw error;
    }
};
exports.getByMenuId = getByMenuId;
/**
 * Add recipe to menu
 */
const addRecipe = async (req) => {
    try {
        const menuId = req.params.menu_id;
        const body = req.body;
        // Check if menu exists
        const menu = await menu_repository_1.default.findById(menuId);
        if (!menu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        // Check if ingredient exists
        const ingredient = await prisma.ingredient.findUnique({
            where: { ingredient_id: body.ingredient_id, deleted_at: null },
        });
        if (!ingredient) {
            throw new error_validation_exception_1.ErrorValidationException('Bahan baku tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan baku tidak ditemukan' },
            ]);
        }
        // Check if ingredient already in recipe
        const existingRecipe = await menu_recipe_repository_1.default.findByMenuAndIngredient(menuId, body.ingredient_id);
        if (existingRecipe) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Bahan baku sudah ada dalam resep');
        }
        // Create recipe and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const recipe = await menu_recipe_repository_1.default.create({
                menu_id: menuId,
                ingredient_id: body.ingredient_id,
                qty_needed: body.qty_needed,
            }, transaction);
            // Update menu HPP within transaction
            const newHPP = await hpp_service_1.default.updateMenuCost(menuId, transaction);
            return {
                recipe,
                new_hpp: newHPP
            };
        });
        return result;
    }
    catch (error) {
        console.error(`--- Recipe Service Error: ${error.message}`);
        throw error;
    }
};
exports.addRecipe = addRecipe;
/**
 * Update recipe qty
 */
const updateRecipe = async (req) => {
    try {
        const { menu_id: menuId, recipe_id: recipeId } = req.params;
        const body = req.body;
        // Check if recipe exists
        const existingRecipe = await menu_recipe_repository_1.default.findById(recipeId);
        if (!existingRecipe) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Resep tidak ditemukan');
        }
        // Verify recipe belongs to menu
        if (existingRecipe.menu_id !== menuId) {
            throw new error_validation_exception_1.ErrorValidationException('Resep tidak ditemukan pada menu ini', [
                { location: 'params', field: 'recipe_id', message: 'Resep tidak ditemukan pada menu ini' },
            ]);
        }
        // Update recipe and HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const recipe = await menu_recipe_repository_1.default.update(recipeId, {
                qty_needed: body.qty_needed,
            }, transaction);
            // Update menu HPP within transaction
            const newHPP = await hpp_service_1.default.updateMenuCost(menuId, transaction);
            return {
                recipe,
                new_hpp: newHPP
            };
        });
        return result;
    }
    catch (error) {
        console.error(`--- Recipe Service Error: ${error.message}`);
        throw error;
    }
};
exports.updateRecipe = updateRecipe;
/**
 * Remove recipe from menu
 */
const removeRecipe = async (req) => {
    try {
        const { menu_id: menuId, recipe_id: recipeId } = req.params;
        // Check if recipe exists
        const existingRecipe = await menu_recipe_repository_1.default.findById(recipeId);
        if (!existingRecipe) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Resep tidak ditemukan');
        }
        // Verify recipe belongs to menu
        if (existingRecipe.menu_id !== menuId) {
            throw new error_validation_exception_1.ErrorValidationException('Resep tidak ditemukan pada menu ini', [
                { location: 'params', field: 'recipe_id', message: 'Resep tidak ditemukan pada menu ini' },
            ]);
        }
        // Soft delete recipe and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            await menu_recipe_repository_1.default.softDelete(recipeId, transaction);
            // Update menu HPP within transaction
            const newHPP = await hpp_service_1.default.updateMenuCost(menuId, transaction);
            return newHPP;
        });
        return {
            success: true,
            message: 'Bahan berhasil dihapus dari resep',
            new_hpp: result,
        };
    }
    catch (error) {
        console.error(`--- Recipe Service Error: ${error.message}`);
        throw error;
    }
};
exports.removeRecipe = removeRecipe;
/**
 * Bulk add/replace recipes for a menu
 */
const bulkUpdateRecipes = async (req) => {
    try {
        const menuId = req.params.menu_id;
        const body = req.body;
        // Check if menu exists
        const menu = await menu_repository_1.default.findById(menuId);
        if (!menu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        // Validate all ingredients exist
        const ingredientIds = body.recipes.map((r) => r.ingredient_id);
        const ingredients = await prisma.ingredient.findMany({
            where: { ingredient_id: { in: ingredientIds }, deleted_at: null },
        });
        if (ingredients.length !== ingredientIds.length) {
            throw new error_validation_exception_1.ErrorValidationException('Beberapa bahan baku tidak ditemukan', [
                { location: 'body', field: 'recipes', message: 'Beberapa bahan baku tidak ditemukan' },
            ]);
        }
        // Check for duplicate ingredients in request
        const uniqueIngredients = new Set(ingredientIds);
        if (uniqueIngredients.size !== ingredientIds.length) {
            throw new error_validation_exception_1.ErrorValidationException('Terdapat bahan baku duplikat', [
                { location: 'body', field: 'recipes', message: 'Terdapat bahan baku duplikat dalam permintaan' },
            ]);
        }
        // Replace all recipes and update HPP in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Delete existing recipes
            console.log(`[DEBUG] Deleting all recipes for menu_id: ${menuId}`);
            await menu_recipe_repository_1.default.deleteByMenuId(menuId, transaction);
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
            await hpp_service_1.default.updateMenuCost(menuId, transaction);
            // Return latest state (read within transaction to ensure consistency)
            const recipes = await menu_recipe_repository_1.default.findByMenuId(menuId, transaction);
            const hppResult = await hpp_service_1.default.calculateMenuHPP(menuId, transaction);
            return {
                menu_id: menuId,
                recipes,
                total_hpp: hppResult.total_hpp,
            };
        });
        return result;
    }
    catch (error) {
        console.error(`--- Recipe Service Error: ${error.message}`);
        throw error;
    }
};
exports.bulkUpdateRecipes = bulkUpdateRecipes;
exports.menuRecipeService = {
    getByMenuId: exports.getByMenuId,
    addRecipe: exports.addRecipe,
    updateRecipe: exports.updateRecipe,
    removeRecipe: exports.removeRecipe,
    bulkUpdateRecipes: exports.bulkUpdateRecipes,
};
exports.default = exports.menuRecipeService;
//# sourceMappingURL=menu-recipe.service.js.map