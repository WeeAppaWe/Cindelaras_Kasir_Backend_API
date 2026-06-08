import rawIngredientService from './ingredient-raw.service';
import rawIngredientRepository from './ingredient-raw.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';

import { mockIngredient, mockIngredient2, mockLowStockIngredients } from '../../../tests/mocks/ingredient.mock';
import { mockUnitMeasure } from '../../../tests/mocks/unit-measure.mock';

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
            } as any;

            (rawIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockIngredient, mockIngredient2]);
            (rawIngredientRepository.count as jest.Mock).mockResolvedValue(2);

            // Act
            const result = await rawIngredientService.getAll(mockRequest);

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
            } as any;

            (rawIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockIngredient]);
            (rawIngredientRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await rawIngredientService.getAll(mockRequest);

            // Assert
            expect(rawIngredientRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'tepung' })
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

            (rawIngredientRepository.findAll as jest.Mock).mockResolvedValue([mockIngredient]);
            (rawIngredientRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            await rawIngredientService.getAll(mockRequest);

            // Assert
            expect(rawIngredientRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ unit_id: '660e8400-e29b-41d4-a716-446655440001' })
            );
        });

        it('should use default pagination when not provided', async () => {
            // Arrange
            const mockRequest = {
                query: {},
            } as any;

            (rawIngredientRepository.findAll as jest.Mock).mockResolvedValue([]);
            (rawIngredientRepository.count as jest.Mock).mockResolvedValue(0);

            // Act
            const result = await rawIngredientService.getAll(mockRequest);

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
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(mockIngredient);

            // Act
            const result = await rawIngredientService.getDetail(mockRequest);

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
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(rawIngredientService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
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
            } as any;

            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (rawIngredientRepository.create as jest.Mock).mockResolvedValue(mockIngredient);

            // Act - just verify it doesn't throw
            await rawIngredientService.create(mockRequest);

            // Assert - verify validations were called
            expect(rawIngredientRepository.findByName).toHaveBeenCalledWith('Tepung Terigu');
            expect(unitMeasureService.findById).toHaveBeenCalledWith('660e8400-e29b-41d4-a716-446655440001');
        });

        it('should throw ErrorDataAlreadyExistException when name already exists', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'Tepung Terigu',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            } as any;

            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(mockIngredient);

            // Act & Assert
            await expect(rawIngredientService.create(mockRequest))
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

            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(rawIngredientService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should use default values for optional fields', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    name: 'New Ingredient',
                    unit_id: '660e8400-e29b-41d4-a716-446655440001',
                    min_stock: 10,
                },
            } as any;

            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(mockUnitMeasure);
            (rawIngredientRepository.create as jest.Mock).mockResolvedValue(mockIngredient);

            // Act - just verify it doesn't throw
            await rawIngredientService.create(mockRequest);

            // Assert - verify validations were called
            expect(rawIngredientRepository.findByName).toHaveBeenCalled();
            expect(unitMeasureService.findById).toHaveBeenCalled();
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
            } as any;

            const updatedIngredient = {
                ...mockIngredient,
                name: 'Tepung Terigu Premium',
                min_stock: 20,
            };

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(mockIngredient);
            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(null);
            (rawIngredientRepository.update as jest.Mock).mockResolvedValue(updatedIngredient);

            // Act - just verify it doesn't throw
            await rawIngredientService.update(mockRequest);

            // Assert - verify validations were called
            expect(rawIngredientRepository.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
            expect(rawIngredientRepository.findByName).toHaveBeenCalledWith('Tepung Terigu Premium', '550e8400-e29b-41d4-a716-446655440000');
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
                body: { name: 'New Name' },
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(rawIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorDataAlreadyExistException when new name already used', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { name: 'Gula Pasir' },
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(mockIngredient);
            (rawIngredientRepository.findByName as jest.Mock).mockResolvedValue(mockIngredient2);

            // Act & Assert
            await expect(rawIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when new unit_id not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
                body: { unit_id: 'nonexistent-unit-id' },
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(mockIngredient);
            (unitMeasureService.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(rawIngredientService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });
    });

    describe('softDelete', () => {
        it('should soft delete raw ingredient successfully', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: '550e8400-e29b-41d4-a716-446655440000' },
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(mockIngredient);
            (rawIngredientRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await rawIngredientService.softDelete(mockRequest);

            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Bahan baku berhasil dihapus');
            expect(rawIngredientRepository.findById).toHaveBeenCalledWith('550e8400-e29b-41d4-a716-446655440000');
        });

        it('should throw ErrorNotFoundException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                params: { ingredient_id: 'nonexistent-id' },
            } as any;

            (rawIngredientRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(rawIngredientService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    describe('getLowStockAlerts', () => {
        it('should return low stock ingredients', async () => {
            // Arrange
            (rawIngredientRepository.findLowStock as jest.Mock).mockResolvedValue(mockLowStockIngredients);
            (rawIngredientRepository.countLowStock as jest.Mock).mockResolvedValue(2);

            // Act
            const result = await rawIngredientService.getLowStockAlerts();

            // Assert
            expect(result.total_count).toBe(2);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].stock_qty).toBeLessThan(result.records[0].min_stock);
        });

        it('should return empty when no low stock ingredients', async () => {
            // Arrange
            (rawIngredientRepository.findLowStock as jest.Mock).mockResolvedValue([]);
            (rawIngredientRepository.countLowStock as jest.Mock).mockResolvedValue(0);

            // Act
            const result = await rawIngredientService.getLowStockAlerts();

            // Assert
            expect(result.total_count).toBe(0);
            expect(result.records).toHaveLength(0);
        });
    });
});
