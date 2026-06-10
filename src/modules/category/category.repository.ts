import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    CategoryFilter,
    CategoryPaginationOptions,
    CategoryData,
    CategoryReference,
    CategoryWithCount,
} from './category.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for category queries
const categorySelectFields = {
    category_id: true,
    name: true,
    created_at: true,
    updated_at: true,
};

// Select fields for dropdown/reference usage
const categoryReferenceSelectFields = {
    category_id: true,
    name: true,
};

// Select fields with menu count
const categoryWithCountSelectFields = {
    ...categorySelectFields,
    _count: {
        select: {
            menus: true,
        },
    },
};

/**
 * Find all categories (for dropdown/selection)
 */
export const findAllReferences = async (): Promise<CategoryReference[]> => {
    try {
        const categories = await prisma.category.findMany({
            where: {
                deleted_at: null,
            },
            select: categoryReferenceSelectFields,
            orderBy: { name: 'asc' },
        });

        return categories as CategoryReference[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find all categories with pagination and filters
 */
export const findAll = async (
    options: CategoryPaginationOptions,
    filter: CategoryFilter
): Promise<CategoryWithCount[]> => {
    try {
        const { pagination } = options;
        const { search } = filter;

        const where: Prisma.CategoryWhereInput = {
            deleted_at: null,
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        const categories = await prisma.category.findMany({
            where,
            select: categoryWithCountSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return categories as CategoryWithCount[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count categories with filters
 */
export const count = async (filter: CategoryFilter): Promise<number> => {
    try {
        const { search } = filter;

        const where: Prisma.CategoryWhereInput = {
            deleted_at: null,
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        return await prisma.category.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find category by ID
 */
export const findById = async (categoryId: string): Promise<CategoryData | null> => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                category_id: categoryId,
                deleted_at: null,
            },
            select: categorySelectFields,
        });

        return category as CategoryData | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find category by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeCategoryId?: string
): Promise<CategoryData | null> => {
    try {
        const where: Prisma.CategoryWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };

        // Exclude specific category (for update validation)
        if (excludeCategoryId) {
            where.category_id = { not: excludeCategoryId };
        }

        const category = await prisma.category.findFirst({
            where,
            select: categorySelectFields,
        });

        return category as CategoryData | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new category
 */
export const create = async (
    data: Prisma.CategoryCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<CategoryData> => {
    try {
        const client = transaction || prisma;

        const category = await client.category.create({
            data,
            select: categorySelectFields,
        });

        return category as CategoryData;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update category by ID
 */
export const update = async (
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<CategoryData> => {
    try {
        const client = transaction || prisma;

        const category = await client.category.update({
            where: { category_id: categoryId },
            data,
            select: categorySelectFields,
        });

        return category as CategoryData;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete category (set deleted_at)
 */
export const softDelete = async (
    categoryId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.category.update({
            where: { category_id: categoryId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Check if category has menus (for delete validation)
 */
export const hasMenus = async (categoryId: string): Promise<boolean> => {
    try {
        const count = await prisma.menu.count({
            where: {
                category_id: categoryId,
                deleted_at: null,
            },
        });

        return count > 0;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const categoryRepository = {
    findAllReferences,
    findAll,
    count,
    findById,
    findByName,
    create,
    update,
    softDelete,
    hasMenus,
};

export default categoryRepository;
