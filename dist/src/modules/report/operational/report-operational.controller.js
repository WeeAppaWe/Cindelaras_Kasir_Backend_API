"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportOperationalController = exports.getFullReport = exports.getOrderStatus = exports.getMenuPerformance = exports.getTransactionStats = exports.getShiftSummary = exports.getCashierPerformance = void 0;
const report_operational_service_1 = __importDefault(require("./report-operational.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
// ============================================
// GET CASHIER PERFORMANCE
// ============================================
/**
 * Get Cashier Performance Report
 * GET /api/report/operational/cashier
 */
const getCashierPerformance = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getCashierPerformance(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil performa kasir' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getCashierPerformance = getCashierPerformance;
// ============================================
// GET SHIFT SUMMARY
// ============================================
/**
 * Get Shift Summary Report
 * GET /api/report/operational/shift
 */
const getShiftSummary = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getShiftSummary(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil rekap shift' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getShiftSummary = getShiftSummary;
// ============================================
// GET TRANSACTION STATISTICS
// ============================================
/**
 * Get Transaction Statistics
 * GET /api/report/operational/transactions
 */
const getTransactionStats = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getTransactionStats(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil statistik transaksi' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getTransactionStats = getTransactionStats;
// ============================================
// GET MENU PERFORMANCE
// ============================================
/**
 * Get Menu Performance Report
 * GET /api/report/operational/menu
 */
const getMenuPerformance = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getMenuPerformance(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil performa menu' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getMenuPerformance = getMenuPerformance;
// ============================================
// GET ORDER STATUS
// ============================================
/**
 * Get Order Status Summary
 * GET /api/report/operational/order-status
 */
const getOrderStatus = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getOrderStatus(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil status order' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderStatus = getOrderStatus;
// ============================================
// GET FULL REPORT
// ============================================
/**
 * Get Full Operational Report
 * GET /api/report/operational
 */
const getFullReport = async (req, res, next) => {
    try {
        const data = await report_operational_service_1.default.getFullReport(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil laporan operasional lengkap' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getFullReport = getFullReport;
// ============================================
// EXPORT CONTROLLER
// ============================================
exports.reportOperationalController = {
    getCashierPerformance: exports.getCashierPerformance,
    getShiftSummary: exports.getShiftSummary,
    getTransactionStats: exports.getTransactionStats,
    getMenuPerformance: exports.getMenuPerformance,
    getOrderStatus: exports.getOrderStatus,
    getFullReport: exports.getFullReport,
};
exports.default = exports.reportOperationalController;
//# sourceMappingURL=report-operational.controller.js.map