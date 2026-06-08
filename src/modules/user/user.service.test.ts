import userService from './user.service';
import userRepository from './user.repository';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import {
    mockRole,
    mockCashierRole,
    mockActiveStatus,
    mockInactiveStatus,
    mockUser,
    mockUser2,
    mockRoles,
    mockUserStatuses,
} from '../../tests/mocks/user.mock';

// ============================================
// MOCKS
// ============================================

jest.mock('./user.repository');
jest.mock('../../../utility/encrypt-decrypt');

// Mock getPrismaClient - create mock transaction inside factory
jest.mock('../../../database/postgres.connection', () => {
    const transactionMock = jest.fn().mockImplementation(async (callback) => {
        const result = await callback({});
        return result;
    });

    return {
        __esModule: true,
        default: jest.fn(() => ({
            $transaction: transactionMock,
            user: { update: jest.fn(), create: jest.fn() },
        })),
    };
});

// ============================================
// TEST SUITES
// ============================================

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ============================================
    // GET ALL TESTS
    // ============================================

    describe('getAll', () => {
        it('should return paginated list of users', async () => {
            const mockRequest = {
                query: { batch: '1', size: '10' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser, mockUser2]);
            (userRepository.count as jest.Mock).mockResolvedValue(2);

            const result = await userService.getAll(mockRequest);

            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].username).toBe('admin');
        });

        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);
            (userRepository.count as jest.Mock).mockResolvedValue(1);

            const result = await userService.getAll(mockRequest);

            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(userRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    pagination: expect.objectContaining({ limit: 10, offset: 0 }),
                }),
                expect.any(Object)
            );
        });

        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'admin' } } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);
            (userRepository.count as jest.Mock).mockResolvedValue(1);

            await userService.getAll(mockRequest);

            expect(userRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'admin' })
            );
        });

        it('should pass role_id filter to repository', async () => {
            const mockRequest = { query: { role_id: mockRole.role_id } } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);
            (userRepository.count as jest.Mock).mockResolvedValue(1);

            await userService.getAll(mockRequest);

            expect(userRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ role_id: mockRole.role_id })
            );
        });

        it('should pass user_status_id filter to repository', async () => {
            const mockRequest = { query: { user_status_id: mockActiveStatus.user_status_id } } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);
            (userRepository.count as jest.Mock).mockResolvedValue(1);

            await userService.getAll(mockRequest);

            expect(userRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ user_status_id: mockActiveStatus.user_status_id })
            );
        });

        it('should return empty records when no users found', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (userRepository.findAll as jest.Mock).mockResolvedValue([]);
            (userRepository.count as jest.Mock).mockResolvedValue(0);

            const result = await userService.getAll(mockRequest);

            expect(result.records).toHaveLength(0);
            expect(result.page.total_record_count).toBe(0);
        });
    });

    // ============================================
    // GET DETAIL TESTS
    // ============================================

    describe('getDetail', () => {
        it('should return user detail by ID', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

            const result = await userService.getDetail(mockRequest);

            expect(result).toBeDefined();
            expect(result.user_id).toBe(mockUser.user_id);
            expect(result.username).toBe('admin');
            expect(result.role.name).toBe('ADMIN');
            expect(userRepository.findById).toHaveBeenCalledWith(mockUser.user_id);
        });

        it('should throw ErrorNotFoundException when user not found', async () => {
            const mockRequest = {
                params: { user_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(userService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // CREATE TESTS - Validation Logic
    // ============================================

    describe('create', () => {
        it('should throw ErrorDataAlreadyExistException when username already exists', async () => {
            const mockRequest = {
                body: {
                    username: 'admin',
                    password: 'password123',
                    name: 'Another Admin',
                    role_id: mockRole.role_id,
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(mockUser);

            await expect(userService.create(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);

            expect(userRepository.findByUsername).toHaveBeenCalledWith('admin');
        });

        it('should throw ErrorValidationException when role not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: 'non-existent-role-id',
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(null);

            await expect(userService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should throw ErrorValidationException when ACTIVE status not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: mockRole.role_id,
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockRole);
            (userRepository.findUserStatusByName as jest.Mock).mockResolvedValue(null);

            await expect(userService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should call findUserStatusByName with ACTIVE when user_status_id not provided', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: mockRole.role_id,
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockRole);
            (userRepository.findUserStatusByName as jest.Mock).mockResolvedValue(mockActiveStatus);
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockResolvedValue('hashedPassword');
            (userRepository.create as jest.Mock).mockResolvedValue(mockUser);

            await userService.create(mockRequest);

            expect(userRepository.findUserStatusByName).toHaveBeenCalledWith('ACTIVE');
        });

        it('should validate user_status_id when provided', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: mockRole.role_id,
                    user_status_id: mockInactiveStatus.user_status_id,
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockRole);
            (userRepository.findUserStatusById as jest.Mock).mockResolvedValue(mockInactiveStatus);
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockResolvedValue('hashedPassword');
            (userRepository.create as jest.Mock).mockResolvedValue(mockUser);

            await userService.create(mockRequest);

            expect(userRepository.findUserStatusById).toHaveBeenCalledWith(mockInactiveStatus.user_status_id);
        });

        it('should throw ErrorValidationException when user_status_id not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: mockRole.role_id,
                    user_status_id: 'non-existent-status-id',
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockRole);
            (userRepository.findUserStatusById as jest.Mock).mockResolvedValue(null);

            await expect(userService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should hash password before creating user', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'plainPassword123',
                    name: 'New User',
                    role_id: mockRole.role_id,
                },
            } as unknown as AuthenticatedRequest;

            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockRole);
            (userRepository.findUserStatusByName as jest.Mock).mockResolvedValue(mockActiveStatus);
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockResolvedValue('hashedPassword123');
            (userRepository.create as jest.Mock).mockResolvedValue(mockUser);

            await userService.create(mockRequest);

            expect(EncryptDecryptClass.prototype.encryptBcrypt).toHaveBeenCalledWith('plainPassword123');
        });
    });

    // ============================================
    // UPDATE TESTS - Validation Logic
    // ============================================

    describe('update', () => {
        it('should throw ErrorNotFoundException when user not found', async () => {
            const mockRequest = {
                params: { user_id: 'non-existent-id' },
                body: { name: 'Updated Name' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(userService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorDataAlreadyExistException when username already used by another user', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { username: 'cashier1' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findByUsername as jest.Mock).mockResolvedValue(mockUser2);

            await expect(userService.update(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should check username uniqueness with exclusion of current user', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { username: 'newusername' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findByUsername as jest.Mock).mockResolvedValue(null);
            (userRepository.update as jest.Mock).mockResolvedValue({
                ...mockUser,
                username: 'newusername',
            });

            await userService.update(mockRequest);

            expect(userRepository.findByUsername).toHaveBeenCalledWith('newusername', mockUser.user_id);
        });

        it('should validate role_id when provided', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { role_id: mockCashierRole.role_id },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(mockCashierRole);
            (userRepository.update as jest.Mock).mockResolvedValue({
                ...mockUser,
                role: mockCashierRole,
            });

            await userService.update(mockRequest);

            expect(userRepository.findRoleById).toHaveBeenCalledWith(mockCashierRole.role_id);
        });

        it('should throw ErrorValidationException when role_id not found', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { role_id: 'non-existent-role-id' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findRoleById as jest.Mock).mockResolvedValue(null);

            await expect(userService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should validate user_status_id when provided', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { user_status_id: mockInactiveStatus.user_status_id },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findUserStatusById as jest.Mock).mockResolvedValue(mockInactiveStatus);
            (userRepository.update as jest.Mock).mockResolvedValue({
                ...mockUser,
                user_status: mockInactiveStatus,
            });

            await userService.update(mockRequest);

            expect(userRepository.findUserStatusById).toHaveBeenCalledWith(mockInactiveStatus.user_status_id);
        });

        it('should throw ErrorValidationException when user_status_id not found', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { user_status_id: 'non-existent-status-id' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.findUserStatusById as jest.Mock).mockResolvedValue(null);

            await expect(userService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should hash password when provided', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
                body: { password: 'newPassword123' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockResolvedValue('hashedNewPassword');
            (userRepository.update as jest.Mock).mockResolvedValue(mockUser);

            await userService.update(mockRequest);

            expect(EncryptDecryptClass.prototype.encryptBcrypt).toHaveBeenCalledWith('newPassword123');
        });
    });

    // ============================================
    // SOFT DELETE TESTS
    // ============================================

    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when user not found', async () => {
            const mockRequest = {
                params: { user_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(userService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should return success response when user deleted', async () => {
            const mockRequest = {
                params: { user_id: mockUser.user_id },
            } as unknown as AuthenticatedRequest;

            (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            const result = await userService.softDelete(mockRequest);

            expect(result).toBeDefined();
            expect(result.success).toBe(true);
            expect(result.message).toBe('User berhasil dihapus');
            expect(userRepository.findById).toHaveBeenCalledWith(mockUser.user_id);
        });
    });

    // ============================================
    // GET ROLES TESTS
    // ============================================

    describe('getRoles', () => {
        it('should return list of roles', async () => {
            (userRepository.findAllRoles as jest.Mock).mockResolvedValue(mockRoles);

            const result = await userService.getRoles();

            expect(result).toBeDefined();
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('ADMIN');
            expect(result[1].name).toBe('CASHIER');
        });

        it('should return empty array when no roles found', async () => {
            (userRepository.findAllRoles as jest.Mock).mockResolvedValue([]);

            const result = await userService.getRoles();

            expect(result).toHaveLength(0);
        });

        it('should call repository findAllRoles', async () => {
            (userRepository.findAllRoles as jest.Mock).mockResolvedValue(mockRoles);

            await userService.getRoles();

            expect(userRepository.findAllRoles).toHaveBeenCalled();
        });
    });

    // ============================================
    // GET USER STATUSES TESTS
    // ============================================

    describe('getUserStatuses', () => {
        it('should return list of user statuses', async () => {
            (userRepository.findAllUserStatuses as jest.Mock).mockResolvedValue(mockUserStatuses);

            const result = await userService.getUserStatuses();

            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result[0].name).toBe('ACTIVE');
            expect(result[1].name).toBe('INACTIVE');
        });

        it('should return empty array when no statuses found', async () => {
            (userRepository.findAllUserStatuses as jest.Mock).mockResolvedValue([]);

            const result = await userService.getUserStatuses();

            expect(result).toHaveLength(0);
        });

        it('should call repository findAllUserStatuses', async () => {
            (userRepository.findAllUserStatuses as jest.Mock).mockResolvedValue(mockUserStatuses);

            await userService.getUserStatuses();

            expect(userRepository.findAllUserStatuses).toHaveBeenCalled();
        });
    });
});
