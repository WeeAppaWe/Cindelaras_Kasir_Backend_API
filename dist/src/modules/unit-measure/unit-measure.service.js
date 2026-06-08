"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitMeasureService = exports.softDelete = exports.update = exports.create = exports.findById = exports.getDetail = exports.getAll = exports.getAllReferences = void 0;
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const pagination_utility_1 = require("../../../utility/pagination.utility");
const unit_measure_repository_1 = __importDefault(require("./unit-measure.repository"));
/**
 * Get all unit measures (for dropdown/selection)
 */
const getAllReferences = async () => {
    try {
        return await unit_measure_repository_1.default.findAllReferences();
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAllReferences = getAllReferences;
/**
 * Get all unit measures with pagination and filters
 */
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
            search: req.query.search || null,
        };
        const [data, totalData] = await Promise.all([
            unit_measure_repository_1.default.findAll(options, filter),
            unit_measure_repository_1.default.count(filter),
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
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get unit measure detail by ID
 */
const getDetail = async (req) => {
    try {
        const unitMeasureId = req.params.unit_measure_id;
        const unit = await unit_measure_repository_1.default.findById(unitMeasureId);
        if (!unit) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Satuan tidak ditemukan');
        }
        return unit;
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Find unit measure by ID (for validation)
 */
const findById = async (unitMeasureId) => {
    try {
        return await unit_measure_repository_1.default.findById(unitMeasureId);
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.findById = findById;
/**
 * Create new unit measure
 */
const create = async (req) => {
    try {
        const body = req.body;
        const existingUnit = await unit_measure_repository_1.default.findByName(body.name);
        if (existingUnit) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama satuan sudah digunakan');
        }
        return await unit_measure_repository_1.default.create({
            name: body.name,
        });
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update unit measure by ID
 */
const update = async (req) => {
    try {
        const unitMeasureId = req.params.unit_measure_id;
        const body = req.body;
        const existingUnit = await unit_measure_repository_1.default.findById(unitMeasureId);
        if (!existingUnit) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Satuan tidak ditemukan');
        }
        if (body.name) {
            const duplicateUnit = await unit_measure_repository_1.default.findByName(body.name, unitMeasureId);
            if (duplicateUnit) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama satuan sudah digunakan');
            }
        }
        const updateData = {};
        if (body.name)
            updateData.name = body.name;
        return await unit_measure_repository_1.default.update(unitMeasureId, updateData);
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete unit measure by ID
 */
const softDelete = async (req) => {
    try {
        const unitMeasureId = req.params.unit_measure_id;
        const existingUnit = await unit_measure_repository_1.default.findById(unitMeasureId);
        if (!existingUnit) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Satuan tidak ditemukan');
        }
        const hasIngredients = await unit_measure_repository_1.default.hasIngredients(unitMeasureId);
        if (hasIngredients) {
            throw new error_validation_exception_1.ErrorValidationException('Satuan tidak dapat dihapus karena masih digunakan oleh bahan', [
                { location: 'params', field: 'unit_measure_id', message: 'Satuan masih memiliki bahan terkait' },
            ]);
        }
        await unit_measure_repository_1.default.softDelete(unitMeasureId);
        return {
            success: true,
            message: 'Satuan berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Unit Measure Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
exports.unitMeasureService = {
    getAllReferences: exports.getAllReferences,
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    findById: exports.findById,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.unitMeasureService;
//# sourceMappingURL=unit-measure.service.js.map