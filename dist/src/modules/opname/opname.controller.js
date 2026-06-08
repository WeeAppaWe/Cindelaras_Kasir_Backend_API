"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opnameController = exports.getIngredients = exports.softDelete = exports.applyAdjustment = exports.changeStatus = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const opname_service_1 = __importDefault(require("./opname.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Stock Opnames
 * GET /api/opname
 */
const showAll = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data stock opname' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Stock Opname Detail
 * GET /api/opname/:stock_opname_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail stock opname' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Stock Opname
 * POST /api/opname
 */
const create = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Stock opname berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Stock Opname
 * PATCH /api/opname/:stock_opname_id
 */
const update = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Stock opname berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Change Stock Opname Status
 * PATCH /api/opname/:stock_opname_id/status
 */
const changeStatus = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.changeStatus(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Status stock opname berhasil diubah' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.changeStatus = changeStatus;
/**
 * Apply Adjustment to Stock
 * POST /api/opname/:stock_opname_id/apply
 */
const applyAdjustment = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.applyAdjustment(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Adjustment berhasil diaplikasikan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.applyAdjustment = applyAdjustment;
/**
 * Delete Stock Opname (Soft Delete)
 * DELETE /api/opname/:stock_opname_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Stock opname berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
/**
 * Get All Ingredients (for opname form)
 * GET /api/opname/ingredients
 */
const getIngredients = async (req, res, next) => {
    try {
        const data = await opname_service_1.default.getIngredients();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data bahan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getIngredients = getIngredients;
exports.opnameController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    changeStatus: exports.changeStatus,
    applyAdjustment: exports.applyAdjustment,
    softDelete: exports.softDelete,
    getIngredients: exports.getIngredients,
};
exports.default = exports.opnameController;
//# sourceMappingURL=opname.controller.js.map