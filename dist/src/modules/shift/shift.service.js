"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftService = exports.getMyShifts = exports.getShiftSummary = exports.endShift = exports.startShift = exports.getActiveShift = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const pagination_utility_1 = require("../../../utility/pagination.utility");
const format_money_utility_1 = require("../../../utility/format-money.utility");
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const shift_repository_1 = __importDefault(require("./shift.repository"));
// ============================================
// GET ALL SHIFTS (History)
// ============================================
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        const filter = {
            user_id: req.query.user_id || null,
            start_date: req.query.start_date || null,
            end_date: req.query.end_date || null,
            is_active: req.query.is_active === 'true' ? true : req.query.is_active === 'false' ? false : null,
        };
        const [data, totalData] = await Promise.all([
            shift_repository_1.default.findAll(options, filter),
            shift_repository_1.default.count(filter),
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
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
// ============================================
// GET SHIFT DETAIL
// ============================================
const getDetail = async (req) => {
    try {
        const shiftId = req.params.shift_id;
        const shift = await shift_repository_1.default.findById(shiftId);
        if (!shift) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Shift tidak ditemukan');
        }
        return shift;
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
// ============================================
// GET ACTIVE SHIFT
// ============================================
const getActiveShift = async (req) => {
    try {
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        const shift = await shift_repository_1.default.getActiveShift(metadata.account_id);
        return {
            is_active: shift !== null,
            shift: shift,
        };
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.getActiveShift = getActiveShift;
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
const startShift = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        // Validate user authenticated
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Check if there's already an active shift
        const activeShift = await shift_repository_1.default.getActiveShift(metadata.account_id);
        if (activeShift) {
            const timezone = req.user?.timezone || 'Asia/Jakarta';
            throw new error_validation_exception_1.ErrorValidationException('Masih ada shift aktif yang belum ditutup', [
                {
                    location: 'system',
                    field: 'shift',
                    message: `Shift aktif dimulai pada ${activeShift.start_time.toLocaleString('id-ID', { timeZone: timezone })}`,
                },
            ]);
        }
        // Create new shift
        const shift = await shift_repository_1.default.create({
            user_id: metadata.account_id,
            start_cash: body.start_cash,
            start_time: new Date(),
        });
        return {
            success: true,
            message: `Shift berhasil dibuka dengan modal ${(0, format_money_utility_1.formatMoney)(body.start_cash)}`,
            shift: shift,
        };
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.startShift = startShift;
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
const endShift = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        // Validate user authenticated
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Get active shift
        const activeShift = await shift_repository_1.default.getActiveShift(metadata.account_id);
        if (!activeShift) {
            throw new error_validation_exception_1.ErrorValidationException('Tidak ada shift aktif', [
                { location: 'system', field: 'shift', message: 'Silakan buka shift terlebih dahulu' },
            ]);
        }
        // Get order statistics
        const orderStats = await shift_repository_1.default.getOrderStats(activeShift.shift_id);
        // Check for pending orders
        if (orderStats.pending_orders > 0) {
            throw new error_validation_exception_1.ErrorValidationException('Masih ada pesanan yang belum selesai', [
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
        await shift_repository_1.default.endShift(activeShift.shift_id, {
            end_cash: body.end_cash,
            sold_total: orderStats.total_sales,
            end_time: endTime,
        });
        // Build summary
        const summary = {
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
        }
        else if (difference > 0) {
            message += `Kas lebih ${(0, format_money_utility_1.formatMoney)(difference)}.`;
        }
        else {
            message += `Kas kurang ${(0, format_money_utility_1.formatMoney)(Math.abs(difference))}.`;
        }
        return {
            success: true,
            message: message,
            summary: summary,
        };
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.endShift = endShift;
// ============================================
// GET SHIFT SUMMARY (for specific shift)
// ============================================
const getShiftSummary = async (req) => {
    try {
        const shiftId = req.params.shift_id;
        // Get shift
        const shift = await shift_repository_1.default.findById(shiftId);
        if (!shift) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Shift tidak ditemukan');
        }
        // Get order statistics
        const orderStats = await shift_repository_1.default.getOrderStats(shiftId);
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
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.getShiftSummary = getShiftSummary;
// ============================================
// GET MY SHIFTS (Current user's shifts)
// ============================================
const getMyShifts = async (req) => {
    try {
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        const filter = {
            user_id: metadata.account_id,
            start_date: req.query.start_date || null,
            end_date: req.query.end_date || null,
            is_active: null,
        };
        const [data, totalData] = await Promise.all([
            shift_repository_1.default.findAll(options, filter),
            shift_repository_1.default.count(filter),
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
    }
    catch (error) {
        console.error(`--- Shift Service Error: ${error.message}`);
        throw error;
    }
};
exports.getMyShifts = getMyShifts;
exports.shiftService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    getActiveShift: exports.getActiveShift,
    startShift: exports.startShift,
    endShift: exports.endShift,
    getShiftSummary: exports.getShiftSummary,
    getMyShifts: exports.getMyShifts,
};
exports.default = exports.shiftService;
//# sourceMappingURL=shift.service.js.map