import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get Current Stock Report
 * GET /api/report/inventory/current
 */
export declare const getCurrentStock: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Movement Summary
 * GET /api/report/inventory/movement
 */
export declare const getMovementSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Alerts (Low/Out of Stock)
 * GET /api/report/inventory/alerts
 */
export declare const getStockAlerts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Inventory Valuation
 * GET /api/report/inventory/valuation
 */
export declare const getInventoryValuation: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Opname History
 * GET /api/report/inventory/opname
 */
export declare const getOpnameHistory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Ingredient Movement Card (Kartu Stok)
 * GET /api/report/inventory/card
 */
export declare const getIngredientCard: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Full Inventory Report
 * GET /api/report/inventory
 */
export declare const getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const reportInventoryController: {
    getCurrentStock: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getMovementSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getStockAlerts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getInventoryValuation: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getOpnameHistory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getIngredientCard: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default reportInventoryController;
//# sourceMappingURL=report-inventory.controller.d.ts.map