"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_recipe_service_1 = __importDefault(require("./menu-recipe.service"));
const menu_recipe_repository_1 = __importDefault(require("./menu-recipe.repository"));
const menu_repository_1 = __importDefault(require("../menu.repository"));
const hpp_service_1 = __importDefault(require("../../hpp/hpp.service"));
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const menu_mock_1 = require("../../../tests/mocks/menu.mock");
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
    return {
        __esModule: true,
        default: jest.fn(() => ({
            ingredient: {
                findUnique: mockIngredientFindUnique,
                findMany: mockIngredientFindMany,
            },
            $transaction: mockTransaction,
        })),
        // Helper to expose mocks to test suite
        __getMocks: () => ({
            mockIngredientFindUnique,
            mockIngredientFindMany,
            mockTransaction
        }),
    };
});
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
        const { mockTransaction, mockIngredientFindUnique, mockIngredientFindMany } = getMocks();
        // Default implementation for transaction: exec callback
        mockTransaction.mockImplementation(async (callback) => {
            return await callback({}); // Pass empty mock transaction client
        });
        // Default implementation for ingredient checks
        mockIngredientFindUnique.mockResolvedValue(menu_mock_1.mockIngredient);
        mockIngredientFindMany.mockResolvedValue([menu_mock_1.mockIngredient, menu_mock_1.mockIngredient2]);
    });
    // ============================================
    // GET BY MENU ID TESTS
    // ============================================
    describe('getByMenuId', () => {
        it('should return recipes for a menu', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            const mockHppResult = {
                menu_id: menu_mock_1.mockMenu.menu_id,
                total_hpp: 5000,
                recipe_count: 2,
                recipes: [],
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            menu_recipe_repository_1.default.findByMenuId.mockResolvedValue(menu_mock_1.mockRecipes);
            hpp_service_1.default.calculateMenuHPP.mockResolvedValue(mockHppResult);
            const result = await menu_recipe_service_1.default.getByMenuId(mockRequest);
            expect(result).toBeDefined();
            expect(result.menu_id).toBe(menu_mock_1.mockMenu.menu_id);
            expect(result.recipes).toHaveLength(2);
            expect(result.total_hpp).toBe(5000);
        });
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.getByMenuId(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // ADD RECIPE TESTS
    // ============================================
    describe('addRecipe', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
                body: { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 100 },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.addRecipe(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when ingredient not found', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { ingredient_id: 'non-existent-ingredient', qty_needed: 100 },
            };
            const { mockIngredientFindUnique } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindUnique.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.addRecipe(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorDataAlreadyExistException when ingredient already in recipe', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 100 },
            };
            const { mockIngredientFindUnique } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindUnique.mockResolvedValue(menu_mock_1.mockIngredient);
            menu_recipe_repository_1.default.findByMenuAndIngredient.mockResolvedValue(menu_mock_1.mockRecipe);
            await expect(menu_recipe_service_1.default.addRecipe(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should add recipe and update HPP when validations pass', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { ingredient_id: menu_mock_1.mockIngredient2.ingredient_id, qty_needed: 50 },
            };
            const newRecipe = {
                ...menu_mock_1.mockRecipe2,
                qty_needed: 50,
            };
            const { mockIngredientFindUnique, mockTransaction } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindUnique.mockResolvedValue(menu_mock_1.mockIngredient2);
            menu_recipe_repository_1.default.findByMenuAndIngredient.mockResolvedValue(null);
            menu_recipe_repository_1.default.create.mockResolvedValue(newRecipe);
            hpp_service_1.default.updateMenuCost.mockResolvedValue(5500);
            const result = await menu_recipe_service_1.default.addRecipe(mockRequest);
            expect(result.new_hpp).toBe(5500);
            expect(hpp_service_1.default.updateMenuCost).toHaveBeenCalled();
            expect(mockTransaction).toHaveBeenCalled();
        });
    });
    // ============================================
    // UPDATE RECIPE TESTS
    // ============================================
    describe('updateRecipe', () => {
        it('should throw ErrorNotFoundException when recipe not found', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id, recipe_id: 'non-existent-id' },
                body: { qty_needed: 200 },
            };
            menu_recipe_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.updateRecipe(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when recipe does not belong to menu', async () => {
            const mockRequest = {
                params: { menu_id: 'different-menu-id', recipe_id: menu_mock_1.mockRecipe.menu_recipe_id },
                body: { qty_needed: 200 },
            };
            menu_recipe_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockRecipe);
            await expect(menu_recipe_service_1.default.updateRecipe(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should update recipe qty and recalculate HPP', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id, recipe_id: menu_mock_1.mockRecipe.menu_recipe_id },
                body: { qty_needed: 300 },
            };
            const updatedRecipe = { ...menu_mock_1.mockRecipe, qty_needed: 300 };
            const { mockTransaction } = getMocks();
            menu_recipe_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockRecipe);
            menu_recipe_repository_1.default.update.mockResolvedValue(updatedRecipe);
            hpp_service_1.default.updateMenuCost.mockResolvedValue(6500);
            const result = await menu_recipe_service_1.default.updateRecipe(mockRequest);
            expect(result.recipe.qty_needed).toBe(300);
            expect(result.new_hpp).toBe(6500);
            expect(hpp_service_1.default.updateMenuCost).toHaveBeenCalled();
            expect(mockTransaction).toHaveBeenCalled();
        });
    });
    // ============================================
    // REMOVE RECIPE TESTS
    // ============================================
    describe('removeRecipe', () => {
        it('should throw ErrorNotFoundException when recipe not found', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id, recipe_id: 'non-existent-id' },
            };
            menu_recipe_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.removeRecipe(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when recipe does not belong to menu', async () => {
            const mockRequest = {
                params: { menu_id: 'different-menu-id', recipe_id: menu_mock_1.mockRecipe.menu_recipe_id },
            };
            menu_recipe_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockRecipe);
            await expect(menu_recipe_service_1.default.removeRecipe(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should remove recipe and recalculate HPP', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id, recipe_id: menu_mock_1.mockRecipe.menu_recipe_id },
            };
            const { mockTransaction } = getMocks();
            menu_recipe_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockRecipe);
            menu_recipe_repository_1.default.softDelete.mockResolvedValue(undefined);
            hpp_service_1.default.updateMenuCost.mockResolvedValue(2000);
            const result = await menu_recipe_service_1.default.removeRecipe(mockRequest);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan berhasil dihapus dari resep');
            expect(result.new_hpp).toBe(2000);
            expect(hpp_service_1.default.updateMenuCost).toHaveBeenCalled();
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
                        { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 100 },
                    ],
                },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_recipe_service_1.default.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when some ingredients not found', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 100 },
                        { ingredient_id: 'non-existent-ingredient', qty_needed: 50 },
                    ],
                },
            };
            const { mockIngredientFindMany } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindMany.mockResolvedValue([menu_mock_1.mockIngredient]);
            await expect(menu_recipe_service_1.default.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException for duplicate ingredients in request', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 100 },
                        { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 200 },
                    ],
                },
            };
            const { mockIngredientFindMany } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindMany.mockResolvedValue([menu_mock_1.mockIngredient, menu_mock_1.mockIngredient]);
            await expect(menu_recipe_service_1.default.bulkUpdateRecipes(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should replace all recipes and update HPP', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: {
                    recipes: [
                        { ingredient_id: menu_mock_1.mockIngredient.ingredient_id, qty_needed: 150 },
                        { ingredient_id: menu_mock_1.mockIngredient2.ingredient_id, qty_needed: 2 },
                    ],
                },
            };
            const mockHppResult = {
                menu_id: menu_mock_1.mockMenu.menu_id,
                total_hpp: 6250,
                recipe_count: 2,
                recipes: [],
            };
            const { mockIngredientFindMany, mockTransaction } = getMocks();
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            mockIngredientFindMany.mockResolvedValue([menu_mock_1.mockIngredient, menu_mock_1.mockIngredient2]);
            menu_recipe_repository_1.default.deleteByMenuId.mockResolvedValue(undefined);
            menu_recipe_repository_1.default.create
                .mockResolvedValueOnce(menu_mock_1.mockRecipe)
                .mockResolvedValueOnce(menu_mock_1.mockRecipe2);
            hpp_service_1.default.updateMenuCost.mockResolvedValue(6250);
            menu_recipe_repository_1.default.findByMenuId.mockResolvedValue(menu_mock_1.mockRecipes);
            hpp_service_1.default.calculateMenuHPP.mockResolvedValue(mockHppResult);
            const result = await menu_recipe_service_1.default.bulkUpdateRecipes(mockRequest);
            expect(result.menu_id).toBe(menu_mock_1.mockMenu.menu_id);
            expect(result.total_hpp).toBe(6250);
            expect(mockTransaction).toHaveBeenCalled();
            expect(hpp_service_1.default.updateMenuCost).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=menu-recipe.service.test.js.map