import hppService from './hpp.service';
import hppRepository from './hpp.repository';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';

// ============================================
// MOCK DATA
// ============================================

const mockMenuRecipes = [
    {
        menu_recipe_id: 'recipe-1',
        ingredient_id: 'ingredient-1',
        qty_needed: 200,
        ingredient: {
            name: 'Beras Premium',
            avg_cost: 15,
            unit: { name: 'Gram' },
        },
    },
    {
        menu_recipe_id: 'recipe-2',
        ingredient_id: 'ingredient-2',
        qty_needed: 2,
        ingredient: {
            name: 'Telur Ayam',
            avg_cost: 2000,
            unit: { name: 'Butir' },
        },
    },
];

const mockMenuPriceAndCost = {
    menu_id: 'menu-1',
    price: 15000,
    cost: 7000,
};

const mockIngredientCosts = [
    { ingredient_id: 'ingredient-1', avg_cost: 15 },
    { ingredient_id: 'ingredient-2', avg_cost: 2000 },
];

// ============================================
// MOCKS
// ============================================

jest.mock('./hpp.repository');

// ============================================
// TEST SUITES
// ============================================

describe('HPP Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Setup default mock returns
        (hppRepository.findRecipesByMenuId as jest.Mock).mockResolvedValue(mockMenuRecipes);
        (hppRepository.findMenuPriceAndCost as jest.Mock).mockResolvedValue(mockMenuPriceAndCost);
        (hppRepository.updateMenuCost as jest.Mock).mockResolvedValue(undefined);
        (hppRepository.findIngredientCostsByIds as jest.Mock).mockResolvedValue(mockIngredientCosts);
    });

    // ============================================
    // GET MENU RECIPES WITH COST TESTS
    // ============================================

    describe('getMenuRecipesWithCost', () => {
        it('should return recipes with cost data', async () => {
            const result = await hppService.getMenuRecipesWithCost('menu-1');

            expect(result).toHaveLength(2);
            expect(result[0].ingredient.name).toBe('Beras Premium');
            expect(result[0].ingredient.avg_cost).toBe(15);
            expect(hppRepository.findRecipesByMenuId).toHaveBeenCalledWith('menu-1', undefined);
        });
    });

    // ============================================
    // CALCULATE MENU HPP TESTS
    // ============================================

    describe('calculateMenuHPP', () => {
        it('should calculate HPP from menu recipes', async () => {
            const result = await hppService.calculateMenuHPP('menu-1');

            expect(result).toBeDefined();
            expect(result.menu_id).toBe('menu-1');
            expect(result.recipe_count).toBe(2);
            // HPP = (200 * 15) + (2 * 2000) = 3000 + 4000 = 7000
            expect(result.total_hpp).toBe(7000);
        });

        it('should return detailed recipe breakdown', async () => {
            const result = await hppService.calculateMenuHPP('menu-1');

            expect(result.recipes).toHaveLength(2);
            expect(result.recipes[0]).toHaveProperty('ingredient_name');
            expect(result.recipes[0]).toHaveProperty('qty_needed');
            expect(result.recipes[0]).toHaveProperty('unit_name');
            expect(result.recipes[0]).toHaveProperty('unit_cost');
            expect(result.recipes[0]).toHaveProperty('subtotal');
        });

        it('should calculate correct subtotal for each recipe', async () => {
            const result = await hppService.calculateMenuHPP('menu-1');

            // First recipe: 200 * 15 = 3000
            expect(result.recipes[0].subtotal).toBe(3000);
            // Second recipe: 2 * 2000 = 4000
            expect(result.recipes[1].subtotal).toBe(4000);
        });

        it('should return 0 HPP when no recipes', async () => {
            (hppRepository.findRecipesByMenuId as jest.Mock).mockResolvedValue([]);

            const result = await hppService.calculateMenuHPP('menu-1');

            expect(result.total_hpp).toBe(0);
            expect(result.recipe_count).toBe(0);
        });
    });

    // ============================================
    // GET MENU COST SUMMARY TESTS
    // ============================================

    describe('getMenuCostSummary', () => {
        it('should return complete cost summary', async () => {
            const result = await hppService.getMenuCostSummary('menu-1');

            expect(result).toBeDefined();
            expect(result.hpp).toBe(7000);
            expect(result.price).toBe(15000);
            // Margin = (15000 - 7000) / 15000 * 100 = 53.33%
            expect(result.margin_percent).toBeCloseTo(53.33, 1);
            // Profit = 15000 - 7000 = 8000
            expect(result.profit).toBe(8000);
        });

        it('should throw ErrorNotFoundException when menu not found', async () => {
            (hppRepository.findMenuPriceAndCost as jest.Mock).mockResolvedValue(null);

            await expect(hppService.getMenuCostSummary('non-existent'))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // CALCULATE HPP FROM RECIPES (PREVIEW) TESTS
    // ============================================

    describe('calculateHPPFromRecipes', () => {
        it('should calculate HPP from provided recipes', async () => {
            const recipes = [
                { ingredient_id: 'ingredient-1', qty_needed: 100 },
                { ingredient_id: 'ingredient-2', qty_needed: 1 },
            ];

            const result = await hppService.calculateHPPFromRecipes(recipes);

            // HPP = (100 * 15) + (1 * 2000) = 1500 + 2000 = 3500
            expect(result).toBe(3500);
            expect(hppRepository.findIngredientCostsByIds).toHaveBeenCalledWith([
                'ingredient-1',
                'ingredient-2',
            ]);
        });

        it('should return 0 for empty recipes', async () => {
            const result = await hppService.calculateHPPFromRecipes([]);

            expect(result).toBe(0);
        });

        it('should return 0 for null/undefined recipes', async () => {
            const result1 = await hppService.calculateHPPFromRecipes(null as any);
            const result2 = await hppService.calculateHPPFromRecipes(undefined as any);

            expect(result1).toBe(0);
            expect(result2).toBe(0);
        });
    });

    // ============================================
    // UPDATE MENU COST TESTS
    // ============================================

    describe('updateMenuCost', () => {
        it('should update menu cost in database', async () => {
            const result = await hppService.updateMenuCost('menu-1');

            // Should return the calculated HPP
            expect(result).toBe(7000);
            expect(hppRepository.updateMenuCost).toHaveBeenCalledWith('menu-1', 7000, undefined);
        });
    });
});
