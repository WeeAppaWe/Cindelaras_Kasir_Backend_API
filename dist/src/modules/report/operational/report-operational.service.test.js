"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_operational_service_1 = require("./report-operational.service");
const report_operational_repository_1 = __importDefault(require("./report-operational.repository"));
const report_operational_mock_1 = require("../../../tests/mocks/report-operational.mock");
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
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ============================================
    // GET CASHIER PERFORMANCE TESTS
    // ============================================
    describe('getCashierPerformance', () => {
        it('should return cashier performance data', async () => {
            report_operational_repository_1.default.getUsersWithOrderStats
                .mockResolvedValue(report_operational_mock_1.mockUserOrdersAndShifts);
            const result = await (0, report_operational_service_1.getCashierPerformance)(mockRequest);
            expect(result.period.start_date).toBe('2026-01-01');
            expect(result.total_cashiers).toBe(2);
            expect(result.cashiers).toHaveLength(2);
        });
        it('should calculate cancelled orders correctly', async () => {
            report_operational_repository_1.default.getUsersWithOrderStats
                .mockResolvedValue(report_operational_mock_1.mockUserOrdersAndShifts);
            const result = await (0, report_operational_service_1.getCashierPerformance)(mockRequest);
            // Find Kasir Satu
            const cashier1 = result.cashiers.find(c => c.name === 'Kasir Satu');
            expect(cashier1).toBeDefined();
            expect(cashier1.total_transactions).toBe(report_operational_mock_1.expectedCashier1Transactions);
            expect(cashier1.cancelled_orders).toBe(report_operational_mock_1.expectedCashier1Cancelled);
        });
        it('should handle empty data', async () => {
            report_operational_repository_1.default.getUsersWithOrderStats
                .mockResolvedValue(null);
            const result = await (0, report_operational_service_1.getCashierPerformance)(mockRequest);
            expect(result.total_cashiers).toBe(0);
            expect(result.cashiers).toHaveLength(0);
        });
    });
    // ============================================
    // GET SHIFT SUMMARY TESTS
    // ============================================
    describe('getShiftSummary', () => {
        it('should return shift summary', async () => {
            report_operational_repository_1.default.getShiftsWithOrderCounts
                .mockResolvedValue(report_operational_mock_1.mockShiftsWithOrders);
            const result = await (0, report_operational_service_1.getShiftSummary)(mockRequest);
            expect(result.total_shifts).toBe(2);
            expect(result.closed_shifts).toBe(report_operational_mock_1.expectedClosedShifts);
            expect(result.active_shifts).toBe(report_operational_mock_1.expectedActiveShifts);
        });
        it('should identify active vs closed shifts', async () => {
            report_operational_repository_1.default.getShiftsWithOrderCounts
                .mockResolvedValue(report_operational_mock_1.mockShiftsWithOrders);
            const result = await (0, report_operational_service_1.getShiftSummary)(mockRequest);
            const closedShift = result.shifts.find(s => s.status === 'CLOSED');
            const activeShift = result.shifts.find(s => s.status === 'ACTIVE');
            expect(closedShift).toBeDefined();
            expect(activeShift).toBeDefined();
            expect(closedShift.end_time).not.toBeNull();
            expect(activeShift.end_time).toBeNull();
        });
        it('should handle empty shifts', async () => {
            report_operational_repository_1.default.getShiftsWithOrderCounts
                .mockResolvedValue([]);
            const result = await (0, report_operational_service_1.getShiftSummary)(mockRequest);
            expect(result.total_shifts).toBe(0);
            expect(result.shifts).toHaveLength(0);
        });
    });
    // ============================================
    // GET TRANSACTION STATS TESTS
    // ============================================
    describe('getTransactionStats', () => {
        it('should calculate transaction statistics', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            const result = await (0, report_operational_service_1.getTransactionStats)(mockRequest);
            expect(result.total_transactions).toBe(report_operational_mock_1.expectedTotalCompletedOrders);
            expect(result.total_sales).toBe(report_operational_mock_1.expectedTotalSales);
        });
        it('should calculate average per transaction', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            const result = await (0, report_operational_service_1.getTransactionStats)(mockRequest);
            // 160000 / 3 = 53333.33...
            expect(result.average_per_transaction).toBe(Math.round(report_operational_mock_1.expectedTotalSales / report_operational_mock_1.expectedTotalCompletedOrders));
        });
        it('should include hourly breakdown', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            const result = await (0, report_operational_service_1.getTransactionStats)(mockRequest);
            expect(result.hourly_breakdown.reduce((sum, item) => sum + item.transaction_count, 0))
                .toBe(report_operational_mock_1.expectedTotalCompletedOrders);
            expect(result.hourly_breakdown.reduce((sum, item) => sum + item.total_sales, 0))
                .toBe(report_operational_mock_1.expectedTotalSales);
        });
        it('should handle empty orders', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue([]);
            const result = await (0, report_operational_service_1.getTransactionStats)(mockRequest);
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
            report_operational_repository_1.default.getMenuPerformanceData
                .mockResolvedValue(report_operational_mock_1.mockMenuPerformanceData);
            const result = await (0, report_operational_service_1.getMenuPerformance)(mockRequest);
            expect(result.menus).toHaveLength(2);
            expect(result.menus[0].name).toBe('Nasi Goreng');
        });
        it('should calculate profit and margin', async () => {
            report_operational_repository_1.default.getMenuPerformanceData
                .mockResolvedValue(report_operational_mock_1.mockMenuPerformanceData);
            const result = await (0, report_operational_service_1.getMenuPerformance)(mockRequest);
            // Nasi Goreng: revenue 250000, cost 100000, profit 150000, margin 60%
            const nasiGoreng = result.menus[0];
            expect(nasiGoreng.profit).toBe(150000);
            expect(nasiGoreng.margin_percentage).toBe(60);
        });
        it('should handle empty data', async () => {
            report_operational_repository_1.default.getMenuPerformanceData
                .mockResolvedValue([]);
            const result = await (0, report_operational_service_1.getMenuPerformance)(mockRequest);
            expect(result.menus).toHaveLength(0);
            expect(result.total_revenue).toBe(0);
        });
    });
    // ============================================
    // GET ORDER STATUS TESTS
    // ============================================
    describe('getOrderStatus', () => {
        it('should group orders by status', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            const result = await (0, report_operational_service_1.getOrderStatus)(mockRequest);
            expect(result.total_orders).toBe(4);
            const completedStatus = result.summary.find(s => s.status === 'COMPLETED');
            expect(completedStatus).toBeDefined();
            expect(completedStatus.count).toBe(3);
            const cancelledStatus = result.summary.find(s => s.status === 'CANCELLED');
            expect(cancelledStatus).toBeDefined();
            expect(cancelledStatus.count).toBe(1);
        });
        it('should calculate percentage correctly', async () => {
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            const result = await (0, report_operational_service_1.getOrderStatus)(mockRequest);
            const completedStatus = result.summary.find(s => s.status === 'COMPLETED');
            // 3/4 * 100 = 75%
            expect(completedStatus.percentage).toBe(75);
        });
    });
    // ============================================
    // GET FULL REPORT TESTS
    // ============================================
    describe('getFullReport', () => {
        it('should combine all reports', async () => {
            // Mock all repository methods
            report_operational_repository_1.default.getUsersWithOrderStats
                .mockResolvedValue(report_operational_mock_1.mockUserOrdersAndShifts);
            report_operational_repository_1.default.getShiftsWithOrderCounts
                .mockResolvedValue(report_operational_mock_1.mockShiftsWithOrders);
            report_operational_repository_1.default.getAllOrdersForPeriod
                .mockResolvedValue(report_operational_mock_1.mockAllOrders);
            report_operational_repository_1.default.getMenuPerformanceData
                .mockResolvedValue(report_operational_mock_1.mockMenuPerformanceData);
            const result = await (0, report_operational_service_1.getFullReport)(mockRequest);
            expect(result.period).toBeDefined();
            expect(result.cashier_summary).toBeDefined();
            expect(result.shift_summary).toBeDefined();
            expect(result.transaction_stats).toBeDefined();
            expect(result.order_status).toBeDefined();
            expect(result.top_menus).toBeDefined();
            expect(result.cashier_summary.total_cashiers).toBe(2);
            expect(result.shift_summary.total_shifts).toBe(2);
        });
    });
});
//# sourceMappingURL=report-operational.service.test.js.map