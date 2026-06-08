import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import {
    SemiIngredientFilter,
    SemiIngredientPaginationOptions,
    SemiIngredientWithRelations,
    SemiIngredientWithCompositions,
    IngredientType
} from './ingredient-semi.types';
import { Prisma } from '../../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for semi ingredient queries (without compositions)
const semiIngredientSelectFields = {
    ingredient_id: true,
    name: true,
    type: true,
    stock_qty: true,
    min_stock: true,
    avg_cost: true,
    created_at: true,
    updated_at: true,
    unit: {
        select: {
            unit_measure_id: true,
            name: true,
        },
    },
};

// Select fields with compositions
const semiIngredientWithCompositionsSelect = {
    ...semiIngredientSelectFields,
    child_compositions: {
        where: { deleted_at: null },
        select: {
            ingredient_composition_id: true,
            child_id: true,
            qty_needed: true,
            child_ingredient: {
                select: {
                    ingredient_id: true,
                    name: true,
                    avg_cost: true,
                    unit: {
                        select: {
                            unit_measure_id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    },
};

/**
 * Find all semi ingredients with pagination and filters
 */
export const findAll = async (
    options: SemiIngredientPaginationOptions,
    filter: SemiIngredientFilter
): Promise<SemiIngredientWithRelations[]> => {
    try {
        const { pagination } = options;
        const { search, unit_id } = filter;

        const where: Prisma.IngredientWhereInput = {
            deleted_at: null,
            type: IngredientType.SEMI,
        };

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        if (unit_id) {
            where.unit_id = unit_id;
        }

        const ingredients = await prisma.ingredient.findMany({
            where,
            select: semiIngredientSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return ingredients as SemiIngredientWithRelations[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count semi ingredients with filters
 */
export const count = async (filter: SemiIngredientFilter): Promise<number> => {
    try {
        const { search, unit_id } = filter;

        const where: Prisma.IngredientWhereInput = {
            deleted_at: null,
            type: IngredientType.SEMI,
        };

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        if (unit_id) {
            where.unit_id = unit_id;
        }

        return await prisma.ingredient.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find semi ingredient by ID (basic info)
 */
export const findById = async (ingredientId: string): Promise<SemiIngredientWithRelations | null> => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: IngredientType.SEMI,
            },
            select: semiIngredientSelectFields,
        });

        return ingredient as SemiIngredientWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find semi ingredient by ID with compositions
 */
export const findByIdWithCompositions = async (ingredientId: string): Promise<SemiIngredientWithCompositions | null> => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: IngredientType.SEMI,
            },
            select: semiIngredientWithCompositionsSelect,
        });

        return ingredient as SemiIngredientWithCompositions | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find semi ingredient by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeIngredientId?: string
): Promise<SemiIngredientWithRelations | null> => {
    try {
        const where: Prisma.IngredientWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            type: IngredientType.SEMI,
            deleted_at: null,
        };

        if (excludeIngredientId) {
            where.ingredient_id = { not: excludeIngredientId };
        }

        const ingredient = await prisma.ingredient.findFirst({
            where,
            select: semiIngredientSelectFields,
        });

        return ingredient as SemiIngredientWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new semi ingredient
 */
export const create = async (
    data: Prisma.IngredientUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<SemiIngredientWithRelations> => {
    try {
        const client = transaction || prisma;

        const ingredient = await client.ingredient.create({
            data: {
                ...data,
                type: IngredientType.SEMI,
            },
            select: semiIngredientSelectFields,
        });

        return ingredient as SemiIngredientWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update semi ingredient by ID
 */
export const update = async (
    ingredientId: string,
    data: Prisma.IngredientUncheckedUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<SemiIngredientWithRelations> => {
    try {
        const client = transaction || prisma;

        const ingredient = await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data,
            select: semiIngredientSelectFields,
        });

        return ingredient as SemiIngredientWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update avg_cost (HPP per unit) for semi ingredient
 */
export const updateAvgCost = async (
    ingredientId: string,
    avgCost: number,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: { avg_cost: avgCost },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete semi ingredient (set deleted_at)
 */
export const softDelete = async (
    ingredientId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get all unit measures (for dropdown/selection)
 */
export const findAllUnitMeasures = async () => {
    try {
        return await prisma.unitMeasure.findMany({
            where: { deleted_at: null },
            select: {
                unit_measure_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find unit measure by ID
 */
export const findUnitMeasureById = async (unitMeasureId: string) => {
    try {
        return await prisma.unitMeasure.findUnique({
            where: {
                unit_measure_id: unitMeasureId,
                deleted_at: null,
            },
            select: {
                unit_measure_id: true,
                name: true,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const semiIngredientRepository = {
    findAll,
    count,
    findById,
    findByIdWithCompositions,
    findByName,
    create,
    update,
    updateAvgCost,
    softDelete,
    findAllUnitMeasures,
    findUnitMeasureById,
};

export default semiIngredientRepository;
