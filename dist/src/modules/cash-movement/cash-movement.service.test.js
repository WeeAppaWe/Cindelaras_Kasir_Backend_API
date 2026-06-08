"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cash_movement_service_1 = require("./cash-movement.service");
const cash_movement_repository_1 = __importDefault(require("./cash-movement.repository"));
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const cash_movement_mock_1 = require("../../tests/mocks/cash-movement.mock");
// Mock dependencies
jest.mock('./cash-movement.repository');
jest.mock('../../../utility/metadata-info.utility');
describe('Cash Movement Service', () => {
    const mockRequest = {
        query: {},
        params: {},
        body: {},
    };
    const mockMetadata = {
        account_id: 'user-123',
        role: 'CASHIER',
    };
    beforeEach(() => {
        jest.clearAllMocks();
        metadata_info_utility_1.getMetadataInfo.mockReturnValue(mockMetadata);
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return list of cash movements for active shift', async () => {
            // Mock active shift check
            cash_movement_repository_1.default.getActiveShift.mockResolvedValue({ shift_id: 'shift-123' });
            // Mock find all and count
            cash_movement_repository_1.default.findAll.mockResolvedValue(cash_movement_mock_1.mockCashMovementList);
            cash_movement_repository_1.default.count.mockResolvedValue(2);
            cash_movement_repository_1.default.getSummaryByShift.mockResolvedValue(cash_movement_mock_1.mockCashMovementSummary);
            const result = await (0, cash_movement_service_1.getAll)(mockRequest);
            expect(result.records).toEqual(cash_movement_mock_1.mockCashMovementList);
            expect(result.summary).toEqual(cash_movement_mock_1.mockCashMovementSummary);
            expect(result.page.total_record_count).toBe(2);
        });
        it('should return empty list if no active shift found and no shift_id provided', async () => {
            cash_movement_repository_1.default.getActiveShift.mockResolvedValue(null);
            const result = await (0, cash_movement_service_1.getAll)(mockRequest);
            expect(result.records).toEqual([]);
            expect(result.summary.total_in).toBe(0);
            expect(result.page.total_record_count).toBe(0);
        });
        it('should use provided shift_id from query', async () => {
            const reqWithShiftId = {
                ...mockRequest,
                query: { shift_id: 'shift-999' },
            };
            cash_movement_repository_1.default.findAll.mockResolvedValue(cash_movement_mock_1.mockCashMovementList);
            cash_movement_repository_1.default.count.mockResolvedValue(2);
            cash_movement_repository_1.default.getSummaryByShift.mockResolvedValue(cash_movement_mock_1.mockCashMovementSummary);
            await (0, cash_movement_service_1.getAll)(reqWithShiftId);
            // Should not check active shift
            expect(cash_movement_repository_1.default.getActiveShift).not.toHaveBeenCalled();
            // Should filter by shift-999
            expect(cash_movement_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ shift_id: 'shift-999' }));
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        const detailReq = {
            params: { cash_movement_id: 'cm-123' },
        };
        it('should return cash movement detail', async () => {
            cash_movement_repository_1.default.findById.mockResolvedValue(cash_movement_mock_1.mockCashMovement);
            const result = await (0, cash_movement_service_1.getDetail)(detailReq);
            expect(result).toEqual(cash_movement_mock_1.mockCashMovement);
        });
        it('should throw error if not found', async () => {
            cash_movement_repository_1.default.findById.mockResolvedValue(null);
            await expect((0, cash_movement_service_1.getDetail)(detailReq)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // CREATE TESTS
    // ============================================
    describe('create', () => {
        const createReq = {
            ...mockRequest,
            body: cash_movement_mock_1.mockCreateCashMovementRequest,
        };
        it('should create cash movement successfully', async () => {
            // Mock active shift
            cash_movement_repository_1.default.getActiveShift.mockResolvedValue({ shift_id: 'shift-123' });
            // Mock create
            cash_movement_repository_1.default.create.mockResolvedValue(cash_movement_mock_1.mockCashMovement);
            const result = await (0, cash_movement_service_1.create)(createReq);
            expect(result.success).toBe(true);
            expect(result.cash_movement).toEqual(cash_movement_mock_1.mockCashMovement);
            expect(cash_movement_repository_1.default.create).toHaveBeenCalledWith(expect.objectContaining({
                shift_id: 'shift-123',
                amount: cash_movement_mock_1.mockCreateCashMovementRequest.amount,
            }));
        });
        it('should throw error if no active shift', async () => {
            cash_movement_repository_1.default.getActiveShift.mockResolvedValue(null);
            await expect((0, cash_movement_service_1.create)(createReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, cash_movement_service_1.create)(createReq)).rejects.toThrow('Tidak ada shift aktif');
        });
    });
});
//# sourceMappingURL=cash-movement.service.test.js.map