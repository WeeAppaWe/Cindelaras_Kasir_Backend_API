import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Stock Types
 * GET /api/stock-type
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Type Detail
 * GET /api/stock-type/:stock_type_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const stockTypeController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default stockTypeController;
//# sourceMappingURL=stock-type.controller.d.ts.map