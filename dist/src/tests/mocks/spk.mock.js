"use strict";
/**
 * Mock data for SPK (Smart Purchasing) tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedTelurWMA = exports.expectedBerasWMA = exports.mockSuppliers = exports.mockAllIngredients = exports.mockOrdersWithRecipes = exports.mockOrderItem = exports.mockMenu = exports.mockRecipeTelur = exports.mockRecipeBeras = exports.mockIngredientBumbu = exports.mockIngredientTelur = exports.mockIngredientBeras = exports.mockUnitKg = void 0;
// ============================================
// MOCK ORDERS WITH RECIPES
// ============================================
exports.mockUnitKg = {
    unit_measure_id: 'unit-001',
    name: 'Kg',
};
exports.mockIngredientBeras = {
    ingredient_id: 'ing-001',
    name: 'Beras',
    type: 'raw',
    stock_qty: 15,
    min_stock: 10,
    avg_cost: 15000,
    deleted_at: null,
    unit: exports.mockUnitKg,
};
exports.mockIngredientTelur = {
    ingredient_id: 'ing-002',
    name: 'Telur',
    type: 'raw',
    stock_qty: 50,
    min_stock: 20,
    avg_cost: 2500,
    deleted_at: null,
    unit: { unit_measure_id: 'unit-002', name: 'Butir' },
};
exports.mockIngredientBumbu = {
    ingredient_id: 'ing-003',
    name: 'Bumbu Racik',
    type: 'semi',
    stock_qty: 5,
    min_stock: 5,
    avg_cost: 5000,
    deleted_at: null,
    unit: exports.mockUnitKg,
};
exports.mockRecipeBeras = {
    recipe_id: 'recipe-001',
    menu_id: 'menu-001',
    ingredient_id: 'ing-001',
    qty_needed: 0.2, // 200gr per porsi
    deleted_at: null,
    ingredient: exports.mockIngredientBeras,
};
exports.mockRecipeTelur = {
    recipe_id: 'recipe-002',
    menu_id: 'menu-001',
    ingredient_id: 'ing-002',
    qty_needed: 2, // 2 butir per porsi
    deleted_at: null,
    ingredient: exports.mockIngredientTelur,
};
exports.mockMenu = {
    menu_id: 'menu-001',
    name: 'Nasi Goreng',
    deleted_at: null,
    recipes: [exports.mockRecipeBeras, exports.mockRecipeTelur],
};
exports.mockOrderItem = {
    order_item_id: 'item-001',
    menu_id: 'menu-001',
    qty: 10, // Terjual 10 porsi
    deleted_at: null,
    menu: exports.mockMenu,
};
// Mock orders for 5 days (for WMA calculation)
exports.mockOrdersWithRecipes = [
    {
        order_id: 'order-001',
        created_at: new Date('2026-01-01T10:00:00Z'),
        status: 'COMPLETED',
        deleted_at: null,
        order_items: [{ ...exports.mockOrderItem, qty: 10 }],
    },
    {
        order_id: 'order-002',
        created_at: new Date('2026-01-02T12:00:00Z'),
        status: 'COMPLETED',
        deleted_at: null,
        order_items: [{ ...exports.mockOrderItem, qty: 15 }],
    },
    {
        order_id: 'order-003',
        created_at: new Date('2026-01-03T14:00:00Z'),
        status: 'COMPLETED',
        deleted_at: null,
        order_items: [{ ...exports.mockOrderItem, qty: 20 }],
    },
    {
        order_id: 'order-004',
        created_at: new Date('2026-01-04T16:00:00Z'),
        status: 'COMPLETED',
        deleted_at: null,
        order_items: [{ ...exports.mockOrderItem, qty: 25 }],
    },
    {
        order_id: 'order-005',
        created_at: new Date('2026-01-05T18:00:00Z'),
        status: 'COMPLETED',
        deleted_at: null,
        order_items: [{ ...exports.mockOrderItem, qty: 30 }], // Tren naik
    },
];
// ============================================
// MOCK INGREDIENTS DATA
// ============================================
exports.mockAllIngredients = [
    {
        ingredient_id: 'ing-001',
        name: 'Beras',
        type: 'raw',
        stock_qty: 15, // Current stock
        min_stock: 10,
        avg_cost: 15000,
        unit_name: 'Kg',
    },
    {
        ingredient_id: 'ing-002',
        name: 'Telur',
        type: 'raw',
        stock_qty: 50,
        min_stock: 20,
        avg_cost: 2500,
        unit_name: 'Butir',
    },
    {
        ingredient_id: 'ing-003',
        name: 'Bumbu Racik',
        type: 'semi',
        stock_qty: 5,
        min_stock: 5,
        avg_cost: 5000,
        unit_name: 'Kg',
    },
];
// ============================================
// MOCK SUPPLIERS
// ============================================
exports.mockSuppliers = [
    {
        ingredient_id: 'ing-001',
        supplier_id: 'sup-001',
        supplier_name: 'Toko Beras Makmur',
        supplier_contact: '08123456789',
    },
    {
        ingredient_id: 'ing-002',
        supplier_id: 'sup-002',
        supplier_name: 'Juragan Telur Jaya',
        supplier_contact: '08987654321',
    },
];
// ============================================
// EXPECTED CALCULATIONS
// ============================================
/**
 * Recipe Explosion:
 * - Beras: 0.2kg/porsi
 * - Telur: 2 butir/porsi
 *
 * Penjualan:
 * - Day 1: 10 porsi -> Beras 2kg, Telur 20
 * - Day 2: 15 porsi -> Beras 3kg, Telur 30
 * - Day 3: 20 porsi -> Beras 4kg, Telur 40
 * - Day 4: 25 porsi -> Beras 5kg, Telur 50
 * - Day 5: 30 porsi -> Beras 6kg, Telur 60
 *
 * WMA Calculation (weight = index + 1):
 * Beras: (2*1 + 3*2 + 4*3 + 5*4 + 6*5) / (1+2+3+4+5) = (2+6+12+20+30)/15 = 70/15 = 4.67 kg/hari
 * Telur: (20*1 + 30*2 + 40*3 + 50*4 + 60*5) / 15 = (20+60+120+200+300)/15 = 700/15 = 46.67 butir/hari
 */
exports.expectedBerasWMA = 70 / 15; // ~4.67 kg/day
exports.expectedTelurWMA = 700 / 15; // ~46.67 butir/day
// For 7 days target with 10% buffer:
// Beras: (4.67 * 7) * 1.10 = 35.97 - 15 (current) = 20.97 -> ceil = 21
// Telur: (46.67 * 7) * 1.10 = 359.37 - 50 (current) = 309.37 -> ceil = 310
//# sourceMappingURL=spk.mock.js.map