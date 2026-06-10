import unitMeasureService from './unit-measure.service';
import unitMeasureRepository from './unit-measure.repository';

import {
    mockUnitMeasure,
    mockUnitMeasure2,
    mockUnitMeasure3,
    mockUnitMeasureReferences,
} from '../../tests/mocks/unit-measure.mock';
import { AuthenticatedRequest } from '../../../types';

// Mock dependencies
jest.mock('../../generated/prisma/client', () => ({
    PrismaClient: class PrismaClient { },
    Prisma: {
        PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error { },
        PrismaClientUnknownRequestError: class PrismaClientUnknownRequestError extends Error { },
        PrismaClientRustPanicError: class PrismaClientRustPanicError extends Error { },
        PrismaClientInitializationError: class PrismaClientInitializationError extends Error { },
        PrismaClientValidationError: class PrismaClientValidationError extends Error { },
    },
}));
jest.mock('./unit-measure.repository');
jest.mock('../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        unitMeasure: {
            findMany: jest.fn(),
            count: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        ingredient: {
            count: jest.fn(),
        },
    })),
}));

describe('Unit Measure Service', () => {
    const unitMeasureId = '660e8400-e29b-41d4-a716-446655440001';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllReferences', () => {
        it('should return unit measure references for dropdown', async () => {
            // Arrange
            const findAllReferencesMock = unitMeasureRepository.findAllReferences as jest.Mock;
            findAllReferencesMock.mockResolvedValue(mockUnitMeasureReferences);

            // Act
            const result = await unitMeasureService.getAllReferences();

            // Assert
            expect(result).toHaveLength(3);
            expect(result[0].unit_measure_id).toBe(mockUnitMeasure.unit_measure_id);
            expect(result[0].name).toBe('Kilogram');
            expect(result).toEqual(mockUnitMeasureReferences);
            expect(unitMeasureRepository.findAllReferences).toHaveBeenCalledTimes(1);
        });

        it('should return empty array when no unit measure references exist', async () => {
            // Arrange
            const findAllReferencesMock = unitMeasureRepository.findAllReferences as jest.Mock;
            findAllReferencesMock.mockResolvedValue([]);

            // Act
            const result = await unitMeasureService.getAllReferences();

            // Assert
            expect(result).toHaveLength(0);
            expect(unitMeasureRepository.findAllReferences).toHaveBeenCalledTimes(1);
        });

        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database connection failed');
            const findAllReferencesMock = unitMeasureRepository.findAllReferences as jest.Mock;
            findAllReferencesMock.mockRejectedValue(mockError);

            // Act and Assert
            await expect(unitMeasureService.getAllReferences())
                .rejects
                .toThrow('Database connection failed');
        });
    });

    describe('getAll', () => {
        it('should return list of all unit measures', async () => {
            // Arrange
            const mockUnits = [mockUnitMeasure, mockUnitMeasure2, mockUnitMeasure3];
            const findAllMock = unitMeasureRepository.findAll as jest.Mock;
            const countMock = unitMeasureRepository.count as jest.Mock;
            findAllMock.mockResolvedValue(mockUnits);
            countMock.mockResolvedValue(mockUnits.length);
            const req = {
                query: {},
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.getAll(req);

            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(3);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(3);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(3);
            expect(result.records[0].unit_measure_id).toBe('660e8400-e29b-41d4-a716-446655440001');
            expect(result.records[0].name).toBe('Kilogram');
            expect(result.records[1].name).toBe('Liter');
            expect(result.records[2].name).toBe('Gram');
            expect(unitMeasureRepository.findAll).toHaveBeenCalledTimes(1);
            expect(unitMeasureRepository.findAll).toHaveBeenCalledWith(
                { pagination: { limit: 10, offset: 0 } },
                { search: null }
            );
            expect(unitMeasureRepository.count).toHaveBeenCalledWith({ search: null });
        });

        it('should return empty array when no unit measures exist', async () => {
            // Arrange
            const findAllMock = unitMeasureRepository.findAll as jest.Mock;
            const countMock = unitMeasureRepository.count as jest.Mock;
            findAllMock.mockResolvedValue([]);
            countMock.mockResolvedValue(0);
            const req = {
                query: {},
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.getAll(req);

            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(0);
            expect(result.page.batch_size).toBe(0);
            expect(result.records).toHaveLength(0);
            expect(unitMeasureRepository.findAll).toHaveBeenCalledTimes(1);
        });

        it('should use pagination and search query', async () => {
            // Arrange
            const findAllMock = unitMeasureRepository.findAll as jest.Mock;
            const countMock = unitMeasureRepository.count as jest.Mock;
            findAllMock.mockResolvedValue([mockUnitMeasure2]);
            countMock.mockResolvedValue(1);
            const req = {
                query: { batch: '2', size: '5', search: 'lit' },
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.getAll(req);

            // Assert
            expect(result.page.total_record_count).toBe(1);
            expect(result.page.batch_number).toBe(2);
            expect(result.page.max_batch_size).toBe(5);
            expect(unitMeasureRepository.findAll).toHaveBeenCalledWith(
                { pagination: { limit: 5, offset: 5 } },
                { search: 'lit' }
            );
            expect(unitMeasureRepository.count).toHaveBeenCalledWith({ search: 'lit' });
        });

        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database connection failed');
            const findAllMock = unitMeasureRepository.findAll as jest.Mock;
            const countMock = unitMeasureRepository.count as jest.Mock;
            findAllMock.mockRejectedValue(mockError);
            countMock.mockResolvedValue(0);
            const req = {
                query: {},
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.getAll(req))
                .rejects
                .toThrow('Database connection failed');
        });
    });

    describe('getDetail', () => {
        it('should return unit measure detail when found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.getDetail(req);

            // Assert
            expect(result).toBeDefined();
            expect(result.unit_measure_id).toBe(unitMeasureId);
            expect(result.name).toBe('Kilogram');
            expect(unitMeasureRepository.findById).toHaveBeenCalledWith(unitMeasureId);
        });

        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.getDetail(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
        });
    });

    describe('findById', () => {
        it('should return unit measure when found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);

            // Act
            const result = await unitMeasureService.findById(unitMeasureId);

            // Assert
            expect(result).toBeDefined();
            expect(result?.unit_measure_id).toBe(unitMeasureId);
            expect(result?.name).toBe('Kilogram');
            expect(unitMeasureRepository.findById).toHaveBeenCalledWith(unitMeasureId);
        });

        it('should return null when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(null);

            // Act
            const result = await unitMeasureService.findById('nonexistent-id');

            // Assert
            expect(result).toBeNull();
            expect(unitMeasureRepository.findById).toHaveBeenCalledWith('nonexistent-id');
        });

        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database error');
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockRejectedValue(mockError);

            // Act and Assert
            await expect(unitMeasureService.findById('some-id'))
                .rejects
                .toThrow('Database error');
        });
    });

    describe('create', () => {
        it('should create unit measure when name is not used', async () => {
            // Arrange
            const findByNameMock = unitMeasureRepository.findByName as jest.Mock;
            const createMock = unitMeasureRepository.create as jest.Mock;
            findByNameMock.mockResolvedValue(null);
            createMock.mockResolvedValue(mockUnitMeasure);
            const req = {
                body: { name: 'Kilogram' },
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.create(req);

            // Assert
            expect(result).toBeDefined();
            expect(result.name).toBe('Kilogram');
            expect(unitMeasureRepository.findByName).toHaveBeenCalledWith('Kilogram');
            expect(unitMeasureRepository.create).toHaveBeenCalledWith({ name: 'Kilogram' });
        });

        it('should throw error when name already exists', async () => {
            // Arrange
            const findByNameMock = unitMeasureRepository.findByName as jest.Mock;
            findByNameMock.mockResolvedValue(mockUnitMeasure);
            const req = {
                body: { name: 'Kilogram' },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.create(req))
                .rejects
                .toThrow('Nama satuan sudah digunakan');
            expect(unitMeasureRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('should update unit measure when found and name is not used', async () => {
            // Arrange
            const updatedUnitMeasure = { ...mockUnitMeasure, name: 'Kg' };
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            const findByNameMock = unitMeasureRepository.findByName as jest.Mock;
            const updateMock = unitMeasureRepository.update as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);
            findByNameMock.mockResolvedValue(null);
            updateMock.mockResolvedValue(updatedUnitMeasure);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Kg' },
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.update(req);

            // Assert
            expect(result.name).toBe('Kg');
            expect(unitMeasureRepository.findById).toHaveBeenCalledWith(unitMeasureId);
            expect(unitMeasureRepository.findByName).toHaveBeenCalledWith('Kg', unitMeasureId);
            expect(unitMeasureRepository.update).toHaveBeenCalledWith(unitMeasureId, { name: 'Kg' });
        });

        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Kg' },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.update(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
            expect(unitMeasureRepository.update).not.toHaveBeenCalled();
        });

        it('should throw error when name already used by another unit measure', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            const findByNameMock = unitMeasureRepository.findByName as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);
            findByNameMock.mockResolvedValue(mockUnitMeasure2);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Liter' },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.update(req))
                .rejects
                .toThrow('Nama satuan sudah digunakan');
            expect(unitMeasureRepository.update).not.toHaveBeenCalled();
        });
    });

    describe('softDelete', () => {
        it('should soft delete unit measure when found and not used by ingredients', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            const hasIngredientsMock = unitMeasureRepository.hasIngredients as jest.Mock;
            const softDeleteMock = unitMeasureRepository.softDelete as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);
            hasIngredientsMock.mockResolvedValue(false);
            softDeleteMock.mockResolvedValue(undefined);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            } as unknown as AuthenticatedRequest;

            // Act
            const result = await unitMeasureService.softDelete(req);

            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Satuan berhasil dihapus');
            expect(unitMeasureRepository.findById).toHaveBeenCalledWith(unitMeasureId);
            expect(unitMeasureRepository.hasIngredients).toHaveBeenCalledWith(unitMeasureId);
            expect(unitMeasureRepository.softDelete).toHaveBeenCalledWith(unitMeasureId);
        });

        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.softDelete(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
            expect(unitMeasureRepository.softDelete).not.toHaveBeenCalled();
        });

        it('should throw error when unit measure still has ingredients', async () => {
            // Arrange
            const findByIdMock = unitMeasureRepository.findById as jest.Mock;
            const hasIngredientsMock = unitMeasureRepository.hasIngredients as jest.Mock;
            findByIdMock.mockResolvedValue(mockUnitMeasure);
            hasIngredientsMock.mockResolvedValue(true);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            } as unknown as AuthenticatedRequest;

            // Act and Assert
            await expect(unitMeasureService.softDelete(req))
                .rejects
                .toThrow('Satuan tidak dapat dihapus karena masih digunakan oleh bahan');
            expect(unitMeasureRepository.softDelete).not.toHaveBeenCalled();
        });
    });
});
