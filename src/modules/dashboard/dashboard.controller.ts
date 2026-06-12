import { Response, NextFunction } from 'express';
import dashboardService from './dashboard.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get Dashboard KPI Cards
 * GET /api/dashboard/kpi
 */
export const getKPI = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await dashboardService.getKPI(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data KPI dashboard' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Sales Trend Chart Data
 * GET /api/dashboard/sales-trend
 */
export const getSalesTrend = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await dashboardService.getSalesTrend(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data tren penjualan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Top 5 Best-Selling Menus
 * GET /api/dashboard/top-menus
 */
export const getTopMenus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await dashboardService.getTopMenus(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data menu terlaris' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Stock Status Distribution (radial chart)
 * GET /api/dashboard/stock-status
 */
export const getStockStatus = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await dashboardService.getStockStatus();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil status persediaan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Recent Stock Movements (activity table)
 * GET /api/dashboard/recent-stock-movements
 */
export const getRecentStockMovements = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await dashboardService.getRecentStockMovements();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil mutasi stok terbaru' }, data));
    } catch (error) {
        next(error);
    }
};

export const dashboardController = {
    getKPI,
    getSalesTrend,
    getTopMenus,
    getStockStatus,
    getRecentStockMovements,
};

export default dashboardController;
