"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashMovementService = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const pagination_utility_1 = require("../../../utility/pagination.utility");
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const cash_movement_repository_1 = __importDefault(require("./cash-movement.repository"));
/**
 * Get all cash movements with pagination and filters
 */
const getAll = async (req) => {
    try {
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Get active shift or use provided shift_id
        let shiftId = req.query.shift_id;
        if (!shiftId) {
            const activeShift = await cash_movement_repository_1.default.getActiveShift(metadata.account_id);
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
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        // Set filter
        const filter = {
            shift_id: shiftId,
            type: req.query.type || null,
        };
        const [data, totalData, summary] = await Promise.all([
            cash_movement_repository_1.default.findAll(options, filter),
            cash_movement_repository_1.default.count(filter),
            cash_movement_repository_1.default.getSummaryByShift(shiftId),
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
    }
    catch (error) {
        console.error(`--- Cash Movement Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get cash movement detail by ID
 */
const getDetail = async (req) => {
    try {
        const cashMovementId = req.params.cash_movement_id;
        const cashMovement = await cash_movement_repository_1.default.findById(cashMovementId);
        if (!cashMovement) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Mutasi kas tidak ditemukan');
        }
        return cashMovement;
    }
    catch (error) {
        console.error(`--- Cash Movement Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new cash movement
 */
const create = async (req) => {
    try {
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        const body = req.body;
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Check active shift
        const activeShift = await cash_movement_repository_1.default.getActiveShift(metadata.account_id);
        if (!activeShift) {
            throw new error_validation_exception_1.ErrorValidationException('Tidak ada shift aktif', [
                { location: 'auth', field: 'shift_id', message: 'Anda harus membuka shift terlebih dahulu' },
            ]);
        }
        // Create cash movement
        const result = await cash_movement_repository_1.default.create({
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
    }
    catch (error) {
        console.error(`--- Cash Movement Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
exports.cashMovementService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
};
exports.default = exports.cashMovementService;
//# sourceMappingURL=cash-movement.service.js.map