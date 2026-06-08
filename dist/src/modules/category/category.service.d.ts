import { AuthenticatedRequest } from '../../../types';
import { CategoryListResponse, CategoryData, DeleteCategoryResponse } from './category.types';
/**
 * Get all categories with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<CategoryListResponse>;
/**
 * Get category detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<CategoryData>;
/**
 * Create new category
 */
export declare const create: (req: AuthenticatedRequest) => Promise<CategoryData>;
/**
 * Update category by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<CategoryData>;
/**
 * Soft delete category by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteCategoryResponse>;
export declare const categoryService: {
    getAll: (req: AuthenticatedRequest) => Promise<CategoryListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<CategoryData>;
    create: (req: AuthenticatedRequest) => Promise<CategoryData>;
    update: (req: AuthenticatedRequest) => Promise<CategoryData>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteCategoryResponse>;
};
export default categoryService;
//# sourceMappingURL=category.service.d.ts.map