"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_semi_service_1 = __importDefault(require("./ingredient-semi.service"));
const ingredient_semi_repository_1 = __importDefault(require("./ingredient-semi.repository"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const ingredient_mock_1 = require("../../../tests/mocks/ingredient.mock");
const unit_measure_mock_1 = require("../../../tests/mocks/unit-measure.mock");
// Mock dependencies
jest.mock('./ingredient-semi.repository');
jest.mock('../../unit-measure/unit-measure.service');
jest.mock('../../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn(async (callback) => {
            const mockTransactionClient = {
                ingredient: {
                    create: jest.fn(),
                    update: jest.fn(),
                },
            };
            return await callback(mockTransactionClient);
        }),
        ingredient: {
            create: jest.fn(),
            update: jest.fn(),
        },
    })),
}));
describe('Semi Ingredient Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should return paginated list of semi ingredients', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10' },
            };
            ingredient_semi_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockSemiIngredient, ingredient_mock_1.mockSemiIngredient2]);
            ingredient_semi_repository_1.default.count.mockResolvedValue(2);
            // Act
            const result = await ingredient_semi_service_1.default.getAll(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].name).toBe('Bumbu Dasar');
        });
        it('should apply search filter', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10', search: 'bumbu' },
            };
            ingredient_semi_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockSemiIngredient]);
            ingredient_semi_repository_1.default.count.mockResolvedValue(1);
            // Act
            const result = await ingredient_semi_service_1.default.getAll(mockRequest);
            // Assert
            expect(ingredient_semi_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'bumbu' }));
            expect(result.records).toHaveLength(1);
        });
        it('should apply unit_id filter', async () => {
            // Arrange
            const mockRequest = {
                query: {
                    batch: '1',
                    size: '10',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001'
                },
            };
            ingredient_semi_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockSemiIngredient]);
            ingredient_semi_repository_1.default.count.mockResolvedValue(1);
            // Act
            await ingredient_semi_service_1.default.getAll(mockRequest);
            // Assert
            expect(ingredient_semi_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ unit_id: '660e8400-e29b-41d4-a716-446655440001' }));
        });
        it('should use default pagination when not provided', async () => {
            // Arrange
            const mockRequest = {
                query: {},
            };
            ingredient_semi_repository_1.default.findAll.mockResolvedValue([]);
            ingredient_semi_repository_1.default.count.mockResolvedValue(0);
            // Act
            const result = await ingredient_semi_service_1.default.getAll(mockRequest);
            // Assert
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
        });
    });
    describe('getDetail', () => {
        it('should return ingredient detail with compositions and HPP', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            };
            ingredient_semi_repository_1.default.findByIdWithCompositions.mockResolvedValue(ingredient_mock_1.mockIngredientWithCompositions);
            // Act
            const result = await ingredient_semi_service_1.default.getDetail(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.ingredient_id).toBe('550e8400-e29b-41d4-a716-446655440000');
            expect(result.name).toBe('Bumbu Dasar');
            expect(result.child_compositions).toHaveLength(2);
            // HPP = (2 * 5000) + (1 * 3000) = 13000
            expect(result.total_hpp).toBe(13000);
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            };
            ingredient_semi_repository_1.default.findByIdWithCompositions.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('create', () => {
        it('should create new semi ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Bumbu Dasar',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            };
            ingredient_semi_repository_1.default.findByName.mockResolvedValue(null);
            unit_measure_service_1.default.findById.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            ingredient_semi_repository_1.default.create.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            // Act - just verify it doesn't throw
            await ingredient_semi_service_1.default.create(mockRequest);
            // Assert - verify validations were called
            expect(ingredient_semi_repository_1.default.findByName).toHaveBeenCalledWith('Bumbu Dasar');
            expect(unit_measure_service_1.default.findById).toHaveBeenCalledWith('660e8400-e29b-41d4-a716-446655440001');
        });
        it('should throw ErrorDataAlreadyExistException when name already exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Bumbu Dasar',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            };
            ingredient_semi_repository_1.default.findByName.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should throw ErrorValidationException when unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'New Ingredient',
                    unit_id: 'nonexistent-unit-id',
                    min_stock: 10,
                },
            };
            ingredient_semi_repository_1.default.findByName.mockResolvedValue(null);
            unit_measure_service_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    describe('update', () => {
        it('should update semi ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: {
                    name: 'Bumbu Dasar Premium',
                    min_stock: 20,
                },
            };
            const updatedIngredient = {
                ...ingredient_mock_1.mockSemiIngredient,
                name: 'Bumbu Dasar Premium',
                min_stock: 20,
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            ingredient_semi_repository_1.default.findByName.mockResolvedValue(null);
            ingredient_semi_repository_1.default.update.mockResolvedValue(updatedIngredient);
            // Act - just verify it doesn't throw
            await ingredient_semi_service_1.default.update(mockRequest);
            // Assert - verify validations were called
            expect(ingredient_semi_repository_1.default.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
            expect(ingredient_semi_repository_1.default.findByName).toHaveBeenCalledWith('Bumbu Dasar Premium', '550e8400-e29b-41d4-a716-446655440000');
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                body: { name: 'New Name' },
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorDataAlreadyExistException when new name already used', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { name: 'Sambal Goreng' },
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            ingredient_semi_repository_1.default.findByName.mockResolvedValue(ingredient_mock_1.mockSemiIngredient2);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should throw ErrorValidationException when new unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { unit_id: 'nonexistent-unit-id' },
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            unit_measure_service_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    describe('softDelete', () => {
        it('should soft delete semi ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockSemiIngredient);
            ingredient_semi_repository_1.default.softDelete.mockResolvedValue(undefined);
            // Act
            const result = await ingredient_semi_service_1.default.softDelete(mockRequest);
            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan setengah jadi berhasil dihapus');
            expect(ingredient_semi_repository_1.default.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            };
            ingredient_semi_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('getHPPCalculation', () => {
        it('should calculate HPP correctly', async () => {
            // Arrange
            ingredient_semi_repository_1.default.findByIdWithCompositions.mockResolvedValue(ingredient_mock_1.mockIngredientWithCompositions);
            // Act
            const result = await ingredient_semi_service_1.default.getHPPCalculation('550e8400-e29b-41d4-a716-446655440000', 1);
            // Assert
            expect(result).toBeDefined();
            // HPP = (2 * 5000) + (1 * 3000) = 13000
            expect(result.total_hpp).toBe(13000);
            expect(result.target_yield).toBe(1);
            expect(result.hpp_per_unit).toBe(13000);
            expect(result.composition_count).toBe(2);
        });
        it('should calculate HPP per unit with target_yield > 1', async () => {
            // Arrange
            ingredient_semi_repository_1.default.findByIdWithCompositions.mockResolvedValue(ingredient_mock_1.mockIngredientWithCompositions);
            // Act
            const result = await ingredient_semi_service_1.default.getHPPCalculation('550e8400-e29b-41d4-a716-446655440000', 2);
            // Assert
            // HPP = (2 * 5000) + (1 * 3000) = 13000
            // HPP per unit = 13000 / 2 = 6500
            expect(result.total_hpp).toBe(13000);
            expect(result.target_yield).toBe(2);
            expect(result.hpp_per_unit).toBe(6500);
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            ingredient_semi_repository_1.default.findByIdWithCompositions.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_semi_service_1.default.getHPPCalculation('nonexistent-id'))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
});
//# sourceMappingURL=ingredient-semi.service.test.js.map