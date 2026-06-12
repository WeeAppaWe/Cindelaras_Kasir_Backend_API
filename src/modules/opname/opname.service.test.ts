import opnameService from './opname.service';
import opnameRepository from './opname.repository';
import stockTypeRepository from '../stock-type/stock-type.repository';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { OpnameStatus } from './opname.schema';
import {
    mockUserForOpname,
    mockOpnameDraft,
    mockOpnameCompleted,
    mockOpnameApplied,
    mockOpnameCancelled,
    mockOpnameDraftWithDetails,
    mockOpnameCompletedWithDetails,
    mockOpnameItems,
    mockOpnames,
    mockIngredientsForOpname,
} from '../../tests/mocks/opname.mock';

// ============================================
// MOCKS
// ============================================

// Mock dependencies
jest.mock('./opname.repository');
jest.mock('../stock-type/stock-type.repository');
jest.mock('../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn(async (callback) => {
            const mockTransactionClient = {
                stockOpname: { create: jest.fn(), update: jest.fn() },
                stockOpnameItem: { createMany: jest.fn(), updateMany: jest.fn() },
                ingredient: { update: jest.fn(), findUnique: jest.fn() },
                stockMovement: { create: jest.fn() },
                stockType: { findFirst: jest.fn() },
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
            } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue(mockOpnames);
            (opnameRepository.count as jest.Mock).mockResolvedValue(4);

            // Act
            const result = await opnameService.getAll(mockRequest);

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
            const mockRequest = { query: {} } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue([mockOpnameDraft]);
            (opnameRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await opnameService.getAll(mockRequest);

            // Assert
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(opnameRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    pagination: expect.objectContaining({ limit: 10, offset: 0 }),
                }),
                expect.any(Object)
            );
        });

        it('should pass search filter to repository', async () => {
            // Arrange
            const mockRequest = { query: { search: 'akhir bulan' } } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue([mockOpnameDraft]);
            (opnameRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            await opnameService.getAll(mockRequest);

            // Assert
            expect(opnameRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'akhir bulan' })
            );
        });

        it('should pass status filter to repository', async () => {
            // Arrange
            const mockRequest = { query: { status: 'DRAFT' } } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue([mockOpnameDraft]);
            (opnameRepository.count as jest.Mock).mockResolvedValue(1);

            // Act
            await opnameService.getAll(mockRequest);

            // Assert
            expect(opnameRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ status: 'DRAFT' })
            );
        });

        it('should pass date range filters to repository', async () => {
            // Arrange
            const mockRequest = {
                query: { start_date: '2024-01-01', end_date: '2024-01-31' },
            } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue([]);
            (opnameRepository.count as jest.Mock).mockResolvedValue(0);

            // Act
            await opnameService.getAll(mockRequest);

            // Assert
            expect(opnameRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({
                    start_date: '2024-01-01',
                    end_date: '2024-01-31',
                })
            );
        });

        it('should return empty records when no opnames found', async () => {
            // Arrange
            const mockRequest = { query: {} } as any;

            (opnameRepository.findAll as jest.Mock).mockResolvedValue([]);
            (opnameRepository.count as jest.Mock).mockResolvedValue(0);

            // Act
            const result = await opnameService.getAll(mockRequest);

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
                params: { stock_opname_id: mockOpnameDraft.stock_opname_id },
            } as any;

            (opnameRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOpnameDraftWithDetails);

            // Act
            const result = await opnameService.getDetail(mockRequest);

            // Assert
            expect(result).toBeDefined();
            expect(result.stock_opname_id).toBe(mockOpnameDraft.stock_opname_id);
            expect(result.status).toBe(OpnameStatus.DRAFT);
            expect(result.items).toHaveLength(3);
            expect(opnameRepository.findByIdWithDetails).toHaveBeenCalledWith(mockOpnameDraft.stock_opname_id);
        });

        it('should throw ErrorNotFoundException when opname not found', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
            } as any;

            (opnameRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(opnameService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
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
            } as any;

            // Act & Assert
            await expect(opnameService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
                user: mockUserForOpname,
            } as any;

            (opnameRepository.getIngredientStock as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(opnameService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
                user: mockUserForOpname,
            } as any;

            // First ingredient found, second not found
            (opnameRepository.getIngredientStock as jest.Mock)
                .mockResolvedValueOnce(100)
                .mockResolvedValueOnce(null);

            // Act & Assert
            await expect(opnameService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);

            expect(opnameRepository.getIngredientStock).toHaveBeenCalledTimes(2);
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
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(opnameService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when opname is not DRAFT', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                body: { notes: 'Updated notes' },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);

            // Act & Assert
            await expect(opnameService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameApplied.stock_opname_id },
                body: { notes: 'Updated notes' },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameApplied);

            // Act & Assert
            await expect(opnameService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when opname is CANCELLED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCancelled.stock_opname_id },
                body: { notes: 'Updated notes' },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCancelled);

            // Act & Assert
            await expect(opnameService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
                body: { status: OpnameStatus.COMPLETED },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(opnameService.changeStatus(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when opname is not DRAFT', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                body: { status: OpnameStatus.CANCELLED },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);

            // Act & Assert
            await expect(opnameService.changeStatus(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should update status from DRAFT to COMPLETED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameDraft.stock_opname_id },
                body: { status: OpnameStatus.COMPLETED },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameDraft);
            (opnameRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.findByIdWithDetails as jest.Mock).mockResolvedValue({
                ...mockOpnameDraftWithDetails,
                status: OpnameStatus.COMPLETED,
            });

            // Act
            const result = await opnameService.changeStatus(mockRequest);

            // Assert
            expect(result.status).toBe(OpnameStatus.COMPLETED);
            expect(opnameRepository.updateStatus).toHaveBeenCalledWith(
                mockOpnameDraft.stock_opname_id,
                OpnameStatus.COMPLETED
            );
        });

        it('should update status from DRAFT to CANCELLED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameDraft.stock_opname_id },
                body: { status: OpnameStatus.CANCELLED },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameDraft);
            (opnameRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.findByIdWithDetails as jest.Mock).mockResolvedValue({
                ...mockOpnameDraftWithDetails,
                status: OpnameStatus.CANCELLED,
            });

            // Act
            const result = await opnameService.changeStatus(mockRequest);

            // Assert
            expect(result.status).toBe(OpnameStatus.CANCELLED);
        });
    });

    // ============================================
    // APPLY ADJUSTMENT TESTS - Validation Logic
    // ============================================

    describe('applyAdjustment', () => {
        const mockStockTypeAdjustment = {
            stock_type_id: 'st-adjust-001',
            name: 'ADJUSTMENT_OPNAME',
        };

        it('should throw ErrorNotFoundException when opname not found', async () => {
            const mockRequest = {
                params: { stock_opname_id: 'non-existent-id' },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when opname is DRAFT', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameDraft.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameDraft);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameApplied.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameApplied);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when opname is CANCELLED', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCancelled.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCancelled);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when stock type ADJUSTMENT_OPNAME not configured', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);
            (stockTypeRepository.findByName as jest.Mock).mockResolvedValue(null);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should apply adjustment and return correct count', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);
            (stockTypeRepository.findByName as jest.Mock).mockResolvedValue(mockStockTypeAdjustment);

            // mockOpnameItems: item1 diff=-2, item2 diff=2, item3 diff=0
            (opnameRepository.getOpnameItems as jest.Mock).mockResolvedValue([
                { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 98, difference: -2 },
                { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002', physical_qty: 52, difference: 2 },
                { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003', physical_qty: 30, difference: 0 },
            ]);
            (opnameRepository.updateIngredientStock as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.createStockMovement as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);

            const result = await opnameService.applyAdjustment(mockRequest);

            expect(result.success).toBe(true);
            expect(result.adjustments_count).toBe(3);
            expect(opnameRepository.updateIngredientStock).toHaveBeenCalledTimes(3);
            // Only items with difference !== 0 get stock movement recorded (item1 and item2)
            expect(opnameRepository.createStockMovement).toHaveBeenCalledTimes(2);
            expect(opnameRepository.updateStatus).toHaveBeenCalledWith(
                mockOpnameCompleted.stock_opname_id,
                OpnameStatus.APPLIED,
                expect.anything()
            );
        });

        it('should not record stock movement for items with zero difference', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                user: mockUserForOpname,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);
            (stockTypeRepository.findByName as jest.Mock).mockResolvedValue(mockStockTypeAdjustment);
            (opnameRepository.getOpnameItems as jest.Mock).mockResolvedValue([
                { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003', physical_qty: 30, difference: 0 },
            ]);
            (opnameRepository.updateIngredientStock as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.createStockMovement as jest.Mock).mockResolvedValue(undefined);
            (opnameRepository.updateStatus as jest.Mock).mockResolvedValue(undefined);

            await opnameService.applyAdjustment(mockRequest);

            expect(opnameRepository.updateIngredientStock).toHaveBeenCalledTimes(1);
            expect(opnameRepository.createStockMovement).not.toHaveBeenCalled();
        });

        it('should throw ErrorValidationException when user not authenticated', async () => {
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
                user: undefined,
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);

            await expect(opnameService.applyAdjustment(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
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
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(opnameService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when opname is COMPLETED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCompleted.stock_opname_id },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCompleted);

            // Act & Assert
            await expect(opnameService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when opname is APPLIED', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameApplied.stock_opname_id },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameApplied);

            // Act & Assert
            await expect(opnameService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should delete opname with DRAFT status', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameDraft.stock_opname_id },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameDraft);
            (opnameRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await opnameService.softDelete(mockRequest);

            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Stock opname berhasil dihapus');
            expect(opnameRepository.softDelete).toHaveBeenCalledWith(mockOpnameDraft.stock_opname_id);
        });

        it('should delete opname with CANCELLED status', async () => {
            // Arrange
            const mockRequest = {
                params: { stock_opname_id: mockOpnameCancelled.stock_opname_id },
            } as any;

            (opnameRepository.findById as jest.Mock).mockResolvedValue(mockOpnameCancelled);
            (opnameRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            // Act
            const result = await opnameService.softDelete(mockRequest);

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
            (opnameRepository.getIngredientsForOpname as jest.Mock).mockResolvedValue(mockIngredientsForOpname);

            // Act
            const result = await opnameService.getIngredients();

            // Assert
            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result[0].name).toBe('Beras');
            expect(result[0].stock_qty).toBe(100);
        });

        it('should return empty array when no ingredients found', async () => {
            // Arrange
            (opnameRepository.getIngredientsForOpname as jest.Mock).mockResolvedValue([]);

            // Act
            const result = await opnameService.getIngredients();

            // Assert
            expect(result).toHaveLength(0);
        });

        it('should call repository getIngredientsForOpname', async () => {
            // Arrange
            (opnameRepository.getIngredientsForOpname as jest.Mock).mockResolvedValue(mockIngredientsForOpname);

            // Act
            await opnameService.getIngredients();

            // Assert
            expect(opnameRepository.getIngredientsForOpname).toHaveBeenCalled();
        });
    });
});
