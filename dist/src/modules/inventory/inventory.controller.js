"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryController = exports.getStockTypes = exports.getHistoryByIngredient = exports.stockOut = exports.stockIn = exports.getDetail = exports.getHistory = void 0;
const inventory_service_1 = __importDefault(require("./inventory.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get Stock Movement History
 * GET /api/inventory
 */
const getHistory = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.getHistory(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil riwayat stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getHistory = getHistory;
/**
 * Get Stock Movement Detail
 * GET /api/inventory/:stock_movement_id
 */
const getDetail = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail pergerakan stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getDetail = getDetail;
/**
 * Stock IN - Barang Masuk dari Supplier
 * POST /api/inventory/stock-in
 */
const stockIn = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.stockIn(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Barang masuk berhasil dicatat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.stockIn = stockIn;
/**
 * Stock OUT - Barang Keluar (Rusak/Kedaluarsa)
 * POST /api/inventory/stock-out
 */
const stockOut = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.stockOut(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Barang keluar berhasil dicatat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.stockOut = stockOut;
/**
 * Get Stock Movement History by Ingredient
 * GET /api/inventory/ingredient/:ingredient_id
 */
const getHistoryByIngredient = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.getHistoryByIngredient(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil riwayat stok bahan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getHistoryByIngredient = getHistoryByIngredient;
/**
 * Get Available Stock Types
 * GET /api/inventory/stock-types
 */
const getStockTypes = async (req, res, next) => {
    try {
        const data = await inventory_service_1.default.getStockTypes();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil tipe stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getStockTypes = getStockTypes;
exports.inventoryController = {
    getHistory: exports.getHistory,
    getDetail: exports.getDetail,
    stockIn: exports.stockIn,
    stockOut: exports.stockOut,
    getHistoryByIngredient: exports.getHistoryByIngredient,
    getStockTypes: exports.getStockTypes,
};
exports.default = exports.inventoryController;
//# sourceMappingURL=inventory.controller.js.map