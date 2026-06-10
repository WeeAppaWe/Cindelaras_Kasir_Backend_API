import { CategoryData, CategoryReference, CategoryWithCount } from '../../modules/category/category.types';

// ============================================
// CATEGORY MOCK DATA
// ============================================

export const mockCategory: CategoryData = {
    category_id: '880e8400-e29b-41d4-a716-446655440001',
    name: 'Makanan',
    created_at: new Date('2024-01-01'),
    updated_at: null,
};

export const mockCategory2: CategoryData = {
    category_id: '880e8400-e29b-41d4-a716-446655440002',
    name: 'Minuman',
    created_at: new Date('2024-01-02'),
    updated_at: null,
};

export const mockCategory3: CategoryData = {
    category_id: '880e8400-e29b-41d4-a716-446655440003',
    name: 'Snack',
    created_at: new Date('2024-01-03'),
    updated_at: null,
};

export const mockCategoryWithCount: CategoryWithCount = {
    ...mockCategory,
    _count: {
        menus: 5,
    },
};

export const mockCategoryWithCount2: CategoryWithCount = {
    ...mockCategory2,
    _count: {
        menus: 10,
    },
};

export const mockCategoryWithCount3: CategoryWithCount = {
    ...mockCategory3,
    _count: {
        menus: 0,
    },
};

export const mockCategories: CategoryData[] = [mockCategory, mockCategory2, mockCategory3];
export const mockCategoriesWithCount: CategoryWithCount[] = [mockCategoryWithCount, mockCategoryWithCount2, mockCategoryWithCount3];
export const mockCategoryReferences: CategoryReference[] = [
    {
        category_id: mockCategory.category_id,
        name: mockCategory.name,
    },
    {
        category_id: mockCategory2.category_id,
        name: mockCategory2.name,
    },
    {
        category_id: mockCategory3.category_id,
        name: mockCategory3.name,
    },
];

// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================

export const mockCreateCategoryData = {
    valid: {
        name: 'Dessert',
    },
    tooShort: {
        name: 'A',
    },
    tooLong: {
        name: 'A'.repeat(51),
    },
};

export const mockUpdateCategoryData = {
    valid: {
        name: 'Updated Category Name',
    },
};

// ============================================
// REQUEST MOCK HELPERS
// ============================================

export const createMockCategoryRequest = (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
