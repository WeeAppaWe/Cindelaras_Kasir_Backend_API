"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.findUserStatusByName = exports.findUserStatusById = exports.findRoleById = exports.findAllUserStatuses = exports.findAllRoles = exports.softDelete = exports.update = exports.create = exports.findByPhoneNumber = exports.findByUsername = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
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
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, role_id, user_status_id } = filter;
        const where = {
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
        return users;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count users with filters
 */
const count = async (filter) => {
    try {
        const { search, role_id, user_status_id } = filter;
        const where = {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find user by ID
 */
const findById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId,
                deleted_at: null,
            },
            select: userSelectFields,
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
 * Find user by username (for validation - check duplicate)
 */
const findByUsername = async (username, excludeUserId) => {
    try {
        const where = {
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
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByUsername = findByUsername;
/**
 * Find user by phone number (for validation - check duplicate)
 */
const findByPhoneNumber = async (phoneNumber, excludeUserId) => {
    try {
        const where = {
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
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByPhoneNumber = findByPhoneNumber;
/**
 * Create new user
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const user = await client.user.create({
            data,
            select: userSelectFields,
        });
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update user by ID
 */
const update = async (userId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const user = await client.user.update({
            where: { user_id: userId },
            data,
            select: userSelectFields,
        });
        return user;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete user (set deleted_at)
 */
const softDelete = async (userId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.user.update({
            where: { user_id: userId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
/**
 * Get all roles (for dropdown/selection)
 */
const findAllRoles = async () => {
    try {
        return await prisma.role.findMany({
            where: { deleted_at: null },
            select: {
                role_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllRoles = findAllRoles;
/**
 * Get all user statuses (for dropdown/selection)
 */
const findAllUserStatuses = async () => {
    try {
        return await prisma.userStatus.findMany({
            where: { deleted_at: null },
            select: {
                user_status_id: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllUserStatuses = findAllUserStatuses;
/**
 * Find role by ID
 */
const findRoleById = async (roleId) => {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findRoleById = findRoleById;
/**
 * Find user status by ID
 */
const findUserStatusById = async (userStatusId) => {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findUserStatusById = findUserStatusById;
/**
 * Find user status by name
 */
const findUserStatusByName = async (name) => {
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
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findUserStatusByName = findUserStatusByName;
exports.userRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByUsername: exports.findByUsername,
    findByPhoneNumber: exports.findByPhoneNumber,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    findAllRoles: exports.findAllRoles,
    findAllUserStatuses: exports.findAllUserStatuses,
    findRoleById: exports.findRoleById,
    findUserStatusById: exports.findUserStatusById,
    findUserStatusByName: exports.findUserStatusByName,
};
exports.default = exports.userRepository;
//# sourceMappingURL=user.repository.js.map