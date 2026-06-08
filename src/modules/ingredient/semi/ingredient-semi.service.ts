import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';
import getPrismaClient from '../../../../database/postgres.connection';
import { getPagination } from '../../../../utility/pagination.utility';
import { calculateHPP, roundCurrency } from '../../../../utility/cost-calculation.utility';
import { AuthenticatedRequest } from '../../../../types';
import semiIngredientRepository from './ingredient-semi.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import {
    CreateSemiIngredientRequest,
    UpdateSemiIngredientRequest,
    SemiIngredientListResponse,
    SemiIngredientWithRelations,
    SemiIngredientWithCompositions,
    DeleteSemiIngredientResponse,
    SemiIngredientHPPResult,
    IngredientType,
} from './ingredient-semi.types';

const prisma = getPrismaClient();

/**
 * Get all semi ingredients with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<SemiIngredientListResponse> => {
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

        const filter = {
            search: (req.query.search as string) || null,
            unit_id: (req.query.unit_id as string) || null,
        };

        const [data, totalData] = await Promise.all([
            semiIngredientRepository.findAll(options, filter),
            semiIngredientRepository.count(filter),
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
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get semi ingredient detail by ID (with compositions and HPP)
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<SemiIngredientWithCompositions> => {
    try {
        const ingredientId = req.params.ingredient_id;

        const ingredient = await semiIngredientRepository.findByIdWithCompositions(ingredientId);

        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Calculate total HPP from compositions
        const recipeItems = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));

        return {
            ...ingredient,
            total_hpp: totalHPP,
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new semi ingredient
 */
export const create = async (req: AuthenticatedRequest): Promise<SemiIngredientWithRelations> => {
    try {
        const body: CreateSemiIngredientRequest = req.body;

        // Check if name already exists
        const existingIngredient = await semiIngredientRepository.findByName(body.name);
        if (existingIngredient) {
            throw new ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }

        // Validate unit_id exists
        const unitMeasure = await unitMeasureService.findById(body.unit_id);
        if (!unitMeasure) {
            throw new ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }

        // Create semi ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await semiIngredientRepository.create(
                {
                    name: body.name,
                    unit_id: body.unit_id,
                    type: IngredientType.SEMI,
                    stock_qty: 0, // Start with 0 stock
                    min_stock: body.min_stock,
                    avg_cost: 0, // Will be calculated when compositions are added
                },
                transaction
            );

            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update semi ingredient by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<SemiIngredientWithRelations> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body: UpdateSemiIngredientRequest = req.body;

        // Check if ingredient exists
        const existingIngredient = await semiIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await semiIngredientRepository.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
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
        } = {};

        if (body.name) updateData.name = body.name;
        if (body.unit_id) updateData.unit_id = body.unit_id;
        if (body.min_stock !== undefined) updateData.min_stock = body.min_stock;

        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await semiIngredientRepository.update(ingredientId, updateData, transaction);
            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete semi ingredient by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteSemiIngredientResponse> => {
    try {
        const ingredientId = req.params.ingredient_id;

        // Check if ingredient exists
        const existingIngredient = await semiIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await semiIngredientRepository.softDelete(ingredientId, transaction);
        });

        return {
            success: true,
            message: 'Bahan setengah jadi berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get HPP calculation for a semi ingredient
 */
export const getHPPCalculation = async (
    ingredientId: string,
    targetYield: number = 1
): Promise<SemiIngredientHPPResult> => {
    try {
        const ingredient = await semiIngredientRepository.findByIdWithCompositions(ingredientId);

        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        const compositions = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            ingredient_name: c.child_ingredient.name,
            qty_needed: Number(c.qty_needed),
            unit_name: c.child_ingredient.unit.name,
            unit_cost: Number(c.child_ingredient.avg_cost),
            subtotal: roundCurrency(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));

        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.ingredient_id,
            qty_needed: c.qty_needed,
            avg_cost: c.unit_cost,
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));
        const hppPerUnit = roundCurrency(totalHPP / targetYield);

        return {
            total_hpp: totalHPP,
            target_yield: targetYield,
            hpp_per_unit: hppPerUnit,
            composition_count: compositions.length,
            compositions: compositions.map((c) => ({
                ingredient_name: c.ingredient_name,
                qty_needed: c.qty_needed,
                unit_name: c.unit_name,
                unit_cost: c.unit_cost,
                subtotal: c.subtotal,
            })),
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Recalculate and update avg_cost (HPP per unit) for a semi ingredient
 */
export const recalculateAvgCost = async (
    ingredientId: string,
    targetYield: number = 1
): Promise<number> => {
    try {
        const hppResult = await getHPPCalculation(ingredientId, targetYield);

        await prisma.$transaction(async (transaction) => {
            await semiIngredientRepository.updateAvgCost(ingredientId, hppResult.hpp_per_unit, transaction);
        });

        return hppResult.hpp_per_unit;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const semiIngredientService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
    getHPPCalculation,
    recalculateAvgCost,
};

export default semiIngredientService;
