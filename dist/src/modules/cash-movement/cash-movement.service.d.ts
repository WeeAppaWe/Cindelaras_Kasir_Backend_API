import { AuthenticatedRequest } from '../../../types';
import { CashMovementListResponse, CashMovementWithShift, CreateCashMovementResponse } from './cash-movement.types';
/**
 * Get all cash movements with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<CashMovementListResponse>;
/**
 * Get cash movement detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<CashMovementWithShift>;
/**
 * Create new cash movement
 */
export declare const create: (req: AuthenticatedRequest) => Promise<CreateCashMovementResponse>;
export declare const cashMovementService: {
    getAll: (req: AuthenticatedRequest) => Promise<CashMovementListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<CashMovementWithShift>;
    create: (req: AuthenticatedRequest) => Promise<CreateCashMovementResponse>;
};
export default cashMovementService;
//# sourceMappingURL=cash-movement.service.d.ts.map