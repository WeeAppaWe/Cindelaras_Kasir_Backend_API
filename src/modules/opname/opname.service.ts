import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { AuthenticatedRequest } from '../../../types';
import opnameRepository from './opname.repository';
import {
    CreateOpnameRequest,
    UpdateOpnameRequest,
    OpnameListResponse,
    OpnameWithDetails,
    DeleteOpnameResponse,
    ApplyAdjustmentResponse,
    IngredientForOpname,
} from './opname.types';
import { OpnameStatus } from './opname.schema';

const prisma = getPrismaClient();

/**
 * Get all stock opnames with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<OpnameListResponse> => {
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

        // Set search and filters
        const filter = {
            search: (req.query.search as string) || null,
            status: (req.query.status as string) || null,
            start_date: (req.query.start_date as string) || null,
            end_date: (req.query.end_date as string) || null,
        };

        const [data, totalData] = await Promise.all([
            opnameRepository.findAll(options, filter),
            opnameRepository.count(filter),
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
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get stock opname detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<OpnameWithDetails> => {
    try {
        const opnameId = req.params.stock_opname_id;

        const opname = await opnameRepository.findByIdWithDetails(opnameId);

        if (!opname) {
            throw new ErrorNotFoundException('Stock opname tidak ditemukan');
        }

        return opname;
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new stock opname
 */
export const create = async (req: AuthenticatedRequest): Promise<OpnameWithDetails> => {
    try {
        const body: CreateOpnameRequest = req.body;
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'id', message: 'User tidak terautentikasi' },
            ]);
        }

        // Validate all ingredients exist and get their current stock
        const itemsWithStock: Array<{
            ingredient_id: string;
            system_qty: number;
            physical_qty: number;
            difference: number;
        }> = [];

        for (const item of body.items) {
            const currentStock = await opnameRepository.getIngredientStock(item.ingredient_id);

            if (currentStock === null) {
                throw new ErrorValidationException(`Bahan dengan ID ${item.ingredient_id} tidak ditemukan`, [
                    { location: 'body', field: 'items', message: `Bahan dengan ID ${item.ingredient_id} tidak ditemukan` },
                ]);
            }

            const difference = item.physical_qty - currentStock;

            itemsWithStock.push({
                ingredient_id: item.ingredient_id,
                system_qty: currentStock,
                physical_qty: item.physical_qty,
                difference: difference,
            });
        }

        // Create opname in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const opname = await opnameRepository.create(
                {
                    user_id: metadata.account_id,
                    opname_date: new Date(body.opname_date),
                    status: OpnameStatus.DRAFT,
                    notes: body.notes || null,
                },
                itemsWithStock,
                transaction
            );

            return opname;
        });

        return result;
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update stock opname (only DRAFT status)
 */
export const update = async (req: AuthenticatedRequest): Promise<OpnameWithDetails> => {
    try {
        const opnameId = req.params.stock_opname_id;
        const body: UpdateOpnameRequest = req.body;

        // Check if opname exists
        const existingOpname = await opnameRepository.findById(opnameId);
        if (!existingOpname) {
            throw new ErrorNotFoundException('Stock opname tidak ditemukan');
        }

        // Only allow update on DRAFT status
        if (existingOpname.status !== OpnameStatus.DRAFT) {
            throw new ErrorValidationException('Hanya opname dengan status DRAFT yang dapat diubah', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dalam status DRAFT' },
            ]);
        }

        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update notes if provided
            if (body.notes !== undefined) {
                await opnameRepository.update(
                    opnameId,
                    { notes: body.notes || null },
                    transaction
                );
            }

            // Update items if provided
            if (body.items && body.items.length > 0) {
                // Validate all ingredients and prepare items with stock
                const itemsWithStock: Array<{
                    ingredient_id: string;
                    system_qty: number;
                    physical_qty: number;
                    difference: number;
                }> = [];

                for (const item of body.items) {
                    const currentStock = await opnameRepository.getIngredientStock(item.ingredient_id, transaction);

                    if (currentStock === null) {
                        throw new ErrorValidationException(`Bahan dengan ID ${item.ingredient_id} tidak ditemukan`, [
                            { location: 'body', field: 'items', message: `Bahan dengan ID ${item.ingredient_id} tidak ditemukan` },
                        ]);
                    }

                    const difference = item.physical_qty - currentStock;

                    itemsWithStock.push({
                        ingredient_id: item.ingredient_id,
                        system_qty: currentStock,
                        physical_qty: item.physical_qty,
                        difference: difference,
                    });
                }

                // Delete old items and add new ones
                await opnameRepository.deleteItems(opnameId, transaction);
                await opnameRepository.addItems(opnameId, itemsWithStock, transaction);
            }

            // Fetch updated opname with details
            const updated = await opnameRepository.findByIdWithDetails(opnameId);
            return updated!;
        });

        return result;
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Change opname status (DRAFT -> COMPLETED or CANCELLED)
 */
export const changeStatus = async (req: AuthenticatedRequest): Promise<OpnameWithDetails> => {
    try {
        const opnameId = req.params.stock_opname_id;
        const { status } = req.body;

        // Check if opname exists
        const existingOpname = await opnameRepository.findById(opnameId);
        if (!existingOpname) {
            throw new ErrorNotFoundException('Stock opname tidak ditemukan');
        }

        // Only allow status change from DRAFT
        if (existingOpname.status !== OpnameStatus.DRAFT) {
            throw new ErrorValidationException('Hanya opname dengan status DRAFT yang dapat diubah statusnya', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dalam status DRAFT' },
            ]);
        }

        // Update status
        await opnameRepository.updateStatus(opnameId, status);

        // Fetch updated opname with details
        const updated = await opnameRepository.findByIdWithDetails(opnameId);
        return updated!;
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Apply adjustment to stock (COMPLETED -> APPLIED)
 */
export const applyAdjustment = async (req: AuthenticatedRequest): Promise<ApplyAdjustmentResponse> => {
    try {
        const opnameId = req.params.stock_opname_id;

        // Check if opname exists
        const existingOpname = await opnameRepository.findById(opnameId);
        if (!existingOpname) {
            throw new ErrorNotFoundException('Stock opname tidak ditemukan');
        }

        // Only allow apply on COMPLETED status
        if (existingOpname.status !== OpnameStatus.COMPLETED) {
            throw new ErrorValidationException('Hanya opname dengan status COMPLETED yang dapat diaplikasikan', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname harus dalam status COMPLETED untuk dapat diaplikasikan' },
            ]);
        }

        // Apply adjustment in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Get all opname items
            const items = await opnameRepository.getOpnameItems(opnameId, transaction);

            // Update each ingredient's stock to the physical_qty
            for (const item of items) {
                await opnameRepository.updateIngredientStock(
                    item.ingredient_id,
                    item.physical_qty,
                    transaction
                );
            }

            // Update opname status to APPLIED
            await opnameRepository.updateStatus(opnameId, OpnameStatus.APPLIED, transaction);

            return items.length;
        });

        return {
            success: true,
            message: 'Adjustment berhasil diaplikasikan',
            adjustments_count: result,
        };
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete stock opname (only DRAFT or CANCELLED)
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteOpnameResponse> => {
    try {
        const opnameId = req.params.stock_opname_id;

        // Check if opname exists
        const existingOpname = await opnameRepository.findById(opnameId);
        if (!existingOpname) {
            throw new ErrorNotFoundException('Stock opname tidak ditemukan');
        }

        // Only allow delete on DRAFT or CANCELLED status
        if (existingOpname.status !== OpnameStatus.DRAFT && existingOpname.status !== OpnameStatus.CANCELLED) {
            throw new ErrorValidationException('Hanya opname dengan status DRAFT atau CANCELLED yang dapat dihapus', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dapat dihapus' },
            ]);
        }

        // Soft delete
        await opnameRepository.softDelete(opnameId);

        return {
            success: true,
            message: 'Stock opname berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get all ingredients for opname form
 */
export const getIngredients = async (): Promise<IngredientForOpname[]> => {
    try {
        return await opnameRepository.getIngredientsForOpname();
    } catch (error) {
        console.error(`--- Opname Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const opnameService = {
    getAll,
    getDetail,
    create,
    update,
    changeStatus,
    applyAdjustment,
    softDelete,
    getIngredients,
};

export default opnameService;
