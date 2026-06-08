import inventoryService from './inventory.service';
import inventoryRepository from './inventory.repository';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import {
    mockStockMovementIn,
    mockStockMovementOut,
    mockStockMovements,
    mockStockTypeIn,
    mockStockTypeOut,
    mockStockTypes,
    mockIngredientForInventory,
    mockSupplierForInventory,
} from '../../tests/mocks/inventory.mock';

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
            } as any;

            (inventoryRepository.findAll as jest.Mock).mockResolvedValue(mockStockMovements);
            (inventoryRepository.count as jest.Mock).mockResolvedValue(2);

            // Act
            const result = await inventoryService.getHistory(mockRequest);

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
            } as any;

            (inventoryRepository.findAll as jest.Mock).mockResolvedValue([mockStockMovementIn]);
            (inventoryRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await inventoryService.getHistory(mockRequest);

            // Assert
            expect(inventoryRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001' })
            );
            expect(result.records).toHaveLength(1);
        });
    });

    describe('getDetail', () => {
        it('should return stock movement detail when found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440001' },
            } as any;

            (inventoryRepository.findById as jest.Mock).mockResolvedValue(mockStockMovementIn);

            // Act
            const result = await inventoryService.getDetail(mockRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.stock_movement_id).toBe('ee0e8400-e29b-41d4-a716-446655440001');
            expect(result.qty).toBe(50);
        });

        it('should throw ErrorNotFoundException when not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_movement_id: 'nonexistent-id' },
            } as any;

            (inventoryRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(inventoryService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
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
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(inventoryService.stockIn(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(mockIngredientForInventory);
            (inventoryRepository.findSupplierById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(inventoryService.stockIn(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            // Act & Assert
            await expect(inventoryService.stockIn(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(inventoryService.stockOut(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(mockIngredientForInventory);

            // Act & Assert
            await expect(inventoryService.stockOut(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            // Act & Assert
            await expect(inventoryService.stockOut(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });
    });

    describe('getHistoryByIngredient', () => {
        it('should return stock movements for specific ingredient', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001' },
                query: { batch: '1', size: '10' },
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(mockIngredientForInventory);
            (inventoryRepository.findByIngredientId as jest.Mock).mockResolvedValue(mockStockMovements);
            (inventoryRepository.count as jest.Mock).mockResolvedValue(2);

            // Act
            const result = await inventoryService.getHistoryByIngredient(mockRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.records).toHaveLength(2);
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                query: { batch: '1', size: '10' },
            } as any;

            (inventoryRepository.findIngredientById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(inventoryService.getHistoryByIngredient(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    describe('getStockTypes', () => {
        it('should return list of stock types', async () => {
            // Arrange
            (inventoryRepository.findAllStockTypes as jest.Mock).mockResolvedValue(mockStockTypes);

            // Act
            const result = await inventoryService.getStockTypes();

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('IN');
            expect(result[1].name).toBe('OUT');
        });
    });
});
