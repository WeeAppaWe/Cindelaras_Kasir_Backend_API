"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opname_service_1 = __importDefault(require("./opname.service"));
const opname_repository_1 = __importDefault(require("./opname.repository"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const opname_schema_1 = require("./opname.schema");
const opname_mock_1 = require("../../tests/mocks/opname.mock");
// ============================================
// MOCKS
// ============================================
// Mock dependencies
jest.mock('./opname.repository');
jest.mock('../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn(async (callback) => {
            const mockTransactionClient = {
                stockOpname: { create: jest.fn(), update: jest.fn() },
                stockOpnameItem: { createMany: jest.fn(), updateMany: jest.fn() },
                ingredient: { update: jest.fn(), findUnique: jest.fn() },
            };
            return await callback(mockTransactionClient);
        }),
    })),
}));
// ============================================
// TEST SUITES
// ============================================
describe('Opname Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return paginated list of opnames', async () => {
            // Arrange
            const mockRequest = {
                query: { batch: '1', size: '10' },
            };
            opname_repository_1.default.findAll.mockResolvedValue(opname_mock_1.mockOpnames);
            opname_repository_1.default.count.mockResolvedValue(4);
            // Act
            const result = await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(4);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(4);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(4);
        });
        it('should use default pagination when not provided', async () => {
            // Arrange
            const mockRequest = { query: {} };
            opname_repository_1.default.findAll.mockResolvedValue([opname_mock_1.mockOpnameDraft]);
            opname_repository_1.default.count.mockResolvedValue(1);
            // Act
            const result = await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(opname_repository_1.default.findAll).toHaveBeenCalledWith(expect.objectContaining({
                pagination: expect.objectContaining({ limit: 10, offset: 0 }),
            }), expect.any(Object));
        });
        it('should pass search filter to repository', async () => {
            // Arrange
            const mockRequest = { query: { search: 'akhir bulan' } };
            opname_repository_1.default.findAll.mockResolvedValue([opname_mock_1.mockOpnameDraft]);
            opname_repository_1.default.count.mockResolvedValue(1);
            // Act
            await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(opname_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'akhir bulan' }));
        });
        it('should pass status filter to repository', async () => {
            // Arrange
            const mockRequest = { query: { status: 'DRAFT' } };
            opname_repository_1.default.findAll.mockResolvedValue([opname_mock_1.mockOpnameDraft]);
            opname_repository_1.default.count.mockResolvedValue(1);
            // Act
            await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(opname_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ status: 'DRAFT' }));
        });
        it('should pass date range filters to repository', async () => {
            // Arrange
            const mockRequest = {
                query: { start_date: '2024-01-01', end_date: '2024-01-31' },
            };
            opname_repository_1.default.findAll.mockResolvedValue([]);
            opname_repository_1.default.count.mockResolvedValue(0);
            // Act
            await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(opname_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({
                start_date: '2024-01-01',
                end_date: '2024-01-31',
            }));
        });
        it('should return empty records when no opnames found', async () => {
            // Arrange
            const mockRequest = { query: {} };
            opname_repository_1.default.findAll.mockResolvedValue([]);
            opname_repository_1.default.count.mockResolvedValue(0);
            // Act
            const result = await opname_service_1.default.getAll(mockRequest);
            // Assert
            expect(result.records).toHaveLength(0);
            expect(result.page.total_record_count).toBe(0);
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        it('should return opname detail with items by ID', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameDraft.stock_opname_id },
            };
            opname_repository_1.default.findByIdWithDetails.mockResolvedValue(opname_mock_1.mockOpnameDraftWithDetails);
            // Act
            const result = await opname_service_1.default.getDetail(mockRequest);
            // Assert
            expect(result).toBeDefined();
            expect(result.stock_opname_id).toBe(opname_mock_1.mockOpnameDraft.stock_opname_id);
            expect(result.status).toBe(opname_schema_1.OpnameStatus.DRAFT);
            expect(result.items).toHaveLength(3);
            expect(opname_repository_1.default.findByIdWithDetails).toHaveBeenCalledWith(opname_mock_1.mockOpnameDraft.stock_opname_id);
        });
        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
            };
            opname_repository_1.default.findByIdWithDetails.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // CREATE TESTS - Validation Logic
    // ============================================
    describe('create', () => {
        it('should throw ErrorValidationException when user not authenticated', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    opname_date: '2024-01-15',
                    items: [
                        { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 98 },
                    ],
                },
                user: undefined,
            };
            // Act & Assert
            await expect(opname_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when ingredient not found', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    opname_date: '2024-01-15',
                    items: [
                        { ingredient_id: 'non-existent-ingredient', physical_qty: 100 },
                    ],
                },
                user: opname_mock_1.mockUserForOpname,
            };
            opname_repository_1.default.getIngredientStock.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should validate all ingredients before creating opname', async () => {
            // Arrange
            const mockRequest = {
                body: {
                    opname_date: '2024-01-15',
                    items: [
                        { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 98 },
                        { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002', physical_qty: 50 },
                    ],
                },
                user: opname_mock_1.mockUserForOpname,
            };
            // First ingredient found, second not found
            opname_repository_1.default.getIngredientStock
                .mockResolvedValueOnce(100)
                .mockResolvedValueOnce(null);
            // Act & Assert
            await expect(opname_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(opname_repository_1.default.getIngredientStock).toHaveBeenCalledTimes(2);
        });
    });
    // ============================================
    // UPDATE TESTS - Validation Logic
    // ============================================
    describe('update', () => {
        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
                body: { notes: 'Updated notes' },
            };
            opname_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when opname is not DRAFT', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCompleted.stock_opname_id },
                body: { notes: 'Updated notes' },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCompleted);
            // Act & Assert
            await expect(opname_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameApplied.stock_opname_id },
                body: { notes: 'Updated notes' },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameApplied);
            // Act & Assert
            await expect(opname_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when opname is CANCELLED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCancelled.stock_opname_id },
                body: { notes: 'Updated notes' },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCancelled);
            // Act & Assert
            await expect(opname_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    // ============================================
    // CHANGE STATUS TESTS - Validation Logic
    // ============================================
    describe('changeStatus', () => {
        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
                body: { status: opname_schema_1.OpnameStatus.COMPLETED },
            };
            opname_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.changeStatus(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when opname is not DRAFT', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCompleted.stock_opname_id },
                body: { status: opname_schema_1.OpnameStatus.CANCELLED },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCompleted);
            // Act & Assert
            await expect(opname_service_1.default.changeStatus(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should update status from DRAFT to COMPLETED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameDraft.stock_opname_id },
                body: { status: opname_schema_1.OpnameStatus.COMPLETED },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameDraft);
            opname_repository_1.default.updateStatus.mockResolvedValue(undefined);
            opname_repository_1.default.findByIdWithDetails.mockResolvedValue({
                ...opname_mock_1.mockOpnameDraftWithDetails,
                status: opname_schema_1.OpnameStatus.COMPLETED,
            });
            // Act
            const result = await opname_service_1.default.changeStatus(mockRequest);
            // Assert
            expect(result.status).toBe(opname_schema_1.OpnameStatus.COMPLETED);
            expect(opname_repository_1.default.updateStatus).toHaveBeenCalledWith(opname_mock_1.mockOpnameDraft.stock_opname_id, opname_schema_1.OpnameStatus.COMPLETED);
        });
        it('should update status from DRAFT to CANCELLED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameDraft.stock_opname_id },
                body: { status: opname_schema_1.OpnameStatus.CANCELLED },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameDraft);
            opname_repository_1.default.updateStatus.mockResolvedValue(undefined);
            opname_repository_1.default.findByIdWithDetails.mockResolvedValue({
                ...opname_mock_1.mockOpnameDraftWithDetails,
                status: opname_schema_1.OpnameStatus.CANCELLED,
            });
            // Act
            const result = await opname_service_1.default.changeStatus(mockRequest);
            // Assert
            expect(result.status).toBe(opname_schema_1.OpnameStatus.CANCELLED);
        });
    });
    // ============================================
    // APPLY ADJUSTMENT TESTS - Validation Logic
    // ============================================
    describe('applyAdjustment', () => {
        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
            };
            opname_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.applyAdjustment(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when opname is DRAFT', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameDraft.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameDraft);
            // Act & Assert
            await expect(opname_service_1.default.applyAdjustment(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameApplied.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameApplied);
            // Act & Assert
            await expect(opname_service_1.default.applyAdjustment(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when opname is CANCELLED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCancelled.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCancelled);
            // Act & Assert
            await expect(opname_service_1.default.applyAdjustment(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    // ============================================
    // SOFT DELETE TESTS - Validation Logic
    // ============================================
    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
            };
            opname_repository_1.default.findById.mockResolvedValue(null);
            // Act & Assert
            await expect(opname_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when opname is COMPLETED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCompleted.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCompleted);
            // Act & Assert
            await expect(opname_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameApplied.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameApplied);
            // Act & Assert
            await expect(opname_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should delete opname with DRAFT status', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameDraft.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameDraft);
            opname_repository_1.default.softDelete.mockResolvedValue(undefined);
            // Act
            const result = await opname_service_1.default.softDelete(mockRequest);
            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Stock opname berhasil dihapus');
            expect(opname_repository_1.default.softDelete).toHaveBeenCalledWith(opname_mock_1.mockOpnameDraft.stock_opname_id);
        });
        it('should delete opname with CANCELLED status', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: opname_mock_1.mockOpnameCancelled.stock_opname_id },
            };
            opname_repository_1.default.findById.mockResolvedValue(opname_mock_1.mockOpnameCancelled);
            opname_repository_1.default.softDelete.mockResolvedValue(undefined);
            // Act
            const result = await opname_service_1.default.softDelete(mockRequest);
            // Assert
            expect(result.success).toBe(true);
        });
    });
    // ============================================
    // GET INGREDIENTS TESTS
    // ============================================
    describe('getIngredients', () => {
        it('should return list of ingredients for opname form', async () => {
            // Arrange
            opname_repository_1.default.getIngredientsForOpname.mockResolvedValue(opname_mock_1.mockIngredientsForOpname);
            // Act
            const result = await opname_service_1.default.getIngredients();
            // Assert
            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result[0].name).toBe('Beras');
            expect(result[0].stock_qty).toBe(100);
        });
        it('should return empty array when no ingredients found', async () => {
            // Arrange
            opname_repository_1.default.getIngredientsForOpname.mockResolvedValue([]);
            // Act
            const result = await opname_service_1.default.getIngredients();
            // Assert
            expect(result).toHaveLength(0);
        });
        it('should call repository getIngredientsForOpname', async () => {
            // Arrange
            opname_repository_1.default.getIngredientsForOpname.mockResolvedValue(opname_mock_1.mockIngredientsForOpname);
            // Act
            await opname_service_1.default.getIngredients();
            // Assert
            expect(opname_repository_1.default.getIngredientsForOpname).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=opname.service.test.js.map