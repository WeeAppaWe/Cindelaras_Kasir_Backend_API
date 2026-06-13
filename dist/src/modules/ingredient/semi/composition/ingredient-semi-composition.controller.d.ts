import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../../types';
/**
 * Get All Compositions for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/composition
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Add Composition to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition
 */
export declare const addComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Bulk Add Compositions to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition/bulk
 */
export declare const bulkAddCompositions: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Composition Quantity
 * PUT /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
export declare const updateComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Composition
 * DELETE /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
export declare const deleteComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Available Ingredients for Composition (RAW + SEMI, exclude self)
 * GET /api/ingredient/semi/composition/available-ingredients?exclude_id=:ingredient_id
 */
export declare const getAvailableIngredients: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Preview HPP Calculation
 * POST /api/ingredient/semi/composition/preview-hpp
 */
export declare const previewHPP: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const compositionController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    addComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    bulkAddCompositions: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    updateComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteComposition: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getAvailableIngredients: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    previewHPP: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default compositionController;
//# sourceMappingURL=ingredient-semi-composition.controller.d.ts.map