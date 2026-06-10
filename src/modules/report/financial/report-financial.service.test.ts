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
    mockLeanOrders,
    mockCashMovementsOut,
    mockShifts,
    mockAggregatedByMenu,
    mockAggregatedByCategory,
    expectedTotalSales,
    expectedTotalCOGS,
    expectedTotalCOGSByMenuCost,
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
        it('should return daily P&L grouped by date', async () => {
            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue(mockLeanOrders);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue(mockCashMovementsOut);

            const result = await getFullReport(mockRequest);

            expect(result.period.start_date).toBe('2026-01-01');
            expect(result.period.end_date).toBe('2026-01-31');
            expect(result.total_days).toBe(1); // all orders on same day
            expect(result.items).toHaveLength(1);
        });

        it('should calculate daily revenue, COGS, gross profit, expenses, and net profit correctly', async () => {
            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue(mockLeanOrders);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue(mockCashMovementsOut);

            const result = await getFullReport(mockRequest);

            const day = result.items[0];
            expect(day.date).toBe('2026-01-01');
            expect(day.transaction_count).toBe(3);
            expect(day.total_revenue).toBe(expectedTotalSales);         // 160000
            expect(day.total_cogs).toBe(expectedTotalCOGSByMenuCost);   // 40000
            expect(day.gross_profit).toBe(expectedTotalSales - expectedTotalCOGSByMenuCost); // 120000
            expect(day.expenses).toBe(50000);                           // from mockCashMovementsOut
            expect(day.net_profit).toBe(120000 - 50000);                // 70000
        });

        it('should handle multiple dates correctly', async () => {
            const multiDayOrders = [
                {
                    order_id: 'order-d1',
                    total_amount: 100000,
                    created_at: new Date('2026-01-01T10:00:00Z'),
                    order_items: [{ qty: 2, menu: { cost: 10000 } }],
                },
                {
                    order_id: 'order-d2',
                    total_amount: 80000,
                    created_at: new Date('2026-01-02T10:00:00Z'),
                    order_items: [{ qty: 1, menu: { cost: 5000 } }],
                },
            ];
            const multiDayExpenses = [
                { amount: 20000, created_at: new Date('2026-01-01T12:00:00Z') },
                { amount: 10000, created_at: new Date('2026-01-02T12:00:00Z') },
            ];

            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue(multiDayOrders);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue(multiDayExpenses);

            const result = await getFullReport(mockRequest);

            expect(result.total_days).toBe(2);
            expect(result.items[0].date).toBe('2026-01-01');
            expect(result.items[0].total_revenue).toBe(100000);
            expect(result.items[0].total_cogs).toBe(20000);   // 2 * 10000
            expect(result.items[0].gross_profit).toBe(80000);
            expect(result.items[0].expenses).toBe(20000);
            expect(result.items[0].net_profit).toBe(60000);

            expect(result.items[1].date).toBe('2026-01-02');
            expect(result.items[1].total_revenue).toBe(80000);
            expect(result.items[1].total_cogs).toBe(5000);    // 1 * 5000
            expect(result.items[1].gross_profit).toBe(75000);
            expect(result.items[1].expenses).toBe(10000);
            expect(result.items[1].net_profit).toBe(65000);
        });

        it('should handle days with expenses but no orders', async () => {
            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue([]);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue([
                    { amount: 30000, created_at: new Date('2026-01-05T09:00:00Z') },
                ]);

            const result = await getFullReport(mockRequest);

            expect(result.total_days).toBe(1);
            const day = result.items[0];
            expect(day.date).toBe('2026-01-05');
            expect(day.transaction_count).toBe(0);
            expect(day.total_revenue).toBe(0);
            expect(day.total_cogs).toBe(0);
            expect(day.gross_profit).toBe(0);
            expect(day.expenses).toBe(30000);
            expect(day.net_profit).toBe(-30000);
        });

        it('should return empty items when no orders and no expenses', async () => {
            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue([]);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue([]);

            const result = await getFullReport(mockRequest);

            expect(result.total_days).toBe(0);
            expect(result.items).toHaveLength(0);
        });

        it('should sort items by date ascending', async () => {
            const unorderedOrders = [
                {
                    order_id: 'order-d3',
                    total_amount: 50000,
                    created_at: new Date('2026-01-03T10:00:00Z'),
                    order_items: [],
                },
                {
                    order_id: 'order-d1',
                    total_amount: 80000,
                    created_at: new Date('2026-01-01T10:00:00Z'),
                    order_items: [],
                },
            ];

            (reportFinancialRepository.getOrdersForFullReport as jest.Mock)
                .mockResolvedValue(unorderedOrders);
            (reportFinancialRepository.getCashMovementsOutForFullReport as jest.Mock)
                .mockResolvedValue([]);

            const result = await getFullReport(mockRequest);

            expect(result.items[0].date).toBe('2026-01-01');
            expect(result.items[1].date).toBe('2026-01-03');
        });
    });
});
