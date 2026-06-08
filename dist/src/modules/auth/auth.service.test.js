"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const token_service_1 = __importDefault(require("../token/token.service"));
const encrypt_decrypt_1 = __importDefault(require("../../../utility/encrypt-decrypt"));
const redis_connection_1 = __importDefault(require("../../../database/redis.connection"));
const fonnte_utility_1 = require("../../../utility/fonnte.utility");
const error_authentication_exception_1 = require("../../../exception/error-authentication.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const auth_mock_1 = require("../../tests/mocks/auth.mock");
const otpTtlSeconds = parseInt(process.env.FORGOT_PASSWORD_OTP_TTL_SECONDS || '300', 10);
// Mock dependencies
jest.mock('./auth.repository');
jest.mock('../token/token.service');
jest.mock('../../../utility/encrypt-decrypt');
jest.mock('../../../database/redis.connection', () => ({
    __esModule: true,
    default: {
        set: jest.fn(),
        get: jest.fn(),
        del: jest.fn(),
        ttl: jest.fn(),
    },
}));
jest.mock('../../../utility/fonnte.utility', () => ({
    formatPhoneNumber: jest.fn((phone) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('0'))
            return `62${cleaned.substring(1)}`;
        if (cleaned.startsWith('8'))
            return `62${cleaned}`;
        return cleaned;
    }),
    isFonnteConfigured: jest.fn(),
    sendWhatsAppMessage: jest.fn(),
}));
jest.mock('../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        $transaction: jest.fn((callback) => callback({
            user: { update: jest.fn() },
        })),
        user: { update: jest.fn() },
    })),
}));
describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        fonnte_utility_1.formatPhoneNumber.mockImplementation((phone) => {
            const cleaned = phone.replace(/\D/g, '');
            if (cleaned.startsWith('0'))
                return `62${cleaned.substring(1)}`;
            if (cleaned.startsWith('8'))
                return `62${cleaned}`;
            return cleaned;
        });
    });
    describe('login', () => {
        it('should successfully login with valid credentials', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(auth_mock_1.mockActiveUser);
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(true);
            token_service_1.default.generateAccess.mockResolvedValue('mock-access-key');
            token_service_1.default.generatePublicToken.mockReturnValue({
                public_key: 'mock-public-key',
                public_token: 'mock-public-token',
            });
            token_service_1.default.storeTokenToRedis.mockResolvedValue(true);
            token_service_1.default.getTokenExpiredTime.mockReturnValue(172800);
            // Act
            const result = await auth_service_1.default.login(auth_mock_1.mockLoginRequest.valid);
            // Assert
            expect(result).toBeDefined();
            expect(result.token).toBeDefined();
            expect(result.token.access_token).toBe('mock-public-token');
            expect(result.token.api_key).toBe('mock-public-key');
            expect(result.token.token_type).toBe('Bearer');
            expect(result.user.user_id).toBe(auth_mock_1.mockActiveUser.user_id);
            expect(result.user.username).toBe(auth_mock_1.mockActiveUser.username);
            expect(result.user.role.name).toBe('ADMIN');
        });
        it('should throw error when user not found', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(null);
            // Act & Assert
            await expect(auth_service_1.default.login(auth_mock_1.mockLoginRequest.invalidUsername))
                .rejects
                .toThrow(error_authentication_exception_1.ErrorAuthenticationException);
        });
        it('should throw error when password is invalid', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(auth_mock_1.mockActiveUser);
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(false);
            // Act & Assert
            await expect(auth_service_1.default.login(auth_mock_1.mockLoginRequest.invalidPassword))
                .rejects
                .toThrow(error_authentication_exception_1.ErrorAuthenticationException);
        });
        it('should throw error when user is inactive', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(auth_mock_1.mockInactiveUser);
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(true);
            // Act & Assert
            await expect(auth_service_1.default.login(auth_mock_1.mockLoginRequest.valid))
                .rejects
                .toThrow('Akun tidak aktif');
        });
        it('should call authRepository.findByUsername with correct username', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(null);
            // Act
            try {
                await auth_service_1.default.login(auth_mock_1.mockLoginRequest.valid);
            }
            catch (error) {
                // Expected to throw
            }
            // Assert
            expect(auth_repository_1.default.findByUsername).toHaveBeenCalledWith('admin');
        });
        it('should call tokenService.storeTokenToRedis on successful login', async () => {
            // Arrange
            auth_repository_1.default.findByUsername.mockResolvedValue(auth_mock_1.mockActiveUser);
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(true);
            token_service_1.default.generateAccess.mockResolvedValue('mock-access-key');
            token_service_1.default.generatePublicToken.mockReturnValue({
                public_key: 'mock-public-key',
                public_token: 'mock-public-token',
            });
            token_service_1.default.storeTokenToRedis.mockResolvedValue(true);
            token_service_1.default.getTokenExpiredTime.mockReturnValue(172800);
            // Act
            await auth_service_1.default.login(auth_mock_1.mockLoginRequest.valid);
            // Assert
            expect(token_service_1.default.storeTokenToRedis).toHaveBeenCalled();
            expect(token_service_1.default.storeTokenToRedis).toHaveBeenCalledWith('mock-access-key', expect.objectContaining({
                id: auth_mock_1.mockActiveUser.user_id,
                key: 'mock-public-key',
            }));
        });
    });
    describe('logout', () => {
        it('should successfully logout', async () => {
            // Arrange
            const mockRequest = {
                get: jest.fn((header) => {
                    if (header === 'Authorization')
                        return 'Bearer mock-token';
                    if (header === 'x-api-key')
                        return 'mock-api-key';
                    return null;
                }),
            };
            token_service_1.default.getAuthAccount.mockResolvedValue({
                id: auth_mock_1.mockActiveUser.user_id,
                key: 'mock-api-key',
                tokenRemoveBearer: 'mock-token',
            });
            token_service_1.default.removeTokenFromRedis.mockResolvedValue(1);
            // Act
            const result = await auth_service_1.default.logout(mockRequest);
            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Logout berhasil');
        });
        it('should call tokenService.removeTokenFromRedis', async () => {
            // Arrange
            const mockRequest = {
                get: jest.fn(),
            };
            token_service_1.default.getAuthAccount.mockResolvedValue({
                id: auth_mock_1.mockActiveUser.user_id,
                key: 'mock-api-key',
                tokenRemoveBearer: 'mock-token',
            });
            token_service_1.default.removeTokenFromRedis.mockResolvedValue(1);
            // Act
            await auth_service_1.default.logout(mockRequest);
            // Assert
            expect(token_service_1.default.removeTokenFromRedis).toHaveBeenCalledWith('mock-token', 'mock-api-key');
        });
    });
    describe('requestForgotPasswordOtp', () => {
        it('should send OTP via WhatsApp and store OTP payload in Redis', async () => {
            // Arrange
            fonnte_utility_1.isFonnteConfigured.mockReturnValue(true);
            auth_repository_1.default.findByPhoneNumber.mockResolvedValue(auth_mock_1.mockActiveUser);
            encrypt_decrypt_1.default.prototype.generateCode.mockReturnValue('123456');
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockReturnValue('hashed-otp');
            redis_connection_1.default.set.mockResolvedValue('OK');
            fonnte_utility_1.sendWhatsAppMessage.mockResolvedValue({ status: true });
            // Act
            const result = await auth_service_1.default.requestForgotPasswordOtp(auth_mock_1.mockForgotPasswordRequest.valid);
            // Assert
            expect(result.success).toBe(true);
            expect(result.expires_in).toBe(otpTtlSeconds);
            expect(auth_repository_1.default.findByPhoneNumber).toHaveBeenCalledWith('6281234567890');
            expect(redis_connection_1.default.set).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890', expect.stringContaining('"otp_hash":"hashed-otp"'), 'EX', otpTtlSeconds);
            expect(fonnte_utility_1.sendWhatsAppMessage).toHaveBeenCalledWith({
                target: '6281234567890',
                message: expect.stringContaining('123456'),
            });
        });
        it('should throw validation error when Fonnte is not configured', async () => {
            // Arrange
            fonnte_utility_1.isFonnteConfigured.mockReturnValue(false);
            // Act & Assert
            await expect(auth_service_1.default.requestForgotPasswordOtp(auth_mock_1.mockForgotPasswordRequest.valid))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(auth_repository_1.default.findByPhoneNumber).not.toHaveBeenCalled();
            expect(fonnte_utility_1.sendWhatsAppMessage).not.toHaveBeenCalled();
        });
        it('should throw validation error when phone number is not registered', async () => {
            // Arrange
            fonnte_utility_1.isFonnteConfigured.mockReturnValue(true);
            auth_repository_1.default.findByPhoneNumber.mockResolvedValue(null);
            // Act & Assert
            await expect(auth_service_1.default.requestForgotPasswordOtp(auth_mock_1.mockForgotPasswordRequest.unregistered))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(fonnte_utility_1.sendWhatsAppMessage).not.toHaveBeenCalled();
        });
        it('should delete Redis OTP when WhatsApp sending fails', async () => {
            // Arrange
            fonnte_utility_1.isFonnteConfigured.mockReturnValue(true);
            auth_repository_1.default.findByPhoneNumber.mockResolvedValue(auth_mock_1.mockActiveUser);
            encrypt_decrypt_1.default.prototype.generateCode.mockReturnValue('123456');
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockReturnValue('hashed-otp');
            redis_connection_1.default.set.mockResolvedValue('OK');
            redis_connection_1.default.del.mockResolvedValue(1);
            fonnte_utility_1.sendWhatsAppMessage.mockResolvedValue({
                status: false,
                message: 'Gagal mengirim',
            });
            // Act & Assert
            await expect(auth_service_1.default.requestForgotPasswordOtp(auth_mock_1.mockForgotPasswordRequest.valid))
                .rejects
                .toThrow('Gagal mengirim');
            expect(redis_connection_1.default.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
        });
    });
    describe('resetPassword', () => {
        it('should reset password when OTP is valid', async () => {
            // Arrange
            const otpPayload = (0, auth_mock_1.createMockPasswordResetOtpPayload)();
            redis_connection_1.default.get.mockResolvedValue(JSON.stringify(otpPayload));
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(true);
            encrypt_decrypt_1.default.prototype.encryptBcrypt.mockReturnValue('hashed-new-password');
            auth_repository_1.default.findByPhoneNumber.mockResolvedValue(auth_mock_1.mockActiveUser);
            auth_repository_1.default.updatePassword.mockResolvedValue(undefined);
            redis_connection_1.default.del.mockResolvedValue(1);
            // Act
            const result = await auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.valid);
            // Assert
            expect(result.success).toBe(true);
            expect(auth_repository_1.default.findByPhoneNumber).toHaveBeenCalledWith('6281234567890');
            expect(auth_repository_1.default.updatePassword).toHaveBeenCalledWith(auth_mock_1.mockActiveUser.user_id, 'hashed-new-password');
            expect(redis_connection_1.default.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
        });
        it('should throw validation error when OTP is missing or expired', async () => {
            // Arrange
            redis_connection_1.default.get.mockResolvedValue(null);
            // Act & Assert
            await expect(auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.valid))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(auth_repository_1.default.updatePassword).not.toHaveBeenCalled();
        });
        it('should increment attempts when OTP is invalid and attempts are below limit', async () => {
            // Arrange
            const otpPayload = (0, auth_mock_1.createMockPasswordResetOtpPayload)();
            redis_connection_1.default.get.mockResolvedValue(JSON.stringify(otpPayload));
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(false);
            redis_connection_1.default.ttl.mockResolvedValue(120);
            redis_connection_1.default.set.mockResolvedValue('OK');
            // Act & Assert
            await expect(auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(redis_connection_1.default.set).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890', expect.stringContaining('"attempts":1'), 'EX', 120);
            expect(auth_repository_1.default.updatePassword).not.toHaveBeenCalled();
        });
        it('should lock OTP verification temporarily after 3 invalid attempts', async () => {
            // Arrange
            const otpPayload = (0, auth_mock_1.createMockPasswordResetOtpPayload)({
                attempts: 2,
            });
            redis_connection_1.default.get.mockResolvedValue(JSON.stringify(otpPayload));
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(false);
            redis_connection_1.default.ttl.mockResolvedValue(120);
            redis_connection_1.default.set.mockResolvedValue('OK');
            // Act & Assert
            await expect(auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow('OTP tidak valid. Coba lagi');
            expect(redis_connection_1.default.set).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890', expect.stringContaining('"attempts":3'), 'EX', 120);
            expect(redis_connection_1.default.set).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890', expect.stringContaining('"locked_until":'), 'EX', 120);
            expect(auth_repository_1.default.updatePassword).not.toHaveBeenCalled();
        });
        it('should reject reset password while OTP verification is locked', async () => {
            // Arrange
            const otpPayload = (0, auth_mock_1.createMockPasswordResetOtpPayload)({
                attempts: 3,
                locked_until: Date.now() + 30000,
            });
            redis_connection_1.default.get.mockResolvedValue(JSON.stringify(otpPayload));
            // Act & Assert
            await expect(auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow('Terlalu banyak percobaan OTP salah');
            expect(encrypt_decrypt_1.default.prototype.checkBcrypt).not.toHaveBeenCalled();
            expect(auth_repository_1.default.updatePassword).not.toHaveBeenCalled();
        });
        it('should delete OTP when invalid attempts reach limit', async () => {
            // Arrange
            const otpPayload = (0, auth_mock_1.createMockPasswordResetOtpPayload)({
                attempts: 4,
            });
            redis_connection_1.default.get.mockResolvedValue(JSON.stringify(otpPayload));
            encrypt_decrypt_1.default.prototype.checkBcrypt.mockResolvedValue(false);
            redis_connection_1.default.del.mockResolvedValue(1);
            // Act & Assert
            await expect(auth_service_1.default.resetPassword(auth_mock_1.mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
            expect(redis_connection_1.default.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
            expect(auth_repository_1.default.updatePassword).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map