"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockBulkRecipeData = exports.mockCreateRecipeData = exports.mockUpdateMenuData = exports.mockCreateMenuData = exports.mockRecipes = exports.mockRecipe2 = exports.mockRecipe = exports.mockIngredient2 = exports.mockIngredient = exports.mockMenus = exports.mockMenuWithDetails = exports.mockMenuInactive = exports.mockMenu2 = exports.mockMenu = void 0;
const category_mock_1 = require("./category.mock");
// ============================================
// MENU MOCK DATA
// ============================================
exports.mockMenu = {
    menu_id: '990e8400-e29b-41d4-a716-446655440001',
    name: 'Nasi Goreng',
    price: 15000,
    cost: 5000,
    description: 'Nasi goreng spesial dengan telur',
    image_url: 'https://example.com/nasi-goreng.jpg',
    is_available: true,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    category: category_mock_1.mockCategory,
};
exports.mockMenu2 = {
    menu_id: '990e8400-e29b-41d4-a716-446655440002',
    name: 'Es Teh Manis',
    price: 5000,
    cost: 1500,
    description: 'Es teh manis segar',
    image_url: null,
    is_available: true,
    created_at: new Date('2024-01-02'),
    updated_at: null,
    category: category_mock_1.mockCategory2,
};
exports.mockMenuInactive = {
    menu_id: '990e8400-e29b-41d4-a716-446655440003',
    name: 'Mie Goreng',
    price: 12000,
    cost: 4000,
    description: null,
    image_url: null,
    is_available: false,
    created_at: new Date('2024-01-03'),
    updated_at: null,
    category: category_mock_1.mockCategory,
};
exports.mockMenuWithDetails = {
    ...exports.mockMenu,
    _count: { recipes: 3 },
    margin_percent: 66.67,
    profit: 10000,
};
exports.mockMenus = [exports.mockMenu, exports.mockMenu2, exports.mockMenuInactive];
// ============================================
// RECIPE MOCK DATA
// ============================================
exports.mockIngredient = {
    ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
    name: 'Beras Premium',
    stock_qty: 10000,
    avg_cost: 15,
    unit: {
        unit_measure_id: 'bbb08400-e29b-41d4-a716-446655440001',
        name: 'Gram',
    },
};
exports.mockIngredient2 = {
    ingredient_id: 'aaa08400-e29b-41d4-a716-446655440002',
    name: 'Telur Ayam',
    stock_qty: 100,
    avg_cost: 2000,
    unit: {
        unit_measure_id: 'bbb08400-e29b-41d4-a716-446655440002',
        name: 'Butir',
    },
};
exports.mockRecipe = {
    menu_recipe_id: 'ccc08400-e29b-41d4-a716-446655440001',
    menu_id: exports.mockMenu.menu_id,
    ingredient_id: exports.mockIngredient.ingredient_id,
    qty_needed: 200,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    ingredient: exports.mockIngredient,
    subtotal: 3000, // 200 * 15
};
exports.mockRecipe2 = {
    menu_recipe_id: 'ccc08400-e29b-41d4-a716-446655440002',
    menu_id: exports.mockMenu.menu_id,
    ingredient_id: exports.mockIngredient2.ingredient_id,
    qty_needed: 1,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    ingredient: exports.mockIngredient2,
    subtotal: 2000, // 1 * 2000
};
exports.mockRecipes = [exports.mockRecipe, exports.mockRecipe2];
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockCreateMenuData = {
    valid: {
        name: 'Ayam Goreng',
        category_id: '880e8400-e29b-41d4-a716-446655440001',
        price: 20000,
    },
    withOptionals: {
        name: 'Ayam Bakar',
        category_id: '880e8400-e29b-41d4-a716-446655440001',
        price: 25000,
        description: 'Ayam bakar dengan bumbu special',
        image_url: 'https://example.com/ayam.jpg',
        is_available: true,
    },
};
exports.mockUpdateMenuData = {
    valid: {
        name: 'Nasi Goreng Special',
    },
    withPrice: {
        price: 18000,
    },
};
exports.mockCreateRecipeData = {
    valid: {
        ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
        qty_needed: 100,
    },
};
exports.mockBulkRecipeData = {
    valid: {
        recipes: [
            { ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001', qty_needed: 200 },
            { ingredient_id: 'aaa08400-e29b-41d4-a716-446655440002', qty_needed: 2 },
        ],
    },
};
//# sourceMappingURL=menu.mock.js.map