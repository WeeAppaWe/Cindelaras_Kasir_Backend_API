"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockInventoryRequest = exports.mockStockOutData = exports.mockStockInData = exports.mockStockMovements = exports.mockStockMovementOut = exports.mockStockMovementIn = exports.mockSupplierForInventory = exports.mockIngredientForInventory = exports.mockStockTypes = exports.mockStockTypeOut = exports.mockStockTypeIn = void 0;
// ============================================
// STOCK TYPE MOCK DATA
// ============================================
exports.mockStockTypeIn = {
    stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440001',
    name: 'IN',
};
exports.mockStockTypeOut = {
    stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440002',
    name: 'OUT',
};
exports.mockStockTypes = [exports.mockStockTypeIn, exports.mockStockTypeOut];
// ============================================
// INGREDIENT MOCK FOR INVENTORY
// ============================================
exports.mockIngredientForInventory = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    name: 'Beras',
    stock_qty: 100,
    avg_cost: 12000,
    unit: {
        unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440001',
        name: 'Kilogram',
    },
};
// ============================================
// SUPPLIER MOCK FOR INVENTORY
// ============================================
exports.mockSupplierForInventory = {
    supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
    name: 'PT Supplier Beras',
};
// ============================================
// STOCK MOVEMENT MOCK DATA
// ============================================
exports.mockStockMovementIn = {
    stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440001',
    supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
    stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440001',
    qty: 50,
    unit_cost: 11000,
    current_stock: 150,
    notes: 'Pembelian dari supplier',
    created_at: new Date('2024-01-15'),
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        name: 'Beras',
        unit: {
            unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440001',
            name: 'Kilogram',
        },
    },
    supplier: {
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        name: 'PT Supplier Beras',
    },
    stock_type: {
        stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440001',
        name: 'IN',
    },
    user: {
        user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
        name: 'Admin User',
    },
};
exports.mockStockMovementOut = {
    stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440002',
    supplier_id: null,
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
    stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440002',
    qty: -5,
    unit_cost: null,
    current_stock: 145,
    notes: '[Rusak] Beras basah terkena air',
    created_at: new Date('2024-01-16'),
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        name: 'Beras',
        unit: {
            unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440001',
            name: 'Kilogram',
        },
    },
    supplier: null,
    stock_type: {
        stock_type_id: 'aa0e8400-e29b-41d4-a716-446655440002',
        name: 'OUT',
    },
    user: {
        user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
        name: 'Admin User',
    },
};
exports.mockStockMovements = [
    exports.mockStockMovementIn,
    exports.mockStockMovementOut,
];
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockStockInData = {
    valid: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        qty: 50,
        unit_cost: 11000,
        notes: 'Pembelian dari supplier',
    },
    invalidIngredientId: {
        ingredient_id: 'invalid-uuid',
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        qty: 50,
        unit_cost: 11000,
    },
    invalidSupplierId: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        supplier_id: 'invalid-uuid',
        qty: 50,
        unit_cost: 11000,
    },
    zeroQty: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        qty: 0,
        unit_cost: 11000,
    },
    negativeQty: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        qty: -10,
        unit_cost: 11000,
    },
    negativeUnitCost: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        supplier_id: 'dd0e8400-e29b-41d4-a716-446655440001',
        qty: 50,
        unit_cost: -1000,
    },
};
exports.mockStockOutData = {
    valid: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        qty: 5,
        reason: 'DAMAGED',
        notes: 'Beras basah terkena air',
    },
    validExpired: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        qty: 3,
        reason: 'EXPIRED',
    },
    validOther: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        qty: 2,
        reason: 'OTHER',
        notes: 'Hilang',
    },
    invalidReason: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        qty: 5,
        reason: 'INVALID_REASON',
    },
    zeroQty: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        qty: 0,
        reason: 'DAMAGED',
    },
};
// ============================================
// REQUEST MOCK HELPERS
// ============================================
const createMockInventoryRequest = (overrides) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
    user: overrides.user || { user_id: 'ff0e8400-e29b-41d4-a716-446655440001', name: 'Admin' },
});
exports.createMockInventoryRequest = createMockInventoryRequest;
//# sourceMappingURL=inventory.mock.js.map