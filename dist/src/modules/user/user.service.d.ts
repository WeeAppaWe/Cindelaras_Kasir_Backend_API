import { AuthenticatedRequest } from '../../../types';
import { UserListResponse, UserWithRelations, DeleteUserResponse, RoleReference, UserStatusReference } from './user.types';
/**
 * Get all users with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<UserListResponse>;
/**
 * Get user detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
/**
 * Create new user
 */
export declare const create: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
/**
 * Update user by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
/**
 * Soft delete user by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteUserResponse>;
/**
 * Get all roles (for dropdown/selection)
 */
export declare const getRoles: () => Promise<RoleReference[]>;
/**
 * Get all user statuses (for dropdown/selection)
 */
export declare const getUserStatuses: () => Promise<UserStatusReference[]>;
export declare const userService: {
    getAll: (req: AuthenticatedRequest) => Promise<UserListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
    create: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
    update: (req: AuthenticatedRequest) => Promise<UserWithRelations>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteUserResponse>;
    getRoles: () => Promise<RoleReference[]>;
    getUserStatuses: () => Promise<UserStatusReference[]>;
};
export default userService;
//# sourceMappingURL=user.service.d.ts.map