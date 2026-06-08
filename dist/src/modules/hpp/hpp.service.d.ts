import { HPPCalculationResult, MenuCostSummary, RecipeWithCost } from './hpp.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Get recipes with ingredient cost for a menu
 */
export declare const getMenuRecipesWithCost: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<RecipeWithCost[]>;
/**
 * Calculate HPP for a menu based on its recipes
 */
export declare const calculateMenuHPP: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<HPPCalculationResult>;
/**
 * Update menu cost (HPP) in database
 */
export declare const updateMenuCost: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<number>;
/**
 * Get complete cost summary for a menu
 */
export declare const getMenuCostSummary: (menuId: string) => Promise<MenuCostSummary>;
/**
 * Calculate HPP from provided recipes (for preview before saving)
 */
export declare const calculateHPPFromRecipes: (recipes: {
    ingredient_id: string;
    qty_needed: number;
}[]) => Promise<number>;
export declare const hppService: {
    getMenuRecipesWithCost: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<RecipeWithCost[]>;
    calculateMenuHPP: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<HPPCalculationResult>;
    updateMenuCost: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<number>;
    getMenuCostSummary: (menuId: string) => Promise<MenuCostSummary>;
    calculateHPPFromRecipes: (recipes: {
        ingredient_id: string;
        qty_needed: number;
    }[]) => Promise<number>;
};
export default hppService;
//# sourceMappingURL=hpp.service.d.ts.map