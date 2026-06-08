"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockIngredientCosts = exports.mockIngredientWithCompositions = exports.mockComposition2 = exports.mockComposition1 = exports.mockChildIngredient2 = exports.mockChildIngredient1 = exports.mockSemiIngredient2 = exports.mockSemiIngredient = exports.mockLowStockIngredients = exports.mockIngredient2 = exports.mockIngredient = void 0;
const unit_measure_mock_1 = require("./unit-measure.mock");
// RAW INGREDIENTS
exports.mockIngredient = {
    ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Tepung Terigu',
    type: 'RAW',
    stock_qty: 100,
    min_stock: 10,
    avg_cost: 15000,
    created_at: new Date(),
    updated_at: new Date(),
    unit: {
        unit_measure_id: unit_measure_mock_1.mockUnitMeasure.unit_measure_id,
        name: unit_measure_mock_1.mockUnitMeasure.name,
    },
};
exports.mockIngredient2 = {
    ...exports.mockIngredient,
    ingredient_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Gula Pasir',
};
exports.mockLowStockIngredients = [
    {
        ...exports.mockIngredient,
        stock_qty: 5,
        min_stock: 10,
    },
    {
        ...exports.mockIngredient2,
        stock_qty: 2,
        min_stock: 20,
    },
];
// SEMI INGREDIENTS
exports.mockSemiIngredient = {
    ingredient_id: '550e8400-e29b-41d4-a716-446655440000', // Reusing ID for consistency in some tests, but ideally unique
    name: 'Bumbu Dasar',
    type: 'SEMI',
    stock_qty: 50,
    min_stock: 10,
    avg_cost: 15000,
    created_at: new Date(),
    updated_at: new Date(),
    unit: {
        unit_measure_id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Porsi',
    },
};
exports.mockSemiIngredient2 = {
    ...exports.mockSemiIngredient,
    ingredient_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Sambal Goreng',
};
// COMPOSITIONS
// Child ingredients for compositions
exports.mockChildIngredient1 = {
    ingredient_id: '880e8400-e29b-41d4-a716-446655440001',
    name: 'Bawang Merah',
    type: 'RAW',
    avg_cost: 5000,
    stock_qty: 1000,
    unit: {
        unit_measure_id: '990e8400-e29b-41d4-a716-446655440001',
        name: 'Gram',
    },
};
exports.mockChildIngredient2 = {
    ingredient_id: '880e8400-e29b-41d4-a716-446655440002',
    name: 'Bawang Putih',
    type: 'RAW',
    avg_cost: 3000,
    stock_qty: 500,
    unit: {
        unit_measure_id: '990e8400-e29b-41d4-a716-446655440001',
        name: 'Gram',
    },
};
exports.mockComposition1 = {
    ingredient_composition_id: '770e8400-e29b-41d4-a716-446655440001',
    parent_id: exports.mockSemiIngredient.ingredient_id,
    child_id: exports.mockChildIngredient1.ingredient_id,
    qty_needed: 2,
    child_ingredient: exports.mockChildIngredient1,
};
exports.mockComposition2 = {
    ingredient_composition_id: '770e8400-e29b-41d4-a716-446655440002',
    parent_id: exports.mockSemiIngredient.ingredient_id,
    child_id: exports.mockChildIngredient2.ingredient_id,
    qty_needed: 1,
    child_ingredient: exports.mockChildIngredient2,
};
// Ingredient with compositions attached
exports.mockIngredientWithCompositions = {
    ...exports.mockSemiIngredient,
    // Adjust avg_cost to match sum of compositions if needed for consistency: (2*5000) + (1*3000) = 13000
    avg_cost: 13000,
    child_compositions: [
        exports.mockComposition1,
        exports.mockComposition2,
    ],
};
// Ingredient Costs (for HPP calculation tests)
exports.mockIngredientCosts = [
    {
        ingredient_id: exports.mockChildIngredient1.ingredient_id,
        name: exports.mockChildIngredient1.name,
        avg_cost: exports.mockChildIngredient1.avg_cost,
        unit_name: exports.mockChildIngredient1.unit.name,
    },
    {
        ingredient_id: exports.mockChildIngredient2.ingredient_id,
        name: exports.mockChildIngredient2.name,
        avg_cost: exports.mockChildIngredient2.avg_cost,
        unit_name: exports.mockChildIngredient2.unit.name,
    },
];
//# sourceMappingURL=ingredient.mock.js.map