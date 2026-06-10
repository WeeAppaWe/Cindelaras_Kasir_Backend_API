/**
 * Mock data for Operational Report tests
 */

// ============================================
// MOCK USERS
// ============================================

export const mockCashier1 = {
    user_id: 'user-001',
    name: 'Kasir Satu',
};

export const mockCashier2 = {
    user_id: 'user-002',
    name: 'Kasir Dua',
};

// ============================================
// MOCK SHIFTS
// ============================================

export const mockShift1 = {
    shift_id: 'shift-001',
    user_id: 'user-001',
    start_time: new Date('2026-01-01T08:00:00Z'),
    end_time: new Date('2026-01-01T16:00:00Z'),
    start_cash: 500000,
    end_cash: 1200000,
    sold_total: 700000,
    deleted_at: null,
    user: mockCashier1,
    orders: [
        { order_id: 'order-001', status: 'COMPLETED', total_amount: 80000, payment_type: 'CASH' },
        { order_id: 'order-002', status: 'COMPLETED', total_amount: 50000, payment_type: 'QRIS' },
    ],
    cash_movements: [
        { cash_movement_id: 'cm-001', type: 'IN', amount: 100000 },
    ],
};

export const mockShift2 = {
    shift_id: 'shift-002',
    user_id: 'user-002',
    start_time: new Date('2026-01-01T16:00:00Z'),
    end_time: null, // Active shift
    start_cash: 600000,
    end_cash: null,
    sold_total: null,
    deleted_at: null,
    user: mockCashier2,
    orders: [
        { order_id: 'order-003', status: 'COMPLETED', total_amount: 30000, payment_type: 'CASH' },
    ],
    cash_movements: [],
};

export const mockShiftsWithOrders = [mockShift1, mockShift2];

// ============================================
// MOCK ORDERS FOR OPERATIONAL
// ============================================

export const mockOrderCompleted1 = {
    order_id: 'order-001',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer A',
    total_amount: 80000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T10:00:00Z'),
    user: mockCashier1,
    order_items: [],
};

export const mockOrderCompleted2 = {
    order_id: 'order-002',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer B',
    total_amount: 50000,
    payment_type: 'QRIS',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T11:30:00Z'),
    user: mockCashier1,
    order_items: [],
};

export const mockOrderCancelled = {
    order_id: 'order-003',
    shift_id: 'shift-001',
    user_id: 'user-001',
    customer_name: 'Customer C',
    total_amount: 25000,
    payment_type: 'CASH',
    status: 'CANCELLED',
    created_at: new Date('2026-01-01T12:00:00Z'),
    user: mockCashier1,
    order_items: [],
};

export const mockOrderCompleted3 = {
    order_id: 'order-004',
    shift_id: 'shift-002',
    user_id: 'user-002',
    customer_name: 'Customer D',
    total_amount: 30000,
    payment_type: 'CASH',
    status: 'COMPLETED',
    created_at: new Date('2026-01-01T17:00:00Z'),
    user: mockCashier2,
    order_items: [],
};

export const mockAllOrders = [
    mockOrderCompleted1,
    mockOrderCompleted2,
    mockOrderCancelled,
    mockOrderCompleted3,
];

// ============================================
// MOCK USER STATS DATA
// ============================================

export const mockUserOrdersAndShifts = {
    orders: mockAllOrders,
    shifts: [
        { shift_id: 'shift-001', user_id: 'user-001' },
        { shift_id: 'shift-002', user_id: 'user-002' },
    ],
};

// ============================================
// MOCK MENU PERFORMANCE DATA
// ============================================

export const mockMenuPerformanceData = [
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
export const expectedTotalCompletedOrders = 3;
export const expectedTotalSales = 160000;

// Cashier 1: 2 completed, 1 cancelled
export const expectedCashier1Transactions = 3;
export const expectedCashier1Completed = 2;
export const expectedCashier1Cancelled = 1;

// Shifts: 1 closed, 1 active
export const expectedClosedShifts = 1;
export const expectedActiveShifts = 1;
