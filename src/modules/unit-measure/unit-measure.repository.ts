import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    UnitMeasureData,
    UnitMeasureFilter,
    UnitMeasurePaginationOptions,
    UnitMeasureReference,
} from './unit-measure.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for dropdown/reference usage
const unitMeasureReferenceSelectFields = {
    unit_measure_id: true,
    name: true,
};

// Select fields for CRUD responses
const unitMeasureSelectFields = {
    ...unitMeasureReferenceSelectFields,
    created_at: true,
    updated_at: true,
};

/**
 * Find all unit measures (for dropdown/selection)
 */
export const findAllReferences = async (): Promise<UnitMeasureReference[]> => {
    try {
        const units = await prisma.unitMeasure.findMany({
            where: { deleted_at: null },
            select: unitMeasureReferenceSelectFields,
            orderBy: { name: 'asc' },
        });

        return units as UnitMeasureReference[];
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find all unit measures with pagination and filters
 */
export const findAll = async (
    options: UnitMeasurePaginationOptions,
    filter: UnitMeasureFilter
): Promise<UnitMeasureData[]> => {
    try {
        const { pagination } = options;
        const { search } = filter;

        const where: Prisma.UnitMeasureWhereInput = {
            deleted_at: null,
        };

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        const units = await prisma.unitMeasure.findMany({
            where,
            select: unitMeasureSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return units as UnitMeasureData[];
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count unit measures with filters
 */
export const count = async (filter: UnitMeasureFilter): Promise<number> => {
    try {
        const { search } = filter;

        const where: Prisma.UnitMeasureWhereInput = {
            deleted_at: null,
        };

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        return await prisma.unitMeasure.count({ where });
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find unit measure by ID
 */
export const findById = async (unitMeasureId: string): Promise<UnitMeasureData | null> => {
    try {
        const unit = await prisma.unitMeasure.findUnique({
            where: {
                unit_measure_id: unitMeasureId,
                deleted_at: null,
            },
            select: unitMeasureSelectFields,
        });

        return unit as UnitMeasureData | null;
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find unit measure by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeUnitMeasureId?: string
): Promise<UnitMeasureData | null> => {
    try {
        const where: Prisma.UnitMeasureWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };

        if (excludeUnitMeasureId) {
            where.unit_measure_id = { not: excludeUnitMeasureId };
        }

        const unit = await prisma.unitMeasure.findFirst({
            where,
            select: unitMeasureSelectFields,
        });

        return unit as UnitMeasureData | null;
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new unit measure
 */
export const create = async (
    data: Prisma.UnitMeasureCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<UnitMeasureData> => {
    try {
        const client = transaction || prisma;

        const unit = await client.unitMeasure.create({
            data,
            select: unitMeasureSelectFields,
        });

        return unit as UnitMeasureData;
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update unit measure by ID
 */
export const update = async (
    unitMeasureId: string,
    data: Prisma.UnitMeasureUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<UnitMeasureData> => {
    try {
        const client = transaction || prisma;

        const unit = await client.unitMeasure.update({
            where: { unit_measure_id: unitMeasureId },
            data,
            select: unitMeasureSelectFields,
        });

        return unit as UnitMeasureData;
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete unit measure (set deleted_at)
 */
export const softDelete = async (
    unitMeasureId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.unitMeasure.update({
            where: { unit_measure_id: unitMeasureId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Check if unit measure has active ingredients
 */
export const hasIngredients = async (unitMeasureId: string): Promise<boolean> => {
    try {
        const count = await prisma.ingredient.count({
            where: {
                unit_id: unitMeasureId,
                deleted_at: null,
            },
        });

        return count > 0;
    } catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        handlePrismaError(error);
    }
};

export const unitMeasureRepository = {
    findAllReferences,
    findAll,
    count,
    findById,
    findByName,
    create,
    update,
    softDelete,
    hasIngredients,
};

export default unitMeasureRepository;
