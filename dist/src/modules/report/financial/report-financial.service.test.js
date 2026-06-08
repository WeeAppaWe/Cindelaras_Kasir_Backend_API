"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_financial_service_1 = require("./report-financial.service");
const report_financial_repository_1 = __importDefault(require("./report-financial.repository"));
const report_financial_mock_1 = require("../../../tests/mocks/report-financial.mock");
// Mock dependencies
jest.mock('./report-financial.repository');
describe('Report Financial Service', () => {
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
    // GET SUMMARY TESTS
    // ============================================
    describe('getSummary', () => {
        it('should return revenue summary with correct calculations', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            const result = await (0, report_financial_service_1.getSummary)(mockRequest);
            expect(result.period.start_date).toBe('2026-01-01');
            expect(result.period.end_date).toBe('2026-01-31');
            expect(result.revenue.total_sales).toBe(report_financial_mock_1.expectedTotalSales);
            expect(result.revenue.total_cogs).toBe(report_financial_mock_1.expectedTotalCOGS);
            expect(result.revenue.gross_profit).toBe(report_financial_mock_1.expectedTotalSales - report_financial_mock_1.expectedTotalCOGS);
            expect(result.transaction_count).toBe(3);
        });
        it('should handle empty orders', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue([]);
            const result = await (0, report_financial_service_1.getSummary)(mockRequest);
            expect(result.revenue.total_sales).toBe(0);
            expect(result.revenue.total_cogs).toBe(0);
            expect(result.transaction_count).toBe(0);
        });
        it('should handle null orders', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(null);
            const result = await (0, report_financial_service_1.getSummary)(mockRequest);
            expect(result.revenue.total_sales).toBe(0);
            expect(result.transaction_count).toBe(0);
        });
    });
    // ============================================
    // GET PAYMENT BREAKDOWN TESTS
    // ============================================
    describe('getPaymentBreakdown', () => {
        it('should group orders by payment type correctly', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            const result = await (0, report_financial_service_1.getPaymentBreakdown)(mockRequest);
            expect(result.total_transactions).toBe(3);
            expect(result.total_amount).toBe(report_financial_mock_1.expectedTotalSales);
            // Find CASH breakdown
            const cashBreakdown = result.by_payment_type.find(p => p.payment_type === 'CASH');
            expect(cashBreakdown).toBeDefined();
            expect(cashBreakdown.total_amount).toBe(report_financial_mock_1.expectedCashSales);
            expect(cashBreakdown.transaction_count).toBe(2);
            // Find QRIS breakdown
            const qrisBreakdown = result.by_payment_type.find(p => p.payment_type === 'QRIS');
            expect(qrisBreakdown).toBeDefined();
            expect(qrisBreakdown.total_amount).toBe(report_financial_mock_1.expectedQrisSales);
            expect(qrisBreakdown.transaction_count).toBe(1);
        });
        it('should calculate percentage correctly', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            const result = await (0, report_financial_service_1.getPaymentBreakdown)(mockRequest);
            const cashBreakdown = result.by_payment_type.find(p => p.payment_type === 'CASH');
            // 110000 / 160000 * 100 = 68.75%
            expect(cashBreakdown.percentage).toBe(68.75);
        });
    });
    // ============================================
    // GET CASH FLOW TESTS
    // ============================================
    describe('getCashFlow', () => {
        it('should calculate cash flow correctly', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            report_financial_repository_1.default.getCashMovementsForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCashMovements);
            report_financial_repository_1.default.getShiftsForPeriod
                .mockResolvedValue(report_financial_mock_1.mockShifts);
            const result = await (0, report_financial_service_1.getCashFlow)(mockRequest);
            expect(result.opening_cash).toBe(500000);
            expect(result.cash_in.from_sales).toBe(report_financial_mock_1.expectedCashSales);
            expect(result.cash_in.adjustments).toBe(100000); // IN movement
            expect(result.cash_out.adjustments).toBe(50000); // OUT movement
        });
        it('should handle no shifts', async () => {
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            report_financial_repository_1.default.getCashMovementsForPeriod
                .mockResolvedValue([]);
            report_financial_repository_1.default.getShiftsForPeriod
                .mockResolvedValue([]);
            const result = await (0, report_financial_service_1.getCashFlow)(mockRequest);
            expect(result.opening_cash).toBe(0);
            expect(result.closing_cash).toBe(0);
        });
    });
    // ============================================
    // GET TOP MENUS TESTS
    // ============================================
    describe('getTopMenus', () => {
        it('should return top menus sorted by revenue', async () => {
            report_financial_repository_1.default.getOrderItemsAggregatedByMenu
                .mockResolvedValue(report_financial_mock_1.mockAggregatedByMenu);
            const result = await (0, report_financial_service_1.getTopMenus)(mockRequest);
            expect(result.top_menus).toHaveLength(2);
            expect(result.top_menus[0].name).toBe('Nasi Goreng');
            expect(result.top_menus[0].revenue).toBe(100000);
        });
        it('should calculate percentage of total', async () => {
            report_financial_repository_1.default.getOrderItemsAggregatedByMenu
                .mockResolvedValue(report_financial_mock_1.mockAggregatedByMenu);
            const result = await (0, report_financial_service_1.getTopMenus)(mockRequest);
            // 100000 / 160000 * 100 = 62.5%
            expect(result.top_menus[0].percentage_of_total).toBe(62.5);
        });
    });
    // ============================================
    // GET SALES BY CATEGORY TESTS
    // ============================================
    describe('getSalesByCategory', () => {
        it('should return sales grouped by category', async () => {
            report_financial_repository_1.default.getOrderItemsAggregatedByCategory
                .mockResolvedValue(report_financial_mock_1.mockAggregatedByCategory);
            const result = await (0, report_financial_service_1.getSalesByCategory)(mockRequest);
            expect(result.by_category).toHaveLength(2);
            expect(result.by_category[0].category_name).toBe('Makanan');
        });
    });
    // ============================================
    // GET FULL REPORT TESTS
    // ============================================
    describe('getFullReport', () => {
        it('should combine all reports', async () => {
            // Mock all repository methods
            report_financial_repository_1.default.getCompletedOrdersForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCompletedOrders);
            report_financial_repository_1.default.getCashMovementsForPeriod
                .mockResolvedValue(report_financial_mock_1.mockCashMovements);
            report_financial_repository_1.default.getShiftsForPeriod
                .mockResolvedValue(report_financial_mock_1.mockShifts);
            report_financial_repository_1.default.getOrderItemsAggregatedByMenu
                .mockResolvedValue(report_financial_mock_1.mockAggregatedByMenu);
            report_financial_repository_1.default.getOrderItemsAggregatedByCategory
                .mockResolvedValue(report_financial_mock_1.mockAggregatedByCategory);
            const result = await (0, report_financial_service_1.getFullReport)(mockRequest);
            expect(result.period).toBeDefined();
            expect(result.summary).toBeDefined();
            expect(result.payment_breakdown).toBeDefined();
            expect(result.cash_flow).toBeDefined();
            expect(result.top_menus).toBeDefined();
            expect(result.sales_by_category).toBeDefined();
            expect(result.summary.revenue.total_sales).toBe(report_financial_mock_1.expectedTotalSales);
            expect(result.summary.transaction_count).toBe(3);
        });
    });
});
//# sourceMappingURL=report-financial.service.test.js.map