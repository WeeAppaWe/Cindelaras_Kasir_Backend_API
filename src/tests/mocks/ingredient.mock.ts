import { mockUnitMeasure } from './unit-measure.mock';

// RAW INGREDIENTS
export const mockIngredient = {
    ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Tepung Terigu',
    type: 'RAW',
    stock_qty: 100,
    min_stock: 10,
    avg_cost: 15000,
    created_at: new Date(),
    updated_at: new Date(),
    unit: {
        unit_measure_id: mockUnitMeasure.unit_measure_id,
        name: mockUnitMeasure.name,
    },
};

export const mockIngredient2 = {
    ...mockIngredient,
    ingredient_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Gula Pasir',
};

export const mockLowStockIngredients = [
    {
        ...mockIngredient,
        stock_qty: 5,
        min_stock: 10,
    },
    {
        ...mockIngredient2,
        stock_qty: 2,
        min_stock: 20,
    },
];

// SEMI INGREDIENTS
export const mockSemiIngredient = {
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

export const mockSemiIngredient2 = {
    ...mockSemiIngredient,
    ingredient_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Sambal Goreng',
};

// INGREDIENT REFERENCES (for dropdown/selection)
export const mockRawIngredientReference = {
    ingredient_id: mockIngredient.ingredient_id,
    name: mockIngredient.name,
    type: mockIngredient.type,
    unit: mockIngredient.unit,
};

export const mockRawIngredientReference2 = {
    ingredient_id: mockIngredient2.ingredient_id,
    name: mockIngredient2.name,
    type: mockIngredient2.type,
    unit: mockIngredient2.unit,
};

export const mockRawIngredientReferences = [
    mockRawIngredientReference,
    mockRawIngredientReference2,
];

export const mockSemiIngredientReference = {
    ingredient_id: '550e8400-e29b-41d4-a716-446655440003',
    name: mockSemiIngredient.name,
    type: mockSemiIngredient.type,
    unit: mockSemiIngredient.unit,
};

export const mockAllIngredientReferences = [
    mockRawIngredientReference,
    mockSemiIngredientReference,
];

// COMPOSITIONS
// Child ingredients for compositions
export const mockChildIngredient1 = {
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

export const mockChildIngredient2 = {
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

export const mockComposition1 = {
    ingredient_composition_id: '770e8400-e29b-41d4-a716-446655440001',
    parent_id: mockSemiIngredient.ingredient_id,
    child_id: mockChildIngredient1.ingredient_id,
    qty_needed: 2,
    child_ingredient: mockChildIngredient1,
};

export const mockComposition2 = {
    ingredient_composition_id: '770e8400-e29b-41d4-a716-446655440002',
    parent_id: mockSemiIngredient.ingredient_id,
    child_id: mockChildIngredient2.ingredient_id,
    qty_needed: 1,
    child_ingredient: mockChildIngredient2,
};

// Ingredient with compositions attached
export const mockIngredientWithCompositions = {
    ...mockSemiIngredient,
    // Adjust avg_cost to match sum of compositions if needed for consistency: (2*5000) + (1*3000) = 13000
    avg_cost: 13000,
    child_compositions: [
        mockComposition1,
        mockComposition2,
    ],
};

// Ingredient Costs (for HPP calculation tests)
export const mockIngredientCosts = [
    {
        ingredient_id: mockChildIngredient1.ingredient_id,
        name: mockChildIngredient1.name,
        avg_cost: mockChildIngredient1.avg_cost,
        unit_name: mockChildIngredient1.unit.name,
    },
    {
        ingredient_id: mockChildIngredient2.ingredient_id,
        name: mockChildIngredient2.name,
        avg_cost: mockChildIngredient2.avg_cost,
        unit_name: mockChildIngredient2.unit.name,
    },
];
