import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Menus
 * GET /api/menu
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Menu Detail
 * GET /api/menu/:menu_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Menu
 * POST /api/menu
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Menu
 * PUT /api/menu/:menu_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Menu (Soft Delete)
 * DELETE /api/menu/:menu_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Toggle Menu Availability
 * PATCH /api/menu/:menu_id/toggle-availability
 */
export declare const toggleAvailability: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const menuController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    toggleAvailability: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default menuController;
//# sourceMappingURL=menu.controller.d.ts.map