import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get Cashier Performance Report
 * GET /api/report/operational/cashier
 */
export declare const getCashierPerformance: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Shift Summary Report
 * GET /api/report/operational/shift
 */
export declare const getShiftSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Transaction Statistics
 * GET /api/report/operational/transactions
 */
export declare const getTransactionStats: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Menu Performance Report
 * GET /api/report/operational/menu
 */
export declare const getMenuPerformance: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Order Status Summary
 * GET /api/report/operational/order-status
 */
export declare const getOrderStatus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Full Operational Report
 * GET /api/report/operational
 */
export declare const getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const reportOperationalController: {
    getCashierPerformance: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getShiftSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getTransactionStats: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getMenuPerformance: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getOrderStatus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default reportOperationalController;
//# sourceMappingURL=report-operational.controller.d.ts.map