import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { formatPhoneNumber } from '../../../utility/fonnte.utility';
import { AuthenticatedRequest } from '../../../types';
import userRepository from './user.repository';
import {
    CreateUserRequest,
    UpdateUserRequest,
    UserListResponse,
    UserWithRelations,
    DeleteUserResponse,
    RoleReference,
    UserStatusReference,
} from './user.types';
import { UserStatusName } from './user.schema';

const prisma = getPrismaClient();

/**
 * Get all users with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<UserListResponse> => {
    try {
        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        // Set search and filters
        const filter = {
            search: (req.query.search as string) || null,
            role_id: (req.query.role_id as string) || null,
            user_status_id: (req.query.user_status_id as string) || null,
        };

        const [data, totalData] = await Promise.all([
            userRepository.findAll(options, filter),
            userRepository.count(filter),
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
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get user detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<UserWithRelations> => {
    try {
        const userId = req.params.user_id;

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ErrorNotFoundException('User tidak ditemukan');
        }

        return user;
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new user
 */
export const create = async (req: AuthenticatedRequest): Promise<UserWithRelations> => {
    try {
        const body: CreateUserRequest = req.body;

        // Check if username already exists
        const existingUser = await userRepository.findByUsername(body.username);
        if (existingUser) {
            throw new ErrorDataAlreadyExistException('Username sudah digunakan');
        }

        const phoneNumber = body.phone_number ? formatPhoneNumber(body.phone_number) : null;
        if (phoneNumber) {
            const existingPhoneNumber = await userRepository.findByPhoneNumber(phoneNumber);
            if (existingPhoneNumber) {
                throw new ErrorDataAlreadyExistException('Nomor WhatsApp sudah digunakan');
            }
        }

        // Validate role_id exists
        const role = await userRepository.findRoleById(body.role_id);
        if (!role) {
            throw new ErrorValidationException('Role tidak ditemukan', [
                { location: 'body', field: 'role_id', message: 'Role tidak ditemukan' },
            ]);
        }

        // Get user_status_id - use provided or default to ACTIVE
        let userStatusId = body.user_status_id;
        if (!userStatusId) {
            const activeStatus = await userRepository.findUserStatusByName(UserStatusName.ACTIVE);
            if (!activeStatus) {
                throw new ErrorValidationException('Status ACTIVE tidak ditemukan di database', [
                    { location: 'body', field: 'user_status_id', message: 'Status ACTIVE tidak ditemukan di database' },
                ]);
            }
            userStatusId = activeStatus.user_status_id;
        } else {
            // Validate user_status_id exists
            const userStatus = await userRepository.findUserStatusById(userStatusId);
            if (!userStatus) {
                throw new ErrorValidationException('User status tidak ditemukan', [
                    { location: 'body', field: 'user_status_id', message: 'User status tidak ditemukan' },
                ]);
            }
        }

        // Hash password
        const encDec = new EncryptDecryptClass();
        const hashedPassword = await encDec.encryptBcrypt(body.password);

        // Create user
        const result = await userRepository.create(
            {
                username: body.username,
                password: hashedPassword,
                name: body.name,
                phone_number: phoneNumber,
                role_id: body.role_id,
                user_status_id: userStatusId!,
            }
        );

        return result;
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update user by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<UserWithRelations> => {
    try {
        const userId = req.params.user_id;
        const body: UpdateUserRequest = req.body;

        // Check if user exists
        const existingUser = await userRepository.findById(userId);
        if (!existingUser) {
            throw new ErrorNotFoundException('User tidak ditemukan');
        }

        // Check if username already used by another user
        if (body.username) {
            const duplicateUser = await userRepository.findByUsername(body.username, userId);
            if (duplicateUser) {
                throw new ErrorDataAlreadyExistException('Username sudah digunakan');
            }
        }

        const phoneNumber = body.phone_number ? formatPhoneNumber(body.phone_number) : undefined;
        if (phoneNumber) {
            const duplicatePhoneNumber = await userRepository.findByPhoneNumber(phoneNumber, userId);
            if (duplicatePhoneNumber) {
                throw new ErrorDataAlreadyExistException('Nomor WhatsApp sudah digunakan');
            }
        }

        // Validate role_id if provided
        if (body.role_id) {
            const role = await userRepository.findRoleById(body.role_id);
            if (!role) {
                throw new ErrorValidationException('Role tidak ditemukan', [
                    { location: 'body', field: 'role_id', message: 'Role tidak ditemukan' },
                ]);
            }
        }

        // Validate user_status_id if provided
        if (body.user_status_id) {
            const userStatus = await userRepository.findUserStatusById(body.user_status_id);
            if (!userStatus) {
                throw new ErrorValidationException('User status tidak ditemukan', [
                    { location: 'body', field: 'user_status_id', message: 'User status tidak ditemukan' },
                ]);
            }
        }

        // Prepare update data
        const updateData: {
            username?: string;
            password?: string;
            name?: string;
            phone_number?: string;
            role_id?: string;
            user_status_id?: string;
        } = {};

        if (body.username) updateData.username = body.username;
        if (body.name) updateData.name = body.name;
        if (phoneNumber) updateData.phone_number = phoneNumber;
        if (body.role_id) updateData.role_id = body.role_id;
        if (body.user_status_id) updateData.user_status_id = body.user_status_id;

        // Hash password if provided
        if (body.password) {
            const encDec = new EncryptDecryptClass();
            updateData.password = await encDec.encryptBcrypt(body.password);
        }

        // Update user
        const result = await userRepository.update(userId, updateData);

        return result;
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete user by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteUserResponse> => {
    try {
        const userId = req.params.user_id;

        // Check if user exists
        const existingUser = await userRepository.findById(userId);
        if (!existingUser) {
            throw new ErrorNotFoundException('User tidak ditemukan');
        }

        // Soft delete
        await userRepository.softDelete(userId);

        return {
            success: true,
            message: 'User berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get all roles (for dropdown/selection)
 */
export const getRoles = async (): Promise<RoleReference[]> => {
    try {
        const roles = await userRepository.findAllRoles();
        return roles as RoleReference[];
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get all user statuses (for dropdown/selection)
 */
export const getUserStatuses = async (): Promise<UserStatusReference[]> => {
    try {
        const statuses = await userRepository.findAllUserStatuses();
        return statuses as UserStatusReference[];
    } catch (error) {
        console.error(`--- User Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const userService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
    getRoles,
    getUserStatuses,
};

export default userService;
