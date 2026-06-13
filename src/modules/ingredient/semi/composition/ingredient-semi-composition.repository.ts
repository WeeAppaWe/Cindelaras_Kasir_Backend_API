import getPrismaClient from '../../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../../utility/prisma-error-handler.utility';
import { CompositionWithDetails, AvailableRawIngredient } from './ingredient-semi-composition.types';
import { Prisma } from '../../../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for composition queries
const compositionSelectFields = {
    ingredient_composition_id: true,
    parent_id: true,
    child_id: true,
    qty_needed: true,
    child_ingredient: {
        select: {
            ingredient_id: true,
            name: true,
            type: true,
            avg_cost: true,
            stock_qty: true,
            unit: {
                select: {
                    unit_measure_id: true,
                    name: true,
                },
            },
        },
    },
};

/**
 * Find all compositions for a parent semi ingredient
 */
export const findByParentId = async (
    parentId: string,
    transaction?: Prisma.TransactionClient
): Promise<CompositionWithDetails[]> => {
    try {
        const client = transaction || prisma;

        const compositions = await client.ingredientComposition.findMany({
            where: {
                parent_id: parentId,
                deleted_at: null,
            },
            select: compositionSelectFields,
            orderBy: { child_ingredient: { name: 'asc' } },
        });

        return compositions as CompositionWithDetails[];
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find composition by ID
 */
export const findById = async (
    compositionId: string,
    transaction?: Prisma.TransactionClient
): Promise<CompositionWithDetails | null> => {
    try {
        const client = transaction || prisma;

        const composition = await client.ingredientComposition.findUnique({
            where: {
                ingredient_composition_id: compositionId,
                deleted_at: null,
            },
            select: compositionSelectFields,
        });

        return composition as CompositionWithDetails | null;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find composition by parent and child (check duplicate)
 */
export const findByParentAndChild = async (
    parentId: string,
    childId: string,
    excludeCompositionId?: string
): Promise<CompositionWithDetails | null> => {
    try {
        const where: Prisma.IngredientCompositionWhereInput = {
            parent_id: parentId,
            child_id: childId,
            deleted_at: null,
        };

        if (excludeCompositionId) {
            where.ingredient_composition_id = { not: excludeCompositionId };
        }

        const composition = await prisma.ingredientComposition.findFirst({
            where,
            select: compositionSelectFields,
        });

        return composition as CompositionWithDetails | null;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new composition
 */
export const create = async (
    data: {
        parent_id: string;
        child_id: string;
        qty_needed: number;
    },
    transaction?: Prisma.TransactionClient
): Promise<CompositionWithDetails> => {
    try {
        const client = transaction || prisma;

        const composition = await client.ingredientComposition.create({
            data,
            select: compositionSelectFields,
        });

        return composition as CompositionWithDetails;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create many compositions (bulk)
 */
export const createMany = async (
    compositions: {
        parent_id: string;
        child_id: string;
        qty_needed: number;
    }[],
    transaction?: Prisma.TransactionClient
): Promise<number> => {
    try {
        const client = transaction || prisma;

        const result = await client.ingredientComposition.createMany({
            data: compositions,
        });

        return result.count;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update composition by ID
 */
export const update = async (
    compositionId: string,
    data: { qty_needed: number },
    transaction?: Prisma.TransactionClient
): Promise<CompositionWithDetails> => {
    try {
        const client = transaction || prisma;

        const composition = await client.ingredientComposition.update({
            where: { ingredient_composition_id: compositionId },
            data,
            select: compositionSelectFields,
        });

        return composition as CompositionWithDetails;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete composition by ID
 */
export const softDelete = async (
    compositionId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredientComposition.update({
            where: { ingredient_composition_id: compositionId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete all compositions for a parent
 */
export const softDeleteByParentId = async (
    parentId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredientComposition.updateMany({
            where: {
                parent_id: parentId,
                deleted_at: null,
            },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Upsert composition (Update if exists, Create if not)
 */
export const upsert = async (
    data: { parent_id: string; child_id: string; qty_needed: number },
    transaction?: Prisma.TransactionClient
): Promise<CompositionWithDetails> => {
    try {
        const client = transaction || prisma;

        const composition = await client.ingredientComposition.upsert({
            where: {
                parent_id_child_id: {
                    parent_id: data.parent_id,
                    child_id: data.child_id,
                },
            },
            update: {
                qty_needed: data.qty_needed,
                deleted_at: null, // Restore from soft delete if necessary
            },
            create: {
                parent_id: data.parent_id,
                child_id: data.child_id,
                qty_needed: data.qty_needed,
            },
            select: compositionSelectFields,
        });

        return composition as CompositionWithDetails;
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
        throw error;
    }
};

/**
 * Soft delete compositions that are missing from the kept child IDs list
 */
export const softDeleteMissing = async (
    parentId: string,
    keptChildIds: string[],
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredientComposition.updateMany({
            where: {
                parent_id: parentId,
                child_id: { notIn: keptChildIds },
                deleted_at: null,
            },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
        throw error;
    }
};

/**
 * Find all available RAW ingredients (for composition selection)
 */
export const findAvailableRawIngredients = async (): Promise<AvailableRawIngredient[]> => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                type: 'RAW',
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                avg_cost: true,
                stock_qty: true,
                unit: {
                    select: {
                        unit_measure_id: true,
                        name: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });

        return ingredients as AvailableRawIngredient[];
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find ingredient costs by IDs (for HPP calculation)
 */
export const findIngredientCostsByIds = async (
    ingredientIds: string[]
): Promise<{ ingredient_id: string; name: string; avg_cost: number; unit_name: string }[]> => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                ingredient_id: { in: ingredientIds },
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                avg_cost: true,
                unit: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return ingredients.map((i) => ({
            ingredient_id: i.ingredient_id,
            name: i.name,
            avg_cost: Number(i.avg_cost),
            unit_name: i.unit.name,
        }));
    } catch (error) {
        console.error('--- Composition Repository Error:', error);
        handlePrismaError(error);
    }
};

export const compositionRepository = {
    findByParentId,
    findById,
    findByParentAndChild,
    create,
    createMany,
    update,
    softDelete,
    softDeleteByParentId,
    upsert,
    softDeleteMissing,
    findAvailableRawIngredients,
    findIngredientCostsByIds,
};

export default compositionRepository;
