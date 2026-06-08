import {
    getAll,
    getDetail,
    getActiveShift,
    startShift,
    endShift,
    getShiftSummary,
    getMyShifts,
} from './shift.service';
import shiftRepository from './shift.repository';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import {
    mockActiveShift,
    mockClosedShift,
    mockShiftList,
    mockUser,
    mockStartShiftRequest,
    mockEndShiftRequest,
    mockOrderStats,
    mockShiftSummary
} from '../../tests/mocks/shift.mock';

// Mock dependencies
jest.mock('./shift.repository');
jest.mock('../../../utility/metadata-info.utility');
jest.mock('../../../utility/format-money.utility', () => ({
    formatMoney: jest.fn((val) => `Rp${val}`),
}));

describe('Shift Service', () => {
    const mockRequest = {
        query: {},
        params: {},
        body: {},
    } as unknown as AuthenticatedRequest;

    const mockMetadata = {
        account_id: mockUser.user_id,
        role: 'CASHIER',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getMetadataInfo as jest.Mock).mockReturnValue(mockMetadata);
    });

    // ============================================
    // GET ACTIVE SHIFT TESTS
    // ============================================

    describe('getActiveShift', () => {
        it('should return active shift when exists', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(mockActiveShift);

            const result = await getActiveShift(mockRequest);

            expect(result.is_active).toBe(true);
            expect(result.shift).toEqual(mockActiveShift);
        });

        it('should return inactive when no shift found', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(null);

            const result = await getActiveShift(mockRequest);

            expect(result.is_active).toBe(false);
            expect(result.shift).toBeNull();
        });

        it('should throw validation error if user not authenticated', async () => {
            (getMetadataInfo as jest.Mock).mockReturnValue({}); // No account_id

            await expect(getActiveShift(mockRequest)).rejects.toThrow(ErrorValidationException);
        });
    });

    // ============================================
    // START SHIFT TESTS
    // ============================================

    describe('startShift', () => {
        const startReq = {
            ...mockRequest,
            body: mockStartShiftRequest,
        } as AuthenticatedRequest;

        it('should start shift successfully', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(null);
            (shiftRepository.create as jest.Mock).mockResolvedValue(mockActiveShift);

            const result = await startShift(startReq);

            expect(result.success).toBe(true);
            expect(result.shift).toEqual(mockActiveShift);
            expect(shiftRepository.create).toHaveBeenCalled();
        });

        it('should throw error if active shift already exists', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(mockActiveShift);

            await expect(startShift(startReq)).rejects.toThrow(ErrorValidationException);
            await expect(startShift(startReq)).rejects.toThrow('Masih ada shift aktif');
        });
    });

    // ============================================
    // END SHIFT TESTS
    // ============================================

    describe('endShift', () => {
        const endReq = {
            ...mockRequest,
            body: mockEndShiftRequest,
        } as AuthenticatedRequest;

        it('should end shift successfully', async () => {
            // 1. Get active shift
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(mockActiveShift);

            // 2. Get stats (no pending orders)
            (shiftRepository.getOrderStats as jest.Mock).mockResolvedValue(mockOrderStats);

            // 3. Update shift
            (shiftRepository.endShift as jest.Mock).mockResolvedValue(mockClosedShift);

            const result = await endShift(endReq);

            expect(result.success).toBe(true);
            expect(result.summary.shift_id).toBe(mockActiveShift.shift_id);
            expect(shiftRepository.endShift).toHaveBeenCalled();
        });

        it('should throw error if no active shift found', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(null);

            await expect(endShift(endReq)).rejects.toThrow(ErrorValidationException);
            await expect(endShift(endReq)).rejects.toThrow('Tidak ada shift aktif');
        });

        it('should throw error if there are pending orders', async () => {
            (shiftRepository.getActiveShift as jest.Mock).mockResolvedValue(mockActiveShift);
            (shiftRepository.getOrderStats as jest.Mock).mockResolvedValue({
                ...mockOrderStats,
                pending_orders: 1, // Has pending
            });

            await expect(endShift(endReq)).rejects.toThrow(ErrorValidationException);
            await expect(endShift(endReq)).rejects.toThrow('Masih ada pesanan yang belum selesai');
        });
    });

    // ============================================
    // GET ALL TESTS
    // ============================================

    describe('getAll', () => {
        it('should return list of shifts', async () => {
            (shiftRepository.findAll as jest.Mock).mockResolvedValue(mockShiftList);
            (shiftRepository.count as jest.Mock).mockResolvedValue(2);

            const result = await getAll(mockRequest);

            expect(result.records).toEqual(mockShiftList);
            expect(result.page.total_record_count).toBe(2);
        });
    });

    // ============================================
    // GET DETAIL TESTS
    // ============================================

    describe('getDetail', () => {
        const detailReq = {
            params: { shift_id: 'shift-123' },
        } as unknown as AuthenticatedRequest;

        it('should return shift detail', async () => {
            (shiftRepository.findById as jest.Mock).mockResolvedValue(mockActiveShift);

            const result = await getDetail(detailReq);

            expect(result).toEqual(mockActiveShift);
        });

        it('should throw error if shift not found', async () => {
            (shiftRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(getDetail(detailReq)).rejects.toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // GET MY SHIFTS TESTS
    // ============================================

    describe('getMyShifts', () => {
        it('should return current user shifts', async () => {
            (shiftRepository.findAll as jest.Mock).mockResolvedValue(mockShiftList);
            (shiftRepository.count as jest.Mock).mockResolvedValue(2);

            const result = await getMyShifts(mockRequest);

            // Should call findAll with filter.user_id
            expect(shiftRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ user_id: mockUser.user_id })
            );
            expect(result.records).toEqual(mockShiftList);
        });
    });
});
