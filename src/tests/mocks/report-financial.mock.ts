/**
 * Mock data for Financial Report tests
 */

// ============================================
// MOCK ORDERS WITH DETAILS
// ============================================

export const mockReportUser = {
    user_id: 'user-cashier-001',
    name: 'Kasir Demo',
};

export const mockReportShift = {
    shift_id: 'shift-001',
    user_id: 'user-cashier-001',
    start_time: new Date('2026-01-01T08:00:00Z'),
    end_time: new Date('2026-01-01T16:00:00Z'),
    start_cash: 500000,
    end_cash: 1500000,
    sold_total: 1000000,
    user: mockReportUser,
    cash_movements: [],
};

export const mockCategory = {
    category_id: 'cat-001',
    name: 'Makanan',
};

export const mockCategory2 = {
    category_id: 'cat-002',
    name: 'Minuman',
};

export const mockIngredient = {
    ingredient_id: 'ing-001',
    name: 'Beras',
    avg_cost: 100,
};

export const mockRecipe = {
    recipe_id: 'recipe-001',
    ingredient_id: 'ing-001',
    qty_needed: 100, // 100 * 100 = 10000 cost per menu
    ingredient: mockIngredient,
};

export const mockMenu1 = {
    menu_id: 'menu-001',
    name: 'Nasi Goreng',
    category_id: 'cat-001',
    category: mockCategory,
    recipes: [mockRecipe],
};

export const mockMenu2 = {
    menu_id: 'menu-002',
    name: 'Es Teh',
    category_id: 'cat-002',
    category: mockCategory2,
    recipes: [],
};

export const mockOrderItem1 = {
    order_item_id: 'item-001',
    menu_id: 'menu-001',
    qty: 2,
    price: 25000,
    subtotal: 50000,
    menu: mockMenu1,
};

export const mockOrderItem2 = {
    order_item_id: 'item-002',
    menu_id: 'menu-002',
    qty: 3,
    price: 10000,
    subtotal: 30000,
    menu: mockMenu2,
};

// Order 1: COMPLETED, CASH
export const mockCompletedOrderCash = {
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
    user: mockReportUser,
    order_items: [mockOrderItem1, mockOrderItem2],
};

// Order 2: COMPLETED, QRIS
export const mockCompletedOrderQris = {
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
    user: mockReportUser,
    order_items: [{ ...mockOrderItem1, order_item_id: 'item-003' }],
};

// Order 3: COMPLETED, CASH
export const mockCompletedOrderCash2 = {
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
    user: mockReportUser,
    order_items: [{ ...mockOrderItem2, order_item_id: 'item-004' }],
};

// All completed orders for period
export const mockCompletedOrders = [
    mockCompletedOrderCash,
    mockCompletedOrderQris,
    mockCompletedOrderCash2,
];

// ============================================
// MOCK CASH MOVEMENTS
// ============================================

export const mockCashMovementIn = {
    cash_movement_id: 'cm-001',
    shift_id: 'shift-001',
    type: 'IN',
    amount: 100000,
    notes: 'Setor kas',
    created_at: new Date('2026-01-01T09:00:00Z'),
};

export const mockCashMovementOut = {
    cash_movement_id: 'cm-002',
    shift_id: 'shift-001',
    type: 'OUT',
    amount: 50000,
    notes: 'Ambil kas',
    created_at: new Date('2026-01-01T12:00:00Z'),
};

export const mockCashMovements = [mockCashMovementIn, mockCashMovementOut];

// ============================================
// MOCK SHIFTS
// ============================================

export const mockShifts = [mockReportShift];

// ============================================
// MOCK AGGREGATED DATA
// ============================================

export const mockAggregatedByMenu = [
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

export const mockAggregatedByCategory = [
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
export const expectedTotalSales = 160000;

// COGS: Order1 (2 * 10000) + Order2 (2 * 10000) + Order3 (0) = 40000
export const expectedTotalCOGS = 40000;

// Cash sales: Order1 (80000) + Order3 (30000) = 110000
export const expectedCashSales = 110000;

// QRIS sales: Order2 (50000) = 50000
export const expectedQrisSales = 50000;
