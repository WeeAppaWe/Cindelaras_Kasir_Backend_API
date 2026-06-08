import { AuthenticatedRequest } from '../../../../types';
import { RawIngredientListResponse, RawIngredientWithRelations, DeleteRawIngredientResponse, LowStockAlertResponse } from './ingredient-raw.types';
/**
 * Get all raw ingredients with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<RawIngredientListResponse>;
/**
 * Get raw ingredient detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
/**
 * Create new raw ingredient
 */
export declare const create: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
/**
 * Update raw ingredient by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
/**
 * Soft delete raw ingredient by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteRawIngredientResponse>;
/**
 * Get low stock alerts
 */
export declare const getLowStockAlerts: () => Promise<LowStockAlertResponse>;
export declare const rawIngredientService: {
    getAll: (req: AuthenticatedRequest) => Promise<RawIngredientListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
    create: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
    update: (req: AuthenticatedRequest) => Promise<RawIngredientWithRelations>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteRawIngredientResponse>;
    getLowStockAlerts: () => Promise<LowStockAlertResponse>;
};
export default rawIngredientService;
//# sourceMappingURL=ingredient-raw.service.d.ts.map