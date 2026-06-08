/**
 * Mock data for Inventory Report tests
 */

// ============================================
// MOCK UNIT MEASURES
// ============================================

export const mockUnitKg = {
    unit_measure_id: 'unit-001',
    name: 'Kg',
};

export const mockUnitLiter = {
    unit_measure_id: 'unit-002',
    name: 'Liter',
};

// ============================================
// MOCK INGREDIENTS
// ============================================

export const mockIngredientNormal = {
    ingredient_id: 'ing-001',
    name: 'Beras',
    type: 'raw',
    stock_qty: 50,
    min_stock: 10,
    avg_cost: 15000,
    deleted_at: null,
    unit: mockUnitKg,
};

export const mockIngredientLowStock = {
    ingredient_id: 'ing-002',
    name: 'Gula',
    type: 'raw',
    stock_qty: 3,
    min_stock: 10,
    avg_cost: 12000,
    deleted_at: null,
    unit: mockUnitKg,
};

export const mockIngredientOutOfStock = {
    ingredient_id: 'ing-003',
    name: 'Minyak',
    type: 'raw',
    stock_qty: 0,
    min_stock: 5,
    avg_cost: 20000,
    deleted_at: null,
    unit: mockUnitLiter,
};

export const mockIngredientSemi = {
    ingredient_id: 'ing-004',
    name: 'Bumbu Racik',
    type: 'semi',
    stock_qty: 20,
    min_stock: 5,
    avg_cost: 5000,
    deleted_at: null,
    unit: mockUnitKg,
};

export const mockAllIngredients = [
    mockIngredientNormal,
    mockIngredientLowStock,
    mockIngredientOutOfStock,
    mockIngredientSemi,
];

// ============================================
// MOCK STOCK MOVEMENTS
// ============================================

export const mockStockMovementIn = {
    stock_movement_id: 'sm-001',
    ingredient_id: 'ing-001',
    qty: 50,
    unit_cost: 15000,
    current_stock: 50,
    created_at: new Date('2026-01-01T09:00:00Z'),
    deleted_at: null,
    ingredient: {
        ingredient_id: 'ing-001',
        name: 'Beras',
        type: 'raw',
        avg_cost: 15000,
        unit: { name: 'Kg' },
    },
    stock_type: {
        stock_type_id: 'st-001',
        name: 'IN_PURCHASE',
    },
    supplier: {
        supplier_id: 'sup-001',
        name: 'Supplier A',
    },
    user: {
        user_id: 'user-001',
        name: 'Admin',
    },
};

export const mockStockMovementOutSales = {
    stock_movement_id: 'sm-002',
    ingredient_id: 'ing-001',
    qty: 10,
    unit_cost: 15000,
    current_stock: 40,
    created_at: new Date('2026-01-01T12:00:00Z'),
    deleted_at: null,
    ingredient: {
        ingredient_id: 'ing-001',
        name: 'Beras',
        type: 'raw',
        avg_cost: 15000,
        unit: { name: 'Kg' },
    },
    stock_type: {
        stock_type_id: 'st-002',
        name: 'OUT_SALES',
    },
    supplier: null,
    user: {
        user_id: 'user-001',
        name: 'Admin',
    },
};

export const mockStockMovementDamaged = {
    stock_movement_id: 'sm-003',
    ingredient_id: 'ing-002',
    qty: 2,
    unit_cost: 12000,
    current_stock: 3,
    created_at: new Date('2026-01-01T14:00:00Z'),
    deleted_at: null,
    ingredient: {
        ingredient_id: 'ing-002',
        name: 'Gula',
        type: 'raw',
        avg_cost: 12000,
        unit: { name: 'Kg' },
    },
    stock_type: {
        stock_type_id: 'st-003',
        name: 'OUT_DAMAGED',
    },
    supplier: null,
    user: {
        user_id: 'user-001',
        name: 'Admin',
    },
};

export const mockStockMovementExpired = {
    stock_movement_id: 'sm-004',
    ingredient_id: 'ing-003',
    qty: 5,
    unit_cost: 20000,
    current_stock: 0,
    created_at: new Date('2026-01-01T15:00:00Z'),
    deleted_at: null,
    ingredient: {
        ingredient_id: 'ing-003',
        name: 'Minyak',
        type: 'raw',
        avg_cost: 20000,
        unit: { name: 'Liter' },
    },
    stock_type: {
        stock_type_id: 'st-004',
        name: 'OUT_EXPIRED',
    },
    supplier: null,
    user: {
        user_id: 'user-001',
        name: 'Admin',
    },
};

export const mockAllStockMovements = [
    mockStockMovementIn,
    mockStockMovementOutSales,
    mockStockMovementDamaged,
    mockStockMovementExpired,
];

// ============================================
// MOCK STOCK OPNAMES
// ============================================

export const mockStockOpname = {
    stock_opname_id: 'opname-001',
    opname_date: new Date('2026-01-15T10:00:00Z'),
    status: 'SUBMITTED',
    notes: 'Opname rutin bulanan',
    deleted_at: null,
    user: {
        user_id: 'user-001',
        name: 'Admin',
    },
    items: [
        { stock_opname_item_id: 'item-001', system_qty: 50, physical_qty: 48, difference: -2 },
        { stock_opname_item_id: 'item-002', system_qty: 10, physical_qty: 10, difference: 0 },
    ],
};

export const mockStockOpnames = [mockStockOpname];

// ============================================
// MOCK INGREDIENT MOVEMENTS DATA
// ============================================

export const mockIngredientMovementsData = {
    ingredient: {
        ingredient_id: 'ing-001',
        name: 'Beras',
        type: 'raw',
        unit: { name: 'Kg' },
    },
    movements: [mockStockMovementIn, mockStockMovementOutSales],
    openingBalance: 0,
};

// ============================================
// EXPECTED VALUES
// ============================================

// Total stock value: (50*15000) + (3*12000) + (0*20000) + (20*5000) = 750000 + 36000 + 0 + 100000 = 886000
export const expectedTotalStockValue = 886000;

// Low stock: 1 (Gula)
export const expectedLowStockCount = 1;

// Out of stock: 1 (Minyak)
export const expectedOutOfStockCount = 1;

// Total IN qty: 50
export const expectedTotalInQty = 50;

// Total IN value: 50 * 15000 = 750000
export const expectedTotalInValue = 750000;

// Total OUT qty: 10 + 2 + 5 = 17
export const expectedTotalOutQty = 17;

// Shrinkage (damaged + expired): 2*12000 + 5*20000 = 24000 + 100000 = 124000
export const expectedShrinkageValue = 124000;
