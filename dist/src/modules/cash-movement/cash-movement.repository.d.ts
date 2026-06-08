import { CashMovementFilter, CashMovementPaginationOptions, CashMovementWithShift } from './cash-movement.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all cash movements with pagination and filters
 */
export declare const findAll: (options: CashMovementPaginationOptions, filter: CashMovementFilter) => Promise<CashMovementWithShift[]>;
/**
 * Count cash movements with filters
 */
export declare const count: (filter: CashMovementFilter) => Promise<number>;
/**
 * Find cash movement by ID
 */
export declare const findById: (cashMovementId: string) => Promise<CashMovementWithShift | null>;
/**
 * Create new cash movement
 */
export declare const create: (data: Prisma.CashMovementUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<CashMovementWithShift>;
/**
 * Get summary of cash movements by shift
 */
export declare const getSummaryByShift: (shiftId: string) => Promise<{
    total_in: number;
    total_out: number;
}>;
/**
 * Get active shift for user
 */
export declare const getActiveShift: (userId: string) => Promise<{
    user_id: string;
    shift_id: string;
    start_cash: import("@prisma/client/runtime/client").Decimal;
    start_time: Date;
}>;
export declare const cashMovementRepository: {
    findAll: (options: CashMovementPaginationOptions, filter: CashMovementFilter) => Promise<CashMovementWithShift[]>;
    count: (filter: CashMovementFilter) => Promise<number>;
    findById: (cashMovementId: string) => Promise<CashMovementWithShift | null>;
    create: (data: Prisma.CashMovementUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<CashMovementWithShift>;
    getSummaryByShift: (shiftId: string) => Promise<{
        total_in: number;
        total_out: number;
    }>;
    getActiveShift: (userId: string) => Promise<{
        user_id: string;
        shift_id: string;
        start_cash: import("@prisma/client/runtime/client").Decimal;
        start_time: Date;
    }>;
};
export default cashMovementRepository;
//# sourceMappingURL=cash-movement.repository.d.ts.map