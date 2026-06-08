"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unit_measure_service_1 = __importDefault(require("./unit-measure.service"));
const unit_measure_repository_1 = __importDefault(require("./unit-measure.repository"));
const unit_measure_mock_1 = require("../../tests/mocks/unit-measure.mock");
// Mock dependencies
jest.mock('./unit-measure.repository');
describe('Unit Measure Service', () => {
    const unitMeasureId = '660e8400-e29b-41d4-a716-446655440001';
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getAll', () => {
        it('should return list of all unit measures', async () => {
            // Arrange
            const mockUnits = [unit_measure_mock_1.mockUnitMeasure, unit_measure_mock_1.mockUnitMeasure2, unit_measure_mock_1.mockUnitMeasure3];
            const findAllMock = unit_measure_repository_1.default.findAll;
            const countMock = unit_measure_repository_1.default.count;
            findAllMock.mockResolvedValue(mockUnits);
            countMock.mockResolvedValue(mockUnits.length);
            const req = {
                query: {},
            };
            // Act
            const result = await unit_measure_service_1.default.getAll(req);
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
            expect(unit_measure_repository_1.default.findAll).toHaveBeenCalledTimes(1);
            expect(unit_measure_repository_1.default.findAll).toHaveBeenCalledWith({ pagination: { limit: 10, offset: 0 } }, { search: null });
            expect(unit_measure_repository_1.default.count).toHaveBeenCalledWith({ search: null });
        });
        it('should return empty array when no unit measures exist', async () => {
            // Arrange
            const findAllMock = unit_measure_repository_1.default.findAll;
            const countMock = unit_measure_repository_1.default.count;
            findAllMock.mockResolvedValue([]);
            countMock.mockResolvedValue(0);
            const req = {
                query: {},
            };
            // Act
            const result = await unit_measure_service_1.default.getAll(req);
            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(0);
            expect(result.page.batch_size).toBe(0);
            expect(result.records).toHaveLength(0);
            expect(unit_measure_repository_1.default.findAll).toHaveBeenCalledTimes(1);
        });
        it('should use pagination and search query', async () => {
            // Arrange
            const findAllMock = unit_measure_repository_1.default.findAll;
            const countMock = unit_measure_repository_1.default.count;
            findAllMock.mockResolvedValue([unit_measure_mock_1.mockUnitMeasure2]);
            countMock.mockResolvedValue(1);
            const req = {
                query: { batch: '2', size: '5', search: 'lit' },
            };
            // Act
            const result = await unit_measure_service_1.default.getAll(req);
            // Assert
            expect(result.page.total_record_count).toBe(1);
            expect(result.page.batch_number).toBe(2);
            expect(result.page.max_batch_size).toBe(5);
            expect(unit_measure_repository_1.default.findAll).toHaveBeenCalledWith({ pagination: { limit: 5, offset: 5 } }, { search: 'lit' });
            expect(unit_measure_repository_1.default.count).toHaveBeenCalledWith({ search: 'lit' });
        });
        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database connection failed');
            const findAllMock = unit_measure_repository_1.default.findAll;
            const countMock = unit_measure_repository_1.default.count;
            findAllMock.mockRejectedValue(mockError);
            countMock.mockResolvedValue(0);
            const req = {
                query: {},
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.getAll(req))
                .rejects
                .toThrow('Database connection failed');
        });
    });
    describe('getDetail', () => {
        it('should return unit measure detail when found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            };
            // Act
            const result = await unit_measure_service_1.default.getDetail(req);
            // Assert
            expect(result).toBeDefined();
            expect(result.unit_measure_id).toBe(unitMeasureId);
            expect(result.name).toBe('Kilogram');
            expect(unit_measure_repository_1.default.findById).toHaveBeenCalledWith(unitMeasureId);
        });
        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.getDetail(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
        });
    });
    describe('findById', () => {
        it('should return unit measure when found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            // Act
            const result = await unit_measure_service_1.default.findById(unitMeasureId);
            // Assert
            expect(result).toBeDefined();
            expect(result?.unit_measure_id).toBe(unitMeasureId);
            expect(result?.name).toBe('Kilogram');
            expect(unit_measure_repository_1.default.findById).toHaveBeenCalledWith(unitMeasureId);
        });
        it('should return null when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(null);
            // Act
            const result = await unit_measure_service_1.default.findById('nonexistent-id');
            // Assert
            expect(result).toBeNull();
            expect(unit_measure_repository_1.default.findById).toHaveBeenCalledWith('nonexistent-id');
        });
        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database error');
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockRejectedValue(mockError);
            // Act and Assert
            await expect(unit_measure_service_1.default.findById('some-id'))
                .rejects
                .toThrow('Database error');
        });
    });
    describe('create', () => {
        it('should create unit measure when name is not used', async () => {
            // Arrange
            const findByNameMock = unit_measure_repository_1.default.findByName;
            const createMock = unit_measure_repository_1.default.create;
            findByNameMock.mockResolvedValue(null);
            createMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            const req = {
                body: { name: 'Kilogram' },
            };
            // Act
            const result = await unit_measure_service_1.default.create(req);
            // Assert
            expect(result).toBeDefined();
            expect(result.name).toBe('Kilogram');
            expect(unit_measure_repository_1.default.findByName).toHaveBeenCalledWith('Kilogram');
            expect(unit_measure_repository_1.default.create).toHaveBeenCalledWith({ name: 'Kilogram' });
        });
        it('should throw error when name already exists', async () => {
            // Arrange
            const findByNameMock = unit_measure_repository_1.default.findByName;
            findByNameMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            const req = {
                body: { name: 'Kilogram' },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.create(req))
                .rejects
                .toThrow('Nama satuan sudah digunakan');
            expect(unit_measure_repository_1.default.create).not.toHaveBeenCalled();
        });
    });
    describe('update', () => {
        it('should update unit measure when found and name is not used', async () => {
            // Arrange
            const updatedUnitMeasure = { ...unit_measure_mock_1.mockUnitMeasure, name: 'Kg' };
            const findByIdMock = unit_measure_repository_1.default.findById;
            const findByNameMock = unit_measure_repository_1.default.findByName;
            const updateMock = unit_measure_repository_1.default.update;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            findByNameMock.mockResolvedValue(null);
            updateMock.mockResolvedValue(updatedUnitMeasure);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Kg' },
            };
            // Act
            const result = await unit_measure_service_1.default.update(req);
            // Assert
            expect(result.name).toBe('Kg');
            expect(unit_measure_repository_1.default.findById).toHaveBeenCalledWith(unitMeasureId);
            expect(unit_measure_repository_1.default.findByName).toHaveBeenCalledWith('Kg', unitMeasureId);
            expect(unit_measure_repository_1.default.update).toHaveBeenCalledWith(unitMeasureId, { name: 'Kg' });
        });
        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Kg' },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.update(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
            expect(unit_measure_repository_1.default.update).not.toHaveBeenCalled();
        });
        it('should throw error when name already used by another unit measure', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            const findByNameMock = unit_measure_repository_1.default.findByName;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            findByNameMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure2);
            const req = {
                params: { unit_measure_id: unitMeasureId },
                body: { name: 'Liter' },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.update(req))
                .rejects
                .toThrow('Nama satuan sudah digunakan');
            expect(unit_measure_repository_1.default.update).not.toHaveBeenCalled();
        });
    });
    describe('softDelete', () => {
        it('should soft delete unit measure when found and not used by ingredients', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            const hasIngredientsMock = unit_measure_repository_1.default.hasIngredients;
            const softDeleteMock = unit_measure_repository_1.default.softDelete;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            hasIngredientsMock.mockResolvedValue(false);
            softDeleteMock.mockResolvedValue(undefined);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            };
            // Act
            const result = await unit_measure_service_1.default.softDelete(req);
            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Satuan berhasil dihapus');
            expect(unit_measure_repository_1.default.findById).toHaveBeenCalledWith(unitMeasureId);
            expect(unit_measure_repository_1.default.hasIngredients).toHaveBeenCalledWith(unitMeasureId);
            expect(unit_measure_repository_1.default.softDelete).toHaveBeenCalledWith(unitMeasureId);
        });
        it('should throw error when unit measure not found', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            findByIdMock.mockResolvedValue(null);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.softDelete(req))
                .rejects
                .toThrow('Satuan tidak ditemukan');
            expect(unit_measure_repository_1.default.softDelete).not.toHaveBeenCalled();
        });
        it('should throw error when unit measure still has ingredients', async () => {
            // Arrange
            const findByIdMock = unit_measure_repository_1.default.findById;
            const hasIngredientsMock = unit_measure_repository_1.default.hasIngredients;
            findByIdMock.mockResolvedValue(unit_measure_mock_1.mockUnitMeasure);
            hasIngredientsMock.mockResolvedValue(true);
            const req = {
                params: { unit_measure_id: unitMeasureId },
            };
            // Act and Assert
            await expect(unit_measure_service_1.default.softDelete(req))
                .rejects
                .toThrow('Satuan tidak dapat dihapus karena masih digunakan oleh bahan');
            expect(unit_measure_repository_1.default.softDelete).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=unit-measure.service.test.js.map