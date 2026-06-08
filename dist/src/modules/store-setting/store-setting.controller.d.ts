import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get All Store Settings (as array)
 * GET /api/store-setting
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Store Settings as Map (key-value object)
 * GET /api/store-setting/map
 */
export declare const showAllAsMap: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Store Setting by Key
 * GET /api/store-setting/:setting_key
 */
export declare const getByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Upsert Store Setting (create or update)
 * POST /api/store-setting
 */
export declare const upsert: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Store Setting by Key (upsert)
 * PUT /api/store-setting/:setting_key
 */
export declare const upsertByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Batch Update Store Settings
 * PUT /api/store-setting/batch
 */
export declare const batchUpdate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Store Setting by Key (Soft Delete)
 * DELETE /api/store-setting/:setting_key
 */
export declare const deleteByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Public Store Info (name and logo only)
 * GET /api/store-setting/public/info
 * This endpoint is accessible by authenticated users (Admin & Cashier)
 */
export declare const getPublicInfo: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const storeSettingController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    showAllAsMap: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    upsert: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    upsertByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    batchUpdate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteByKey: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getPublicInfo: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default storeSettingController;
//# sourceMappingURL=store-setting.controller.d.ts.map