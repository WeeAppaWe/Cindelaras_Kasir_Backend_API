import { CategoryFilter, CategoryPaginationOptions, CategoryData, CategoryReference, CategoryWithCount } from './category.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all categories (for dropdown/selection)
 */
export declare const findAllReferences: () => Promise<CategoryReference[]>;
/**
 * Find all categories with pagination and filters
 */
export declare const findAll: (options: CategoryPaginationOptions, filter: CategoryFilter) => Promise<CategoryWithCount[]>;
/**
 * Count categories with filters
 */
export declare const count: (filter: CategoryFilter) => Promise<number>;
/**
 * Find category by ID
 */
export declare const findById: (categoryId: string) => Promise<CategoryData | null>;
/**
 * Find category by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeCategoryId?: string) => Promise<CategoryData | null>;
/**
 * Create new category
 */
export declare const create: (data: Prisma.CategoryCreateInput, transaction?: Prisma.TransactionClient) => Promise<CategoryData>;
/**
 * Update category by ID
 */
export declare const update: (categoryId: string, data: Prisma.CategoryUpdateInput, transaction?: Prisma.TransactionClient) => Promise<CategoryData>;
/**
 * Soft delete category (set deleted_at)
 */
export declare const softDelete: (categoryId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Check if category has menus (for delete validation)
 */
export declare const hasMenus: (categoryId: string) => Promise<boolean>;
export declare const categoryRepository: {
    findAllReferences: () => Promise<CategoryReference[]>;
    findAll: (options: CategoryPaginationOptions, filter: CategoryFilter) => Promise<CategoryWithCount[]>;
    count: (filter: CategoryFilter) => Promise<number>;
    findById: (categoryId: string) => Promise<CategoryData | null>;
    findByName: (name: string, excludeCategoryId?: string) => Promise<CategoryData | null>;
    create: (data: Prisma.CategoryCreateInput, transaction?: Prisma.TransactionClient) => Promise<CategoryData>;
    update: (categoryId: string, data: Prisma.CategoryUpdateInput, transaction?: Prisma.TransactionClient) => Promise<CategoryData>;
    softDelete: (categoryId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    hasMenus: (categoryId: string) => Promise<boolean>;
};
export default categoryRepository;
//# sourceMappingURL=category.repository.d.ts.map