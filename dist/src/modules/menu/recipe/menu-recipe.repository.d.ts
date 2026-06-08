import { RecipeData, RecipeWithIngredient } from './menu-recipe.types';
import { Prisma } from '../../../generated/prisma/client';
/**
 * Find all recipes for a menu
 */
export declare const findByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient[]>;
/**
 * Find recipe by ID
 */
export declare const findById: (recipeId: string) => Promise<RecipeWithIngredient | null>;
/**
 * Find recipe by menu and ingredient (for duplicate check)
 */
export declare const findByMenuAndIngredient: (menuId: string, ingredientId: string, excludeRecipeId?: string) => Promise<RecipeData | null>;
/**
 * Create new recipe
 */
export declare const create: (data: {
    menu_id: string;
    ingredient_id: string;
    qty_needed: number;
}, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient>;
/**
 * Update recipe qty
 */
export declare const update: (recipeId: string, data: {
    qty_needed: number;
}, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient>;
/**
 * Soft delete recipe
 */
export declare const softDelete: (recipeId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Delete all recipes for a menu (hard delete for bulk update)
 * This deletes ALL rows including soft-deleted ones to avoid unique constraint issues
 */
export declare const deleteByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const menuRecipeRepository: {
    findByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient[]>;
    findById: (recipeId: string) => Promise<RecipeWithIngredient | null>;
    findByMenuAndIngredient: (menuId: string, ingredientId: string, excludeRecipeId?: string) => Promise<RecipeData | null>;
    create: (data: {
        menu_id: string;
        ingredient_id: string;
        qty_needed: number;
    }, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient>;
    update: (recipeId: string, data: {
        qty_needed: number;
    }, transaction?: Prisma.TransactionClient) => Promise<RecipeWithIngredient>;
    softDelete: (recipeId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    deleteByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
};
export default menuRecipeRepository;
//# sourceMappingURL=menu-recipe.repository.d.ts.map