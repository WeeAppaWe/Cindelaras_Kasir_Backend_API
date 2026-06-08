import { CategoryData, CategoryWithCount } from '../../modules/category/category.types';
export declare const mockCategory: CategoryData;
export declare const mockCategory2: CategoryData;
export declare const mockCategory3: CategoryData;
export declare const mockCategoryWithCount: CategoryWithCount;
export declare const mockCategoryWithCount2: CategoryWithCount;
export declare const mockCategoryWithCount3: CategoryWithCount;
export declare const mockCategories: CategoryData[];
export declare const mockCategoriesWithCount: CategoryWithCount[];
export declare const mockCreateCategoryData: {
    valid: {
        name: string;
    };
    tooShort: {
        name: string;
    };
    tooLong: {
        name: string;
    };
};
export declare const mockUpdateCategoryData: {
    valid: {
        name: string;
    };
};
export declare const createMockCategoryRequest: (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => {
    params: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, unknown>;
};
//# sourceMappingURL=category.mock.d.ts.map