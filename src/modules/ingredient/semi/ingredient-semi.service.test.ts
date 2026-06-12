import semiIngredientService from './ingredient-semi.service';
import semiIngredientRepository from './ingredient-semi.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import stockTypeRepository from '../../stock-type/stock-type.repository';
import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';

import {
    mockSemiIngredient,
    mockSemiIngredient2,
    mockIngredientWithCompositions,
    mockIngredientWithCompositionsAndStock,
    mockIngredientCostsWithStock,
    mockComposition1,
    mockComposition2,
    mockChildIngredient1,
    mockChildIngredient2,
} from '../../../tests/mocks/ingredient.mock';
import { mockUnitMeasure } from '../../../tests/mocks/unit-measure.mock';

// Mock dependencies
jest.mock('./ingredient-semi.repository');
jest.mock('../../unit-measure/unit-measure.service');
jest.mock('../../stock-type/stock-type.repository');
jest.mock('../semi/composition/ingredient-semi-composition.repository');
jest.mock('../../../../database/postgres.connection', () => {
    // Singleton mock client — the service captures this at module-load via `const prisma = getPrismaClient()`
    const mockClient = {
        $transaction: jest.fn(),
        ingredient: {
            create: jest.fn(),
            update: jest.fn(),
        },
        stockMovement: {
            create: jest.fn(),
        },
    };
    return {
        __esModule: true,
        default: jest.fn(() => mockClient),
        __mockClient: mockClient,
    };
});

describe('Semi Ingredient Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Re-establish $transaction implementation on the SAME object the service holds
        const { __mockClient } = require('../../../../database/postgres.connection');
        __mockClient.$transaction.mockImplementation(async (callback: Function) => {
            const mockTransactionClient = {
                ingredient: {
                    create: jest.fn(),
                    update: jest.fn(),
                },
                stockMovement: {
                    create: jest.fn(),
                },
            };
            return await callback(mockTransactionClient);
        });
    });

    describe('getAll', () => {
        it('should return paginated list of semi ingredients', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10' },
            } as any;

            (semiIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockSemiIngredient, mockSemiIngredient2]);
            (semiIngredientRepository.count as jest.Mock).mockResolvedValue(2);

            // Act
            const result = await semiIngredientService.getAll(mockRequest);

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
            } as any;

            (semiIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockSemiIngredient]);
            (semiIngredientRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await semiIngredientService.getAll(mockRequest);

            // Assert
            expect(semiIngredientRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'bumbu' })
            );
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
            } as any;

            (semiIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockSemiIngredient]);
            (semiIngredientRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            await semiIngredientService.getAll(mockRequest);

            // Assert
            expect(semiIngredientRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ unit_id: '660e8400-e29b-41d4-a716-446655440001' })
            );
        });

        it('should use default pagination when not provided', async () => {
            // Arrange
            const mockRequest = {
                query: {},
            } as any;

            (semiIngredientRepository.findAll as jest.Mock).mockResolvedValue([]);
            (semiIngredientRepository.count as jest.Mock).mockResolvedValue(0);

            // Act
            const result = await semiIngredientService.getAll(mockRequest);

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
            } as any;

            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue(mockIngredientWithCompositions);

            // Act
            const result = await semiIngredientService.getDetail(mockRequest);

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
            } as any;

            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
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
            } as any;

            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (semiIngredientRepository.create as jest.Mock).mockResolvedValue(mockSemiIngredient);

            // Act - just verify it doesn't throw
            await semiIngredientService.create(mockRequest);

            // Assert - verify validations were called
            expect(semiIngredientRepository.findByName).toHaveBeenCalledWith('Bumbu Dasar');
            expect(unitMeasureService.findById).toHaveBeenCalledWith('660e8400-e29b-41d4-a716-446655440001');
        });

        it('should throw ErrorDataAlreadyExistException when name already exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Bumbu Dasar',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            } as any;

            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(mockSemiIngredient);

            // Act & Assert
            await expect(semiIngredientService.create(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'New Ingredient',
                    unit_id: 'nonexistent-unit-id',
                    min_stock: 10,
                },
            } as any;

            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            const updatedIngredient = {
                ...mockSemiIngredient,
                name: 'Bumbu Dasar Premium',
                min_stock: 20,
            };

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(mockSemiIngredient);
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (semiIngredientRepository.update as jest.Mock).mockResolvedValue(updatedIngredient);

            // Act - just verify it doesn't throw
            await semiIngredientService.update(mockRequest);

            // Assert - verify validations were called
            expect(semiIngredientRepository.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
            expect(semiIngredientRepository.findByName).toHaveBeenCalledWith('Bumbu Dasar Premium', '550e8400-e29b-41d4-a716-446655440000');
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                body: { name: 'New Name' },
            } as any;

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorDataAlreadyExistException when new name already used', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { name: 'Sambal Goreng' },
            } as any;

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(mockSemiIngredient);
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(mockSemiIngredient2);

            // Act & Assert
            await expect(semiIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when new unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { unit_id: 'nonexistent-unit-id' },
            } as any;

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(mockSemiIngredient);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });
    });

    describe('softDelete', () => {
        it('should soft delete semi ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            } as any;

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(mockSemiIngredient);
            (semiIngredientRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await semiIngredientService.softDelete(mockRequest);

            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan setengah jadi berhasil dihapus');
            expect(semiIngredientRepository.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            } as any;

            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    describe('getHPPCalculation', () => {
        it('should calculate HPP correctly', async () => {
            // Arrange
            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue(mockIngredientWithCompositions);

            // Act
            const result = await semiIngredientService.getHPPCalculation('550e8400-e29b-41d4-a716-446655440000', 1);

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
            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue(mockIngredientWithCompositions);

            // Act
            const result = await semiIngredientService.getHPPCalculation('550e8400-e29b-41d4-a716-446655440000', 2);

            // Assert
            // HPP = (2 * 5000) + (1 * 3000) = 13000
            // HPP per unit = 13000 / 2 = 6500
            expect(result.total_hpp).toBe(13000);
            expect(result.target_yield).toBe(2);
            expect(result.hpp_per_unit).toBe(6500);
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.getHPPCalculation('nonexistent-id'))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    describe('produce', () => {
        const mockStockTypeOut = {
            stock_type_id: 'st-out-production',
            name: 'OUT_PRODUCTION',
        };

        const mockStockTypeIn = {
            stock_type_id: 'st-in-production',
            name: 'IN_PRODUCTION',
        };

        it('should produce successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: mockSemiIngredient.ingredient_id },
                body: { qty: 5, notes: 'Produksi siang' },
                user: { user_id: 'user-123' },
            } as any;

            (semiIngredientRepository.findByIdWithCompositionsAndStock as jest.Mock).mockResolvedValue(
                mockIngredientWithCompositionsAndStock
            );
            (stockTypeRepository.findByName as jest.Mock)
                .mockResolvedValueOnce(mockStockTypeOut)
                .mockResolvedValueOnce(mockStockTypeIn);
            (semiIngredientRepository.findById as jest.Mock).mockResolvedValue({
                ...mockSemiIngredient,
                stock_qty: 55,
                avg_cost: 13000,
            });
            (semiIngredientRepository.updateAvgCost as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await semiIngredientService.produce(mockRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.produced_qty).toBe(5);
            expect(result.deducted_ingredients).toHaveLength(2);
            expect(semiIngredientRepository.findByIdWithCompositionsAndStock).toHaveBeenCalledWith(
                mockSemiIngredient.ingredient_id
            );
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                body: { qty: 5 },
                user: { user_id: 'user-123' },
            } as any;

            (semiIngredientRepository.findByIdWithCompositionsAndStock as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.produce(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when ingredient has no compositions', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: mockSemiIngredient.ingredient_id },
                body: { qty: 5 },
                user: { user_id: 'user-123' },
            } as any;

            (semiIngredientRepository.findByIdWithCompositionsAndStock as jest.Mock).mockResolvedValue({
                ...mockSemiIngredient,
                child_compositions: [],
            });

            // Act & Assert
            await expect(semiIngredientService.produce(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when stock is insufficient', async () => {
            // Arrange — child1 stock_qty = 5, tapi butuh 2 * 5 = 10
            const mockRequest = {
                params: { ingredient_id: mockSemiIngredient.ingredient_id },
                body: { qty: 5 },
                user: { user_id: 'user-123' },
            } as any;

            const insufficientStock = {
                ...mockIngredientWithCompositions,
                child_compositions: [
                    {
                        ...mockComposition1,
                        child_ingredient: { ...mockChildIngredient1, stock_qty: 5 }, // butuh 2*5=10, tersedia 5
                    },
                    {
                        ...mockComposition2,
                        child_ingredient: { ...mockChildIngredient2, stock_qty: 500 },
                    },
                ],
            };

            (semiIngredientRepository.findByIdWithCompositionsAndStock as jest.Mock).mockResolvedValue(
                insufficientStock
            );

            // Act & Assert
            await expect(semiIngredientService.produce(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });
    });

    describe('createAndProduce', () => {
        const mockStockTypeOut = {
            stock_type_id: 'st-out-production',
            name: 'OUT_PRODUCTION',
        };

        const mockStockTypeIn = {
            stock_type_id: 'st-in-production',
            name: 'IN_PRODUCTION',
        };

        const validRequest = {
            body: {
                name: 'Saus Tomat',
                unit_id: '660e8400-e29b-41d4-a716-446655440001',
                min_stock: 5,
                qty: 3,
                notes: 'Batch pertama',
                compositions: [
                    { child_id: mockChildIngredient1.ingredient_id, qty_needed: 2 },
                    { child_id: mockChildIngredient2.ingredient_id, qty_needed: 0.5 },
                ],
            },
            user: { user_id: 'user-admin-123' },
        } as any;

        it('should create and produce successfully', async () => {
            // Arrange
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (semiIngredientRepository.findIngredientsByIds as jest.Mock).mockResolvedValue(mockIngredientCostsWithStock);
            (stockTypeRepository.findByName as jest.Mock)
                .mockResolvedValueOnce(mockStockTypeOut)
                .mockResolvedValueOnce(mockStockTypeIn);
            (semiIngredientRepository.create as jest.Mock).mockResolvedValue(mockSemiIngredient);
            (semiIngredientRepository.updateAvgCost as jest.Mock).mockResolvedValue(undefined);
            (semiIngredientRepository.findByIdWithCompositions as jest.Mock).mockResolvedValue({
                ...mockIngredientWithCompositions,
                name: 'Saus Tomat',
                stock_qty: 3,
                avg_cost: 6500,
            });

            // Act
            const result = await semiIngredientService.createAndProduce(validRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.produced_qty).toBe(3);
            expect(result.compositions).toBeDefined();
            expect(result.deducted_ingredients).toBeDefined();
            expect(result.deducted_ingredients.length).toBeGreaterThan(0);
            expect(semiIngredientRepository.findByName).toHaveBeenCalledWith('Saus Tomat');
            expect(unitMeasureService.findById).toHaveBeenCalledWith('660e8400-e29b-41d4-a716-446655440001');
        });

        it('should throw ErrorDataAlreadyExistException when name already exists', async () => {
            // Arrange
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(mockSemiIngredient);

            // Act & Assert
            await expect(semiIngredientService.createAndProduce(validRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when unit_id not found', async () => {
            // Arrange
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(semiIngredientService.createAndProduce(validRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when a child ingredient not found', async () => {
            // Arrange — returns hanya 1 dari 2 child IDs yang diminta
            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (semiIngredientRepository.findIngredientsByIds as jest.Mock).mockResolvedValue([
                mockIngredientCostsWithStock[0], // hanya 1 item, seharusnya 2
            ]);

            // Act & Assert
            await expect(semiIngredientService.createAndProduce(validRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when stock is insufficient', async () => {
            // Arrange — stock_qty = 2, tapi butuh qty_needed(2) * qty(3) = 6
            const insufficientStock = [
                {
                    ingredient_id: mockChildIngredient1.ingredient_id,
                    name: mockChildIngredient1.name,
                    avg_cost: 5000,
                    stock_qty: 2, // butuh 6, tersedia 2
                    unit_name: 'Gram',
                },
                {
                    ingredient_id: mockChildIngredient2.ingredient_id,
                    name: mockChildIngredient2.name,
                    avg_cost: 3000,
                    stock_qty: 500,
                    unit_name: 'Gram',
                },
            ];

            (semiIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (semiIngredientRepository.findIngredientsByIds as jest.Mock).mockResolvedValue(insufficientStock);

            // Act & Assert
            await expect(semiIngredientService.createAndProduce(validRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });
    });
});
