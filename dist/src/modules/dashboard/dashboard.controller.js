"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.getRecentStockMovements = exports.getStockStatus = exports.getTopMenus = exports.getSalesTrend = exports.getKPI = void 0;
const dashboard_service_1 = __importDefault(require("./dashboard.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get Dashboard KPI Cards
 * GET /api/dashboard/kpi
 */
const getKPI = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.default.getKPI(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data KPI dashboard' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getKPI = getKPI;
/**
 * Get Sales Trend Chart Data
 * GET /api/dashboard/sales-trend
 */
const getSalesTrend = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.default.getSalesTrend(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data tren penjualan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getSalesTrend = getSalesTrend;
/**
 * Get Top 5 Best-Selling Menus
 * GET /api/dashboard/top-menus
 */
const getTopMenus = async (req, res, next) => {
    try {
        const data = await dashboard_service_1.default.getTopMenus(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data menu terlaris' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getTopMenus = getTopMenus;
/**
 * Get Stock Status Distribution (radial chart)
 * GET /api/dashboard/stock-status
 */
const getStockStatus = async (_req, res, next) => {
    try {
        const data = await dashboard_service_1.default.getStockStatus();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil status persediaan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getStockStatus = getStockStatus;
/**
 * Get Recent Stock Movements (activity table)
 * GET /api/dashboard/recent-stock-movements
 */
const getRecentStockMovements = async (_req, res, next) => {
    try {
        const data = await dashboard_service_1.default.getRecentStockMovements();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil mutasi stok terbaru' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getRecentStockMovements = getRecentStockMovements;
exports.dashboardController = {
    getKPI: exports.getKPI,
    getSalesTrend: exports.getSalesTrend,
    getTopMenus: exports.getTopMenus,
    getStockStatus: exports.getStockStatus,
    getRecentStockMovements: exports.getRecentStockMovements,
};
exports.default = exports.dashboardController;
//# sourceMappingURL=dashboard.controller.js.map