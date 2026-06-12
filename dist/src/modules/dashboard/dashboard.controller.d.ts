import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get Dashboard KPI Cards
 * GET /api/dashboard/kpi
 */
export declare const getKPI: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Sales Trend Chart Data
 * GET /api/dashboard/sales-trend
 */
export declare const getSalesTrend: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Top 5 Best-Selling Menus
 * GET /api/dashboard/top-menus
 */
export declare const getTopMenus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Status Distribution (radial chart)
 * GET /api/dashboard/stock-status
 */
export declare const getStockStatus: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Recent Stock Movements (activity table)
 * GET /api/dashboard/recent-stock-movements
 */
export declare const getRecentStockMovements: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const dashboardController: {
    getKPI: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getSalesTrend: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getTopMenus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getStockStatus: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getRecentStockMovements: (_req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default dashboardController;
//# sourceMappingURL=dashboard.controller.d.ts.map