"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = exports.updateLastLogin = exports.updatePassword = exports.findByPhoneNumber = exports.findById = exports.findByUsername = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
/**
 * Find user by username for login
 * Select only required fields for authentication and response
 */
const findByUsername = async (username) => {
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
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByUsername = findByUsername;
/**
 * Find user by ID
 * Used for token validation middleware
 */
const findById = async (userId) => {
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
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find active user by phone number
 * Used for forgot password OTP flow
 */
const findByPhoneNumber = async (phoneNumber) => {
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
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByPhoneNumber = findByPhoneNumber;
/**
 * Update user password
 */
const updatePassword = async (userId, hashedPassword) => {
    try {
        await prisma.user.update({
            where: { user_id: userId },
            data: { password: hashedPassword },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updatePassword = updatePassword;
/**
 * Update last login timestamp
 */
const updateLastLogin = async (userId) => {
    try {
        await prisma.user.update({
            where: { user_id: userId },
            data: { last_login: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateLastLogin = updateLastLogin;
exports.authRepository = {
    findByUsername: exports.findByUsername,
    findById: exports.findById,
    findByPhoneNumber: exports.findByPhoneNumber,
    updatePassword: exports.updatePassword,
    updateLastLogin: exports.updateLastLogin,
};
exports.default = exports.authRepository;
//# sourceMappingURL=auth.repository.js.map