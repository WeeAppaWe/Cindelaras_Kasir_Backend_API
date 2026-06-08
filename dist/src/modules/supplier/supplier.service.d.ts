import { AuthenticatedRequest } from '../../../types';
import { SupplierListResponse, SupplierWithDetails, DeleteSupplierResponse } from './supplier.types';
/**
 * Get all suppliers with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<SupplierListResponse>;
/**
 * Get supplier detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
/**
 * Create new supplier
 */
export declare const create: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
/**
 * Update supplier by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
/**
 * Soft delete supplier by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteSupplierResponse>;
export declare const supplierService: {
    getAll: (req: AuthenticatedRequest) => Promise<SupplierListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
    create: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
    update: (req: AuthenticatedRequest) => Promise<SupplierWithDetails>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteSupplierResponse>;
};
export default supplierService;
//# sourceMappingURL=supplier.service.d.ts.map