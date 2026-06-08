"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const order_service_1 = require("./order.service");
const order_repository_1 = __importDefault(require("./order.repository"));
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const receipt_number_utility_1 = require("../../../utility/receipt-number.utility");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const order_schema_1 = require("./order.schema");
const order_mock_1 = require("../../tests/mocks/order.mock");
// Mock dependencies
jest.mock('./order.repository');
jest.mock('../../../utility/metadata-info.utility');
jest.mock('../../../utility/format-money.utility', () => ({
    formatMoney: jest.fn((val) => `Rp${val}`),
}));
jest.mock('../../../utility/receipt.utility');
jest.mock('../../../utility/receipt-number.utility', () => ({
    generateReceiptNumber: jest.fn(),
}));
// Mock Prisma Transaction
jest.mock('../../../database/postgres.connection', () => {
    const mockClient = {
        $transaction: jest.fn(async (callback) => {
            const res = await callback('mock-transaction');
            return res;
        }),
        $connect: jest.fn(),
        $disconnect: jest.fn(),
    };
    return {
        __esModule: true,
        default: jest.fn(() => mockClient),
        getPrismaClient: jest.fn(() => mockClient),
    };
});
describe('Order Service', () => {
    const mockRequest = {
        query: {},
        params: {},
        body: {},
    };
    const mockMetadata = {
        account_id: order_mock_1.mockOrderUser.user_id,
        role: 'CASHIER',
    };
    // Persistent mock client that survives resetMocks
    let mockPrismaClient;
    beforeEach(() => {
        jest.clearAllMocks();
        metadata_info_utility_1.getMetadataInfo.mockReturnValue(mockMetadata);
        receipt_number_utility_1.generateReceiptNumber.mockReturnValue('STR-20240101-ORDER123');
        // IMPORTANT: Re-setup mock after resetMocks clears it
        mockPrismaClient = {
            $transaction: jest.fn(async (callback) => {
                return await callback('mock-transaction');
            }),
            $connect: jest.fn(),
            $disconnect: jest.fn(),
        };
        // Re-apply mock implementation
        postgres_connection_1.default.mockReturnValue(mockPrismaClient);
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return list of orders', async () => {
            order_repository_1.default.findAll.mockResolvedValue(order_mock_1.mockOrderList);
            order_repository_1.default.count.mockResolvedValue(2);
            const result = await (0, order_service_1.getAll)(mockRequest);
            expect(result.records).toEqual(order_mock_1.mockOrderList);
            expect(result.page.total_record_count).toBe(2);
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        const detailReq = {
            params: { order_id: 'order-123' },
        };
        it('should return order detail', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(order_mock_1.mockOrderPending);
            const result = await (0, order_service_1.getDetail)(detailReq);
            expect(result).toEqual(order_mock_1.mockOrderPending);
        });
        it('should throw error if not found', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(null);
            await expect((0, order_service_1.getDetail)(detailReq)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // CREATE ORDER TESTS
    // ============================================
    describe('create', () => {
        const createReq = {
            ...mockRequest,
            body: order_mock_1.mockCreateOrderRequest,
        };
        it('should create order successfully', async () => {
            // 1. Active shift
            order_repository_1.default.getActiveShift.mockResolvedValue(order_mock_1.mockOrderShift);
            // 2. Find Menu
            order_repository_1.default.findMenuById.mockResolvedValue(order_mock_1.mockMenu);
            // 3. Create Order
            order_repository_1.default.create.mockResolvedValue(order_mock_1.mockOrderPending);
            // 4. Find created order details
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(order_mock_1.mockOrderPending);
            const result = await (0, order_service_1.create)(createReq);
            expect(result.order).toEqual(order_mock_1.mockOrderPending);
            expect(order_repository_1.default.create).toHaveBeenCalled();
            // NOTE: Stock deduction moved to confirmPayment, not tested here
        });
        it('should throw error if no active shift', async () => {
            order_repository_1.default.getActiveShift.mockResolvedValue(null);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow('Tidak ada shift aktif');
        });
        it('should throw error if menu not found', async () => {
            order_repository_1.default.getActiveShift.mockResolvedValue(order_mock_1.mockOrderShift);
            order_repository_1.default.findMenuById.mockResolvedValue(null);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow('tidak ditemukan');
        });
        it('should throw error if menu unavailable', async () => {
            order_repository_1.default.getActiveShift.mockResolvedValue(order_mock_1.mockOrderShift);
            order_repository_1.default.findMenuById.mockResolvedValue(order_mock_1.mockMenuUnavailable);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.create)(createReq)).rejects.toThrow('tidak tersedia');
        });
    });
    // ============================================
    // CONFIRM PAYMENT TESTS
    // ============================================
    describe('confirmPayment', () => {
        const confirmReq = {
            params: { order_id: 'order-123' },
            body: order_mock_1.mockConfirmPaymentRequest,
        };
        it('should confirm CASH payment successfully', async () => {
            // Setup Prisma Mock for transaction
            const mockTx = jest.fn(async (callback) => {
                const res = await callback('mock-transaction');
                return res;
            });
            postgres_connection_1.default.mockReturnValue({
                $transaction: mockTx,
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            });
            // Use mockResolvedValueOnce for proper chaining
            order_repository_1.default.findByIdWithDetails
                .mockResolvedValueOnce(order_mock_1.mockOrderPending) // First call - validation
                .mockResolvedValueOnce(order_mock_1.mockOrderCompleted); // Second call - after update
            // Mock findMenuById for stock calculation
            order_repository_1.default.findMenuById.mockResolvedValue(order_mock_1.mockMenu);
            order_repository_1.default.findStockTypeByName.mockResolvedValue({
                stock_type_id: 'stock-type-1',
                name: 'OUT_SALES',
            });
            order_repository_1.default.updateIngredientStock.mockResolvedValue(undefined);
            order_repository_1.default.confirmOrder.mockResolvedValue(undefined);
            const result = await (0, order_service_1.confirmPayment)(confirmReq);
            expect(result.success).toBe(true);
            expect(order_repository_1.default.confirmOrder).toHaveBeenCalledWith('order-123', 50000, // Paid
            20000, // Change (50000 - 30000)
            'STR-20240101-ORDER123', 'mock-transaction' // Transaction client
            );
        });
        it('should confirm QRIS payment successfully (auto paid amount)', async () => {
            // Setup Prisma Mock for transaction
            const mockTx = jest.fn(async (callback) => {
                const res = await callback('mock-transaction');
                return res;
            });
            postgres_connection_1.default.mockReturnValue({
                $transaction: mockTx,
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            });
            const qrisOrder = { ...order_mock_1.mockOrderPending, payment_type: order_schema_1.PaymentType.QRIS };
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(qrisOrder);
            // Mock findMenuById for stock calculation
            order_repository_1.default.findMenuById.mockResolvedValue(order_mock_1.mockMenu);
            order_repository_1.default.findStockTypeByName.mockResolvedValue({
                stock_type_id: 'stock-type-1',
                name: 'OUT_SALES',
            });
            order_repository_1.default.updateIngredientStock.mockResolvedValue(undefined);
            order_repository_1.default.confirmOrder.mockResolvedValue(undefined);
            const qrisReq = { ...confirmReq, body: {} };
            await (0, order_service_1.confirmPayment)(qrisReq);
            expect(order_repository_1.default.confirmOrder).toHaveBeenCalledWith('order-123', 30000, // Total amount
            0, // No change
            'STR-20240101-ORDER123', 'mock-transaction' // Transaction client
            );
        });
        it('should throw error if order not found', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(null);
            await expect((0, order_service_1.confirmPayment)(confirmReq)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw error if order not PENDING', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(order_mock_1.mockOrderCompleted);
            await expect((0, order_service_1.confirmPayment)(confirmReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw error if CASH payment missing paid_amount', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(order_mock_1.mockOrderPending);
            const invalidReq = { ...confirmReq, body: {} };
            await expect((0, order_service_1.confirmPayment)(invalidReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.confirmPayment)(invalidReq)).rejects.toThrow('wajib diisi');
        });
        it('should throw error if paid amount < total', async () => {
            order_repository_1.default.findByIdWithDetails.mockResolvedValue(order_mock_1.mockOrderPending);
            const invalidReq = {
                ...confirmReq,
                body: { paid_amount: 10000 } // Total is 30000
            };
            await expect((0, order_service_1.confirmPayment)(invalidReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.confirmPayment)(invalidReq)).rejects.toThrow('kurang dari total');
        });
    });
    // ============================================
    // CANCEL ORDER TESTS
    // ============================================
    describe('cancelOrder', () => {
        const cancelReq = {
            params: { order_id: 'order-123' },
        };
        it('should cancel pending order successfully', async () => {
            order_repository_1.default.findById.mockResolvedValue(order_mock_1.mockOrderPending);
            const result = await (0, order_service_1.cancelOrder)(cancelReq);
            expect(result.success).toBe(true);
            expect(order_repository_1.default.updateStatus).toHaveBeenCalledWith('order-123', order_schema_1.OrderStatus.CANCELLED);
        });
        it('should throw error if order not found', async () => {
            order_repository_1.default.findById.mockResolvedValue(null);
            await expect((0, order_service_1.cancelOrder)(cancelReq)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw error if order not PENDING', async () => {
            order_repository_1.default.findById.mockResolvedValue(order_mock_1.mockOrderCompleted);
            await expect((0, order_service_1.cancelOrder)(cancelReq)).rejects.toThrow(error_validation_exception_1.ErrorValidationException);
            await expect((0, order_service_1.cancelOrder)(cancelReq)).rejects.toThrow('Hanya pesanan dengan status PENDING');
        });
    });
});
//# sourceMappingURL=order.service.test.js.map