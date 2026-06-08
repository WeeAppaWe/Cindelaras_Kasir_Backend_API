import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get Financial Summary (Revenue, COGS, Profit, Margin)
 * GET /api/report/financial/summary
 */
export declare const getSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Payment Breakdown (CASH vs QRIS)
 * GET /api/report/financial/payment
 */
export declare const getPaymentBreakdown: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Cash Flow Report
 * GET /api/report/financial/cash-flow
 */
export declare const getCashFlow: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Top Selling Menus
 * GET /api/report/financial/top-menus
 */
export declare const getTopMenus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Sales By Category
 * GET /api/report/financial/by-category
 */
export declare const getSalesByCategory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Full Financial Report
 * GET /api/report/financial
 */
export declare const getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const reportFinancialController: {
    getSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getPaymentBreakdown: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getCashFlow: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getTopMenus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getSalesByCategory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getFullReport: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default reportFinancialController;
//# sourceMappingURL=report-financial.controller.d.ts.map