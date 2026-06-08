import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { AuthenticatedRequest } from '../../../types';
import supplierRepository from './supplier.repository';
import {
    CreateSupplierRequest,
    UpdateSupplierRequest,
    SupplierListResponse,
    SupplierWithDetails,
    DeleteSupplierResponse,
} from './supplier.types';

const prisma = getPrismaClient();

/**
 * Get all suppliers with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<SupplierListResponse> => {
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
        };

        const [data, totalData] = await Promise.all([
            supplierRepository.findAll(options, filter),
            supplierRepository.count(filter),
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
        console.error(`--- Supplier Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get supplier detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<SupplierWithDetails> => {
    try {
        const supplierId = req.params.supplier_id;

        const supplier = await supplierRepository.findById(supplierId);

        if (!supplier) {
            throw new ErrorNotFoundException('Supplier tidak ditemukan');
        }

        return supplier;
    } catch (error) {
        console.error(`--- Supplier Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new supplier
 */
export const create = async (req: AuthenticatedRequest): Promise<SupplierWithDetails> => {
    try {
        const body: CreateSupplierRequest = req.body;

        // Check if name already exists
        const existingSupplier = await supplierRepository.findByName(body.name);
        if (existingSupplier) {
            throw new ErrorDataAlreadyExistException('Nama supplier sudah digunakan');
        }

        // Create supplier in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const supplier = await supplierRepository.create(
                {
                    name: body.name,
                    phone: body.phone || null,
                    address: body.address || null,
                },
                transaction
            );

            return supplier;
        });

        // Fetch supplier with count
        const supplierWithDetails = await supplierRepository.findById(result.supplier_id);
        return supplierWithDetails!;
    } catch (error) {
        console.error(`--- Supplier Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update supplier by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<SupplierWithDetails> => {
    try {
        const supplierId = req.params.supplier_id;
        const body: UpdateSupplierRequest = req.body;

        // Check if supplier exists
        const existingSupplier = await supplierRepository.findById(supplierId);
        if (!existingSupplier) {
            throw new ErrorNotFoundException('Supplier tidak ditemukan');
        }

        // Check if name already used by another supplier
        if (body.name) {
            const duplicateSupplier = await supplierRepository.findByName(body.name, supplierId);
            if (duplicateSupplier) {
                throw new ErrorDataAlreadyExistException('Nama supplier sudah digunakan');
            }
        }

        // Prepare update data
        const updateData: {
            name?: string;
            phone?: string | null;
            address?: string | null;
        } = {};

        if (body.name) updateData.name = body.name;
        if (body.phone !== undefined) updateData.phone = body.phone || null;
        if (body.address !== undefined) updateData.address = body.address || null;

        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const supplier = await supplierRepository.update(supplierId, updateData, transaction);
            return supplier;
        });

        // Fetch supplier with count
        const supplierWithDetails = await supplierRepository.findById(result.supplier_id);
        return supplierWithDetails!;
    } catch (error) {
        console.error(`--- Supplier Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete supplier by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteSupplierResponse> => {
    try {
        const supplierId = req.params.supplier_id;

        // Check if supplier exists
        const existingSupplier = await supplierRepository.findById(supplierId);
        if (!existingSupplier) {
            throw new ErrorNotFoundException('Supplier tidak ditemukan');
        }

        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await supplierRepository.softDelete(supplierId, transaction);
        });

        return {
            success: true,
            message: 'Supplier berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Supplier Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const supplierService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
};

export default supplierService;
