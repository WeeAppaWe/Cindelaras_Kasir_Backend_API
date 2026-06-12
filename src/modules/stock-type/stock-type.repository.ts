import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { StockTypeData } from './stock-type.types';

const prisma = getPrismaClient();

/**
 * Find all stock types
 */
export const findAll = async (): Promise<StockTypeData[]> => {
    try {
        const stockTypes = await prisma.stockType.findMany({
            where: {
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return stockTypes;
    } catch (error) {
        console.error('--- StockType Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock type by ID
 */
export const findById = async (stockTypeId: string): Promise<StockTypeData | null> => {
    try {
        const stockType = await prisma.stockType.findUnique({
            where: {
                stock_type_id: stockTypeId,
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
        });

        return stockType;
    } catch (error) {
        console.error('--- StockType Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find stock type by name
 */
export const findByName = async (name: string): Promise<StockTypeData | null> => {
    try {
        const stockType = await prisma.stockType.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
        });

        return stockType;
    } catch (error) {
        console.error('--- StockType Repository Error:', error);
        handlePrismaError(error);
    }
};

export const stockTypeRepository = {
    findAll,
    findById,
    findByName,
};

export default stockTypeRepository;
