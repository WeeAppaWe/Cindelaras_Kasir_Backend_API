import { AuthenticatedRequest } from '../../../types';
import { OpnameListResponse, OpnameWithDetails, DeleteOpnameResponse, ApplyAdjustmentResponse, IngredientForOpname } from './opname.types';
/**
 * Get all stock opnames with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<OpnameListResponse>;
/**
 * Get stock opname detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
/**
 * Create new stock opname
 */
export declare const create: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
/**
 * Update stock opname (only DRAFT status)
 */
export declare const update: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
/**
 * Change opname status (DRAFT -> COMPLETED or CANCELLED)
 */
export declare const changeStatus: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
/**
 * Apply adjustment to stock (COMPLETED -> APPLIED)
 */
export declare const applyAdjustment: (req: AuthenticatedRequest) => Promise<ApplyAdjustmentResponse>;
/**
 * Soft delete stock opname (only DRAFT or CANCELLED)
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteOpnameResponse>;
/**
 * Get all ingredients for opname form
 */
export declare const getIngredients: () => Promise<IngredientForOpname[]>;
export declare const opnameService: {
    getAll: (req: AuthenticatedRequest) => Promise<OpnameListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
    create: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
    update: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
    changeStatus: (req: AuthenticatedRequest) => Promise<OpnameWithDetails>;
    applyAdjustment: (req: AuthenticatedRequest) => Promise<ApplyAdjustmentResponse>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteOpnameResponse>;
    getIngredients: () => Promise<IngredientForOpname[]>;
};
export default opnameService;
//# sourceMappingURL=opname.service.d.ts.map