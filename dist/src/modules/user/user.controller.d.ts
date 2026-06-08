import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Users
 * GET /api/user
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get User Detail
 * GET /api/user/:user_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New User
 * POST /api/user
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update User
 * PUT /api/user/:user_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete User (Soft Delete)
 * DELETE /api/user/:user_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Roles (for dropdown)
 * GET /api/user/roles
 */
export declare const getRoles: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All User Statuses (for dropdown)
 * GET /api/user/statuses
 */
export declare const getUserStatuses: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const userController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getRoles: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getUserStatuses: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default userController;
//# sourceMappingURL=user.controller.d.ts.map