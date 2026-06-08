"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockCategoryRequest = exports.mockUpdateCategoryData = exports.mockCreateCategoryData = exports.mockCategoriesWithCount = exports.mockCategories = exports.mockCategoryWithCount3 = exports.mockCategoryWithCount2 = exports.mockCategoryWithCount = exports.mockCategory3 = exports.mockCategory2 = exports.mockCategory = void 0;
// ============================================
// CATEGORY MOCK DATA
// ============================================
exports.mockCategory = {
    category_id: '880e8400-e29b-41d4-a716-446655440001',
    name: 'Makanan',
    created_at: new Date('2024-01-01'),
    updated_at: null,
};
exports.mockCategory2 = {
    category_id: '880e8400-e29b-41d4-a716-446655440002',
    name: 'Minuman',
    created_at: new Date('2024-01-02'),
    updated_at: null,
};
exports.mockCategory3 = {
    category_id: '880e8400-e29b-41d4-a716-446655440003',
    name: 'Snack',
    created_at: new Date('2024-01-03'),
    updated_at: null,
};
exports.mockCategoryWithCount = {
    ...exports.mockCategory,
    _count: {
        menus: 5,
    },
};
exports.mockCategoryWithCount2 = {
    ...exports.mockCategory2,
    _count: {
        menus: 10,
    },
};
exports.mockCategoryWithCount3 = {
    ...exports.mockCategory3,
    _count: {
        menus: 0,
    },
};
exports.mockCategories = [exports.mockCategory, exports.mockCategory2, exports.mockCategory3];
exports.mockCategoriesWithCount = [exports.mockCategoryWithCount, exports.mockCategoryWithCount2, exports.mockCategoryWithCount3];
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockCreateCategoryData = {
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
exports.mockUpdateCategoryData = {
    valid: {
        name: 'Updated Category Name',
    },
};
// ============================================
// REQUEST MOCK HELPERS
// ============================================
const createMockCategoryRequest = (overrides) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
exports.createMockCategoryRequest = createMockCategoryRequest;
//# sourceMappingURL=category.mock.js.map