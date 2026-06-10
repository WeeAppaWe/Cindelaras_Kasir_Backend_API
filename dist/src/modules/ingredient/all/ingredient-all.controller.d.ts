import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get Ingredient References (for dropdown)
 * GET /api/ingredient/options
 */
export declare const getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const ingredientAllController: {
    getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default ingredientAllController;
//# sourceMappingURL=ingredient-all.controller.d.ts.map