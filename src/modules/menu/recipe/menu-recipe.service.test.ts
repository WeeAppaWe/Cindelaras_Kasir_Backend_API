import menuRecipeService from './menu-recipe.service';
import menuRecipeRepository from './menu-recipe.repository';
import menuRepository from '../menu.repository';
import hppService from '../../hpp/hpp.service';
import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../../types';
import {
    mockMenu,
    mockRecipe,
    mockRecipe2,
    mockRecipes,
    mockIngredient,
    mockIngredient2,
} from '../../../tests/mocks/menu.mock';

// ============================================
// MOCKS
// ============================================

jest.mock('./menu-recipe.repository');
jest.mock('../menu.repository');
jest.mock('../../hpp/hpp.service');

// Mock getPrismaClient with internal mock references accessible via helper
jest.mock('../../../../database/postgres.connection', () => {
    const mockIngredientFindUnique = jest.fn();
    const mockIngredientFindMany = jest.fn();
    const mockTransaction = jest.fn();

    // Singleton mock client — the service captures this at module-load via `const prisma = getPrismaClient()`
    const mockClient = {
        ingredient: {
            findUnique: mockIngredientFindUnique,
            findMany: mockIngredientFindMany,
        },
        $transaction: mockTransaction,
    };

    return {
        __esModule: true,
        default: jest.fn(() => mockClient),
        __getMocks: () => ({
            mockIngredientFindUnique,
            mockIngredientFindMany,
            mockTransaction
        }),
        __mockClient: mockClient,
    };
});

// Import to ensure mock is registered
import getPrismaClient from '../../../../database/postgres.connection';

// Helper to access mocks
const getMocks = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../../../../database/postgres.connection').__getMocks();
};

// ============================================
// TEST SUITES
// ============================================

describe('Recipe Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Re-establish implementations on the SAME objects the service holds
        const { __mockClient } = require('../../../../database/postgres.connection');
        const { mockTransaction, mockIngredientFindUnique, mockIngredientFindMany } = getMocks();

        // Default implementation for transaction: exec callback with full mock client
        mockTransaction.mockImplementation(async (callback: Function) => {
            return await callback({
                menuRecipe: {
                    createMany: jest.fn(),
                    deleteMany: jest.fn(),
                },
            });
        });

        // Re-set $transaction on the singleton (it's the same ref as mockTransaction)
        __mockClient.$transaction = mockTransaction;
        __mockClient.ingredient.findUnique = mockIngredientFindUnique;
        __mockClient.ingredient.findMany = mockIngredientFindMany;

        // Default implementation for ingredient checks
        mockIngredientFindUnique.mockResolvedValue(mockIngredient);
        mockIngredientFindMany.mockResolvedValue([mockIngredient, mockIngredient2]);
    });

    // ============================================
    // GET BY MENU ID TESTS
    // ============================================

    describe('getByMenuId', () => {
        it('should return recipes for a menu', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            const mockHppResult = {
                menu_id: mockMenu.menu_id,
                total_hpp: 5000,
                recipe_count: 2,
                recipes: [],
            };

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (menuRecipeRepository.findByMenuId as jest.Mock).mockResolvedValue(mockRecipes);
            (hppService.calculateMenuHPP as jest.Mock).mockResolvedValue(mockHppResult);

            const result = await menuRecipeService.getByMenuId(mockRequest);

            expect(result).toBeDefined();
            expect(result.menu_id).toBe(mockMenu.menu_id);
            expect(result.recipes).toHaveLength(2);
            expect(result.total_hpp).toBe(5000);
        });

        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuRecipeService.getByMenuId(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // ADD RECIPE TESTS
    // ============================================

    describe('addRecipe', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
                body: { ingredient_id: mockIngredient.ingredient_id, qty_needed: 100 },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuRecipeService.addRecipe(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when ingredient not found', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { ingredient_id: 'non-existent-ingredient', qty_needed: 100 },
            } as unknown as AuthenticatedRequest;

            const { mockIngredientFindUnique } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindUnique.mockResolvedValue(null);

            await expect(menuRecipeService.addRecipe(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorDataAlreadyExistException when ingredient already in recipe', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { ingredient_id: mockIngredient.ingredient_id, qty_needed: 100 },
            } as unknown as AuthenticatedRequest;

            const { mockIngredientFindUnique } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindUnique.mockResolvedValue(mockIngredient);
            (menuRecipeRepository.findByMenuAndIngredient as jest.Mock).mockResolvedValue(mockRecipe);

            await expect(menuRecipeService.addRecipe(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should add recipe and update HPP when validations pass', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { ingredient_id: mockIngredient2.ingredient_id, qty_needed: 50 },
            } as unknown as AuthenticatedRequest;

            const newRecipe = {
                ...mockRecipe2,
                qty_needed: 50,
            };

            const { mockIngredientFindUnique, mockTransaction } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindUnique.mockResolvedValue(mockIngredient2);
            (menuRecipeRepository.findByMenuAndIngredient as jest.Mock).mockResolvedValue(null);
            (menuRecipeRepository.create as jest.Mock).mockResolvedValue(newRecipe);
            (hppService.updateMenuCost as jest.Mock).mockResolvedValue(5500);

            const result = await menuRecipeService.addRecipe(mockRequest);

            expect(result.new_hpp).toBe(5500);
            expect(hppService.updateMenuCost).toHaveBeenCalled();
            expect(mockTransaction).toHaveBeenCalled();
        });
    });

    // ============================================
    // UPDATE RECIPE TESTS
    // ============================================

    describe('updateRecipe', () => {
        it('should throw ErrorNotFoundException when recipe not found', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id, recipe_id: 'non-existent-id' },
                body: { qty_needed: 200 },
            } as unknown as AuthenticatedRequest;

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuRecipeService.updateRecipe(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when recipe does not belong to menu', async () => {
            const mockRequest = {
                params: { menu_id: 'different-menu-id', recipe_id: mockRecipe.menu_recipe_id },
                body: { qty_needed: 200 },
            } as unknown as AuthenticatedRequest;

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(mockRecipe);

            await expect(menuRecipeService.updateRecipe(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should update recipe qty and recalculate HPP', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id, recipe_id: mockRecipe.menu_recipe_id },
                body: { qty_needed: 300 },
            } as unknown as AuthenticatedRequest;

            const updatedRecipe = { ...mockRecipe, qty_needed: 300 };

            const { mockTransaction } = getMocks();

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(mockRecipe);
            (menuRecipeRepository.update as jest.Mock).mockResolvedValue(updatedRecipe);
            (hppService.updateMenuCost as jest.Mock).mockResolvedValue(6500);

            const result = await menuRecipeService.updateRecipe(mockRequest);

            expect(result.recipe.qty_needed).toBe(300);
            expect(result.new_hpp).toBe(6500);
            expect(hppService.updateMenuCost).toHaveBeenCalled();
            expect(mockTransaction).toHaveBeenCalled();
        });
    });

    // ============================================
    // REMOVE RECIPE TESTS
    // ============================================

    describe('removeRecipe', () => {
        it('should throw ErrorNotFoundException when recipe not found', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id, recipe_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuRecipeService.removeRecipe(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when recipe does not belong to menu', async () => {
            const mockRequest = {
                params: { menu_id: 'different-menu-id', recipe_id: mockRecipe.menu_recipe_id },
            } as unknown as AuthenticatedRequest;

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(mockRecipe);

            await expect(menuRecipeService.removeRecipe(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should remove recipe and recalculate HPP', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id, recipe_id: mockRecipe.menu_recipe_id },
            } as unknown as AuthenticatedRequest;

            const { mockTransaction } = getMocks();

            (menuRecipeRepository.findById as jest.Mock).mockResolvedValue(mockRecipe);
            (menuRecipeRepository.softDelete as jest.Mock).mockResolvedValue(undefined);
            (hppService.updateMenuCost as jest.Mock).mockResolvedValue(2000);

            const result = await menuRecipeService.removeRecipe(mockRequest);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan berhasil dihapus dari resep');
            expect(result.new_hpp).toBe(2000);
            expect(hppService.updateMenuCost).toHaveBeenCalled();
            expect(mockTransaction).toHaveBeenCalled();
        });
    });

    // ============================================
    // BULK UPDATE RECIPES TESTS
    // ============================================

    describe('bulkUpdateRecipes', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
                body: {
                    recipes: [
                        { ingredient_id: mockIngredient.ingredient_id, qty_needed: 100 },
                    ],
                },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuRecipeService.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when some ingredients not found', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: mockIngredient.ingredient_id, qty_needed: 100 },
                        { ingredient_id: 'non-existent-ingredient', qty_needed: 50 },
                    ],
                },
            } as unknown as AuthenticatedRequest;

            const { mockIngredientFindMany } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindMany.mockResolvedValue([mockIngredient]);

            await expect(menuRecipeService.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException for duplicate ingredients in request', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: mockIngredient.ingredient_id, qty_needed: 100 },
                        { ingredient_id: mockIngredient.ingredient_id, qty_needed: 200 },
                    ],
                },
            } as unknown as AuthenticatedRequest;

            const { mockIngredientFindMany } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindMany.mockResolvedValue([mockIngredient, mockIngredient]);

            await expect(menuRecipeService.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should replace all recipes and update HPP', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: mockIngredient.ingredient_id, qty_needed: 150 },
                        { ingredient_id: mockIngredient2.ingredient_id, qty_needed: 2 },
                    ],
                },
            } as unknown as AuthenticatedRequest;

            const mockHppResult = {
                menu_id: mockMenu.menu_id,
                total_hpp: 6250,
                recipe_count: 2,
                recipes: [],
            };

            const { mockIngredientFindMany, mockTransaction } = getMocks();

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            mockIngredientFindMany.mockResolvedValue([mockIngredient, mockIngredient2]);
            (menuRecipeRepository.deleteByMenuId as jest.Mock).mockResolvedValue(undefined);
            (menuRecipeRepository.create as jest.Mock)
                .mockResolvedValueOnce(mockRecipe)
                .mockResolvedValueOnce(mockRecipe2);
            (hppService.updateMenuCost as jest.Mock).mockResolvedValue(6250);
            (menuRecipeRepository.findByMenuId as jest.Mock).mockResolvedValue(mockRecipes);
            (hppService.calculateMenuHPP as jest.Mock).mockResolvedValue(mockHppResult);

            const result = await menuRecipeService.bulkUpdateRecipes(mockRequest);

            expect(result.menu_id).toBe(mockMenu.menu_id);
            expect(result.total_hpp).toBe(6250);
            expect(mockTransaction).toHaveBeenCalled();
            expect(hppService.updateMenuCost).toHaveBeenCalled();
        });
    });
});
