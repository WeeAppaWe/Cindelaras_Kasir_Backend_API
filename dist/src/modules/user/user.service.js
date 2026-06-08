"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.getUserStatuses = exports.getRoles = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const encrypt_decrypt_1 = __importDefault(require("../../../utility/encrypt-decrypt"));
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const fonnte_utility_1 = require("../../../utility/fonnte.utility");
const user_repository_1 = __importDefault(require("./user.repository"));
const user_schema_1 = require("./user.schema");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all users with pagination and filters
 */
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        // Set search and filters
        const filter = {
            search: req.query.search || null,
            role_id: req.query.role_id || null,
            user_status_id: req.query.user_status_id || null,
        };
        const [data, totalData] = await Promise.all([
            user_repository_1.default.findAll(options, filter),
            user_repository_1.default.count(filter),
        ]);
        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get user detail by ID
 */
const getDetail = async (req) => {
    try {
        const userId = req.params.user_id;
        const user = await user_repository_1.default.findById(userId);
        if (!user) {
            throw new error_not_found_exception_1.ErrorNotFoundException('User tidak ditemukan');
        }
        return user;
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new user
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if username already exists
        const existingUser = await user_repository_1.default.findByUsername(body.username);
        if (existingUser) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Username sudah digunakan');
        }
        const phoneNumber = body.phone_number ? (0, fonnte_utility_1.formatPhoneNumber)(body.phone_number) : null;
        if (phoneNumber) {
            const existingPhoneNumber = await user_repository_1.default.findByPhoneNumber(phoneNumber);
            if (existingPhoneNumber) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nomor WhatsApp sudah digunakan');
            }
        }
        // Validate role_id exists
        const role = await user_repository_1.default.findRoleById(body.role_id);
        if (!role) {
            throw new error_validation_exception_1.ErrorValidationException('Role tidak ditemukan', [
                { location: 'body', field: 'role_id', message: 'Role tidak ditemukan' },
            ]);
        }
        // Get user_status_id - use provided or default to ACTIVE
        let userStatusId = body.user_status_id;
        if (!userStatusId) {
            const activeStatus = await user_repository_1.default.findUserStatusByName(user_schema_1.UserStatusName.ACTIVE);
            if (!activeStatus) {
                throw new error_validation_exception_1.ErrorValidationException('Status ACTIVE tidak ditemukan di database', [
                    { location: 'body', field: 'user_status_id', message: 'Status ACTIVE tidak ditemukan di database' },
                ]);
            }
            userStatusId = activeStatus.user_status_id;
        }
        else {
            // Validate user_status_id exists
            const userStatus = await user_repository_1.default.findUserStatusById(userStatusId);
            if (!userStatus) {
                throw new error_validation_exception_1.ErrorValidationException('User status tidak ditemukan', [
                    { location: 'body', field: 'user_status_id', message: 'User status tidak ditemukan' },
                ]);
            }
        }
        // Hash password
        const encDec = new encrypt_decrypt_1.default();
        const hashedPassword = await encDec.encryptBcrypt(body.password);
        // Create user
        const result = await user_repository_1.default.create({
            username: body.username,
            password: hashedPassword,
            name: body.name,
            phone_number: phoneNumber,
            role_id: body.role_id,
            user_status_id: userStatusId,
        });
        return result;
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update user by ID
 */
const update = async (req) => {
    try {
        const userId = req.params.user_id;
        const body = req.body;
        // Check if user exists
        const existingUser = await user_repository_1.default.findById(userId);
        if (!existingUser) {
            throw new error_not_found_exception_1.ErrorNotFoundException('User tidak ditemukan');
        }
        // Check if username already used by another user
        if (body.username) {
            const duplicateUser = await user_repository_1.default.findByUsername(body.username, userId);
            if (duplicateUser) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Username sudah digunakan');
            }
        }
        const phoneNumber = body.phone_number ? (0, fonnte_utility_1.formatPhoneNumber)(body.phone_number) : undefined;
        if (phoneNumber) {
            const duplicatePhoneNumber = await user_repository_1.default.findByPhoneNumber(phoneNumber, userId);
            if (duplicatePhoneNumber) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nomor WhatsApp sudah digunakan');
            }
        }
        // Validate role_id if provided
        if (body.role_id) {
            const role = await user_repository_1.default.findRoleById(body.role_id);
            if (!role) {
                throw new error_validation_exception_1.ErrorValidationException('Role tidak ditemukan', [
                    { location: 'body', field: 'role_id', message: 'Role tidak ditemukan' },
                ]);
            }
        }
        // Validate user_status_id if provided
        if (body.user_status_id) {
            const userStatus = await user_repository_1.default.findUserStatusById(body.user_status_id);
            if (!userStatus) {
                throw new error_validation_exception_1.ErrorValidationException('User status tidak ditemukan', [
                    { location: 'body', field: 'user_status_id', message: 'User status tidak ditemukan' },
                ]);
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.username)
            updateData.username = body.username;
        if (body.name)
            updateData.name = body.name;
        if (phoneNumber)
            updateData.phone_number = phoneNumber;
        if (body.role_id)
            updateData.role_id = body.role_id;
        if (body.user_status_id)
            updateData.user_status_id = body.user_status_id;
        // Hash password if provided
        if (body.password) {
            const encDec = new encrypt_decrypt_1.default();
            updateData.password = await encDec.encryptBcrypt(body.password);
        }
        // Update user
        const result = await user_repository_1.default.update(userId, updateData);
        return result;
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete user by ID
 */
const softDelete = async (req) => {
    try {
        const userId = req.params.user_id;
        // Check if user exists
        const existingUser = await user_repository_1.default.findById(userId);
        if (!existingUser) {
            throw new error_not_found_exception_1.ErrorNotFoundException('User tidak ditemukan');
        }
        // Soft delete
        await user_repository_1.default.softDelete(userId);
        return {
            success: true,
            message: 'User berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Get all roles (for dropdown/selection)
 */
const getRoles = async () => {
    try {
        const roles = await user_repository_1.default.findAllRoles();
        return roles;
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.getRoles = getRoles;
/**
 * Get all user statuses (for dropdown/selection)
 */
const getUserStatuses = async () => {
    try {
        const statuses = await user_repository_1.default.findAllUserStatuses();
        return statuses;
    }
    catch (error) {
        console.error(`--- User Service Error: ${error.message}`);
        throw error;
    }
};
exports.getUserStatuses = getUserStatuses;
exports.userService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getRoles: exports.getRoles,
    getUserStatuses: exports.getUserStatuses,
};
exports.default = exports.userService;
//# sourceMappingURL=user.service.js.map