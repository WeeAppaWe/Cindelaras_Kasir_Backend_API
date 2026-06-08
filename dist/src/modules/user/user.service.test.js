"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const user_repository_1 = __importDefault(require("./user.repository"));
const encrypt_decrypt_1 = __importDefault(require("../../../utility/encrypt-decrypt"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const user_mock_1 = require("../../tests/mocks/user.mock");
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
            };
            user_repository_1.default.findAll.mockResolvedValue([user_mock_1.mockUser, user_mock_1.mockUser2]);
            user_repository_1.default.count.mockResolvedValue(2);
            const result = await user_service_1.default.getAll(mockRequest);
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].username).toBe('admin');
        });
        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} };
            user_repository_1.default.findAll.mockResolvedValue([user_mock_1.mockUser]);
            user_repository_1.default.count.mockResolvedValue(1);
            const result = await user_service_1.default.getAll(mockRequest);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(user_repository_1.default.findAll).toHaveBeenCalledWith(expect.objectContaining({
                pagination: expect.objectContaining({ limit: 10, offset: 0 }),
            }), expect.any(Object));
        });
        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'admin' } };
            user_repository_1.default.findAll.mockResolvedValue([user_mock_1.mockUser]);
            user_repository_1.default.count.mockResolvedValue(1);
            await user_service_1.default.getAll(mockRequest);
            expect(user_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'admin' }));
        });
        it('should pass role_id filter to repository', async () => {
            const mockRequest = { query: { role_id: user_mock_1.mockRole.role_id } };
            user_repository_1.default.findAll.mockResolvedValue([user_mock_1.mockUser]);
            user_repository_1.default.count.mockResolvedValue(1);
            await user_service_1.default.getAll(mockRequest);
            expect(user_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ role_id: user_mock_1.mockRole.role_id }));
        });
        it('should pass user_status_id filter to repository', async () => {
            const mockRequest = { query: { user_status_id: user_mock_1.mockActiveStatus.user_status_id } };
            user_repository_1.default.findAll.mockResolvedValue([user_mock_1.mockUser]);
            user_repository_1.default.count.mockResolvedValue(1);
            await user_service_1.default.getAll(mockRequest);
            expect(user_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ user_status_id: user_mock_1.mockActiveStatus.user_status_id }));
        });
        it('should return empty records when no users found', async () => {
            const mockRequest = { query: {} };
            user_repository_1.default.findAll.mockResolvedValue([]);
            user_repository_1.default.count.mockResolvedValue(0);
            const result = await user_service_1.default.getAll(mockRequest);
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
                params: { user_id: user_mock_1.mockUser.user_id },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            const result = await user_service_1.default.getDetail(mockRequest);
            expect(result).toBeDefined();
            expect(result.user_id).toBe(user_mock_1.mockUser.user_id);
            expect(result.username).toBe('admin');
            expect(result.role.name).toBe('ADMIN');
            expect(user_repository_1.default.findById).toHaveBeenCalledWith(user_mock_1.mockUser.user_id);
        });
        it('should throw ErrorNotFoundException when user not found', async () => {
            const mockRequest = {
                params: { user_id: 'non-existent-id' },
            };
            user_repository_1.default.findById.mockResolvedValue(null);
            await expect(user_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
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
                    role_id: user_mock_1.mockRole.role_id,
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(user_mock_1.mockUser);
            await expect(user_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
            expect(user_repository_1.default.findByUsername).toHaveBeenCalledWith('admin');
        });
        it('should throw ErrorValidationException when role not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: 'non-existent-role-id',
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(null);
            await expect(user_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should throw ErrorValidationException when ACTIVE status not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: user_mock_1.mockRole.role_id,
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockRole);
            user_repository_1.default.findUserStatusByName.mockResolvedValue(null);
            await expect(user_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should call findUserStatusByName with ACTIVE when user_status_id not provided', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: user_mock_1.mockRole.role_id,
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockRole);
            user_repository_1.default.findUserStatusByName.mockResolvedValue(user_mock_1.mockActiveStatus);
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockResolvedValue('hashedPassword');
            user_repository_1.default.create.mockResolvedValue(user_mock_1.mockUser);
            await user_service_1.default.create(mockRequest);
            expect(user_repository_1.default.findUserStatusByName).toHaveBeenCalledWith('ACTIVE');
        });
        it('should validate user_status_id when provided', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: user_mock_1.mockRole.role_id,
                    user_status_id: user_mock_1.mockInactiveStatus.user_status_id,
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockRole);
            user_repository_1.default.findUserStatusById.mockResolvedValue(user_mock_1.mockInactiveStatus);
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockResolvedValue('hashedPassword');
            user_repository_1.default.create.mockResolvedValue(user_mock_1.mockUser);
            await user_service_1.default.create(mockRequest);
            expect(user_repository_1.default.findUserStatusById).toHaveBeenCalledWith(user_mock_1.mockInactiveStatus.user_status_id);
        });
        it('should throw ErrorValidationException when user_status_id not found', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'password123',
                    name: 'New User',
                    role_id: user_mock_1.mockRole.role_id,
                    user_status_id: 'non-existent-status-id',
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockRole);
            user_repository_1.default.findUserStatusById.mockResolvedValue(null);
            await expect(user_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should hash password before creating user', async () => {
            const mockRequest = {
                body: {
                    username: 'newuser',
                    password: 'plainPassword123',
                    name: 'New User',
                    role_id: user_mock_1.mockRole.role_id,
                },
            };
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockRole);
            user_repository_1.default.findUserStatusByName.mockResolvedValue(user_mock_1.mockActiveStatus);
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockResolvedValue('hashedPassword123');
            user_repository_1.default.create.mockResolvedValue(user_mock_1.mockUser);
            await user_service_1.default.create(mockRequest);
            expect(encrypt_decrypt_1.default.prototype.encryptBcrypt).toHaveBeenCalledWith('plainPassword123');
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
            };
            user_repository_1.default.findById.mockResolvedValue(null);
            await expect(user_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorDataAlreadyExistException when username already used by another user', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { username: 'cashier1' },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findByUsername.mockResolvedValue(user_mock_1.mockUser2);
            await expect(user_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should check username uniqueness with exclusion of current user', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { username: 'newusername' },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findByUsername.mockResolvedValue(null);
            user_repository_1.default.update.mockResolvedValue({
                ...user_mock_1.mockUser,
                username: 'newusername',
            });
            await user_service_1.default.update(mockRequest);
            expect(user_repository_1.default.findByUsername).toHaveBeenCalledWith('newusername', user_mock_1.mockUser.user_id);
        });
        it('should validate role_id when provided', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { role_id: user_mock_1.mockCashierRole.role_id },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findRoleById.mockResolvedValue(user_mock_1.mockCashierRole);
            user_repository_1.default.update.mockResolvedValue({
                ...user_mock_1.mockUser,
                role: user_mock_1.mockCashierRole,
            });
            await user_service_1.default.update(mockRequest);
            expect(user_repository_1.default.findRoleById).toHaveBeenCalledWith(user_mock_1.mockCashierRole.role_id);
        });
        it('should throw ErrorValidationException when role_id not found', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { role_id: 'non-existent-role-id' },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findRoleById.mockResolvedValue(null);
            await expect(user_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should validate user_status_id when provided', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { user_status_id: user_mock_1.mockInactiveStatus.user_status_id },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findUserStatusById.mockResolvedValue(user_mock_1.mockInactiveStatus);
            user_repository_1.default.update.mockResolvedValue({
                ...user_mock_1.mockUser,
                user_status: user_mock_1.mockInactiveStatus,
            });
            await user_service_1.default.update(mockRequest);
            expect(user_repository_1.default.findUserStatusById).toHaveBeenCalledWith(user_mock_1.mockInactiveStatus.user_status_id);
        });
        it('should throw ErrorValidationException when user_status_id not found', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { user_status_id: 'non-existent-status-id' },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.findUserStatusById.mockResolvedValue(null);
            await expect(user_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should hash password when provided', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
                body: { password: 'newPassword123' },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockResolvedValue('hashedNewPassword');
            user_repository_1.default.update.mockResolvedValue(user_mock_1.mockUser);
            await user_service_1.default.update(mockRequest);
            expect(encrypt_decrypt_1.default.prototype.encryptBcrypt).toHaveBeenCalledWith('newPassword123');
        });
    });
    // ============================================
    // SOFT DELETE TESTS
    // ============================================
    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when user not found', async () => {
            const mockRequest = {
                params: { user_id: 'non-existent-id' },
            };
            user_repository_1.default.findById.mockResolvedValue(null);
            await expect(user_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should return success response when user deleted', async () => {
            const mockRequest = {
                params: { user_id: user_mock_1.mockUser.user_id },
            };
            user_repository_1.default.findById.mockResolvedValue(user_mock_1.mockUser);
            user_repository_1.default.softDelete.mockResolvedValue(undefined);
            const result = await user_service_1.default.softDelete(mockRequest);
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
            expect(result.message).toBe('User berhasil dihapus');
            expect(user_repository_1.default.findById).toHaveBeenCalledWith(user_mock_1.mockUser.user_id);
        });
    });
    // ============================================
    // GET ROLES TESTS
    // ============================================
    describe('getRoles', () => {
        it('should return list of roles', async () => {
            user_repository_1.default.findAllRoles.mockResolvedValue(user_mock_1.mockRoles);
            const result = await user_service_1.default.getRoles();
            expect(result).toBeDefined();
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('ADMIN');
            expect(result[1].name).toBe('CASHIER');
        });
        it('should return empty array when no roles found', async () => {
            user_repository_1.default.findAllRoles.mockResolvedValue([]);
            const result = await user_service_1.default.getRoles();
            expect(result).toHaveLength(0);
        });
        it('should call repository findAllRoles', async () => {
            user_repository_1.default.findAllRoles.mockResolvedValue(user_mock_1.mockRoles);
            await user_service_1.default.getRoles();
            expect(user_repository_1.default.findAllRoles).toHaveBeenCalled();
        });
    });
    // ============================================
    // GET USER STATUSES TESTS
    // ============================================
    describe('getUserStatuses', () => {
        it('should return list of user statuses', async () => {
            user_repository_1.default.findAllUserStatuses.mockResolvedValue(user_mock_1.mockUserStatuses);
            const result = await user_service_1.default.getUserStatuses();
            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result[0].name).toBe('ACTIVE');
            expect(result[1].name).toBe('INACTIVE');
        });
        it('should return empty array when no statuses found', async () => {
            user_repository_1.default.findAllUserStatuses.mockResolvedValue([]);
            const result = await user_service_1.default.getUserStatuses();
            expect(result).toHaveLength(0);
        });
        it('should call repository findAllUserStatuses', async () => {
            user_repository_1.default.findAllUserStatuses.mockResolvedValue(user_mock_1.mockUserStatuses);
            await user_service_1.default.getUserStatuses();
            expect(user_repository_1.default.findAllUserStatuses).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=user.service.test.js.map