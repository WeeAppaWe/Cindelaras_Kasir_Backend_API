import { AuthenticatedRequest } from '../../../../types';
import { SemiIngredientListResponse, SemiIngredientWithRelations, SemiIngredientWithCompositions, DeleteSemiIngredientResponse, SemiIngredientHPPResult } from './ingredient-semi.types';
/**
 * Get all semi ingredients with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<SemiIngredientListResponse>;
/**
 * Get semi ingredient detail by ID (with compositions and HPP)
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<SemiIngredientWithCompositions>;
/**
 * Create new semi ingredient
 */
export declare const create: (req: AuthenticatedRequest) => Promise<SemiIngredientWithRelations>;
/**
 * Update semi ingredient by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<SemiIngredientWithRelations>;
/**
 * Soft delete semi ingredient by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteSemiIngredientResponse>;
/**
 * Get HPP calculation for a semi ingredient
 */
export declare const getHPPCalculation: (ingredientId: string, targetYield?: number) => Promise<SemiIngredientHPPResult>;
/**
 * Recalculate and update avg_cost (HPP per unit) for a semi ingredient
 */
export declare const recalculateAvgCost: (ingredientId: string, targetYield?: number) => Promise<number>;
export declare const semiIngredientService: {
    getAll: (req: AuthenticatedRequest) => Promise<SemiIngredientListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<SemiIngredientWithCompositions>;
    create: (req: AuthenticatedRequest) => Promise<SemiIngredientWithRelations>;
    update: (req: AuthenticatedRequest) => Promise<SemiIngredientWithRelations>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteSemiIngredientResponse>;
    getHPPCalculation: (ingredientId: string, targetYield?: number) => Promise<SemiIngredientHPPResult>;
    recalculateAvgCost: (ingredientId: string, targetYield?: number) => Promise<number>;
};
export default semiIngredientService;
//# sourceMappingURL=ingredient-semi.service.d.ts.map