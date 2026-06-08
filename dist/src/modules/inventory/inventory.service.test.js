"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_service_1 = __importDefault(require("./inventory.service"));
const inventory_repository_1 = __importDefault(require("./inventory.repository"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const inventory_mock_1 = require("../../tests/mocks/inventory.mock");
// Mock dependencies
jest.mock('./inventory.repository');
jest.mock('../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn(async (callback) => {
            const mockTransactionClient = {
                stockMovement: { create: jest.fn() },
                ingredient: { update: jest.fn() },
            };
            return await callback(mockTransactionClient);
        }),
    })),
}));
describe('Inventory Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getHistory', () => {
        it('should return paginated list of stock movements', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10' },
            };
            inventory_repository_1.default.findAll.mockResolvedValue(inventory_mock_1.mockStockMovements);
            inventory_repository_1.default.count.mockResolvedValue(2);
            // Act
            const result = await inventory_service_1.default.getHistory(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.records).toHaveLength(2);
        });
        it('should apply filters', async () => {
            // Arrange
            const mockRequest = {
                query: {
                    batch: '1',
                    size: '10',
                    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                },
            };
            inventory_repository_1.default.findAll.mockResolvedValue([inventory_mock_1.mockStockMovementIn]);
            inventory_repository_1.default.count.mockResolvedValue(1);
            // Act
            const result = await inventory_service_1.default.getHistory(mockRequest);
            // Assert
            expect(inventory_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001' }));
            expect(result.records).toHaveLength(1);
        });
    });
    describe('getDetail', () => {
        it('should return stock movement detail when found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440001' },
            };
            inventory_repository_1.default.findById.mockResolvedValue(inventory_mock_1.mockStockMovementIn);
            // Act
            const result = await inventory_service_1.default.getDetail(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.stock_movement_id).toBe('ee0e8400-e29b-41d4-a716-446655440001');
            expect(result.qty).toBe(50);
        });
        it('should throw ErrorNotFoundException when not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_movement_id: 'nonexistent-id' },
            };
            inventory_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(inventory_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('stockIn', () => {
        it('should validate ingredient exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'nonexistent-id',
                    supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
                    qty: 50,
                    unit_cost: 11000,
                },
                user: { user_id: 'ff0e8400-e29b-41d4-a716-446655440001' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(null);
            // Act & Assert
            await expect(inventory_service_1.default.stockIn(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should validate supplier exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                    supplier_id: 'nonexistent-id',
                    qty: 50,
                    unit_cost: 11000,
                },
                user: { user_id: 'ff0e8400-e29b-41d4-a716-446655440001' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(inventory_mock_1.mockIngredientForInventory);
            inventory_repository_1.default.findSupplierById.mockResolvedValue(null);
            // Act & Assert
            await expect(inventory_service_1.default.stockIn(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw error if user not authenticated', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                    supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
                    qty: 50,
                    unit_cost: 11000,
                },
                user: undefined,
            };
            // Act & Assert
            await expect(inventory_service_1.default.stockIn(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    describe('stockOut', () => {
        it('should validate ingredient exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'nonexistent-id',
                    qty: 5,
                    reason: 'DAMAGED',
                },
                user: { user_id: 'ff0e8400-e29b-41d4-a716-446655440001' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(null);
            // Act & Assert
            await expect(inventory_service_1.default.stockOut(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw error if stock insufficient', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                    qty: 500, // More than available (100)
                    reason: 'DAMAGED',
                },
                user: { user_id: 'ff0e8400-e29b-41d4-a716-446655440001' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(inventory_mock_1.mockIngredientForInventory);
            // Act & Assert
            await expect(inventory_service_1.default.stockOut(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw error if user not authenticated', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                    qty: 5,
                    reason: 'DAMAGED',
                },
                user: undefined,
            };
            // Act & Assert
            await expect(inventory_service_1.default.stockOut(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    describe('getHistoryByIngredient', () => {
        it('should return stock movements for specific ingredient', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001' },
                query: { batch: '1', size: '10' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(inventory_mock_1.mockIngredientForInventory);
            inventory_repository_1.default.findByIngredientId.mockResolvedValue(inventory_mock_1.mockStockMovements);
            inventory_repository_1.default.count.mockResolvedValue(2);
            // Act
            const result = await inventory_service_1.default.getHistoryByIngredient(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.records).toHaveLength(2);
        });
        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                query: { batch: '1', size: '10' },
            };
            inventory_repository_1.default.findIngredientById.mockResolvedValue(null);
            // Act & Assert
            await expect(inventory_service_1.default.getHistoryByIngredient(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    describe('getStockTypes', () => {
        it('should return list of stock types', async () => {
            // Arrange
            inventory_repository_1.default.findAllStockTypes.mockResolvedValue(inventory_mock_1.mockStockTypes);
            // Act
            const result = await inventory_service_1.default.getStockTypes();
            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('IN');
            expect(result[1].name).toBe('OUT');
        });
    });
});
//# sourceMappingURL=inventory.service.test.js.map