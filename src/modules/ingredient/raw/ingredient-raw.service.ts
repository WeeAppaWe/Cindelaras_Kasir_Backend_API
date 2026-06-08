import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';
import getPrismaClient from '../../../../database/postgres.connection';
import { getPagination } from '../../../../utility/pagination.utility';
import { AuthenticatedRequest } from '../../../../types';
import rawIngredientRepository from './ingredient-raw.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import {
    CreateRawIngredientRequest,
    UpdateRawIngredientRequest,
    RawIngredientListResponse,
    RawIngredientWithRelations,
    DeleteRawIngredientResponse,
    LowStockAlertResponse,
    IngredientType,
} from './ingredient-raw.types';

const prisma = getPrismaClient();

/**
 * Get all raw ingredients with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<RawIngredientListResponse> => {
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

        // Set search and filters
        const filter = {
            search: (req.query.search as string) || null,
            unit_id: (req.query.unit_id as string) || null,
            low_stock: req.query.low_stock === 'true' || null,
        };

        const [data, totalData] = await Promise.all([
            rawIngredientRepository.findAll(options, filter),
            rawIngredientRepository.count(filter),
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
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get raw ingredient detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<RawIngredientWithRelations> => {
    try {
        const ingredientId = req.params.ingredient_id;

        const ingredient = await rawIngredientRepository.findById(ingredientId);

        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan baku tidak ditemukan');
        }

        return ingredient;
    } catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new raw ingredient
 */
export const create = async (req: AuthenticatedRequest): Promise<RawIngredientWithRelations> => {
    try {
        const body: CreateRawIngredientRequest = req.body;

        // Check if name already exists
        const existingIngredient = await rawIngredientRepository.findByName(body.name);
        if (existingIngredient) {
            throw new ErrorDataAlreadyExistException('Nama bahan baku sudah digunakan');
        }

        // Validate unit_id exists
        const unitMeasure = await unitMeasureService.findById(body.unit_id);
        if (!unitMeasure) {
            throw new ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }

        // Create raw ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await rawIngredientRepository.create(
                {
                    name: body.name,
                    unit_id: body.unit_id,
                    type: IngredientType.RAW,
                    stock_qty: body.stock_qty ?? 0,
                    min_stock: body.min_stock,
                    avg_cost: body.avg_cost ?? 0,
                },
                transaction
            );

            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update raw ingredient by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<RawIngredientWithRelations> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body: UpdateRawIngredientRequest = req.body;

        // Check if ingredient exists
        const existingIngredient = await rawIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan baku tidak ditemukan');
        }

        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await rawIngredientRepository.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new ErrorDataAlreadyExistException('Nama bahan baku sudah digunakan');
            }
        }

        // Validate unit_id if provided
        if (body.unit_id) {
            const unitMeasure = await unitMeasureService.findById(body.unit_id);
            if (!unitMeasure) {
                throw new ErrorValidationException('Satuan tidak ditemukan', [
                    { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
                ]);
            }
        }

        // Prepare update data
        const updateData: {
            name?: string;
            unit_id?: string;
            min_stock?: number;
            avg_cost?: number;
        } = {};

        if (body.name) updateData.name = body.name;
        if (body.unit_id) updateData.unit_id = body.unit_id;
        if (body.min_stock !== undefined) updateData.min_stock = body.min_stock;
        if (body.avg_cost !== undefined) updateData.avg_cost = body.avg_cost;

        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await rawIngredientRepository.update(ingredientId, updateData, transaction);
            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete raw ingredient by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteRawIngredientResponse> => {
    try {
        const ingredientId = req.params.ingredient_id;

        // Check if ingredient exists
        const existingIngredient = await rawIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan baku tidak ditemukan');
        }

        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await rawIngredientRepository.softDelete(ingredientId, transaction);
        });

        return {
            success: true,
            message: 'Bahan baku berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get low stock alerts
 */
export const getLowStockAlerts = async (): Promise<LowStockAlertResponse> => {
    try {
        const [ingredients, count] = await Promise.all([
            rawIngredientRepository.findLowStock(),
            rawIngredientRepository.countLowStock(),
        ]);

        return {
            total_count: count,
            records: ingredients,
        };
    } catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const rawIngredientService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
    getLowStockAlerts,
};

export default rawIngredientService;
