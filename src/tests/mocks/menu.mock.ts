import { MenuData, MenuWithDetails } from '../../modules/menu/menu.types';
import { RecipeWithIngredient } from '../../modules/menu/recipe/menu-recipe.types';
import { mockCategory, mockCategory2 } from './category.mock';

// ============================================
// MENU MOCK DATA
// ============================================

export const mockMenu: MenuData = {
    menu_id: '990e8400-e29b-41d4-a716-446655440001',
    name: 'Nasi Goreng',
    price: 15000,
    cost: 5000,
    description: 'Nasi goreng spesial dengan telur',
    image_url: 'https://example.com/nasi-goreng.jpg',
    is_available: true,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    category: mockCategory,
};

export const mockMenu2: MenuData = {
    menu_id: '990e8400-e29b-41d4-a716-446655440002',
    name: 'Es Teh Manis',
    price: 5000,
    cost: 1500,
    description: 'Es teh manis segar',
    image_url: null,
    is_available: true,
    created_at: new Date('2024-01-02'),
    updated_at: null,
    category: mockCategory2,
};

export const mockMenuInactive: MenuData = {
    menu_id: '990e8400-e29b-41d4-a716-446655440003',
    name: 'Mie Goreng',
    price: 12000,
    cost: 4000,
    description: null,
    image_url: null,
    is_available: false,
    created_at: new Date('2024-01-03'),
    updated_at: null,
    category: mockCategory,
};

export const mockMenuWithDetails: MenuWithDetails = {
    ...mockMenu,
    _count: { recipes: 3 },
    margin_percent: 66.67,
    profit: 10000,
};

export const mockMenus: MenuData[] = [mockMenu, mockMenu2, mockMenuInactive];

// ============================================
// RECIPE MOCK DATA
// ============================================

export const mockIngredient = {
    ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
    name: 'Beras Premium',
    stock_qty: 10000,
    avg_cost: 15,
    unit: {
        unit_measure_id: 'bbb08400-e29b-41d4-a716-446655440001',
        name: 'Gram',
    },
};

export const mockIngredient2 = {
    ingredient_id: 'aaa08400-e29b-41d4-a716-446655440002',
    name: 'Telur Ayam',
    stock_qty: 100,
    avg_cost: 2000,
    unit: {
        unit_measure_id: 'bbb08400-e29b-41d4-a716-446655440002',
        name: 'Butir',
    },
};

export const mockRecipe: RecipeWithIngredient = {
    menu_recipe_id: 'ccc08400-e29b-41d4-a716-446655440001',
    menu_id: mockMenu.menu_id,
    ingredient_id: mockIngredient.ingredient_id,
    qty_needed: 200,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    ingredient: mockIngredient,
    subtotal: 3000, // 200 * 15
};

export const mockRecipe2: RecipeWithIngredient = {
    menu_recipe_id: 'ccc08400-e29b-41d4-a716-446655440002',
    menu_id: mockMenu.menu_id,
    ingredient_id: mockIngredient2.ingredient_id,
    qty_needed: 1,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    ingredient: mockIngredient2,
    subtotal: 2000, // 1 * 2000
};

export const mockRecipes: RecipeWithIngredient[] = [mockRecipe, mockRecipe2];

// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================

export const mockCreateMenuData = {
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

export const mockUpdateMenuData = {
    valid: {
        name: 'Nasi Goreng Special',
    },
    withPrice: {
        price: 18000,
    },
};

export const mockCreateRecipeData = {
    valid: {
        ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
        qty_needed: 100,
    },
};

export const mockBulkRecipeData = {
    valid: {
        recipes: [
            { ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001', qty_needed: 200 },
            { ingredient_id: 'aaa08400-e29b-41d4-a716-446655440002', qty_needed: 2 },
        ],
    },
};

