import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get All Raw Ingredients
 * GET /api/ingredient/raw
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Raw Ingredient Detail
 * GET /api/ingredient/raw/:ingredient_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Raw Ingredient
 * POST /api/ingredient/raw
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Raw Ingredient
 * PUT /api/ingredient/raw/:ingredient_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Raw Ingredient (Soft Delete)
 * DELETE /api/ingredient/raw/:ingredient_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/raw/units
 */
export declare const getUnitMeasures: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Low Stock Alerts
 * GET /api/ingredient/raw/low-stock
 */
export declare const getLowStockAlerts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const rawIngredientController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getUnitMeasures: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getLowStockAlerts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default rawIngredientController;
//# sourceMappingURL=ingredient-raw.controller.d.ts.map