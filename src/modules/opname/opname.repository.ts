import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    OpnameFilter,
    OpnamePaginationOptions,
    OpnameWithUser,
    OpnameWithDetails,
    OpnameItemInput,
    IngredientForOpname,
} from './opname.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for opname list queries
const opnameListSelectFields = {
    stock_opname_id: true,
    opname_date: true,
    status: true,
    notes: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    _count: {
        select: {
            items: true,
        },
    },
};

// Select fields for opname detail queries (with items)
const opnameDetailSelectFields = {
    stock_opname_id: true,
    opname_date: true,
    status: true,
    notes: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    items: {
        where: {
            deleted_at: null,
        },
        select: {
            stock_opname_item_id: true,
            ingredient_id: true,
            system_qty: true,
            physical_qty: true,
            difference: true,
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
        },
        orderBy: {
            ingredient: {
                name: 'asc' as const,
            },
        },
    },
};

/**
 * Find all stock opnames with pagination and filters
 */
export const findAll = async (
    options: OpnamePaginationOptions,
    filter: OpnameFilter
): Promise<OpnameWithUser[]> => {
    try {
        const { pagination } = options;
        const { search, status, start_date, end_date } = filter;

        const where: Prisma.StockOpnameWhereInput = {
            deleted_at: null,
        };

        // Search by notes
        if (search) {
            where.notes = { contains: search, mode: 'insensitive' };
        }

        // Filter by status
        if (status) {
            where.status = status;
        }

        // Filter by date range
        if (start_date || end_date) {
            where.opname_date = {};
            if (start_date) {
                where.opname_date.gte = new Date(start_date);
            }
            if (end_date) {
                where.opname_date.lte = new Date(end_date);
            }
        }

        const opnames = await prisma.stockOpname.findMany({
            where,
            select: opnameListSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return opnames as OpnameWithUser[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count stock opnames with filters
 */
export const count = async (filter: OpnameFilter): Promise<number> => {
    try {
        const { search, status, start_date, end_date } = filter;

        const where: Prisma.StockOpnameWhereInput = {
            deleted_at: null,
        };

        // Search by notes
        if (search) {
            where.notes = { contains: search, mode: 'insensitive' };
        }

        // Filter by status
        if (status) {
            where.status = status;
        }

        // Filter by date range
        if (start_date || end_date) {
            where.opname_date = {};
            if (start_date) {
                where.opname_date.gte = new Date(start_date);
            }
            if (end_date) {
                where.opname_date.lte = new Date(end_date);
            }
        }

        return await prisma.stockOpname.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock opname by ID
 */
export const findById = async (opnameId: string): Promise<OpnameWithUser | null> => {
    try {
        const opname = await prisma.stockOpname.findUnique({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: opnameListSelectFields,
        });

        return opname as OpnameWithUser | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock opname by ID with full details (including items)
 */
export const findByIdWithDetails = async (opnameId: string): Promise<OpnameWithDetails | null> => {
    try {
        const opname = await prisma.stockOpname.findUnique({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: opnameDetailSelectFields,
        });

        if (!opname) return null;

        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        } as OpnameWithDetails;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new stock opname with items
 */
export const create = async (
    data: {
        user_id: string;
        opname_date: Date;
        status: string;
        notes?: string | null;
    },
    items: Array<{
        ingredient_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }>,
    transaction?: Prisma.TransactionClient
): Promise<OpnameWithDetails> => {
    try {
        const client = transaction || prisma;

        // Create opname header
        const opname = await client.stockOpname.create({
            data: {
                user_id: data.user_id,
                opname_date: data.opname_date,
                status: data.status,
                notes: data.notes,
                items: {
                    create: items.map((item) => ({
                        ingredient_id: item.ingredient_id,
                        system_qty: item.system_qty,
                        physical_qty: item.physical_qty,
                        difference: item.difference,
                    })),
                },
            },
            select: opnameDetailSelectFields,
        });

        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        } as OpnameWithDetails;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update stock opname
 */
export const update = async (
    opnameId: string,
    data: {
        notes?: string | null;
    },
    transaction?: Prisma.TransactionClient
): Promise<OpnameWithDetails> => {
    try {
        const client = transaction || prisma;

        const opname = await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data,
            select: opnameDetailSelectFields,
        });

        // Transform Decimal to number
        return {
            ...opname,
            items: opname.items.map((item) => ({
                ...item,
                system_qty: Number(item.system_qty),
                physical_qty: Number(item.physical_qty),
                difference: Number(item.difference),
            })),
        } as OpnameWithDetails;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update opname status
 */
export const updateStatus = async (
    opnameId: string,
    status: string,
    transaction?: Prisma.TransactionClient
): Promise<OpnameWithUser> => {
    try {
        const client = transaction || prisma;

        const opname = await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data: { status },
            select: opnameListSelectFields,
        });

        return opname as OpnameWithUser;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Delete all items of an opname (for replacement)
 */
export const deleteItems = async (
    opnameId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.stockOpnameItem.updateMany({
            where: { stock_opname_id: opnameId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Add items to opname
 */
export const addItems = async (
    opnameId: string,
    items: Array<{
        ingredient_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }>,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.stockOpnameItem.createMany({
            data: items.map((item) => ({
                stock_opname_id: opnameId,
                ingredient_id: item.ingredient_id,
                system_qty: item.system_qty,
                physical_qty: item.physical_qty,
                difference: item.difference,
            })),
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete stock opname
 */
export const softDelete = async (
    opnameId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        // Soft delete header
        await client.stockOpname.update({
            where: { stock_opname_id: opnameId },
            data: { deleted_at: new Date() },
        });

        // Soft delete items
        await client.stockOpnameItem.updateMany({
            where: { stock_opname_id: opnameId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get ingredient current stock by ID
 */
export const getIngredientStock = async (
    ingredientId: string,
    transaction?: Prisma.TransactionClient
): Promise<number | null> => {
    try {
        const client = transaction || prisma;

        const ingredient = await client.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            select: { stock_qty: true },
        });

        return ingredient ? Number(ingredient.stock_qty) : null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get all ingredients for opname form
 */
export const getIngredientsForOpname = async (): Promise<IngredientForOpname[]> => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: { deleted_at: null },
            select: {
                ingredient_id: true,
                name: true,
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

        return ingredients.map((ing) => ({
            ...ing,
            stock_qty: Number(ing.stock_qty),
        }));
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update ingredient stock (for adjustment)
 */
export const updateIngredientStock = async (
    ingredientId: string,
    newStockQty: number,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: { stock_qty: newStockQty },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get opname items for adjustment
 */
export const getOpnameItems = async (
    opnameId: string,
    transaction?: Prisma.TransactionClient
): Promise<Array<{ ingredient_id: string; physical_qty: number; difference: number }>> => {
    try {
        const client = transaction || prisma;

        const items = await client.stockOpnameItem.findMany({
            where: {
                stock_opname_id: opnameId,
                deleted_at: null,
            },
            select: {
                ingredient_id: true,
                physical_qty: true,
                difference: true,
            },
        });

        return items.map((item) => ({
            ingredient_id: item.ingredient_id,
            physical_qty: Number(item.physical_qty),
            difference: Number(item.difference),
        }));
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create stock movement record (for adjustment audit trail)
 */
export const createStockMovement = async (
    data: {
        ingredient_id: string;
        user_id: string;
        stock_type_id: string;
        qty: number;
        current_stock: number;
        notes?: string | null;
    },
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.stockMovement.create({
            data: {
                ingredient_id: data.ingredient_id,
                user_id: data.user_id,
                stock_type_id: data.stock_type_id,
                qty: data.qty,
                current_stock: data.current_stock,
                notes: data.notes ?? null,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const opnameRepository = {
    findAll,
    count,
    findById,
    findByIdWithDetails,
    create,
    update,
    updateStatus,
    deleteItems,
    addItems,
    softDelete,
    getIngredientStock,
    getIngredientsForOpname,
    updateIngredientStock,
    getOpnameItems,
    createStockMovement,
};

export default opnameRepository;
