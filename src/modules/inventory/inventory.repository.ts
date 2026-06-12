import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    StockMovementFilter,
    StockMovementPaginationOptions,
    StockMovementWithDetails,
    StockTypeData,
} from './inventory.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// ============================================
// SELECT FIELDS
// ============================================

const stockMovementSelectFields = {
    stock_movement_id: true,
    supplier_id: true,
    ingredient_id: true,
    user_id: true,
    stock_type_id: true,
    qty: true,
    unit_cost: true,
    current_stock: true,
    notes: true,
    created_at: true,
    ingredient: {
        select: {
            ingredient_id: true,
            name: true,
            unit: {
                select: {
                    unit_measure_id: true,
                    name: true,
                },
            },
        },
    },
    supplier: {
        select: {
            supplier_id: true,
            name: true,
        },
    },
    stock_type: {
        select: {
            stock_type_id: true,
            name: true,
        },
    },
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
};

// ============================================
// REPOSITORY FUNCTIONS
// ============================================

/**
 * Find all stock movements with pagination and filters
 */
export const findAll = async (
    options: StockMovementPaginationOptions,
    filter: StockMovementFilter
): Promise<StockMovementWithDetails[]> => {
    try {
        const { pagination } = options;
        const where: Prisma.StockMovementWhereInput = {
            deleted_at: null,
        };

        // Apply filters
        if (filter.search) {
            where.OR = [
                { ingredient: { name: { contains: filter.search, mode: 'insensitive' } } },
                { notes: { contains: filter.search, mode: 'insensitive' } },
            ];
        }

        if (filter.ingredient_id) {
            where.ingredient_id = filter.ingredient_id;
        }

        if (filter.supplier_id) {
            where.supplier_id = filter.supplier_id;
        }

        if (filter.stock_type_id) {
            where.stock_type_id = filter.stock_type_id;
        }

        if (filter.date_from || filter.date_to) {
            where.created_at = {};
            if (filter.date_from) {
                where.created_at.gte = filter.date_from;
            }
            if (filter.date_to) {
                where.created_at.lte = filter.date_to;
            }
        }

        const movements = await prisma.stockMovement.findMany({
            where,
            select: stockMovementSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return movements as unknown as StockMovementWithDetails[];
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count stock movements with filters
 */
export const count = async (filter: StockMovementFilter): Promise<number> => {
    try {
        const where: Prisma.StockMovementWhereInput = {
            deleted_at: null,
        };

        if (filter.search) {
            where.OR = [
                { ingredient: { name: { contains: filter.search, mode: 'insensitive' } } },
                { notes: { contains: filter.search, mode: 'insensitive' } },
            ];
        }

        if (filter.ingredient_id) {
            where.ingredient_id = filter.ingredient_id;
        }

        if (filter.supplier_id) {
            where.supplier_id = filter.supplier_id;
        }

        if (filter.stock_type_id) {
            where.stock_type_id = filter.stock_type_id;
        }

        if (filter.date_from || filter.date_to) {
            where.created_at = {};
            if (filter.date_from) {
                where.created_at.gte = filter.date_from;
            }
            if (filter.date_to) {
                where.created_at.lte = filter.date_to;
            }
        }

        return await prisma.stockMovement.count({ where });
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock movement by ID
 */
export const findById = async (stockMovementId: string): Promise<StockMovementWithDetails | null> => {
    try {
        const movement = await prisma.stockMovement.findUnique({
            where: {
                stock_movement_id: stockMovementId,
                deleted_at: null,
            },
            select: stockMovementSelectFields,
        });

        return movement as unknown as StockMovementWithDetails | null;
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new stock movement
 */
export const create = async (
    data: Prisma.StockMovementUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<StockMovementWithDetails> => {
    try {
        const client = transaction || prisma;

        const movement = await client.stockMovement.create({
            data,
            select: stockMovementSelectFields,
        });

        return movement as unknown as StockMovementWithDetails;
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock types
 */
export const findAllStockTypes = async (): Promise<StockTypeData[]> => {
    try {
        const stockTypes = await prisma.stockType.findMany({
            where: { deleted_at: null },
            select: {
                stock_type_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });

        return stockTypes;
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find ingredient by ID
 */
export const findIngredientById = async (ingredientId: string) => {
    try {
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                name: true,
                stock_qty: true,
                avg_cost: true,
                unit: {
                    select: {
                        unit_measure_id: true,
                        name: true,
                    },
                },
            },
        });

        return ingredient;
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find supplier by ID
 */
export const findSupplierById = async (supplierId: string) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                supplier_id: supplierId,
                deleted_at: null,
            },
            select: {
                supplier_id: true,
                name: true,
            },
        });

        return supplier;
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update ingredient stock quantity and avg_cost
 */
export const updateIngredientStock = async (
    ingredientId: string,
    stockQty: number,
    avgCost?: number,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        const updateData: { stock_qty: number; avg_cost?: number } = {
            stock_qty: stockQty,
        };

        if (avgCost !== undefined) {
            updateData.avg_cost = avgCost;
        }

        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: updateData,
        });
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get stock movements by ingredient (for history)
 */
export const findByIngredientId = async (
    ingredientId: string,
    options: StockMovementPaginationOptions
): Promise<StockMovementWithDetails[]> => {
    try {
        const movements = await prisma.stockMovement.findMany({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: stockMovementSelectFields,
            orderBy: { created_at: 'desc' },
            take: options.pagination.limit,
            skip: options.pagination.offset,
        });

        return movements as unknown as StockMovementWithDetails[];
    } catch (error) {
        console.error('--- Inventory Repository Error:', error);
        handlePrismaError(error);
    }
};

export const inventoryRepository = {
    findAll,
    count,
    findById,
    create,
    findAllStockTypes,
    findIngredientById,
    findSupplierById,
    updateIngredientStock,
    findByIngredientId,
};

export default inventoryRepository;
