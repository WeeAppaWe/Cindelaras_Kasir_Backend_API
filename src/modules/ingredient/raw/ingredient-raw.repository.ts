import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import {
    RawIngredientFilter,
    RawIngredientPaginationOptions,
    RawIngredientReference,
    RawIngredientWithRelations,
    IngredientType,
} from './ingredient-raw.types';
import { Prisma } from '../../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for raw ingredient queries
const rawIngredientSelectFields = {
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

// Select fields for dropdown/reference usage
const rawIngredientReferenceSelectFields = {
    ingredient_id: true,
    name: true,
    type: true,
    unit: {
        select: {
            unit_measure_id: true,
            name: true,
        },
    },
};

/**
 * Find all raw ingredients (for dropdown/selection)
 */
export const findAllReferences = async (): Promise<RawIngredientReference[]> => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                deleted_at: null,
                type: IngredientType.RAW,
            },
            select: rawIngredientReferenceSelectFields,
            orderBy: { name: 'asc' },
        });

        return ingredients as RawIngredientReference[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find all raw ingredients with pagination and filters
 */
export const findAll = async (
    options: RawIngredientPaginationOptions,
    filter: RawIngredientFilter
): Promise<RawIngredientWithRelations[]> => {
    try {
        const { pagination } = options;
        const { search, unit_id } = filter;

        const where: Prisma.IngredientWhereInput = {
            deleted_at: null,
            type: IngredientType.RAW, // Only raw ingredients
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Filter by unit
        if (unit_id) {
            where.unit_id = unit_id;
        }

        // Note: low_stock filtering is handled by findLowStock() with raw query

        const ingredients = await prisma.ingredient.findMany({
            where,
            select: rawIngredientSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return ingredients as RawIngredientWithRelations[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count raw ingredients with filters
 */
export const count = async (filter: RawIngredientFilter): Promise<number> => {
    try {
        const { search, unit_id } = filter;

        const where: Prisma.IngredientWhereInput = {
            deleted_at: null,
            type: IngredientType.RAW,
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Filter by unit
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
 * Find raw ingredient by ID
 */
export const findById = async (ingredientId: string): Promise<RawIngredientWithRelations | null> => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                type: IngredientType.RAW,
            },
            select: rawIngredientSelectFields,
        });

        return ingredient as RawIngredientWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find raw ingredient by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeIngredientId?: string
): Promise<RawIngredientWithRelations | null> => {
    try {
        const where: Prisma.IngredientWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            type: IngredientType.RAW,
            deleted_at: null,
        };

        // Exclude specific ingredient (for update validation)
        if (excludeIngredientId) {
            where.ingredient_id = { not: excludeIngredientId };
        }

        const ingredient = await prisma.ingredient.findFirst({
            where,
            select: rawIngredientSelectFields,
        });

        return ingredient as RawIngredientWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new raw ingredient
 */
export const create = async (
    data: Prisma.IngredientUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<RawIngredientWithRelations> => {
    try {
        const client = transaction || prisma;

        const ingredient = await client.ingredient.create({
            data: {
                ...data,
                type: IngredientType.RAW, // Ensure type is RAW
            },
            select: rawIngredientSelectFields,
        });

        return ingredient as RawIngredientWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update raw ingredient by ID
 */
export const update = async (
    ingredientId: string,
    data: Prisma.IngredientUncheckedUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<RawIngredientWithRelations> => {
    try {
        const client = transaction || prisma;

        const ingredient = await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data,
            select: rawIngredientSelectFields,
        });

        return ingredient as RawIngredientWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete raw ingredient (set deleted_at)
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

/**
 * Get low stock raw ingredients (stock_qty < min_stock)
 */
export const findLowStock = async (): Promise<RawIngredientWithRelations[]> => {
    try {
        // Use raw query to compare stock_qty with min_stock
        const ingredients = await prisma.$queryRaw<RawIngredientWithRelations[]>`
            SELECT 
                i.ingredient_id,
                i.name,
                i.type,
                i.stock_qty,
                i.min_stock,
                i.avg_cost,
                i.created_at,
                i.updated_at,
                json_build_object(
                    'unit_measure_id', u.unit_measure_id,
                    'name', u.name
                ) as unit
            FROM ingredients i
            JOIN unit_measures u ON i.unit_id = u.unit_measure_id
            WHERE i.deleted_at IS NULL
              AND i.type = 'RAW'
              AND i.stock_qty < i.min_stock
            ORDER BY (i.stock_qty / NULLIF(i.min_stock, 0)) ASC
        `;

        return ingredients;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count low stock raw ingredients
 */
export const countLowStock = async (): Promise<number> => {
    try {
        const result = await prisma.$queryRaw<[{ count: bigint }]>`
            SELECT COUNT(*) as count
            FROM ingredients
            WHERE deleted_at IS NULL
              AND type = 'RAW'
              AND stock_qty < min_stock
        `;

        return Number(result[0].count);
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const rawIngredientRepository = {
    findAllReferences,
    findAll,
    count,
    findById,
    findByName,
    create,
    update,
    softDelete,
    findAllUnitMeasures,
    findUnitMeasureById,
    findLowStock,
    countLowStock,
};

export default rawIngredientRepository;
