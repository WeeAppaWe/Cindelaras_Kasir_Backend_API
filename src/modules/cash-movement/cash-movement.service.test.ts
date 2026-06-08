import { getAll, getDetail, create } from './cash-movement.service';
import cashMovementRepository from './cash-movement.repository';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import {
    mockCashMovement,
    mockCashMovementList,
    mockCashMovementSummary,
    mockCreateCashMovementRequest,
} from '../../tests/mocks/cash-movement.mock';

// Mock dependencies
jest.mock('./cash-movement.repository');
jest.mock('../../../utility/metadata-info.utility');

describe('Cash Movement Service', () => {
    const mockRequest = {
        query: {},
        params: {},
        body: {},
    } as unknown as AuthenticatedRequest;

    const mockMetadata = {
        account_id: 'user-123',
        role: 'CASHIER',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getMetadataInfo as jest.Mock).mockReturnValue(mockMetadata);
    });

    // ============================================
    // GET ALL TESTS
    // ============================================

    describe('getAll', () => {
        it('should return list of cash movements for active shift', async () => {
            // Mock active shift check
            (cashMovementRepository.getActiveShift as jest.Mock).mockResolvedValue({ shift_id: 'shift-123' });

            // Mock find all and count
            (cashMovementRepository.findAll as jest.Mock).mockResolvedValue(mockCashMovementList);
            (cashMovementRepository.count as jest.Mock).mockResolvedValue(2);
            (cashMovementRepository.getSummaryByShift as jest.Mock).mockResolvedValue(mockCashMovementSummary);

            const result = await getAll(mockRequest);

            expect(result.records).toEqual(mockCashMovementList);
            expect(result.summary).toEqual(mockCashMovementSummary);
            expect(result.page.total_record_count).toBe(2);
        });

        it('should return empty list if no active shift found and no shift_id provided', async () => {
            (cashMovementRepository.getActiveShift as jest.Mock).mockResolvedValue(null);

            const result = await getAll(mockRequest);

            expect(result.records).toEqual([]);
            expect(result.summary.total_in).toBe(0);
            expect(result.page.total_record_count).toBe(0);
        });

        it('should use provided shift_id from query', async () => {
            const reqWithShiftId = {
                ...mockRequest,
                query: { shift_id: 'shift-999' },
            } as unknown as AuthenticatedRequest;

            (cashMovementRepository.findAll as jest.Mock).mockResolvedValue(mockCashMovementList);
            (cashMovementRepository.count as jest.Mock).mockResolvedValue(2);
            (cashMovementRepository.getSummaryByShift as jest.Mock).mockResolvedValue(mockCashMovementSummary);

            await getAll(reqWithShiftId);

            // Should not check active shift
            expect(cashMovementRepository.getActiveShift).not.toHaveBeenCalled();
            // Should filter by shift-999
            expect(cashMovementRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ shift_id: 'shift-999' })
            );
        });
    });

    // ============================================
    // GET DETAIL TESTS
    // ============================================

    describe('getDetail', () => {
        const detailReq = {
            params: { cash_movement_id: 'cm-123' },
        } as unknown as AuthenticatedRequest;

        it('should return cash movement detail', async () => {
            (cashMovementRepository.findById as jest.Mock).mockResolvedValue(mockCashMovement);

            const result = await getDetail(detailReq);

            expect(result).toEqual(mockCashMovement);
        });

        it('should throw error if not found', async () => {
            (cashMovementRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(getDetail(detailReq)).rejects.toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // CREATE TESTS
    // ============================================

    describe('create', () => {
        const createReq = {
            ...mockRequest,
            body: mockCreateCashMovementRequest,
        } as AuthenticatedRequest;

        it('should create cash movement successfully', async () => {
            // Mock active shift
            (cashMovementRepository.getActiveShift as jest.Mock).mockResolvedValue({ shift_id: 'shift-123' });
            // Mock create
            (cashMovementRepository.create as jest.Mock).mockResolvedValue(mockCashMovement);

            const result = await create(createReq);

            expect(result.success).toBe(true);
            expect(result.cash_movement).toEqual(mockCashMovement);
            expect(cashMovementRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                shift_id: 'shift-123',
                amount: mockCreateCashMovementRequest.amount,
            }));
        });

        it('should throw error if no active shift', async () => {
            (cashMovementRepository.getActiveShift as jest.Mock).mockResolvedValue(null);

            await expect(create(createReq)).rejects.toThrow(ErrorValidationException);
            await expect(create(createReq)).rejects.toThrow('Tidak ada shift aktif');
        });
    });
});
