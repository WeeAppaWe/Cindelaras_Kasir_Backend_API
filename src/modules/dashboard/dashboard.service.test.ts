import { getKPI, getSalesTrend, getTopMenus, getStockStatus, getRecentStockMovements } from './dashboard.service';
import dashboardRepository from './dashboard.repository';
import { AuthenticatedRequest } from '../../../types';
import {
    mockTodaySummary,
    mockYesterdaySummary,
    mockYesterdayZeroSummary,
    mockEmptySummary,
    expectedRevenue,
    expectedTransactions,
    expectedProfit,
    mockLowStockCount,
    mockSalesTrendRows,
    expectedSalesTrendData,
    mockTopMenuRows,
    expectedTopMenuItems,
    mockStockStatusRows,
    mockStockStatusRowsOnlyAman,
    expectedStockStatusResponse,
    expectedStockStatusEmpty,
    mockRecentStockMovementRows,
    expectedRecentStockMovementsResponse,
} from '../../tests/mocks/dashboard.mock';

jest.mock('./dashboard.repository');

describe('Dashboard Service', () => {
    const mockRequest = (query: Record<string, string> = {}): AuthenticatedRequest =>
        ({ query }) as unknown as AuthenticatedRequest;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ============================================
    // GET KPI TESTS
    // ============================================

    describe('getKPI', () => {
        it('should return all 4 KPI with correct values', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValueOnce(mockTodaySummary)
                .mockResolvedValueOnce(mockYesterdaySummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(mockLowStockCount);

            const result = await getKPI(mockRequest({ date: '2024-06-15' }));

            expect(result.date).toBe('2024-06-15');

            expect(result.revenue.today).toBe(expectedRevenue.today);
            expect(result.revenue.yesterday).toBe(expectedRevenue.yesterday);
            expect(result.revenue.change_amount).toBe(expectedRevenue.change_amount);
            expect(result.revenue.change_percentage).toBe(expectedRevenue.change_percentage);

            expect(result.transactions.today).toBe(expectedTransactions.today);
            expect(result.transactions.yesterday).toBe(expectedTransactions.yesterday);
            expect(result.transactions.change).toBe(expectedTransactions.change);

            expect(result.profit.gross_profit).toBe(expectedProfit.gross_profit);
            expect(result.profit.total_revenue).toBe(expectedProfit.total_revenue);
            expect(result.profit.total_cogs).toBe(expectedProfit.total_cogs);
            expect(result.profit.margin_percentage).toBe(expectedProfit.margin_percentage);

            expect(result.low_stock.count).toBe(mockLowStockCount);
        });

        it('should call getDailyOrderSummary twice — today and yesterday', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValueOnce(mockTodaySummary)
                .mockResolvedValueOnce(mockYesterdaySummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(0);

            await getKPI(mockRequest({ date: '2024-06-15' }));

            expect(dashboardRepository.getDailyOrderSummary).toHaveBeenCalledTimes(2);
            expect(dashboardRepository.getDailyOrderSummary).toHaveBeenNthCalledWith(1, '2024-06-15');
            expect(dashboardRepository.getDailyOrderSummary).toHaveBeenNthCalledWith(2, '2024-06-14');
        });

        it('should return null for change_percentage when yesterday revenue is 0', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValueOnce(mockTodaySummary)
                .mockResolvedValueOnce(mockYesterdayZeroSummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(0);

            const result = await getKPI(mockRequest({ date: '2024-06-15' }));

            expect(result.revenue.change_percentage).toBeNull();
        });

        it('should return 0 margin_percentage when today revenue is 0', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValueOnce(mockEmptySummary)
                .mockResolvedValueOnce(mockEmptySummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(0);

            const result = await getKPI(mockRequest({ date: '2024-06-15' }));

            expect(result.profit.margin_percentage).toBe(0);
            expect(result.profit.gross_profit).toBe(0);
        });

        it('should return negative change when today is less than yesterday', async () => {
            const lowToday = { total_revenue: 1000000, transaction_count: 30, total_cogs: 600000 };
            const highYesterday = { total_revenue: 2000000, transaction_count: 40, total_cogs: 1200000 };

            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValueOnce(lowToday)
                .mockResolvedValueOnce(highYesterday);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(5);

            const result = await getKPI(mockRequest({ date: '2024-06-15' }));

            expect(result.revenue.change_amount).toBe(-1000000);
            expect(result.revenue.change_percentage).toBe(-50);
            expect(result.transactions.change).toBe(-10);
        });

        it('should use today\'s date when no date query param is provided', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValue(mockEmptySummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(0);

            const result = await getKPI(mockRequest());

            expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });

        it('should calculate yesterday correctly for first day of month', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockResolvedValue(mockEmptySummary);
            (dashboardRepository.getLowStockCount as jest.Mock)
                .mockResolvedValue(0);

            await getKPI(mockRequest({ date: '2024-07-01' }));

            expect(dashboardRepository.getDailyOrderSummary).toHaveBeenNthCalledWith(2, '2024-06-30');
        });

        it('should propagate error from repository', async () => {
            (dashboardRepository.getDailyOrderSummary as jest.Mock)
                .mockRejectedValue(new Error('Database error'));

            await expect(getKPI(mockRequest({ date: '2024-06-15' })))
                .rejects
                .toThrow('Database error');
        });
    });

    // ============================================
    // GET SALES TREND TESTS
    // ============================================

    describe('getSalesTrend', () => {
        it('should return 7 data points for default period (7 days)', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue(mockSalesTrendRows);

            const result = await getSalesTrend(mockRequest());

            expect(result.period_days).toBe(7);
            expect(result.data).toHaveLength(7);
        });

        it('should fill missing days with zero revenue and transaction_count', async () => {
            // Repository mengembalikan 6 rows dari 7 hari — satu hari tidak ada data
            // Service harus mengisi hari yang hilang dengan revenue=0, transaction_count=0
            const sparseRows = [
                { date: '', revenue: 1000000, transaction_count: 10 },
                { date: '', revenue: 2000000, transaction_count: 20 },
                { date: '', revenue: 3000000, transaction_count: 30 },
                { date: '', revenue: 4000000, transaction_count: 40 },
                { date: '', revenue: 5000000, transaction_count: 50 },
                { date: '', revenue: 6000000, transaction_count: 60 },
                // satu hari sengaja tidak ada
            ];

            // Isi tanggal secara dinamis agar tidak bergantung pada tanggal hari ini
            const today = new Date();
            for (let i = 0; i < 6; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - (6 - i)); // day-6 sampai day-1, skip day-0 (hari ini)
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                sparseRows[i].date = `${yyyy}-${mm}-${dd}`;
            }

            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue(sparseRows);

            const result = await getSalesTrend(mockRequest());

            // Harus ada tepat 7 data points
            expect(result.data).toHaveLength(7);

            // Hari ini (index 6) tidak ada di sparseRows → harus revenue=0, transaction_count=0
            const todayPoint = result.data[result.data.length - 1];
            expect(todayPoint.revenue).toBe(0);
            expect(todayPoint.transaction_count).toBe(0);
        });

        it('should return correct label format (DD Mon)', async () => {
            // Build satu row dengan tanggal dinamis agar tidak bergantung pada hari ini
            const testDate = new Date();
            testDate.setDate(testDate.getDate() - 1); // kemarin
            const yyyy = testDate.getFullYear();
            const mm = String(testDate.getMonth() + 1).padStart(2, '0');
            const dd = String(testDate.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}-${mm}-${dd}`;

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const expectedLabel = `${dd} ${months[testDate.getMonth()]}`;

            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue([
                    { date: dateStr, revenue: 1000000, transaction_count: 10 },
                ]);

            const result = await getSalesTrend(mockRequest());
            const point = result.data.find((d) => d.date === dateStr);

            expect(point).toBeDefined();
            expect(point?.label).toBe(expectedLabel);
        });

        it('should accept days=14 and return 14 data points', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue([]);

            const result = await getSalesTrend(mockRequest({ days: '14' }));

            expect(result.period_days).toBe(14);
            expect(result.data).toHaveLength(14);
        });

        it('should accept days=30 and return 30 data points', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue([]);

            const result = await getSalesTrend(mockRequest({ days: '30' }));

            expect(result.period_days).toBe(30);
            expect(result.data).toHaveLength(30);
        });

        it('should default to 7 days when days param is invalid', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue([]);

            const result = await getSalesTrend(mockRequest({ days: '99' }));

            expect(result.period_days).toBe(7);
            expect(result.data).toHaveLength(7);
        });

        it('should call repository getSalesTrend once', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockResolvedValue([]);

            await getSalesTrend(mockRequest({ days: '7' }));

            expect(dashboardRepository.getSalesTrend).toHaveBeenCalledTimes(1);
        });

        it('should propagate error from repository', async () => {
            (dashboardRepository.getSalesTrend as jest.Mock)
                .mockRejectedValue(new Error('Database error'));

            await expect(getSalesTrend(mockRequest()))
                .rejects
                .toThrow('Database error');
        });
    });

    // ============================================
    // GET TOP MENUS TESTS
    // ============================================

    describe('getTopMenus', () => {
        it('should return top 5 menus with correct structure', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(mockTopMenuRows);

            const result = await getTopMenus(mockRequest());

            expect(result.date).toBe('Sepanjang Masa');
            expect(result.total_items).toBe(5);
            expect(result.items).toHaveLength(5);
        });

        it('should assign rank starting from 1', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(mockTopMenuRows);

            const result = await getTopMenus(mockRequest());

            expect(result.items[0].rank).toBe(1);
            expect(result.items[1].rank).toBe(2);
            expect(result.items[4].rank).toBe(5);
        });

        it('should compute margin_percentage correctly', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(mockTopMenuRows);

            const result = await getTopMenus(mockRequest());

            expect(result.items[0].margin_percentage).toBe(expectedTopMenuItems[0].margin_percentage); // 42
            expect(result.items[1].margin_percentage).toBe(expectedTopMenuItems[1].margin_percentage); // 38
            expect(result.items[2].margin_percentage).toBe(expectedTopMenuItems[2].margin_percentage); // 45
            expect(result.items[3].margin_percentage).toBe(expectedTopMenuItems[3].margin_percentage); // 61
        });

        it('should not expose price and cost fields in response', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(mockTopMenuRows);

            const result = await getTopMenus(mockRequest());

            expect((result.items[0] as any).price).toBeUndefined();
            expect((result.items[0] as any).cost).toBeUndefined();
        });

        it('should return 0 margin_percentage when menu price is 0', async () => {
            const zeroPrice = [{ ...mockTopMenuRows[0], price: 0, cost: 0 }];
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(zeroPrice);

            const result = await getTopMenus(mockRequest());

            expect(result.items[0].margin_percentage).toBe(0);
        });

        it('should return empty items when no orders on that day', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue([]);

            const result = await getTopMenus(mockRequest());

            expect(result.total_items).toBe(0);
            expect(result.items).toHaveLength(0);
        });

        it('should call repository getTopMenus with no arguments', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockResolvedValue(mockTopMenuRows);

            await getTopMenus(mockRequest());

            expect(dashboardRepository.getTopMenus).toHaveBeenCalledWith();
        });

        it('should propagate error from repository', async () => {
            (dashboardRepository.getTopMenus as jest.Mock)
                .mockRejectedValue(new Error('Database error'));

            await expect(getTopMenus(mockRequest()))
                .rejects
                .toThrow('Database error');
        });
    });

    // ============================================
    // GET STOCK STATUS TESTS
    // ============================================

    describe('getStockStatus', () => {
        it('should return all 3 status categories with correct counts', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue(mockStockStatusRows);

            const result = await getStockStatus();

            expect(result.total_ingredients).toBe(expectedStockStatusResponse.total_ingredients);
            expect(result.categories).toHaveLength(3);
            expect(result.categories[0]).toEqual(expectedStockStatusResponse.categories[0]); // AMAN
            expect(result.categories[1]).toEqual(expectedStockStatusResponse.categories[1]); // MENIPIS
            expect(result.categories[2]).toEqual(expectedStockStatusResponse.categories[2]); // KRITIS
        });

        it('should always return categories in fixed order: AMAN, MENIPIS, KRITIS', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue(mockStockStatusRows);

            const result = await getStockStatus();

            expect(result.categories[0].status).toBe('AMAN');
            expect(result.categories[1].status).toBe('MENIPIS');
            expect(result.categories[2].status).toBe('KRITIS');
        });

        it('should fill missing status categories with count=0 and percentage=0', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue(mockStockStatusRowsOnlyAman);

            const result = await getStockStatus();

            expect(result.total_ingredients).toBe(8);
            expect(result.categories[0].count).toBe(8);     // AMAN
            expect(result.categories[1].count).toBe(0);     // MENIPIS — missing from DB
            expect(result.categories[2].count).toBe(0);     // KRITIS — missing from DB
            expect(result.categories[1].percentage).toBe(0);
            expect(result.categories[2].percentage).toBe(0);
        });

        it('should calculate correct percentages (AMAN=50%, MENIPIS=30%, KRITIS=20%)', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue(mockStockStatusRows);

            const result = await getStockStatus();

            expect(result.categories[0].percentage).toBe(50);
            expect(result.categories[1].percentage).toBe(30);
            expect(result.categories[2].percentage).toBe(20);
        });

        it('should return 0% for all categories when total ingredients = 0', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue([]);

            const result = await getStockStatus();

            expect(result.total_ingredients).toBe(0);
            expect(result.categories[0]).toEqual(expectedStockStatusEmpty.categories[0]);
            expect(result.categories[1]).toEqual(expectedStockStatusEmpty.categories[1]);
            expect(result.categories[2]).toEqual(expectedStockStatusEmpty.categories[2]);
        });

        it('should call repository getStockStatusCounts once', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockResolvedValue(mockStockStatusRows);

            await getStockStatus();

            expect(dashboardRepository.getStockStatusCounts).toHaveBeenCalledTimes(1);
        });

        it('should propagate error from repository', async () => {
            (dashboardRepository.getStockStatusCounts as jest.Mock)
                .mockRejectedValue(new Error('Database error'));

            await expect(getStockStatus())
                .rejects
                .toThrow('Database error');
        });
    });

    // ============================================
    // GET RECENT STOCK MOVEMENTS TESTS
    // ============================================

    describe('getRecentStockMovements', () => {
        it('should return items with correct structure', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockResolvedValue(mockRecentStockMovementRows);

            const result = await getRecentStockMovements();

            expect(result.total_items).toBe(5);
            expect(result.items).toHaveLength(5);
        });

        it('should map repository rows correctly to response items', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockResolvedValue(mockRecentStockMovementRows);

            const result = await getRecentStockMovements();

            expect(result.items[0].stock_movement_id).toBe('sm-uuid-001');
            expect(result.items[0].ingredient_name).toBe('Tepung Terigu');
            expect(result.items[0].stock_type_name).toBe('IN_PURCHASE');
            expect(result.items[0].qty).toBe(50);
            expect(result.items[0].current_stock).toBe(150);
            expect(result.items[0].created_at).toEqual(new Date('2024-06-15T08:30:00.000Z'));
        });

        it('should preserve order from repository (latest first)', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockResolvedValue(mockRecentStockMovementRows);

            const result = await getRecentStockMovements();

            // Repository mengembalikan urutan terbaru ke terlama — service tidak mengubah urutan
            expect(result.items[0].stock_movement_id).toBe('sm-uuid-001');
            expect(result.items[1].stock_movement_id).toBe('sm-uuid-002');
        });

        it('should return empty items when no stock movements exist', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockResolvedValue([]);

            const result = await getRecentStockMovements();

            expect(result.total_items).toBe(0);
            expect(result.items).toHaveLength(0);
        });

        it('should call repository getRecentStockMovements once', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockResolvedValue([]);

            await getRecentStockMovements();

            expect(dashboardRepository.getRecentStockMovements).toHaveBeenCalledTimes(1);
        });

        it('should propagate error from repository', async () => {
            (dashboardRepository.getRecentStockMovements as jest.Mock)
                .mockRejectedValue(new Error('Database error'));

            await expect(getRecentStockMovements())
                .rejects
                .toThrow('Database error');
        });
    });
});
