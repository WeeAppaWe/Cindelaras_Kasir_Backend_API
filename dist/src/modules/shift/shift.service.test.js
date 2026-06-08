"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shift_service_1 = require("./shift.service");
const shift_repository_1 = __importDefault(require("./shift.repository"));
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const shift_mock_1 = require("../../tests/mocks/shift.mock");
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
    };
    const mockMetadata = {
        account_id: shift_mock_1.mockUser.user_id,
        role: 'CASHIER',
    };
    beforeEach(() => {
        jest.clearAllMocks();
        metadata_info_utility_1.getMetadataInfo.mockReturnValue(mockMetadata);
    });
    // ============================================
    // GET ACTIVE SHIFT TESTS
    // ============================================
    describe('getActiveShift', () => {
        it('should return active shift when exists', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(shift_mock_1.mockActiveShift);
            const result = await (0, shift_service_1.getActiveShift)(mockRequest);
            expect(result.is_active).toBe(true);
            expect(result.shift).toEqual(shift_mock_1.mockActiveShift);
        });
        it('should return inactive when no shift found', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(null);
            const result = await (0, shift_service_1.getActiveShift)(mockRequest);
            expect(result.is_active).toBe(false);
            expect(result.shift).toBeNull();
        });
        it('should throw validation error if user not authenticated', async () => {
            metadata_info_utility_1.getMetadataInfo.mockReturnValue({}); // No account_id
            await expect((0, shift_service_1.getActiveShift)(mockRequest)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
        });
    });
    // ============================================
    // START SHIFT TESTS
    // ============================================
    describe('startShift', () => {
        const startReq = {
            ...mockRequest,
            body: shift_mock_1.mockStartShiftRequest,
        };
        it('should start shift successfully', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(null);
            shift_repository_1.default.create.mockResolvedValue(shift_mock_1.mockActiveShift);
            const result = await (0, shift_service_1.startShift)(startReq);
            expect(result.success).toBe(true);
            expect(result.shift).toEqual(shift_mock_1.mockActiveShift);
            expect(shift_repository_1.default.create).toHaveBeenCalled();
        });
        it('should throw error if active shift already exists', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(shift_mock_1.mockActiveShift);
            await expect((0, shift_service_1.startShift)(startReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, shift_service_1.startShift)(startReq)).rejects.toThrow('Masih ada shift aktif');
        });
    });
    // ============================================
    // END SHIFT TESTS
    // ============================================
    describe('endShift', () => {
        const endReq = {
            ...mockRequest,
            body: shift_mock_1.mockEndShiftRequest,
        };
        it('should end shift successfully', async () => {
            // 1. Get active shift
            shift_repository_1.default.getActiveShift.mockResolvedValue(shift_mock_1.mockActiveShift);
            // 2. Get stats (no pending orders)
            shift_repository_1.default.getOrderStats.mockResolvedValue(shift_mock_1.mockOrderStats);
            // 3. Update shift
            shift_repository_1.default.endShift.mockResolvedValue(shift_mock_1.mockClosedShift);
            const result = await (0, shift_service_1.endShift)(endReq);
            expect(result.success).toBe(true);
            expect(result.summary.shift_id).toBe(shift_mock_1.mockActiveShift.shift_id);
            expect(shift_repository_1.default.endShift).toHaveBeenCalled();
        });
        it('should throw error if no active shift found', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(null);
            await expect((0, shift_service_1.endShift)(endReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, shift_service_1.endShift)(endReq)).rejects.toThrow('Tidak ada shift aktif');
        });
        it('should throw error if there are pending orders', async () => {
            shift_repository_1.default.getActiveShift.mockResolvedValue(shift_mock_1.mockActiveShift);
            shift_repository_1.default.getOrderStats.mockResolvedValue({
                ...shift_mock_1.mockOrderStats,
                pending_orders: 1, // Has pending
            });
            await expect((0, shift_service_1.endShift)(endReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, shift_service_1.endShift)(endReq)).rejects.toThrow('Masih ada pesanan yang belum selesai');
        });
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return list of shifts', async () => {
            shift_repository_1.default.findAll.mockResolvedValue(shift_mock_1.mockShiftList);
            shift_repository_1.default.count.mockResolvedValue(2);
            const result = await (0, shift_service_1.getAll)(mockRequest);
            expect(result.records).toEqual(shift_mock_1.mockShiftList);
            expect(result.page.total_record_count).toBe(2);
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        const detailReq = {
            params: { shift_id: 'shift-123' },
        };
        it('should return shift detail', async () => {
            shift_repository_1.default.findById.mockResolvedValue(shift_mock_1.mockActiveShift);
            const result = await (0, shift_service_1.getDetail)(detailReq);
            expect(result).toEqual(shift_mock_1.mockActiveShift);
        });
        it('should throw error if shift not found', async () => {
            shift_repository_1.default.findById.mockResolvedValue(null);
            await expect((0, shift_service_1.getDetail)(detailReq)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // GET MY SHIFTS TESTS
    // ============================================
    describe('getMyShifts', () => {
        it('should return current user shifts', async () => {
            shift_repository_1.default.findAll.mockResolvedValue(shift_mock_1.mockShiftList);
            shift_repository_1.default.count.mockResolvedValue(2);
            const result = await (0, shift_service_1.getMyShifts)(mockRequest);
            // Should call findAll with filter.user_id
            expect(shift_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ user_id: shift_mock_1.mockUser.user_id }));
            expect(result.records).toEqual(shift_mock_1.mockShiftList);
        });
    });
});
//# sourceMappingURL=shift.service.test.js.map