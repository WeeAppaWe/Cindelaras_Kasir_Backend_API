import { AuthenticatedRequest } from '../../../../../types';
import { CompositionListResponse, CompositionWithDetails, DeleteCompositionResponse, AvailableRawIngredient, HPPPreviewResponse } from './ingredient-semi-composition.types';
/**
 * Get all compositions for a semi ingredient
 */
export declare const getCompositions: (req: AuthenticatedRequest) => Promise<CompositionListResponse>;
/**
 * Add new composition to semi ingredient
 */
export declare const addComposition: (req: AuthenticatedRequest) => Promise<CompositionWithDetails>;
/**
 * Bulk add compositions to semi ingredient
 */
export declare const bulkAddCompositions: (req: AuthenticatedRequest) => Promise<CompositionListResponse>;
/**
 * Update composition quantity
 */
export declare const updateComposition: (req: AuthenticatedRequest) => Promise<CompositionWithDetails>;
/**
 * Delete composition
 */
export declare const deleteComposition: (req: AuthenticatedRequest) => Promise<DeleteCompositionResponse>;
/**
 * Get available raw ingredients for composition
 */
export declare const getAvailableIngredients: () => Promise<AvailableRawIngredient[]>;
/**
 * Preview HPP calculation before saving
 */
export declare const previewHPP: (req: AuthenticatedRequest) => Promise<HPPPreviewResponse>;
export declare const compositionService: {
    getCompositions: (req: AuthenticatedRequest) => Promise<CompositionListResponse>;
    addComposition: (req: AuthenticatedRequest) => Promise<CompositionWithDetails>;
    bulkAddCompositions: (req: AuthenticatedRequest) => Promise<CompositionListResponse>;
    updateComposition: (req: AuthenticatedRequest) => Promise<CompositionWithDetails>;
    deleteComposition: (req: AuthenticatedRequest) => Promise<DeleteCompositionResponse>;
    getAvailableIngredients: () => Promise<AvailableRawIngredient[]>;
    previewHPP: (req: AuthenticatedRequest) => Promise<HPPPreviewResponse>;
};
export default compositionService;
//# sourceMappingURL=ingredient-semi-composition.service.d.ts.map