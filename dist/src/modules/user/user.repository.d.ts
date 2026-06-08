import { UserFilter, UserPaginationOptions, UserWithRelations } from './user.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all users with pagination and filters
 */
export declare const findAll: (options: UserPaginationOptions, filter: UserFilter) => Promise<UserWithRelations[]>;
/**
 * Count users with filters
 */
export declare const count: (filter: UserFilter) => Promise<number>;
/**
 * Find user by ID
 */
export declare const findById: (userId: string) => Promise<UserWithRelations | null>;
/**
 * Find user by username (for validation - check duplicate)
 */
export declare const findByUsername: (username: string, excludeUserId?: string) => Promise<UserWithRelations | null>;
/**
 * Find user by phone number (for validation - check duplicate)
 */
export declare const findByPhoneNumber: (phoneNumber: string, excludeUserId?: string) => Promise<UserWithRelations | null>;
/**
 * Create new user
 */
export declare const create: (data: Prisma.UserUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<UserWithRelations>;
/**
 * Update user by ID
 */
export declare const update: (userId: string, data: Prisma.UserUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<UserWithRelations>;
/**
 * Soft delete user (set deleted_at)
 */
export declare const softDelete: (userId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Get all roles (for dropdown/selection)
 */
export declare const findAllRoles: () => Promise<{
    name: string;
    role_id: string;
}[]>;
/**
 * Get all user statuses (for dropdown/selection)
 */
export declare const findAllUserStatuses: () => Promise<{
    name: string;
    user_status_id: string;
}[]>;
/**
 * Find role by ID
 */
export declare const findRoleById: (roleId: string) => Promise<{
    name: string;
    role_id: string;
}>;
/**
 * Find user status by ID
 */
export declare const findUserStatusById: (userStatusId: string) => Promise<{
    name: string;
    user_status_id: string;
}>;
/**
 * Find user status by name
 */
export declare const findUserStatusByName: (name: string) => Promise<{
    name: string;
    user_status_id: string;
}>;
export declare const userRepository: {
    findAll: (options: UserPaginationOptions, filter: UserFilter) => Promise<UserWithRelations[]>;
    count: (filter: UserFilter) => Promise<number>;
    findById: (userId: string) => Promise<UserWithRelations | null>;
    findByUsername: (username: string, excludeUserId?: string) => Promise<UserWithRelations | null>;
    findByPhoneNumber: (phoneNumber: string, excludeUserId?: string) => Promise<UserWithRelations | null>;
    create: (data: Prisma.UserUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<UserWithRelations>;
    update: (userId: string, data: Prisma.UserUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<UserWithRelations>;
    softDelete: (userId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    findAllRoles: () => Promise<{
        name: string;
        role_id: string;
    }[]>;
    findAllUserStatuses: () => Promise<{
        name: string;
        user_status_id: string;
    }[]>;
    findRoleById: (roleId: string) => Promise<{
        name: string;
        role_id: string;
    }>;
    findUserStatusById: (userStatusId: string) => Promise<{
        name: string;
        user_status_id: string;
    }>;
    findUserStatusByName: (name: string) => Promise<{
        name: string;
        user_status_id: string;
    }>;
};
export default userRepository;
//# sourceMappingURL=user.repository.d.ts.map