import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { UserFilter, UserPaginationOptions, UserWithRelations } from './user.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for user queries (without password)
const userSelectFields = {
    user_id: true,
    username: true,
    name: true,
    phone_number: true,
    last_login: true,
    created_at: true,
    updated_at: true,
    role: {
        select: {
            role_id: true,
            name: true,
        },
    },
    user_status: {
        select: {
            user_status_id: true,
            name: true,
        },
    },
};

/**
 * Find all users with pagination and filters
 */
export const findAll = async (
    options: UserPaginationOptions,
    filter: UserFilter
): Promise<UserWithRelations[]> => {
    try {
        const { pagination } = options;
        const { search, role_id, user_status_id } = filter;

        const where: Prisma.UserWhereInput = {
            deleted_at: null,
        };

        // Search by username or name
        if (search) {
            where.OR = [
                { username: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Filter by role
        if (role_id) {
            where.role_id = role_id;
        }

        // Filter by status
        if (user_status_id) {
            where.user_status_id = user_status_id;
        }

        const users = await prisma.user.findMany({
            where,
            select: userSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return users as UserWithRelations[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count users with filters
 */
export const count = async (filter: UserFilter): Promise<number> => {
    try {
        const { search, role_id, user_status_id } = filter;

        const where: Prisma.UserWhereInput = {
            deleted_at: null,
        };

        // Search by username or name
        if (search) {
            where.OR = [
                { username: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Filter by role
        if (role_id) {
            where.role_id = role_id;
        }

        // Filter by status
        if (user_status_id) {
            where.user_status_id = user_status_id;
        }

        return await prisma.user.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user by ID
 */
export const findById = async (userId: string): Promise<UserWithRelations | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId,
                deleted_at: null,
            },
            select: userSelectFields,
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user by username (for validation - check duplicate)
 */
export const findByUsername = async (
    username: string,
    excludeUserId?: string
): Promise<UserWithRelations | null> => {
    try {
        const where: Prisma.UserWhereInput = {
            username,
            deleted_at: null,
        };

        // Exclude specific user (for update validation)
        if (excludeUserId) {
            where.user_id = { not: excludeUserId };
        }

        const user = await prisma.user.findFirst({
            where,
            select: userSelectFields,
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user by phone number (for validation - check duplicate)
 */
export const findByPhoneNumber = async (
    phoneNumber: string,
    excludeUserId?: string
): Promise<UserWithRelations | null> => {
    try {
        const where: Prisma.UserWhereInput = {
            phone_number: phoneNumber,
            deleted_at: null,
        };

        // Exclude specific user (for update validation)
        if (excludeUserId) {
            where.user_id = { not: excludeUserId };
        }

        const user = await prisma.user.findFirst({
            where,
            select: userSelectFields,
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new user
 */
export const create = async (
    data: Prisma.UserUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<UserWithRelations> => {
    try {
        const client = transaction || prisma;

        const user = await client.user.create({
            data,
            select: userSelectFields,
        });

        return user as UserWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update user by ID
 */
export const update = async (
    userId: string,
    data: Prisma.UserUncheckedUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<UserWithRelations> => {
    try {
        const client = transaction || prisma;

        const user = await client.user.update({
            where: { user_id: userId },
            data,
            select: userSelectFields,
        });

        return user as UserWithRelations;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete user (set deleted_at)
 */
export const softDelete = async (
    userId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.user.update({
            where: { user_id: userId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get all roles (for dropdown/selection)
 */
export const findAllRoles = async () => {
    try {
        return await prisma.role.findMany({
            where: { deleted_at: null },
            select: {
                role_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Get all user statuses (for dropdown/selection)
 */
export const findAllUserStatuses = async () => {
    try {
        return await prisma.userStatus.findMany({
            where: { deleted_at: null },
            select: {
                user_status_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find role by ID
 */
export const findRoleById = async (roleId: string) => {
    try {
        return await prisma.role.findUnique({
            where: {
                role_id: roleId,
                deleted_at: null,
            },
            select: {
                role_id: true,
                name: true,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user status by ID
 */
export const findUserStatusById = async (userStatusId: string) => {
    try {
        return await prisma.userStatus.findUnique({
            where: {
                user_status_id: userStatusId,
                deleted_at: null,
            },
            select: {
                user_status_id: true,
                name: true,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user status by name
 */
export const findUserStatusByName = async (name: string) => {
    try {
        return await prisma.userStatus.findFirst({
            where: {
                name,
                deleted_at: null,
            },
            select: {
                user_status_id: true,
                name: true,
            },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const userRepository = {
    findAll,
    count,
    findById,
    findByUsername,
    findByPhoneNumber,
    create,
    update,
    softDelete,
    findAllRoles,
    findAllUserStatuses,
    findRoleById,
    findUserStatusById,
    findUserStatusByName,
};

export default userRepository;
