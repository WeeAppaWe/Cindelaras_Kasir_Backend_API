import { SupplierFilter, SupplierPaginationOptions, SupplierData, SupplierWithDetails } from './supplier.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all suppliers with pagination and filters
 */
export declare const findAll: (options: SupplierPaginationOptions, filter: SupplierFilter) => Promise<SupplierWithDetails[]>;
/**
 * Count suppliers with filters
 */
export declare const count: (filter: SupplierFilter) => Promise<number>;
/**
 * Find supplier by ID
 */
export declare const findById: (supplierId: string) => Promise<SupplierWithDetails | null>;
/**
 * Find supplier by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeSupplierId?: string) => Promise<SupplierData | null>;
/**
 * Create new supplier
 */
export declare const create: (data: Prisma.SupplierUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<SupplierData>;
/**
 * Update supplier by ID
 */
export declare const update: (supplierId: string, data: Prisma.SupplierUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<SupplierData>;
/**
 * Soft delete supplier (set deleted_at)
 */
export declare const softDelete: (supplierId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const supplierRepository: {
    findAll: (options: SupplierPaginationOptions, filter: SupplierFilter) => Promise<SupplierWithDetails[]>;
    count: (filter: SupplierFilter) => Promise<number>;
    findById: (supplierId: string) => Promise<SupplierWithDetails | null>;
    findByName: (name: string, excludeSupplierId?: string) => Promise<SupplierData | null>;
    create: (data: Prisma.SupplierUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<SupplierData>;
    update: (supplierId: string, data: Prisma.SupplierUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<SupplierData>;
    softDelete: (supplierId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
};
export default supplierRepository;
//# sourceMappingURL=supplier.repository.d.ts.map