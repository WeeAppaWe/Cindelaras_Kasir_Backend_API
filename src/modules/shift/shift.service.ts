import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { getPagination } from '../../../utility/pagination.utility';
import { formatMoney } from '../../../utility/format-money.utility';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { AuthenticatedRequest } from '../../../types';
import shiftRepository from './shift.repository';
import {
    StartShiftRequest,
    EndShiftRequest,
    ShiftListResponse,
    ShiftWithUser,
    StartShiftResponse,
    EndShiftResponse,
    ActiveShiftResponse,
    ShiftSummary,
} from './shift.types';

// ============================================
// GET ALL SHIFTS (History)
// ============================================

export const getAll = async (req: AuthenticatedRequest): Promise<ShiftListResponse> => {
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
            user_id: (req.query.user_id as string) || null,
            start_date: (req.query.start_date as string) || null,
            end_date: (req.query.end_date as string) || null,
            is_active: req.query.is_active === 'true' ? true : req.query.is_active === 'false' ? false : null,
        };

        const [data, totalData] = await Promise.all([
            shiftRepository.findAll(options, filter),
            shiftRepository.count(filter),
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
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET SHIFT DETAIL
// ============================================

export const getDetail = async (req: AuthenticatedRequest): Promise<ShiftWithUser> => {
    try {
        const shiftId = req.params.shift_id;

        const shift = await shiftRepository.findById(shiftId);

        if (!shift) {
            throw new ErrorNotFoundException('Shift tidak ditemukan');
        }

        return shift;
    } catch (error) {
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET ACTIVE SHIFT
// ============================================

export const getActiveShift = async (req: AuthenticatedRequest): Promise<ActiveShiftResponse> => {
    try {
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        const shift = await shiftRepository.getActiveShift(metadata.account_id);

        return {
            is_active: shift !== null,
            shift: shift,
        };
    } catch (error) {
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// START SHIFT (Buka Kas)
// ============================================

/**
 * Buka shift baru untuk kasir
 * 
 * Validasi:
 * - User harus terautentikasi
 * - Tidak boleh ada shift aktif yang belum ditutup
 */
export const startShift = async (req: AuthenticatedRequest): Promise<StartShiftResponse> => {
    try {
        const body: StartShiftRequest = req.body;
        const metadata = getMetadataInfo(req);

        // Validate user authenticated
        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Check if there's already an active shift
        const activeShift = await shiftRepository.getActiveShift(metadata.account_id);
        if (activeShift) {
            throw new ErrorValidationException('Masih ada shift aktif yang belum ditutup', [
                {
                    location: 'system',
                    field: 'shift',
                    message: `Shift aktif dimulai pada ${activeShift.start_time.toLocaleString('id-ID')}`,
                },
            ]);
        }

        // Create new shift
        const shift = await shiftRepository.create({
            user_id: metadata.account_id,
            start_cash: body.start_cash,
            start_time: new Date(),
        });

        return {
            success: true,
            message: `Shift berhasil dibuka dengan modal ${formatMoney(body.start_cash)}`,
            shift: shift,
        };
    } catch (error) {
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// END SHIFT (Tutup Kas)
// ============================================

/**
 * Tutup shift kasir
 * 
 * Flow:
 * 1. Validasi ada shift aktif
 * 2. Cek tidak ada pesanan PENDING
 * 3. Hitung total penjualan (COMPLETED orders)
 * 4. Update shift dengan end_cash dan sold_total
 * 5. Return summary dengan selisih kas
 */
export const endShift = async (req: AuthenticatedRequest): Promise<EndShiftResponse> => {
    try {
        const body: EndShiftRequest = req.body;
        const metadata = getMetadataInfo(req);

        // Validate user authenticated
        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Get active shift
        const activeShift = await shiftRepository.getActiveShift(metadata.account_id);
        if (!activeShift) {
            throw new ErrorValidationException('Tidak ada shift aktif', [
                { location: 'system', field: 'shift', message: 'Silakan buka shift terlebih dahulu' },
            ]);
        }

        // Get order statistics
        const orderStats = await shiftRepository.getOrderStats(activeShift.shift_id);

        // Check for pending orders
        if (orderStats.pending_orders > 0) {
            throw new ErrorValidationException('Masih ada pesanan yang belum selesai', [
                {
                    location: 'system',
                    field: 'orders',
                    message: `Terdapat ${orderStats.pending_orders} pesanan dengan status PENDING`,
                },
            ]);
        }

        // Calculate expected cash
        // Expected = start_cash + cash_sales (QRIS tidak masuk kas fisik)
        const expectedCash = activeShift.start_cash + orderStats.cash_sales;
        const difference = body.end_cash - expectedCash;

        // End the shift
        const endTime = new Date();
        await shiftRepository.endShift(activeShift.shift_id, {
            end_cash: body.end_cash,
            sold_total: orderStats.total_sales,
            end_time: endTime,
        });

        // Build summary
        const summary: ShiftSummary = {
            shift_id: activeShift.shift_id,
            user_name: activeShift.user.name,
            start_time: activeShift.start_time,
            end_time: endTime,
            start_cash: activeShift.start_cash,
            end_cash: body.end_cash,
            sold_total: orderStats.total_sales,
            expected_cash: expectedCash,
            difference: difference,
            total_orders: orderStats.total_orders,
            completed_orders: orderStats.completed_orders,
            cancelled_orders: orderStats.cancelled_orders,
            cash_sales: orderStats.cash_sales,
            qris_sales: orderStats.qris_sales,
        };

        // Build message based on difference
        let message = 'Shift berhasil ditutup. ';
        if (difference === 0) {
            message += 'Kas sesuai dengan yang diharapkan.';
        } else if (difference > 0) {
            message += `Kas lebih ${formatMoney(difference)}.`;
        } else {
            message += `Kas kurang ${formatMoney(Math.abs(difference))}.`;
        }

        return {
            success: true,
            message: message,
            summary: summary,
        };
    } catch (error) {
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET SHIFT SUMMARY (for specific shift)
// ============================================

export const getShiftSummary = async (req: AuthenticatedRequest): Promise<ShiftSummary> => {
    try {
        const shiftId = req.params.shift_id;

        // Get shift
        const shift = await shiftRepository.findById(shiftId);
        if (!shift) {
            throw new ErrorNotFoundException('Shift tidak ditemukan');
        }

        // Get order statistics
        const orderStats = await shiftRepository.getOrderStats(shiftId);

        // Calculate expected cash
        const expectedCash = shift.start_cash + orderStats.cash_sales;
        const difference = shift.end_cash !== null ? shift.end_cash - expectedCash : 0;

        return {
            shift_id: shift.shift_id,
            user_name: shift.user.name,
            start_time: shift.start_time,
            end_time: shift.end_time || new Date(),
            start_cash: shift.start_cash,
            end_cash: shift.end_cash || 0,
            sold_total: orderStats.total_sales,
            expected_cash: expectedCash,
            difference: difference,
            total_orders: orderStats.total_orders,
            completed_orders: orderStats.completed_orders,
            cancelled_orders: orderStats.cancelled_orders,
            cash_sales: orderStats.cash_sales,
            qris_sales: orderStats.qris_sales,
        };
    } catch (error) {
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

// ============================================
// GET MY SHIFTS (Current user's shifts)
// ============================================

export const getMyShifts = async (req: AuthenticatedRequest): Promise<ShiftListResponse> => {
    try {
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
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

        const filter = {
            user_id: metadata.account_id,
            start_date: (req.query.start_date as string) || null,
            end_date: (req.query.end_date as string) || null,
            is_active: null,
        };

        const [data, totalData] = await Promise.all([
            shiftRepository.findAll(options, filter),
            shiftRepository.count(filter),
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
        console.error(`--- Shift Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const shiftService = {
    getAll,
    getDetail,
    getActiveShift,
    startShift,
    endShift,
    getShiftSummary,
    getMyShifts,
};

export default shiftService;
