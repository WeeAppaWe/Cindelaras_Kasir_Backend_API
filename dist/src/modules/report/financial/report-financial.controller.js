"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFinancialController = exports.getFullReport = exports.getSalesByCategory = exports.getTopMenus = exports.getCashFlow = exports.getPaymentBreakdown = exports.getSummary = void 0;
const report_financial_service_1 = __importDefault(require("./report-financial.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
// ============================================
// GET SUMMARY
// ============================================
/**
 * Get Financial Summary (Revenue, COGS, Profit, Margin)
 * GET /api/report/financial/summary
 */
const getSummary = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getSummary(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil ringkasan keuangan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getSummary = getSummary;
// ============================================
// GET PAYMENT BREAKDOWN
// ============================================
/**
 * Get Payment Breakdown (CASH vs QRIS)
 * GET /api/report/financial/payment
 */
const getPaymentBreakdown = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getPaymentBreakdown(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil breakdown pembayaran' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getPaymentBreakdown = getPaymentBreakdown;
// ============================================
// GET CASH FLOW
// ============================================
/**
 * Get Cash Flow Report
 * GET /api/report/financial/cash-flow
 */
const getCashFlow = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getCashFlow(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil laporan arus kas' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getCashFlow = getCashFlow;
// ============================================
// GET TOP MENUS
// ============================================
/**
 * Get Top Selling Menus
 * GET /api/report/financial/top-menus
 */
const getTopMenus = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getTopMenus(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil menu terlaris' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getTopMenus = getTopMenus;
// ============================================
// GET SALES BY CATEGORY
// ============================================
/**
 * Get Sales By Category
 * GET /api/report/financial/by-category
 */
const getSalesByCategory = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getSalesByCategory(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil penjualan per kategori' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getSalesByCategory = getSalesByCategory;
// ============================================
// GET FULL REPORT
// ============================================
/**
 * Get Full Financial Report
 * GET /api/report/financial
 */
const getFullReport = async (req, res, next) => {
    try {
        const data = await report_financial_service_1.default.getFullReport(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil laporan keuangan lengkap' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getFullReport = getFullReport;
// ============================================
// EXPORT CONTROLLER
// ============================================
exports.reportFinancialController = {
    getSummary: exports.getSummary,
    getPaymentBreakdown: exports.getPaymentBreakdown,
    getCashFlow: exports.getCashFlow,
    getTopMenus: exports.getTopMenus,
    getSalesByCategory: exports.getSalesByCategory,
    getFullReport: exports.getFullReport,
};
exports.default = exports.reportFinancialController;
//# sourceMappingURL=report-financial.controller.js.map