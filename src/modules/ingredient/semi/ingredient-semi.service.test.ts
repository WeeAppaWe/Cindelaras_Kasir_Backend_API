import semiIngredientService from './ingredient-semi.service';
import semiIngredientRepository from './ingredient-semi.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';

import {
    mockSemiIngredient,
    mockSemiIngredient2,
    mockIngredientWithCompositions
} from '../../../tests/mocks/ingredient.mock';
import { mockUnitMeasure } from '../../../tests/mocks/unit-measure.mock';

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
});
