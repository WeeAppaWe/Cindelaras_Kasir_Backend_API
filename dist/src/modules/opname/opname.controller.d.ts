import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Stock Opnames
 * GET /api/opname
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Opname Detail
 * GET /api/opname/:stock_opname_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Stock Opname
 * POST /api/opname
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Stock Opname
 * PATCH /api/opname/:stock_opname_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Change Stock Opname Status
 * PATCH /api/opname/:stock_opname_id/status
 */
export declare const changeStatus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Apply Adjustment to Stock
 * POST /api/opname/:stock_opname_id/apply
 */
export declare const applyAdjustment: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Stock Opname (Soft Delete)
 * DELETE /api/opname/:stock_opname_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Ingredients (for opname form)
 * GET /api/opname/ingredients
 */
export declare const getIngredients: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const opnameController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    changeStatus: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    applyAdjustment: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getIngredients: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default opnameController;
//# sourceMappingURL=opname.controller.d.ts.map