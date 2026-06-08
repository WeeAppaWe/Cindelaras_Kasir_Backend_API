"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_raw_service_1 = __importDefault(require("./ingredient-raw.service"));
const ingredient_raw_repository_1 = __importDefault(require("./ingredient-raw.repository"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const ingredient_mock_1 = require("../../../tests/mocks/ingredient.mock");
const unit_measure_mock_1 = require("../../../tests/mocks/unit-measure.mock");
// Mock dependencies
jest.mock('./ingredient-raw.repository');
jest.mock('../../unit-measure/unit-measure.service');
jest.mock('../../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn(async (callback) => {
            // Execute callback with mock transaction client and return the result
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
describe('Raw Ingredient Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should return paginated list of raw ingredients', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10' },
            };
            ingredient_raw_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockIngredient, ingredient_mock_1.mockIngredient2]);
            ingredient_raw_repository_1.default.count.mockResolvedValue(2);
            // Act
            const result = await ingredient_raw_service_1.default.getAll(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].name).toBe('Tepung Terigu');
        });
        it('should apply search filter', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10', search: 'tepung' },
            };
            ingredient_raw_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockIngredient]);
            ingredient_raw_repository_1.default.count.mockResolvedValue(1);
            // Act
            const result = await ingredient_raw_service_1.default.getAll(mockRequest);
            // Assert
            expect(ingredient_raw_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'tepung' }));
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
            ingredient_raw_repository_1.default.findAll.mockResolvedValue([ingredient_mock_1.mockIngredient]);
            ingredient_raw_repository_1.default.count.mockResolvedValue(1);
            // Act
            await ingredient_raw_service_1.default.getAll(mockRequest);
            // Assert
            expect(ingredient_raw_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ unit_id: '660e8400-e29b-41d4-a716-446655440001' }));
        });
        it('should use default pagination when not provided', async () => {
            // Arrange
            const mockRequest = {
                query: {},
            };
            ingredient_raw_repository_1.default.findAll.mockResolvedValue([]);
            ingredient_raw_repository_1.default.count.mockResolvedValue(0);
            // Act
            const result = await ingredient_raw_service_1.default.getAll(mockRequest);
            // Assert
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
        });
    });
    describe('getDetail', () => {
        it('should return ingredient detail when found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockIngredient);
            // Act
            const result = await ingredient_raw_service_1.default.getDetail(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.ingredient_id).toBe('550e8400-e29b-41d4-a716-446655440000');
            expect(result.name).toBe('Tepung Terigu');
            expect(result.unit.name).toBe('Kilogram');
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('create', () => {
        it('should create new raw ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Tepung Terigu',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    stock_qty: 100,
                    min_stock: 10,
                    avg_cost: 15000,
                },
            };
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(null);
            unit_measure_service_1.default.findById.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            ingredient_raw_repository_1.default.create.mockResolvedValue(ingredient_mock_1.mockIngredient);
            // Act - just verify it doesn't throw
            await ingredient_raw_service_1.default.create(mockRequest);
            // Assert - verify validations were called
            expect(ingredient_raw_repository_1.default.findByName).toHaveBeenCalledWith('Tepung Terigu');
            expect(unit_measure_service_1.default.findById).toHaveBeenCalledWith('660e8400-e29b-41d4-a716-446655440001');
        });
        it('should throw ErrorDataAlreadyExistException when name already exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Tepung Terigu',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            };
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(ingredient_mock_1.mockIngredient);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.create(mockRequest))
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
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(null);
            unit_measure_service_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should use default values for optional fields', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'New Ingredient',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            };
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(null);
            unit_measure_service_1.default.findById.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            ingredient_raw_repository_1.default.create.mockResolvedValue(ingredient_mock_1.mockIngredient);
            // Act - just verify it doesn't throw
            await ingredient_raw_service_1.default.create(mockRequest);
            // Assert - verify validations were called
            expect(ingredient_raw_repository_1.default.findByName).toHaveBeenCalled();
            expect(unit_measure_service_1.default.findById).toHaveBeenCalled();
        });
    });
    describe('update', () => {
        it('should update raw ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: {
                    name: 'Tepung Terigu Premium',
                    min_stock: 20,
                },
            };
            const updatedIngredient = {
                ...ingredient_mock_1.mockIngredient,
                name: 'Tepung Terigu Premium',
                min_stock: 20,
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockIngredient);
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(null);
            ingredient_raw_repository_1.default.update.mockResolvedValue(updatedIngredient);
            // Act - just verify it doesn't throw
            await ingredient_raw_service_1.default.update(mockRequest);
            // Assert - verify validations were called
            expect(ingredient_raw_repository_1.default.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
            expect(ingredient_raw_repository_1.default.findByName).toHaveBeenCalledWith('Tepung Terigu Premium', '550e8400-e29b-41d4-a716-446655440000');
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                body: { name: 'New Name' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorDataAlreadyExistException when new name already used', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { name: 'Gula Pasir' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockIngredient);
            ingredient_raw_repository_1.default.findByName.mockResolvedValue(ingredient_mock_1.mockIngredient2);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should throw ErrorValidationException when new unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { unit_id: 'nonexistent-unit-id' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockIngredient);
            unit_measure_service_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    describe('softDelete', () => {
        it('should soft delete raw ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(ingredient_mock_1.mockIngredient);
            ingredient_raw_repository_1.default.softDelete.mockResolvedValue(undefined);
            // Act
            const result = await ingredient_raw_service_1.default.softDelete(mockRequest);
            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan baku berhasil dihapus');
            expect(ingredient_raw_repository_1.default.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            };
            ingredient_raw_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(ingredient_raw_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('getLowStockAlerts', () => {
        it('should return low stock ingredients', async () => {
            // Arrange
            ingredient_raw_repository_1.default.findLowStock.mockResolvedValue(ingredient_mock_1.mockLowStockIngredients);
            ingredient_raw_repository_1.default.countLowStock.mockResolvedValue(2);
            // Act
            const result = await ingredient_raw_service_1.default.getLowStockAlerts();
            // Assert
            expect(result.total_count).toBe(2);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].stock_qty).toBeLessThan(result.records[0].min_stock);
        });
        it('should return empty when no low stock ingredients', async () => {
            // Arrange
            ingredient_raw_repository_1.default.findLowStock.mockResolvedValue([]);
            ingredient_raw_repository_1.default.countLowStock.mockResolvedValue(0);
            // Act
            const result = await ingredient_raw_service_1.default.getLowStockAlerts();
            // Assert
            expect(result.total_count).toBe(0);
            expect(result.records).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=ingredient-raw.service.test.js.map