"use strict";
/**
 * Mock data for Financial Report tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedQrisSales = exports.expectedCashSales = exports.expectedTotalCOGS = exports.expectedTotalSales = exports.mockAggregatedByCategory = exports.mockAggregatedByMenu = exports.mockShifts = exports.mockCashMovements = exports.mockCashMovementOut = exports.mockCashMovementIn = exports.mockCompletedOrders = exports.mockCompletedOrderCash2 = exports.mockCompletedOrderQris = exports.mockCompletedOrderCash = exports.mockOrderItem2 = exports.mockOrderItem1 = exports.mockMenu2 = exports.mockMenu1 = exports.mockRecipe = exports.mockIngredient = exports.mockCategory2 = exports.mockCategory = exports.mockReportShift = exports.mockReportUser = void 0;
// ============================================
// MOCK ORDERS WITH DETAILS
// ============================================
exports.mockReportUser = {
    user_id: 'user-cashier-001',
    name: 'Kasir Demo',
};
exports.mockReportShift = {
    shift_id: 'shift-001',
    user_id: 'user-cashier-001',
    start_time: new Date('2026-01-01T08:00:00Z'),
    end_time: new Date('2026-01-01T16:00:00Z'),
    start_cash: 500000,
    end_cash: 1500000,
    sold_total: 1000000,
    user: exports.mockReportUser,
    cash_movements: [],
};
exports.mockCategory = {
    category_id: 'cat-001',
    name: 'Makanan',
};
exports.mockCategory2 = {
    category_id: 'cat-002',
    name: 'Minuman',
};
exports.mockIngredient = {
    ingredient_id: 'ing-001',
    name: 'Beras',
    avg_cost: 100,
};
exports.mockRecipe = {
    recipe_id: 'recipe-001',
    ingredient_id: 'ing-001',
    qty_needed: 100, // 100 * 100 = 10000 cost per menu
    ingredient: exports.mockIngredient,
};
exports.mockMenu1 = {
    menu_id: 'menu-001',
    name: 'Nasi Goreng',
    category_id: 'cat-001',
    category: exports.mockCategory,
    recipes: [exports.mockRecipe],
};
exports.mockMenu2 = {
    menu_id: 'menu-002',
    name: 'Es Teh',
    category_id: 'cat-002',
    category: exports.mockCategory2,
    recipes: [],
};
exports.mockOrderItem1 = {
    order_item_id: 'item-001',
    menu_id: 'menu-001',
    qty: 2,
    price: 25000,
    subtotal: 50000,
    menu: exports.mockMenu1,
};
exports.mockOrderItem2 = {
    order_item_id: 'item-002',
    menu_id: 'menu-002',
    qty: 3,
    price: 10000,
    subtotal: 30000,
    menu: exports.mockMenu2,
};
// Order 1: COMPLETED, CASH
exports.mockCompletedOrderCash = {
    order_id: 'order-001',
    shift_id: 'shift-001',
    user_id: 'user-cashier-001',
    customer_name: 'Customer A',
    total_amount: 80000, // 50000 + 30000
    paid_amount: 100000,
    change_amount: 20000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T10:00:00Z'),
    updated_at: new Date('2026-01-01T10:05:00Z'),
    user: exports.mockReportUser,
    order_items: [exports.mockOrderItem1, exports.mockOrderItem2],
};
// Order 2: COMPLETED, QRIS
exports.mockCompletedOrderQris = {
    order_id: 'order-002',
    shift_id: 'shift-001',
    user_id: 'user-cashier-001',
    customer_name: 'Customer B',
    total_amount: 50000,
    paid_amount: 50000,
    change_amount: 0,
    payment_type: 'QRIS',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T11:00:00Z'),
    updated_at: new Date('2026-01-01T11:02:00Z'),
    user: exports.mockReportUser,
    order_items: [{ ...exports.mockOrderItem1, order_item_id: 'item-003' }],
};
// Order 3: COMPLETED, CASH
exports.mockCompletedOrderCash2 = {
    order_id: 'order-003',
    shift_id: 'shift-001',
    user_id: 'user-cashier-001',
    customer_name: 'Customer C',
    total_amount: 30000,
    paid_amount: 50000,
    change_amount: 20000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T14:00:00Z'),
    updated_at: new Date('2026-01-01T14:02:00Z'),
    user: exports.mockReportUser,
    order_items: [{ ...exports.mockOrderItem2, order_item_id: 'item-004' }],
};
// All completed orders for period
exports.mockCompletedOrders = [
    exports.mockCompletedOrderCash,
    exports.mockCompletedOrderQris,
    exports.mockCompletedOrderCash2,
];
// ============================================
// MOCK CASH MOVEMENTS
// ============================================
exports.mockCashMovementIn = {
    cash_movement_id: 'cm-001',
    shift_id: 'shift-001',
    type: 'IN',
    amount: 100000,
    notes: 'Setor kas',
    created_at: new Date('2026-01-01T09:00:00Z'),
};
exports.mockCashMovementOut = {
    cash_movement_id: 'cm-002',
    shift_id: 'shift-001',
    type: 'OUT',
    amount: 50000,
    notes: 'Ambil kas',
    created_at: new Date('2026-01-01T12:00:00Z'),
};
exports.mockCashMovements = [exports.mockCashMovementIn, exports.mockCashMovementOut];
// ============================================
// MOCK SHIFTS
// ============================================
exports.mockShifts = [exports.mockReportShift];
// ============================================
// MOCK AGGREGATED DATA
// ============================================
exports.mockAggregatedByMenu = [
    {
        menu_id: 'menu-001',
        name: 'Nasi Goreng',
        category: 'Makanan',
        qty_sold: 4, // 2 + 2
        revenue: 100000, // 50000 + 50000
    },
    {
        menu_id: 'menu-002',
        name: 'Es Teh',
        category: 'Minuman',
        qty_sold: 6, // 3 + 3
        revenue: 60000, // 30000 + 30000
    },
];
exports.mockAggregatedByCategory = [
    {
        category_id: 'cat-001',
        category_name: 'Makanan',
        qty_sold: 4,
        revenue: 100000,
    },
    {
        category_id: 'cat-002',
        category_name: 'Minuman',
        qty_sold: 6,
        revenue: 60000,
    },
];
// ============================================
// EXPECTED RESULTS
// ============================================
// Total: 80000 + 50000 + 30000 = 160000
exports.expectedTotalSales = 160000;
// COGS: Order1 (2 * 10000) + Order2 (2 * 10000) + Order3 (0) = 40000
exports.expectedTotalCOGS = 40000;
// Cash sales: Order1 (80000) + Order3 (30000) = 110000
exports.expectedCashSales = 110000;
// QRIS sales: Order2 (50000) = 50000
exports.expectedQrisSales = 50000;
//# sourceMappingURL=report-financial.mock.js.map