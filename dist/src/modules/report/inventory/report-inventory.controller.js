"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportInventoryController = exports.getFullReport = exports.getIngredientCard = exports.getOpnameHistory = exports.getInventoryValuation = exports.getStockAlerts = exports.getMovementSummary = exports.getCurrentStock = void 0;
const report_inventory_service_1 = __importDefault(require("./report-inventory.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
// ============================================
// GET CURRENT STOCK
// ============================================
/**
 * Get Current Stock Report
 * GET /api/report/inventory/current
 */
const getCurrentStock = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getCurrentStock(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil stok saat ini' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentStock = getCurrentStock;
// ============================================
// GET MOVEMENT SUMMARY
// ============================================
/**
 * Get Stock Movement Summary
 * GET /api/report/inventory/movement
 */
const getMovementSummary = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getMovementSummary(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil ringkasan pergerakan stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getMovementSummary = getMovementSummary;
// ============================================
// GET STOCK ALERTS
// ============================================
/**
 * Get Stock Alerts (Low/Out of Stock)
 * GET /api/report/inventory/alerts
 */
const getStockAlerts = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getStockAlerts(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil alert stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getStockAlerts = getStockAlerts;
// ============================================
// GET INVENTORY VALUATION
// ============================================
/**
 * Get Inventory Valuation
 * GET /api/report/inventory/valuation
 */
const getInventoryValuation = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getInventoryValuation(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil valuasi inventaris' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getInventoryValuation = getInventoryValuation;
// ============================================
// GET OPNAME HISTORY
// ============================================
/**
 * Get Stock Opname History
 * GET /api/report/inventory/opname
 */
const getOpnameHistory = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getOpnameHistory(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil riwayat stock opname' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getOpnameHistory = getOpnameHistory;
// ============================================
// GET INGREDIENT MOVEMENT CARD
// ============================================
/**
 * Get Ingredient Movement Card (Kartu Stok)
 * GET /api/report/inventory/card
 */
const getIngredientCard = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getIngredientCard(req);
        if (!data) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan tidak ditemukan');
        }
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil kartu stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getIngredientCard = getIngredientCard;
// ============================================
// GET FULL REPORT
// ============================================
/**
 * Get Full Inventory Report
 * GET /api/report/inventory
 */
const getFullReport = async (req, res, next) => {
    try {
        const data = await report_inventory_service_1.default.getFullReport(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil laporan persediaan lengkap' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getFullReport = getFullReport;
// ============================================
// EXPORT CONTROLLER
// ============================================
exports.reportInventoryController = {
    getCurrentStock: exports.getCurrentStock,
    getMovementSummary: exports.getMovementSummary,
    getStockAlerts: exports.getStockAlerts,
    getInventoryValuation: exports.getInventoryValuation,
    getOpnameHistory: exports.getOpnameHistory,
    getIngredientCard: exports.getIngredientCard,
    getFullReport: exports.getFullReport,
};
exports.default = exports.reportInventoryController;
//# sourceMappingURL=report-inventory.controller.js.map