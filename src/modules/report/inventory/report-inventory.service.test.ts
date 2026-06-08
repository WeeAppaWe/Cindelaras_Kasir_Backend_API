import { AuthenticatedRequest } from '../../../../types';
import {
    getCurrentStock,
    getMovementSummary,
    getStockAlerts,
    getInventoryValuation,
    getOpnameHistory,
    getIngredientCard,
    getFullReport,
} from './report-inventory.service';
import reportInventoryRepository from './report-inventory.repository';
import {
    mockAllIngredients,
    mockAllStockMovements,
    mockStockOpnames,
    mockIngredientMovementsData,
    expectedTotalStockValue,
    expectedLowStockCount,
    expectedOutOfStockCount,
    expectedTotalInQty,
    expectedTotalInValue,
    expectedShrinkageValue,
} from '../../../tests/mocks/report-inventory.mock';

// Mock dependencies
jest.mock('./report-inventory.repository');

describe('Report Inventory Service', () => {
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
    // GET CURRENT STOCK TESTS
    // ============================================

    describe('getCurrentStock', () => {
        it('should return current stock with correct calculations', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);

            const result = await getCurrentStock(mockRequest);

            expect(result.total_items).toBe(4);
            expect(result.total_value).toBe(expectedTotalStockValue);
            expect(result.low_stock_count).toBe(expectedLowStockCount);
            expect(result.out_of_stock_count).toBe(expectedOutOfStockCount);
        });

        it('should correctly identify stock status', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);

            const result = await getCurrentStock(mockRequest);

            const normalItem = result.items.find(i => i.name === 'Beras');
            const lowItem = result.items.find(i => i.name === 'Gula');
            const outItem = result.items.find(i => i.name === 'Minyak');

            expect(normalItem!.status).toBe('NORMAL');
            expect(lowItem!.status).toBe('LOW');
            expect(outItem!.status).toBe('OUT');
        });

        it('should handle empty ingredients', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue([]);

            const result = await getCurrentStock(mockRequest);

            expect(result.total_items).toBe(0);
            expect(result.total_value).toBe(0);
        });
    });

    // ============================================
    // GET MOVEMENT SUMMARY TESTS
    // ============================================

    describe('getMovementSummary', () => {
        it('should calculate movement totals by type', async () => {
            (reportInventoryRepository.getStockMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockAllStockMovements);

            const result = await getMovementSummary(mockRequest);

            expect(result.total_in.qty).toBe(expectedTotalInQty);
            expect(result.total_in.value).toBe(expectedTotalInValue);
        });

        it('should calculate shrinkage correctly', async () => {
            (reportInventoryRepository.getStockMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockAllStockMovements);

            const result = await getMovementSummary(mockRequest);

            expect(result.shrinkage.damaged_qty).toBe(2);
            expect(result.shrinkage.expired_qty).toBe(5);
            expect(result.shrinkage.total_value).toBe(expectedShrinkageValue);
        });

        it('should group by stock type', async () => {
            (reportInventoryRepository.getStockMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockAllStockMovements);

            const result = await getMovementSummary(mockRequest);

            const inPurchase = result.total_in.by_type.find(t => t.stock_type === 'IN_PURCHASE');
            expect(inPurchase).toBeDefined();
            expect(inPurchase!.qty).toBe(50);
        });

        it('should handle empty movements', async () => {
            (reportInventoryRepository.getStockMovementsForPeriod as jest.Mock)
                .mockResolvedValue([]);

            const result = await getMovementSummary(mockRequest);

            expect(result.total_in.qty).toBe(0);
            expect(result.total_out.qty).toBe(0);
        });
    });

    // ============================================
    // GET STOCK ALERTS TESTS
    // ============================================

    describe('getStockAlerts', () => {
        it('should return low and out of stock items', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);
            (reportInventoryRepository.getLastRestockDates as jest.Mock)
                .mockResolvedValue(new Map());

            const result = await getStockAlerts(mockRequest);

            expect(result.total_alerts).toBe(2);
            expect(result.low_stock_items).toHaveLength(expectedLowStockCount);
            expect(result.out_of_stock_items).toHaveLength(expectedOutOfStockCount);
        });

        it('should calculate shortage correctly', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);
            (reportInventoryRepository.getLastRestockDates as jest.Mock)
                .mockResolvedValue(new Map());

            const result = await getStockAlerts(mockRequest);

            // Gula: min_stock(10) - current(3) = 7
            const gulaAlert = result.low_stock_items.find(i => i.name === 'Gula');
            expect(gulaAlert!.shortage).toBe(7);

            // Minyak: min_stock(5) - current(0) = 5
            const minyakAlert = result.out_of_stock_items.find(i => i.name === 'Minyak');
            expect(minyakAlert!.shortage).toBe(5);
        });
    });

    // ============================================
    // GET INVENTORY VALUATION TESTS
    // ============================================

    describe('getInventoryValuation', () => {
        it('should return valuation by ingredient type', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);

            const result = await getInventoryValuation(mockRequest);

            expect(result.total_items).toBe(4);
            expect(result.total_value).toBe(expectedTotalStockValue);
            expect(result.by_ingredient_type.length).toBeGreaterThan(0);
        });

        it('should return top value items', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);

            const result = await getInventoryValuation(mockRequest);

            expect(result.top_value_items.length).toBeGreaterThan(0);
            // First item should be highest value (Beras: 50 * 15000 = 750000)
            expect(result.top_value_items[0].name).toBe('Beras');
        });
    });

    // ============================================
    // GET OPNAME HISTORY TESTS
    // ============================================

    describe('getOpnameHistory', () => {
        it('should return opname history', async () => {
            (reportInventoryRepository.getStockOpnamesForPeriod as jest.Mock)
                .mockResolvedValue(mockStockOpnames);

            const result = await getOpnameHistory(mockRequest);

            expect(result.total_opnames).toBe(1);
            expect(result.opnames[0].total_items).toBe(2);
            expect(result.opnames[0].total_difference).toBe(-2);
        });

        it('should handle empty opnames', async () => {
            (reportInventoryRepository.getStockOpnamesForPeriod as jest.Mock)
                .mockResolvedValue([]);

            const result = await getOpnameHistory(mockRequest);

            expect(result.total_opnames).toBe(0);
            expect(result.opnames).toHaveLength(0);
        });
    });

    // ============================================
    // GET INGREDIENT CARD TESTS
    // ============================================

    describe('getIngredientCard', () => {
        it('should return ingredient movement card', async () => {
            const cardRequest = {
                query: {
                    ingredient_id: 'ing-001',
                    start_date: '2026-01-01',
                    end_date: '2026-01-31',
                },
            } as unknown as AuthenticatedRequest;

            (reportInventoryRepository.getIngredientMovements as jest.Mock)
                .mockResolvedValue(mockIngredientMovementsData);

            const result = await getIngredientCard(cardRequest);

            expect(result).not.toBeNull();
            expect(result!.ingredient.name).toBe('Beras');
            expect(result!.movements.length).toBe(2);
            expect(result!.opening_balance).toBe(0);
        });

        it('should calculate running balance', async () => {
            const cardRequest = {
                query: {
                    ingredient_id: 'ing-001',
                    start_date: '2026-01-01',
                    end_date: '2026-01-31',
                },
            } as unknown as AuthenticatedRequest;

            (reportInventoryRepository.getIngredientMovements as jest.Mock)
                .mockResolvedValue(mockIngredientMovementsData);

            const result = await getIngredientCard(cardRequest);

            expect(result!.total_in).toBe(50);
            expect(result!.total_out).toBe(10);
            expect(result!.closing_balance).toBe(40);
        });

        it('should return null if ingredient not found', async () => {
            const cardRequest = {
                query: {
                    ingredient_id: 'ing-999',
                    start_date: '2026-01-01',
                    end_date: '2026-01-31',
                },
            } as unknown as AuthenticatedRequest;

            (reportInventoryRepository.getIngredientMovements as jest.Mock)
                .mockResolvedValue(null);

            const result = await getIngredientCard(cardRequest);

            expect(result).toBeNull();
        });
    });

    // ============================================
    // GET FULL REPORT TESTS
    // ============================================

    describe('getFullReport', () => {
        it('should combine all reports', async () => {
            (reportInventoryRepository.getAllIngredientsWithStatus as jest.Mock)
                .mockResolvedValue(mockAllIngredients);
            (reportInventoryRepository.getStockMovementsForPeriod as jest.Mock)
                .mockResolvedValue(mockAllStockMovements);
            (reportInventoryRepository.getLastRestockDates as jest.Mock)
                .mockResolvedValue(new Map());

            const result = await getFullReport(mockRequest);

            expect(result.current_stock).toBeDefined();
            expect(result.movement_summary).toBeDefined();
            expect(result.alerts).toBeDefined();
            expect(result.top_value_items).toBeDefined();

            expect(result.current_stock.total_items).toBe(4);
            expect(result.alerts.low_stock_count).toBe(expectedLowStockCount);
            expect(result.alerts.out_of_stock_count).toBe(expectedOutOfStockCount);
        });
    });
});
