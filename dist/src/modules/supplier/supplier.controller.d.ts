import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Suppliers
 * GET /api/supplier
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Supplier Detail
 * GET /api/supplier/:supplier_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Supplier
 * POST /api/supplier
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Supplier
 * PATCH /api/supplier/:supplier_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Supplier (Soft Delete)
 * DELETE /api/supplier/:supplier_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const supplierController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default supplierController;
//# sourceMappingURL=supplier.controller.d.ts.map