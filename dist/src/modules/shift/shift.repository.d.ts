import { ShiftFilter, ShiftPaginationOptions, ShiftWithUser, ShiftOrderStats } from './shift.types';
import { Prisma } from '../../generated/prisma/client';
export declare const findAll: (options: ShiftPaginationOptions, filter: ShiftFilter) => Promise<ShiftWithUser[]>;
export declare const count: (filter: ShiftFilter) => Promise<number>;
export declare const findById: (shiftId: string) => Promise<ShiftWithUser | null>;
export declare const getActiveShift: (userId: string) => Promise<ShiftWithUser | null>;
export declare const create: (data: {
    user_id: string;
    start_cash: number;
    start_time: Date;
}, transaction?: Prisma.TransactionClient) => Promise<ShiftWithUser>;
export declare const endShift: (shiftId: string, data: {
    end_cash: number;
    sold_total: number;
    end_time: Date;
}, transaction?: Prisma.TransactionClient) => Promise<ShiftWithUser>;
export declare const getOrderStats: (shiftId: string) => Promise<ShiftOrderStats>;
export declare const softDelete: (shiftId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const shiftRepository: {
    findAll: (options: ShiftPaginationOptions, filter: ShiftFilter) => Promise<ShiftWithUser[]>;
    count: (filter: ShiftFilter) => Promise<number>;
    findById: (shiftId: string) => Promise<ShiftWithUser | null>;
    getActiveShift: (userId: string) => Promise<ShiftWithUser | null>;
    create: (data: {
        user_id: string;
        start_cash: number;
        start_time: Date;
    }, transaction?: Prisma.TransactionClient) => Promise<ShiftWithUser>;
    endShift: (shiftId: string, data: {
        end_cash: number;
        sold_total: number;
        end_time: Date;
    }, transaction?: Prisma.TransactionClient) => Promise<ShiftWithUser>;
    getOrderStats: (shiftId: string) => Promise<ShiftOrderStats>;
    softDelete: (shiftId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
};
export default shiftRepository;
//# sourceMappingURL=shift.repository.d.ts.map