
import getPrismaClient from '../../../database/postgres.connection';
import { getAll, getDetail, create, confirmPayment, cancelOrder } from './order.service';
import orderRepository from './order.repository';
import stockTypeRepository from '../stock-type/stock-type.repository';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { formatMoney } from '../../../utility/format-money.utility';
import { generateReceiptNumber } from '../../../utility/receipt-number.utility';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import { PaymentType, OrderStatus } from './order.schema';
import {
    mockOrderList,
    mockOrderPending,
    mockOrderCompleted,
    mockOrderUser,
    mockOrderShift,
    mockCreateOrderRequest,
    mockMenu,
    mockMenuUnavailable,
    mockConfirmPaymentRequest,
} from '../../tests/mocks/order.mock';

// Mock dependencies
jest.mock('./order.repository');
jest.mock('../stock-type/stock-type.repository');
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
    } as unknown as AuthenticatedRequest;

    const mockMetadata = {
        account_id: mockOrderUser.user_id,
        role: 'CASHIER',
    };

    // Persistent mock client that survives resetMocks
    let mockPrismaClient: any;

    beforeEach(() => {
        jest.clearAllMocks();
        (getMetadataInfo as jest.Mock).mockReturnValue(mockMetadata);
        (generateReceiptNumber as jest.Mock).mockReturnValue('STR-20240101-ORDER123');

        // IMPORTANT: Re-setup mock after resetMocks clears it
        mockPrismaClient = {
            $transaction: jest.fn(async (callback) => {
                return await callback('mock-transaction');
            }),
            $connect: jest.fn(),
            $disconnect: jest.fn(),
        };

        // Re-apply mock implementation
        (getPrismaClient as jest.Mock).mockReturnValue(mockPrismaClient);
    });

    // ============================================
    // GET ALL TESTS
    // ============================================

    describe('getAll', () => {
        it('should return list of orders', async () => {
            (orderRepository.findAll as jest.Mock).mockResolvedValue(mockOrderList);
            (orderRepository.count as jest.Mock).mockResolvedValue(2);

            const result = await getAll(mockRequest);

            expect(result.records).toEqual(mockOrderList);
            expect(result.page.total_record_count).toBe(2);
        });
    });

    // ============================================
    // GET DETAIL TESTS
    // ============================================

    describe('getDetail', () => {
        const detailReq = {
            params: { order_id: 'order-123' },
        } as unknown as AuthenticatedRequest;

        it('should return order detail', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOrderPending);

            const result = await getDetail(detailReq);

            expect(result).toEqual(mockOrderPending);
        });

        it('should throw error if not found', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(null);

            await expect(getDetail(detailReq)).rejects.toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // CREATE ORDER TESTS
    // ============================================

    describe('create', () => {
        const createReq = {
            ...mockRequest,
            body: mockCreateOrderRequest,
        } as AuthenticatedRequest;

        it('should create order successfully', async () => {
            // 1. Active shift
            (orderRepository.getActiveShift as jest.Mock).mockResolvedValue(mockOrderShift);
            // 2. Find Menu
            (orderRepository.findMenuById as jest.Mock).mockResolvedValue(mockMenu);

            // 3. Create Order
            (orderRepository.create as jest.Mock).mockResolvedValue(mockOrderPending);

            // 4. Find created order details
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOrderPending);

            const result = await create(createReq);

            expect(result.order).toEqual(mockOrderPending);
            expect(orderRepository.create).toHaveBeenCalled();
            // NOTE: Stock deduction moved to confirmPayment, not tested here
        });

        it('should throw error if no active shift', async () => {
            (orderRepository.getActiveShift as jest.Mock).mockResolvedValue(null);

            await expect(create(createReq)).rejects.toThrow(ErrorValidationException);
            await expect(create(createReq)).rejects.toThrow('Tidak ada shift aktif');
        });

        it('should throw error if menu not found', async () => {
            (orderRepository.getActiveShift as jest.Mock).mockResolvedValue(mockOrderShift);
            (orderRepository.findMenuById as jest.Mock).mockResolvedValue(null);

            await expect(create(createReq)).rejects.toThrow(ErrorValidationException);
            await expect(create(createReq)).rejects.toThrow('tidak ditemukan');
        });

        it('should throw error if menu unavailable', async () => {
            (orderRepository.getActiveShift as jest.Mock).mockResolvedValue(mockOrderShift);
            (orderRepository.findMenuById as jest.Mock).mockResolvedValue(mockMenuUnavailable);

            await expect(create(createReq)).rejects.toThrow(ErrorValidationException);
            await expect(create(createReq)).rejects.toThrow('tidak tersedia');
        });
    });

    // ============================================
    // CONFIRM PAYMENT TESTS
    // ============================================

    describe('confirmPayment', () => {
        const confirmReq = {
            params: { order_id: 'order-123' },
            body: mockConfirmPaymentRequest,
        } as unknown as AuthenticatedRequest;

        it('should confirm CASH payment successfully', async () => {
            // Setup Prisma Mock for transaction
            const mockTx = jest.fn(async (callback) => {
                const res = await callback('mock-transaction');
                return res;
            });

            (getPrismaClient as jest.Mock).mockReturnValue({
                $transaction: mockTx,
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            });

            // Use mockResolvedValueOnce for proper chaining
            (orderRepository.findByIdWithDetails as jest.Mock)
                .mockResolvedValueOnce(mockOrderPending) // First call - validation
                .mockResolvedValueOnce(mockOrderCompleted); // Second call - after update

            // Mock findMenuById for stock calculation
            (orderRepository.findMenuById as jest.Mock).mockResolvedValue(mockMenu);
            (stockTypeRepository.findByName as jest.Mock).mockResolvedValue({
                stock_type_id: 'stock-type-1',
                name: 'OUT_SALES',
            });
            (orderRepository.updateIngredientStock as jest.Mock).mockResolvedValue(undefined);
            (orderRepository.confirmOrder as jest.Mock).mockResolvedValue(undefined);

            const result = await confirmPayment(confirmReq);

            expect(result.success).toBe(true);
            expect(orderRepository.confirmOrder).toHaveBeenCalledWith(
                'order-123',
                50000, // Paid
                20000, // Change (50000 - 30000)
                'STR-20240101-ORDER123',
                'mock-transaction' // Transaction client
            );
        });

        it('should confirm QRIS payment successfully (auto paid amount)', async () => {
            // Setup Prisma Mock for transaction
            const mockTx = jest.fn(async (callback) => {
                const res = await callback('mock-transaction');
                return res;
            });

            (getPrismaClient as jest.Mock).mockReturnValue({
                $transaction: mockTx,
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            });

            const qrisOrder = { ...mockOrderPending, payment_type: PaymentType.QRIS };
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(qrisOrder);

            // Mock findMenuById for stock calculation
            (orderRepository.findMenuById as jest.Mock).mockResolvedValue(mockMenu);
            (stockTypeRepository.findByName as jest.Mock).mockResolvedValue({
                stock_type_id: 'stock-type-1',
                name: 'OUT_SALES',
            });
            (orderRepository.updateIngredientStock as jest.Mock).mockResolvedValue(undefined);
            (orderRepository.confirmOrder as jest.Mock).mockResolvedValue(undefined);

            const qrisReq = { ...confirmReq, body: {} } as unknown as AuthenticatedRequest;

            await confirmPayment(qrisReq);

            expect(orderRepository.confirmOrder).toHaveBeenCalledWith(
                'order-123',
                30000, // Total amount
                0, // No change
                'STR-20240101-ORDER123',
                'mock-transaction' // Transaction client
            );
        });

        it('should throw error if order not found', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(null);

            await expect(confirmPayment(confirmReq)).rejects.toThrow(ErrorNotFoundException);
        });

        it('should throw error if order not PENDING', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOrderCompleted);

            await expect(confirmPayment(confirmReq)).rejects.toThrow(ErrorValidationException);
        });

        it('should throw error if CASH payment missing paid_amount', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOrderPending);
            const invalidReq = { ...confirmReq, body: {} } as unknown as AuthenticatedRequest;

            await expect(confirmPayment(invalidReq)).rejects.toThrow(ErrorValidationException);
            await expect(confirmPayment(invalidReq)).rejects.toThrow('wajib diisi');
        });

        it('should throw error if paid amount < total', async () => {
            (orderRepository.findByIdWithDetails as jest.Mock).mockResolvedValue(mockOrderPending);
            const invalidReq = {
                ...confirmReq,
                body: { paid_amount: 10000 } // Total is 30000
            } as unknown as AuthenticatedRequest;

            await expect(confirmPayment(invalidReq)).rejects.toThrow(ErrorValidationException);
            await expect(confirmPayment(invalidReq)).rejects.toThrow('kurang dari total');
        });
    });

    // ============================================
    // CANCEL ORDER TESTS
    // ============================================

    describe('cancelOrder', () => {
        const cancelReq = {
            params: { order_id: 'order-123' },
        } as unknown as AuthenticatedRequest;

        it('should cancel pending order successfully', async () => {
            (orderRepository.findById as jest.Mock).mockResolvedValue(mockOrderPending);

            const result = await cancelOrder(cancelReq);

            expect(result.success).toBe(true);
            expect(orderRepository.updateStatus).toHaveBeenCalledWith(
                'order-123',
                OrderStatus.CANCELLED
            );
        });

        it('should throw error if order not found', async () => {
            (orderRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(cancelOrder(cancelReq)).rejects.toThrow(ErrorNotFoundException);
        });

        it('should throw error if order not PENDING', async () => {
            (orderRepository.findById as jest.Mock).mockResolvedValue(mockOrderCompleted);

            await expect(cancelOrder(cancelReq)).rejects.toThrow(ErrorValidationException);
            await expect(cancelOrder(cancelReq)).rejects.toThrow('Hanya pesanan dengan status PENDING');
        });
    });
});
