"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawIngredientController = exports.getLowStockAlerts = exports.getUnitMeasures = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const ingredient_raw_service_1 = __importDefault(require("./ingredient-raw.service"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
/**
 * Get All Raw Ingredients
 * GET /api/ingredient/raw
 */
const showAll = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data bahan baku' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Raw Ingredient Detail
 * GET /api/ingredient/raw/:ingredient_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail bahan baku' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Raw Ingredient
 * POST /api/ingredient/raw
 */
const create = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Bahan baku berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Raw Ingredient
 * PUT /api/ingredient/raw/:ingredient_id
 */
const update = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Bahan baku berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Raw Ingredient (Soft Delete)
 * DELETE /api/ingredient/raw/:ingredient_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Bahan baku berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/raw/units
 */
const getUnitMeasures = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.getAllReferences();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data satuan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getUnitMeasures = getUnitMeasures;
/**
 * Get Low Stock Alerts
 * GET /api/ingredient/raw/low-stock
 */
const getLowStockAlerts = async (req, res, next) => {
    try {
        const data = await ingredient_raw_service_1.default.getLowStockAlerts();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data stok rendah' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getLowStockAlerts = getLowStockAlerts;
exports.rawIngredientController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getUnitMeasures: exports.getUnitMeasures,
    getLowStockAlerts: exports.getLowStockAlerts,
};
exports.default = exports.rawIngredientController;
//# sourceMappingURL=ingredient-raw.controller.js.map