import { MenuRecipeWithIngredient, MenuPriceAndCost, IngredientCost } from './hpp.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all recipes for a menu with ingredient cost data
 */
export declare const findRecipesByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<MenuRecipeWithIngredient[]>;
/**
 * Find menu price and cost by ID
 */
export declare const findMenuPriceAndCost: (menuId: string) => Promise<MenuPriceAndCost | null>;
/**
 * Update menu cost (HPP)
 */
export declare const updateMenuCost: (menuId: string, cost: number, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Find ingredient costs by IDs
 */
export declare const findIngredientCostsByIds: (ingredientIds: string[]) => Promise<IngredientCost[]>;
export declare const hppRepository: {
    findRecipesByMenuId: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<MenuRecipeWithIngredient[]>;
    findMenuPriceAndCost: (menuId: string) => Promise<MenuPriceAndCost | null>;
    updateMenuCost: (menuId: string, cost: number, transaction?: Prisma.TransactionClient) => Promise<void>;
    findIngredientCostsByIds: (ingredientIds: string[]) => Promise<IngredientCost[]>;
};
export default hppRepository;
//# sourceMappingURL=hpp.repository.d.ts.map