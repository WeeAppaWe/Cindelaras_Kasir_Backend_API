"use strict";
/**
 * Mock data for Operational Report tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedActiveShifts = exports.expectedClosedShifts = exports.expectedCashier1Cancelled = exports.expectedCashier1Completed = exports.expectedCashier1Transactions = exports.expectedTotalSales = exports.expectedTotalCompletedOrders = exports.mockMenuPerformanceData = exports.mockUserOrdersAndShifts = exports.mockAllOrders = exports.mockOrderCompleted3 = exports.mockOrderCancelled = exports.mockOrderCompleted2 = exports.mockOrderCompleted1 = exports.mockShiftsWithOrders = exports.mockShift2 = exports.mockShift1 = exports.mockCashier2 = exports.mockCashier1 = void 0;
// ============================================
// MOCK USERS
// ============================================
exports.mockCashier1 = {
    user_id: 'user-001',
    name: 'Kasir Satu',
};
exports.mockCashier2 = {
    user_id: 'user-002',
    name: 'Kasir Dua',
};
// ============================================
// MOCK SHIFTS
// ============================================
exports.mockShift1 = {
    shift_id: 'shift-001',
    user_id: 'user-001',
    start_time: new Date('2026-01-01T08:00:00Z'),
    end_time: new Date('2026-01-01T16:00:00Z'),
    start_cash: 500000,
    end_cash: 1200000,
    sold_total: 700000,
    deleted_at: null,
    user: exports.mockCashier1,
    orders: [
        { order_id: 'order-001', status: 'COMPLETED', total_amount: 80000 },
        { order_id: 'order-002', status: 'COMPLETED', total_amount: 50000 },
    ],
    cash_movements: [
        { cash_movement_id: 'cm-001', type: 'IN', amount: 100000 },
    ],
};
exports.mockShift2 = {
    shift_id: 'shift-002',
    user_id: 'user-002',
    start_time: new Date('2026-01-01T16:00:00Z'),
    end_time: null, // Active shift
    start_cash: 600000,
    end_cash: null,
    sold_total: null,
    deleted_at: null,
    user: exports.mockCashier2,
    orders: [
        { order_id: 'order-003', status: 'COMPLETED', total_amount: 30000 },
    ],
    cash_movements: [],
};
exports.mockShiftsWithOrders = [exports.mockShift1, exports.mockShift2];
// ============================================
// MOCK ORDERS FOR OPERATIONAL
// ============================================
exports.mockOrderCompleted1 = {
    order_id: 'order-001',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer A',
    total_amount: 80000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T10:00:00Z'),
    user: exports.mockCashier1,
    order_items: [],
};
exports.mockOrderCompleted2 = {
    order_id: 'order-002',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer B',
    total_amount: 50000,
    payment_type: 'QRIS',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T11:30:00Z'),
    user: exports.mockCashier1,
    order_items: [],
};
exports.mockOrderCancelled = {
    order_id: 'order-003',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer C',
    total_amount: 25000,
    payment_type: 'CASH',
    status: 'CANCELLED',
    created_at: new Date('2026-01-01T12:00:00Z'),
    user: exports.mockCashier1,
    order_items: [],
};
exports.mockOrderCompleted3 = {
    order_id: 'order-004',
    shift_id: 'shift-002',
    user_id: 'user-002',
    customer_name: 'Customer D',
    total_amount: 30000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T17:00:00Z'),
    user: exports.mockCashier2,
    order_items: [],
};
exports.mockAllOrders = [
    exports.mockOrderCompleted1,
    exports.mockOrderCompleted2,
    exports.mockOrderCancelled,
    exports.mockOrderCompleted3,
];
// ============================================
// MOCK USER STATS DATA
// ============================================
exports.mockUserOrdersAndShifts = {
    orders: exports.mockAllOrders,
    shifts: [
        { shift_id: 'shift-001', user_id: 'user-001' },
        { shift_id: 'shift-002', user_id: 'user-002' },
    ],
};
// ============================================
// MOCK MENU PERFORMANCE DATA
// ============================================
exports.mockMenuPerformanceData = [
    {
        menu_id: 'menu-001',
        name: 'Nasi Goreng',
        category: 'Makanan',
        qty_sold: 10,
        revenue: 250000,
        cost: 100000,
    },
    {
        menu_id: 'menu-002',
        name: 'Es Teh',
        category: 'Minuman',
        qty_sold: 15,
        revenue: 75000,
        cost: 15000,
    },
];
// ============================================
// EXPECTED VALUES
// ============================================
// Total completed orders: 3 (80000 + 50000 + 30000 = 160000)
exports.expectedTotalCompletedOrders = 3;
exports.expectedTotalSales = 160000;
// Cashier 1: 2 completed, 1 cancelled
exports.expectedCashier1Transactions = 3;
exports.expectedCashier1Completed = 2;
exports.expectedCashier1Cancelled = 1;
// Shifts: 1 closed, 1 active
exports.expectedClosedShifts = 1;
exports.expectedActiveShifts = 1;
//# sourceMappingURL=report-operational.mock.js.map