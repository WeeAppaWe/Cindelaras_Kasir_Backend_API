import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Get Semi Ingredient References (for dropdown)
 * GET /api/ingredient/semi/options
 */
export declare const getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Semi Ingredients
 * GET /api/ingredient/semi
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Semi Ingredient Detail (with compositions and HPP)
 * GET /api/ingredient/semi/:ingredient_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Semi Ingredient
 * POST /api/ingredient/semi
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Semi Ingredient
 * PUT /api/ingredient/semi/:ingredient_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Semi Ingredient (Soft Delete)
 * DELETE /api/ingredient/semi/:ingredient_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/semi/units
 */
export declare const getUnitMeasures: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get HPP Calculation for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/hpp
 */
export declare const getHPPCalculation: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Recalculate and Update avg_cost (HPP per unit)
 * POST /api/ingredient/semi/:ingredient_id/recalculate-hpp
 */
export declare const recalculateHPP: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Produce Semi Ingredient — deduct child stock, increment semi stock
 * POST /api/ingredient/semi/:ingredient_id/produce
 */
export declare const produce: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create and Produce Semi Ingredient (all-in-one)
 * POST /api/ingredient/semi/create-and-produce
 */
export declare const createAndProduce: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const semiIngredientController: {
    getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getUnitMeasures: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getHPPCalculation: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    recalculateHPP: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    produce: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    createAndProduce: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default semiIngredientController;
//# sourceMappingURL=ingredient-semi.controller.d.ts.map