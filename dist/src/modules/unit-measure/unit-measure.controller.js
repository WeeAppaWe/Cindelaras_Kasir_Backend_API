"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitMeasureController = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = exports.getReferences = void 0;
const unit_measure_service_1 = __importDefault(require("./unit-measure.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get Unit Measure References (for dropdown)
 * GET /api/unit-measure/options
 */
const getReferences = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.getAllReferences();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data pilihan satuan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getReferences = getReferences;
/**
 * Get All Unit Measures
 * GET /api/unit-measure
 */
const showAll = async (req, res, next) => {
    try {
        const units = await unit_measure_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data satuan' }, units));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Unit Measure Detail
 * GET /api/unit-measure/:unit_measure_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail satuan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Unit Measure
 * POST /api/unit-measure
 */
const create = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Satuan berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Unit Measure
 * PATCH /api/unit-measure/:unit_measure_id
 */
const update = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Satuan berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Unit Measure (Soft Delete)
 * DELETE /api/unit-measure/:unit_measure_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Satuan berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
exports.unitMeasureController = {
    getReferences: exports.getReferences,
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.unitMeasureController;
//# sourceMappingURL=unit-measure.controller.js.map