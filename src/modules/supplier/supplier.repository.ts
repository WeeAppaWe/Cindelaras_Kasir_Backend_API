import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import {
    SupplierFilter,
    SupplierPaginationOptions,
    SupplierData,
    SupplierWithDetails
} from './supplier.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for supplier queries
const supplierSelectFields = {
    supplier_id: true,
    name: true,
    phone: true,
    address: true,
    created_at: true,
    updated_at: true,
};

// Select fields with count
const supplierWithCountSelect = {
    ...supplierSelectFields,
    _count: {
        select: {
            stock_movements: true,
        },
    },
};

/**
 * Find all suppliers with pagination and filters
 */
export const findAll = async (
    options: SupplierPaginationOptions,
    filter: SupplierFilter
): Promise<SupplierWithDetails[]> => {
    try {
        const { pagination } = options;
        const { search } = filter;

        const where: Prisma.SupplierWhereInput = {
            deleted_at: null,
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }

        const suppliers = await prisma.supplier.findMany({
            where,
            select: supplierWithCountSelect,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return suppliers as SupplierWithDetails[];
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count suppliers with filters
 */
export const count = async (filter: SupplierFilter): Promise<number> => {
    try {
        const { search } = filter;

        const where: Prisma.SupplierWhereInput = {
            deleted_at: null,
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }

        return await prisma.supplier.count({ where });
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find supplier by ID
 */
export const findById = async (supplierId: string): Promise<SupplierWithDetails | null> => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: {
                supplier_id: supplierId,
                deleted_at: null,
            },
            select: supplierWithCountSelect,
        });

        return supplier as SupplierWithDetails | null;
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find supplier by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeSupplierId?: string
): Promise<SupplierData | null> => {
    try {
        const where: Prisma.SupplierWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };

        if (excludeSupplierId) {
            where.supplier_id = { not: excludeSupplierId };
        }

        const supplier = await prisma.supplier.findFirst({
            where,
            select: supplierSelectFields,
        });

        return supplier as SupplierData | null;
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new supplier
 */
export const create = async (
    data: Prisma.SupplierUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<SupplierData> => {
    try {
        const client = transaction || prisma;

        const supplier = await client.supplier.create({
            data,
            select: supplierSelectFields,
        });

        return supplier as SupplierData;
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update supplier by ID
 */
export const update = async (
    supplierId: string,
    data: Prisma.SupplierUncheckedUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<SupplierData> => {
    try {
        const client = transaction || prisma;

        const supplier = await client.supplier.update({
            where: { supplier_id: supplierId },
            data,
            select: supplierSelectFields,
        });

        return supplier as SupplierData;
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete supplier (set deleted_at)
 */
export const softDelete = async (
    supplierId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.supplier.update({
            where: { supplier_id: supplierId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Supplier Repository Error:', error);
        handlePrismaError(error);
    }
};

export const supplierRepository = {
    findAll,
    count,
    findById,
    findByName,
    create,
    update,
    softDelete,
};

export default supplierRepository;
