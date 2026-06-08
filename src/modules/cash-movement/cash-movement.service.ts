import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { getPagination } from '../../../utility/pagination.utility';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { AuthenticatedRequest } from '../../../types';
import cashMovementRepository from './cash-movement.repository';
import {
    CreateCashMovementRequest,
    CashMovementListResponse,
    CashMovementWithShift,
    CreateCashMovementResponse,
} from './cash-movement.types';

/**
 * Get all cash movements with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<CashMovementListResponse> => {
    try {
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Get active shift or use provided shift_id
        let shiftId = req.query.shift_id as string;

        if (!shiftId) {
            const activeShift = await cashMovementRepository.getActiveShift(metadata.account_id);
            if (!activeShift) {
                return {
                    page: {
                        total_record_count: 0,
                        batch_number: 1,
                        batch_size: 0,
                        max_batch_size: 10,
                    },
                    records: [],
                    summary: {
                        total_in: 0,
                        total_out: 0,
                        net_amount: 0,
                    },
                };
            }
            shiftId = activeShift.shift_id;
        }

        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        // Set filter
        const filter = {
            shift_id: shiftId,
            type: (req.query.type as string) || null,
        };

        const [data, totalData, summary] = await Promise.all([
            cashMovementRepository.findAll(options, filter),
            cashMovementRepository.count(filter),
            cashMovementRepository.getSummaryByShift(shiftId),
        ]);

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
            summary: {
                total_in: summary.total_in,
                total_out: summary.total_out,
                net_amount: summary.total_in - summary.total_out,
            },
        };
    } catch (error) {
        console.error(`--- Cash Movement Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get cash movement detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<CashMovementWithShift> => {
    try {
        const cashMovementId = req.params.cash_movement_id;

        const cashMovement = await cashMovementRepository.findById(cashMovementId);

        if (!cashMovement) {
            throw new ErrorNotFoundException('Mutasi kas tidak ditemukan');
        }

        return cashMovement;
    } catch (error) {
        console.error(`--- Cash Movement Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new cash movement
 */
export const create = async (req: AuthenticatedRequest): Promise<CreateCashMovementResponse> => {
    try {
        const metadata = getMetadataInfo(req);
        const body: CreateCashMovementRequest = req.body;

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Check active shift
        const activeShift = await cashMovementRepository.getActiveShift(metadata.account_id);
        if (!activeShift) {
            throw new ErrorValidationException('Tidak ada shift aktif', [
                { location: 'auth', field: 'shift_id', message: 'Anda harus membuka shift terlebih dahulu' },
            ]);
        }

        // Create cash movement
        const result = await cashMovementRepository.create({
            shift_id: activeShift.shift_id,
            type: body.type,
            amount: body.amount,
            note: body.note || null,
        });

        const typeLabel = body.type === 'IN' ? 'Kas masuk' : 'Kas keluar';

        return {
            success: true,
            message: `${typeLabel} berhasil dicatat`,
            cash_movement: result,
        };
    } catch (error) {
        console.error(`--- Cash Movement Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const cashMovementService = {
    getAll,
    getDetail,
    create,
};

export default cashMovementService;
