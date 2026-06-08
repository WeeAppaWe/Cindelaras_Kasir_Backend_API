import { AuthenticatedRequest } from '../../../../types';
import {
    getSummary,
    getPaymentBreakdown,
    getCashFlow,
    getTopMenus,
    getSalesByCategory,
    getFullReport,
} from './report-financial.service';
import reportFinancialRepository from './report-financial.repository';
import {
    mockCompletedOrders,
    mockCashMovements,
    mockShifts,
    mockAggregatedByMenu,
    mockAggregatedByCategory,
    expectedTotalSales,
    expectedTotalCOGS,
    expectedCashSales,
    expectedQrisSales,
} from '../../../tests/mocks/report-financial.mock';

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
    } as unknown as AuthenticatedRequest;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ============================================
    // GET SUMMARY TESTS
    // ============================================

    describe('getSummary', () => {
        it('should return revenue summary with correct calculations', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);

            const result = await getSummary(mockRequest);

            expect(result.period.start_date).toBe('2026-01-01');
            expect(result.period.end_date).toBe('2026-01-31');
            expect(result.revenue.total_sales).toBe(expectedTotalSales);
            expect(result.revenue.total_cogs).toBe(expectedTotalCOGS);
            expect(result.revenue.gross_profit).toBe(expectedTotalSales - expectedTotalCOGS);
            expect(result.transaction_count).toBe(3);
        });

        it('should handle empty orders', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue([]);

            const result = await getSummary(mockRequest);

            expect(result.revenue.total_sales).toBe(0);
            expect(result.revenue.total_cogs).toBe(0);
            expect(result.transaction_count).toBe(0);
        });

        it('should handle null orders', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(null);

            const result = await getSummary(mockRequest);

            expect(result.revenue.total_sales).toBe(0);
            expect(result.transaction_count).toBe(0);
        });
    });

    // ============================================
    // GET PAYMENT BREAKDOWN TESTS
    // ============================================

    describe('getPaymentBreakdown', () => {
        it('should group orders by payment type correctly', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);

            const result = await getPaymentBreakdown(mockRequest);

            expect(result.total_transactions).toBe(3);
            expect(result.total_amount).toBe(expectedTotalSales);

            // Find CASH breakdown
            const cashBreakdown = result.by_payment_type.find(p => p.payment_type === 'CASH');
            expect(cashBreakdown).toBeDefined();
            expect(cashBreakdown!.total_amount).toBe(expectedCashSales);
            expect(cashBreakdown!.transaction_count).toBe(2);

            // Find QRIS breakdown
            const qrisBreakdown = result.by_payment_type.find(p => p.payment_type === 'QRIS');
            expect(qrisBreakdown).toBeDefined();
            expect(qrisBreakdown!.total_amount).toBe(expectedQrisSales);
            expect(qrisBreakdown!.transaction_count).toBe(1);
        });

        it('should calculate percentage correctly', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);

            const result = await getPaymentBreakdown(mockRequest);

            const cashBreakdown = result.by_payment_type.find(p => p.payment_type === 'CASH');
            // 110000 / 160000 * 100 = 68.75%
            expect(cashBreakdown!.percentage).toBe(68.75);
        });
    });

    // ============================================
    // GET CASH FLOW TESTS
    // ============================================

    describe('getCashFlow', () => {
        it('should calculate cash flow correctly', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);
            (reportFinancialRepository.getCashMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockCashMovements);
            (reportFinancialRepository.getShiftsForPeriod as jest.Mock)
                .mockResolvedValue(mockShifts);

            const result = await getCashFlow(mockRequest);

            expect(result.opening_cash).toBe(500000);
            expect(result.cash_in.from_sales).toBe(expectedCashSales);
            expect(result.cash_in.adjustments).toBe(100000); // IN movement
            expect(result.cash_out.adjustments).toBe(50000); // OUT movement
        });

        it('should handle no shifts', async () => {
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);
            (reportFinancialRepository.getCashMovementsForPeriod as jest.Mock)
                .mockResolvedValue([]);
            (reportFinancialRepository.getShiftsForPeriod as jest.Mock)
                .mockResolvedValue([]);

            const result = await getCashFlow(mockRequest);

            expect(result.opening_cash).toBe(0);
            expect(result.closing_cash).toBe(0);
        });
    });

    // ============================================
    // GET TOP MENUS TESTS
    // ============================================

    describe('getTopMenus', () => {
        it('should return top menus sorted by revenue', async () => {
            (reportFinancialRepository.getOrderItemsAggregatedByMenu as jest.Mock)
                .mockResolvedValue(mockAggregatedByMenu);

            const result = await getTopMenus(mockRequest);

            expect(result.top_menus).toHaveLength(2);
            expect(result.top_menus[0].name).toBe('Nasi Goreng');
            expect(result.top_menus[0].revenue).toBe(100000);
        });

        it('should calculate percentage of total', async () => {
            (reportFinancialRepository.getOrderItemsAggregatedByMenu as jest.Mock)
                .mockResolvedValue(mockAggregatedByMenu);

            const result = await getTopMenus(mockRequest);

            // 100000 / 160000 * 100 = 62.5%
            expect(result.top_menus[0].percentage_of_total).toBe(62.5);
        });
    });

    // ============================================
    // GET SALES BY CATEGORY TESTS
    // ============================================

    describe('getSalesByCategory', () => {
        it('should return sales grouped by category', async () => {
            (reportFinancialRepository.getOrderItemsAggregatedByCategory as jest.Mock)
                .mockResolvedValue(mockAggregatedByCategory);

            const result = await getSalesByCategory(mockRequest);

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
            (reportFinancialRepository.getCompletedOrdersForPeriod as jest.Mock)
                .mockResolvedValue(mockCompletedOrders);
            (reportFinancialRepository.getCashMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockCashMovements);
            (reportFinancialRepository.getShiftsForPeriod as jest.Mock)
                .mockResolvedValue(mockShifts);
            (reportFinancialRepository.getOrderItemsAggregatedByMenu as jest.Mock)
                .mockResolvedValue(mockAggregatedByMenu);
            (reportFinancialRepository.getOrderItemsAggregatedByCategory as jest.Mock)
                .mockResolvedValue(mockAggregatedByCategory);

            const result = await getFullReport(mockRequest);

            expect(result.period).toBeDefined();
            expect(result.summary).toBeDefined();
            expect(result.payment_breakdown).toBeDefined();
            expect(result.cash_flow).toBeDefined();
            expect(result.top_menus).toBeDefined();
            expect(result.sales_by_category).toBeDefined();

            expect(result.summary.revenue.total_sales).toBe(expectedTotalSales);
            expect(result.summary.transaction_count).toBe(3);
        });
    });
});
