import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { UserWithRelations } from './auth.types';

const prisma = getPrismaClient();

/**
 * Find user by username for login
 * Select only required fields for authentication and response
 */
export const findByUsername = async (username: string): Promise<UserWithRelations | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
                deleted_at: null,
            },
            select: {
                // Required for login logic
                user_id: true,
                username: true,
                password: true,
                name: true,
                phone_number: true,
                // Relations for response
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
            },
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find user by ID
 * Used for token validation middleware
 */
export const findById = async (userId: string): Promise<UserWithRelations | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId,
                deleted_at: null,
            },
            select: {
                user_id: true,
                username: true,
                name: true,
                phone_number: true,
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
            },
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find active user by phone number
 * Used for forgot password OTP flow
 */
export const findByPhoneNumber = async (phoneNumber: string): Promise<UserWithRelations | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                phone_number: phoneNumber,
                deleted_at: null,
            },
            select: {
                user_id: true,
                username: true,
                name: true,
                phone_number: true,
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
            },
        });

        return user as UserWithRelations | null;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update user password
 */
export const updatePassword = async (userId: string, hashedPassword: string): Promise<void> => {
    try {
        await prisma.user.update({
            where: { user_id: userId },
            data: { password: hashedPassword },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update last login timestamp
 */
export const updateLastLogin = async (userId: string): Promise<void> => {
    try {
        await prisma.user.update({
            where: { user_id: userId },
            data: { last_login: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const authRepository = {
    findByUsername,
    findById,
    findByPhoneNumber,
    updatePassword,
    updateLastLogin,
};

export default authRepository;
