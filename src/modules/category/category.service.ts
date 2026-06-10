import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { AuthenticatedRequest } from '../../../types';
import categoryRepository from './category.repository';
import {
    CreateCategoryRequest,
    UpdateCategoryRequest,
    CategoryListResponse,
    CategoryData,
    CategoryReference,
    DeleteCategoryResponse,
} from './category.types';

const prisma = getPrismaClient();

/**
 * Get all categories (for dropdown/selection)
 */
export const getAllReferences = async (): Promise<CategoryReference[]> => {
    try {
        return await categoryRepository.findAllReferences();
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get all categories with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<CategoryListResponse> => {
    try {
        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        // Set search filter
        const filter = {
            search: (req.query.search as string) || null,
        };

        const [data, totalData] = await Promise.all([
            categoryRepository.findAll(options, filter),
            categoryRepository.count(filter),
        ]);

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get category detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<CategoryData> => {
    try {
        const categoryId = req.params.category_id;

        const category = await categoryRepository.findById(categoryId);

        if (!category) {
            throw new ErrorNotFoundException('Kategori tidak ditemukan');
        }

        return category;
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new category
 */
export const create = async (req: AuthenticatedRequest): Promise<CategoryData> => {
    try {
        const body: CreateCategoryRequest = req.body;

        // Check if category name already exists
        const existingCategory = await categoryRepository.findByName(body.name);
        if (existingCategory) {
            throw new ErrorDataAlreadyExistException('Nama kategori sudah digunakan');
        }

        // Create category
        const result = await categoryRepository.create(
            {
                name: body.name,
            }
        );

        return result;
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update category by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<CategoryData> => {
    try {
        const categoryId = req.params.category_id;
        const body: UpdateCategoryRequest = req.body;

        // Check if category exists
        const existingCategory = await categoryRepository.findById(categoryId);
        if (!existingCategory) {
            throw new ErrorNotFoundException('Kategori tidak ditemukan');
        }

        // Check if name already used by another category
        if (body.name) {
            const duplicateCategory = await categoryRepository.findByName(body.name, categoryId);
            if (duplicateCategory) {
                throw new ErrorDataAlreadyExistException('Nama kategori sudah digunakan');
            }
        }

        // Prepare update data
        const updateData: { name?: string } = {};

        if (body.name) updateData.name = body.name;

        // Update category
        const result = await categoryRepository.update(categoryId, updateData);

        return result;
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete category by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteCategoryResponse> => {
    try {
        const categoryId = req.params.category_id;

        // Check if category exists
        const existingCategory = await categoryRepository.findById(categoryId);
        if (!existingCategory) {
            throw new ErrorNotFoundException('Kategori tidak ditemukan');
        }

        // Check if category has menus
        const hasMenus = await categoryRepository.hasMenus(categoryId);
        if (hasMenus) {
            throw new ErrorValidationException('Kategori tidak dapat dihapus karena masih memiliki menu', [
                { location: 'params', field: 'category_id', message: 'Kategori masih memiliki menu terkait' },
            ]);
        }

        // Soft delete
        await categoryRepository.softDelete(categoryId);

        return {
            success: true,
            message: 'Kategori berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Category Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const categoryService = {
    getAllReferences,
    getAll,
    getDetail,
    create,
    update,
    softDelete,
};

export default categoryService;
