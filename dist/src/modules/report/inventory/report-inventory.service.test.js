"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_inventory_service_1 = require("./report-inventory.service");
const report_inventory_repository_1 = __importDefault(require("./report-inventory.repository"));
const report_inventory_mock_1 = require("../../../tests/mocks/report-inventory.mock");
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
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ============================================
    // GET CURRENT STOCK TESTS
    // ============================================
    describe('getCurrentStock', () => {
        it('should return current stock with correct calculations', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            const result = await (0, report_inventory_service_1.getCurrentStock)(mockRequest);
            expect(result.total_items).toBe(4);
            expect(result.total_value).toBe(report_inventory_mock_1.expectedTotalStockValue);
            expect(result.low_stock_count).toBe(report_inventory_mock_1.expectedLowStockCount);
            expect(result.out_of_stock_count).toBe(report_inventory_mock_1.expectedOutOfStockCount);
        });
        it('should correctly identify stock status', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            const result = await (0, report_inventory_service_1.getCurrentStock)(mockRequest);
            const normalItem = result.items.find(i => i.name === 'Beras');
            const lowItem = result.items.find(i => i.name === 'Gula');
            const outItem = result.items.find(i => i.name === 'Minyak');
            expect(normalItem.status).toBe('NORMAL');
            expect(lowItem.status).toBe('LOW');
            expect(outItem.status).toBe('OUT');
        });
        it('should handle empty ingredients', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue([]);
            const result = await (0, report_inventory_service_1.getCurrentStock)(mockRequest);
            expect(result.total_items).toBe(0);
            expect(result.total_value).toBe(0);
        });
    });
    // ============================================
    // GET MOVEMENT SUMMARY TESTS
    // ============================================
    describe('getMovementSummary', () => {
        it('should calculate movement totals by type', async () => {
            report_inventory_repository_1.default.getStockMovementsForPeriod
                .mockResolvedValue(report_inventory_mock_1.mockAllStockMovements);
            const result = await (0, report_inventory_service_1.getMovementSummary)(mockRequest);
            expect(result.total_in.qty).toBe(report_inventory_mock_1.expectedTotalInQty);
            expect(result.total_in.value).toBe(report_inventory_mock_1.expectedTotalInValue);
        });
        it('should calculate shrinkage correctly', async () => {
            report_inventory_repository_1.default.getStockMovementsForPeriod
                .mockResolvedValue(report_inventory_mock_1.mockAllStockMovements);
            const result = await (0, report_inventory_service_1.getMovementSummary)(mockRequest);
            expect(result.shrinkage.damaged_qty).toBe(2);
            expect(result.shrinkage.expired_qty).toBe(5);
            expect(result.shrinkage.total_value).toBe(report_inventory_mock_1.expectedShrinkageValue);
        });
        it('should group by stock type', async () => {
            report_inventory_repository_1.default.getStockMovementsForPeriod
                .mockResolvedValue(report_inventory_mock_1.mockAllStockMovements);
            const result = await (0, report_inventory_service_1.getMovementSummary)(mockRequest);
            const inPurchase = result.total_in.by_type.find(t => t.stock_type === 'IN_PURCHASE');
            expect(inPurchase).toBeDefined();
            expect(inPurchase.qty).toBe(50);
        });
        it('should handle empty movements', async () => {
            report_inventory_repository_1.default.getStockMovementsForPeriod
                .mockResolvedValue([]);
            const result = await (0, report_inventory_service_1.getMovementSummary)(mockRequest);
            expect(result.total_in.qty).toBe(0);
            expect(result.total_out.qty).toBe(0);
        });
    });
    // ============================================
    // GET STOCK ALERTS TESTS
    // ============================================
    describe('getStockAlerts', () => {
        it('should return low and out of stock items', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            report_inventory_repository_1.default.getLastRestockDates
                .mockResolvedValue(new Map());
            const result = await (0, report_inventory_service_1.getStockAlerts)(mockRequest);
            expect(result.total_alerts).toBe(2);
            expect(result.low_stock_items).toHaveLength(report_inventory_mock_1.expectedLowStockCount);
            expect(result.out_of_stock_items).toHaveLength(report_inventory_mock_1.expectedOutOfStockCount);
        });
        it('should calculate shortage correctly', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            report_inventory_repository_1.default.getLastRestockDates
                .mockResolvedValue(new Map());
            const result = await (0, report_inventory_service_1.getStockAlerts)(mockRequest);
            // Gula: min_stock(10) - current(3) = 7
            const gulaAlert = result.low_stock_items.find(i => i.name === 'Gula');
            expect(gulaAlert.shortage).toBe(7);
            // Minyak: min_stock(5) - current(0) = 5
            const minyakAlert = result.out_of_stock_items.find(i => i.name === 'Minyak');
            expect(minyakAlert.shortage).toBe(5);
        });
    });
    // ============================================
    // GET INVENTORY VALUATION TESTS
    // ============================================
    describe('getInventoryValuation', () => {
        it('should return valuation by ingredient type', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            const result = await (0, report_inventory_service_1.getInventoryValuation)(mockRequest);
            expect(result.total_items).toBe(4);
            expect(result.total_value).toBe(report_inventory_mock_1.expectedTotalStockValue);
            expect(result.by_ingredient_type.length).toBeGreaterThan(0);
        });
        it('should return top value items', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            const result = await (0, report_inventory_service_1.getInventoryValuation)(mockRequest);
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
            report_inventory_repository_1.default.getStockOpnamesForPeriod
                .mockResolvedValue(report_inventory_mock_1.mockStockOpnames);
            const result = await (0, report_inventory_service_1.getOpnameHistory)(mockRequest);
            expect(result.total_opnames).toBe(1);
            expect(result.opnames[0].total_items).toBe(2);
            expect(result.opnames[0].total_difference).toBe(-2);
        });
        it('should handle empty opnames', async () => {
            report_inventory_repository_1.default.getStockOpnamesForPeriod
                .mockResolvedValue([]);
            const result = await (0, report_inventory_service_1.getOpnameHistory)(mockRequest);
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
            };
            report_inventory_repository_1.default.getIngredientMovements
                .mockResolvedValue(report_inventory_mock_1.mockIngredientMovementsData);
            const result = await (0, report_inventory_service_1.getIngredientCard)(cardRequest);
            expect(result).not.toBeNull();
            expect(result.ingredient.name).toBe('Beras');
            expect(result.movements.length).toBe(2);
            expect(result.opening_balance).toBe(0);
        });
        it('should calculate running balance', async () => {
            const cardRequest = {
                query: {
                    ingredient_id: 'ing-001',
                    start_date: '2026-01-01',
                    end_date: '2026-01-31',
                },
            };
            report_inventory_repository_1.default.getIngredientMovements
                .mockResolvedValue(report_inventory_mock_1.mockIngredientMovementsData);
            const result = await (0, report_inventory_service_1.getIngredientCard)(cardRequest);
            expect(result.total_in).toBe(50);
            expect(result.total_out).toBe(10);
            expect(result.closing_balance).toBe(40);
        });
        it('should return null if ingredient not found', async () => {
            const cardRequest = {
                query: {
                    ingredient_id: 'ing-999',
                    start_date: '2026-01-01',
                    end_date: '2026-01-31',
                },
            };
            report_inventory_repository_1.default.getIngredientMovements
                .mockResolvedValue(null);
            const result = await (0, report_inventory_service_1.getIngredientCard)(cardRequest);
            expect(result).toBeNull();
        });
    });
    // ============================================
    // GET FULL REPORT TESTS
    // ============================================
    describe('getFullReport', () => {
        it('should combine all reports', async () => {
            report_inventory_repository_1.default.getAllIngredientsWithStatus
                .mockResolvedValue(report_inventory_mock_1.mockAllIngredients);
            report_inventory_repository_1.default.getStockMovementsForPeriod
                .mockResolvedValue(report_inventory_mock_1.mockAllStockMovements);
            report_inventory_repository_1.default.getLastRestockDates
                .mockResolvedValue(new Map());
            const result = await (0, report_inventory_service_1.getFullReport)(mockRequest);
            expect(result.current_stock).toBeDefined();
            expect(result.movement_summary).toBeDefined();
            expect(result.alerts).toBeDefined();
            expect(result.top_value_items).toBeDefined();
            expect(result.current_stock.total_items).toBe(4);
            expect(result.alerts.low_stock_count).toBe(report_inventory_mock_1.expectedLowStockCount);
            expect(result.alerts.out_of_stock_count).toBe(report_inventory_mock_1.expectedOutOfStockCount);
        });
    });
});
//# sourceMappingURL=report-inventory.service.test.js.map