import { AuthenticatedRequest } from '../../../../types';
import {
    getCashierPerformance,
    getShiftSummary,
    getTransactionStats,
    getMenuPerformance,
    getOrderStatus,
    getFullReport,
} from './report-operational.service';
import reportOperationalRepository from './report-operational.repository';
import {
    mockAllOrders,
    mockShiftsWithOrders,
    mockUserOrdersAndShifts,
    mockMenuPerformanceData,
    expectedTotalCompletedOrders,
    expectedTotalSales,
    expectedCashier1Transactions,
    expectedCashier1Cancelled,
    expectedClosedShifts,
    expectedActiveShifts,
} from '../../../tests/mocks/report-operational.mock';

// Mock dependencies
jest.mock('./report-operational.repository');

describe('Report Operational Service', () => {
    const mockRequest = {
        query: {
            start_date: '2026-01-01',
            end_date: '2026-01-31',
        },
        params: {},
        body: {},
    } as unknown as AuthenticatedRequest;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ============================================
    // GET CASHIER PERFORMANCE TESTS
    // ============================================

    describe('getCashierPerformance', () => {
        it('should return cashier performance data', async () => {
            (reportOperationalRepository.getUsersWithOrderStats as jest.Mock)
                .mockResolvedValue(mockUserOrdersAndShifts);

            const result = await getCashierPerformance(mockRequest);

            expect(result.period.start_date).toBe('2026-01-01');
            expect(result.total_cashiers).toBe(2);
            expect(result.cashiers).toHaveLength(2);
        });

        it('should calculate cancelled orders correctly', async () => {
            (reportOperationalRepository.getUsersWithOrderStats as jest.Mock)
                .mockResolvedValue(mockUserOrdersAndShifts);

            const result = await getCashierPerformance(mockRequest);

            // Find Kasir Satu
            const cashier1 = result.cashiers.find(c => c.name === 'Kasir Satu');
            expect(cashier1).toBeDefined();
            expect(cashier1!.total_transactions).toBe(expectedCashier1Transactions);
            expect(cashier1!.cancelled_orders).toBe(expectedCashier1Cancelled);
        });

        it('should handle empty data', async () => {
            (reportOperationalRepository.getUsersWithOrderStats as jest.Mock)
                .mockResolvedValue(null);

            const result = await getCashierPerformance(mockRequest);

            expect(result.total_cashiers).toBe(0);
            expect(result.cashiers).toHaveLength(0);
        });
    });

    // ============================================
    // GET SHIFT SUMMARY TESTS
    // ============================================

    describe('getShiftSummary', () => {
        it('should return shift summary', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue(mockShiftsWithOrders);

            const result = await getShiftSummary(mockRequest);

            expect(result.total_shifts).toBe(2);
            expect(result.closed_shifts).toBe(expectedClosedShifts);
            expect(result.active_shifts).toBe(expectedActiveShifts);
        });

        it('should identify active vs closed shifts', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue(mockShiftsWithOrders);

            const result = await getShiftSummary(mockRequest);

            const closedShift = result.shifts.find(s => s.status === 'CLOSED');
            const activeShift = result.shifts.find(s => s.status === 'ACTIVE');

            expect(closedShift).toBeDefined();
            expect(activeShift).toBeDefined();
            expect(closedShift!.end_time).not.toBeNull();
            expect(activeShift!.end_time).toBeNull();
        });

        it('should handle empty shifts', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue([]);

            const result = await getShiftSummary(mockRequest);

            expect(result.total_shifts).toBe(0);
            expect(result.shifts).toHaveLength(0);
        });
    });

    // ============================================
    // GET TRANSACTION STATS TESTS
    // ============================================

    describe('getTransactionStats', () => {
        it('should calculate transaction statistics', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockAllOrders);

            const result = await getTransactionStats(mockRequest);

            expect(result.total_transactions).toBe(expectedTotalCompletedOrders);
            expect(result.total_sales).toBe(expectedTotalSales);
        });

        it('should calculate average per transaction', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockAllOrders);

            const result = await getTransactionStats(mockRequest);

            // 160000 / 3 = 53333.33...
            expect(result.average_per_transaction).toBe(Math.round(expectedTotalSales / expectedTotalCompletedOrders));
        });

        it('should include hourly breakdown', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockAllOrders);

            const result = await getTransactionStats(mockRequest);

            expect(result.hourly_breakdown.reduce((sum, item) => sum + item.transaction_count, 0))
                .toBe(expectedTotalCompletedOrders);
            expect(result.hourly_breakdown.reduce((sum, item) => sum + item.total_sales, 0))
                .toBe(expectedTotalSales);
        });

        it('should handle empty orders', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue([]);

            const result = await getTransactionStats(mockRequest);

            expect(result.total_transactions).toBe(0);
            expect(result.total_sales).toBe(0);
            expect(result.peak_hour).toBe(0);
        });
    });

    // ============================================
    // GET MENU PERFORMANCE TESTS
    // ============================================

    describe('getMenuPerformance', () => {
        it('should return menu performance data', async () => {
            (reportOperationalRepository.getMenuPerformanceData as jest.Mock)
                .mockResolvedValue(mockMenuPerformanceData);

            const result = await getMenuPerformance(mockRequest);

            expect(result.menus).toHaveLength(2);
            expect(result.menus[0].name).toBe('Nasi Goreng');
        });

        it('should calculate profit and margin', async () => {
            (reportOperationalRepository.getMenuPerformanceData as jest.Mock)
                .mockResolvedValue(mockMenuPerformanceData);

            const result = await getMenuPerformance(mockRequest);

            // Nasi Goreng: revenue 250000, cost 100000, profit 150000, margin 60%
            const nasiGoreng = result.menus[0];
            expect(nasiGoreng.profit).toBe(150000);
            expect(nasiGoreng.margin_percentage).toBe(60);
        });

        it('should handle empty data', async () => {
            (reportOperationalRepository.getMenuPerformanceData as jest.Mock)
                .mockResolvedValue([]);

            const result = await getMenuPerformance(mockRequest);

            expect(result.menus).toHaveLength(0);
            expect(result.total_revenue).toBe(0);
        });
    });

    // ============================================
    // GET ORDER STATUS TESTS
    // ============================================

    describe('getOrderStatus', () => {
        it('should group orders by status', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockAllOrders);

            const result = await getOrderStatus(mockRequest);

            expect(result.total_orders).toBe(4);

            const completedStatus = result.summary.find(s => s.status === 'COMPLETED');
            expect(completedStatus).toBeDefined();
            expect(completedStatus!.count).toBe(3);

            const cancelledStatus = result.summary.find(s => s.status === 'CANCELLED');
            expect(cancelledStatus).toBeDefined();
            expect(cancelledStatus!.count).toBe(1);
        });

        it('should calculate percentage correctly', async () => {
            (reportOperationalRepository.getAllOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockAllOrders);

            const result = await getOrderStatus(mockRequest);

            const completedStatus = result.summary.find(s => s.status === 'COMPLETED');
            // 3/4 * 100 = 75%
            expect(completedStatus!.percentage).toBe(75);
        });
    });

    // ============================================
    // GET FULL REPORT TESTS
    // ============================================

    describe('getFullReport', () => {
        it('should return shift-level report data', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue(mockShiftsWithOrders);

            const result = await getFullReport(mockRequest);

            expect(result.period).toBeDefined();
            expect(result.total_shifts).toBe(2);
            expect(result.shifts).toHaveLength(2);
        });

        it('should calculate financial columns correctly for closed shift', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue(mockShiftsWithOrders);

            const result = await getFullReport(mockRequest);

            // Shift 1:
            //   start_cash = 500000
            //   total_sales (all COMPLETED) = 80000 (CASH) + 50000 (QRIS) = 130000
            //   cash_in (IN movements) = 100000
            //   cash_out (OUT movements) = 0
            //   expected_cash = start_cash + CASH_sales_only + cash_in - cash_out
            //                 = 500000 + 80000 + 100000 - 0 = 680000
            //   actual_cash = end_cash = 1200000
            //   variance = actual_cash - expected_cash = 1200000 - 680000 = 520000
            const shift1 = result.shifts.find(s => s.shift_id === 'shift-001');
            expect(shift1).toBeDefined();
            expect(shift1!.cashier_name).toBe('Kasir Satu');
            expect(shift1!.start_cash).toBe(500000);
            expect(shift1!.total_sales).toBe(130000);
            expect(shift1!.cash_in).toBe(100000);
            expect(shift1!.cash_out).toBe(0);
            expect(shift1!.expected_cash).toBe(680000);
            expect(shift1!.actual_cash).toBe(1200000);
            expect(shift1!.variance).toBe(520000);
            expect(shift1!.transaction_count).toBe(2);
            expect(shift1!.status).toBe('CLOSED');
        });

        it('should handle active shift with null actual_cash and variance', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue(mockShiftsWithOrders);

            const result = await getFullReport(mockRequest);

            // Shift 2: active, end_cash=null
            const shift2 = result.shifts.find(s => s.shift_id === 'shift-002');
            expect(shift2).toBeDefined();
            expect(shift2!.cashier_name).toBe('Kasir Dua');
            expect(shift2!.actual_cash).toBeNull();
            expect(shift2!.variance).toBeNull();
            expect(shift2!.status).toBe('ACTIVE');
        });

        it('should handle empty shifts', async () => {
            (reportOperationalRepository.getShiftsWithOrderCounts as jest.Mock)
                .mockResolvedValue([]);

            const result = await getFullReport(mockRequest);

            expect(result.total_shifts).toBe(0);
            expect(result.shifts).toHaveLength(0);
        });
    });
});
