import authService from './auth.service';
import authRepository from './auth.repository';
import tokenService from '../token/token.service';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import redis from '../../../database/redis.connection';
import { formatPhoneNumber, isFonnteConfigured, sendWhatsAppMessage } from '../../../utility/fonnte.utility';
import { ErrorAuthenticationException } from '../../../exception/error-authentication.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import {
    createMockPasswordResetOtpPayload,
    mockActiveUser,
    mockForgotPasswordRequest,
    mockInactiveUser,
    mockLoginRequest,
    mockResetPasswordRequest,
} from '../../tests/mocks/auth.mock';

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
    formatPhoneNumber: jest.fn((phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('0')) return `62${cleaned.substring(1)}`;
        if (cleaned.startsWith('8')) return `62${cleaned}`;
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
        (formatPhoneNumber as jest.Mock).mockImplementation((phone: string) => {
            const cleaned = phone.replace(/\D/g, '');
            if (cleaned.startsWith('0')) return `62${cleaned.substring(1)}`;
            if (cleaned.startsWith('8')) return `62${cleaned}`;
            return cleaned;
        });
    });

    describe('login', () => {
        it('should successfully login with valid credentials', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(mockActiveUser);
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(true);
            (tokenService.generateAccess as jest.Mock).mockResolvedValue('mock-access-key');
            (tokenService.generatePublicToken as jest.Mock).mockReturnValue({
                public_key: 'mock-public-key',
                public_token: 'mock-public-token',
            });
            (tokenService.storeTokenToRedis as jest.Mock).mockResolvedValue(true);
            (tokenService.getTokenExpiredTime as jest.Mock).mockReturnValue(172800);

            // Act
            const result = await authService.login(mockLoginRequest.valid);

            // Assert
            expect(result).toBeDefined();
            expect(result.token).toBeDefined();
            expect(result.token.access_token).toBe('mock-public-token');
            expect(result.token.api_key).toBe('mock-public-key');
            expect(result.token.token_type).toBe('Bearer');
            expect(result.user.user_id).toBe(mockActiveUser.user_id);
            expect(result.user.username).toBe(mockActiveUser.username);
            expect(result.user.role.name).toBe('ADMIN');
        });

        it('should throw error when user not found', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(authService.login(mockLoginRequest.invalidUsername))
                .rejects
                .toThrow(ErrorAuthenticationException);
        });

        it('should throw error when password is invalid', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(mockActiveUser);
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(false);

            // Act & Assert
            await expect(authService.login(mockLoginRequest.invalidPassword))
                .rejects
                .toThrow(ErrorAuthenticationException);
        });

        it('should throw error when user is inactive', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(mockInactiveUser);
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(true);

            // Act & Assert
            await expect(authService.login(mockLoginRequest.valid))
                .rejects
                .toThrow('Akun tidak aktif');
        });

        it('should call authRepository.findByUsername with correct username', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(null);

            // Act
            try {
                await authService.login(mockLoginRequest.valid);
            } catch (error) {
                // Expected to throw
            }

            // Assert
            expect(authRepository.findByUsername).toHaveBeenCalledWith('admin');
        });

        it('should call tokenService.storeTokenToRedis on successful login', async () => {
            // Arrange
            (authRepository.findByUsername as jest.Mock).mockResolvedValue(mockActiveUser);
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(true);
            (tokenService.generateAccess as jest.Mock).mockResolvedValue('mock-access-key');
            (tokenService.generatePublicToken as jest.Mock).mockReturnValue({
                public_key: 'mock-public-key',
                public_token: 'mock-public-token',
            });
            (tokenService.storeTokenToRedis as jest.Mock).mockResolvedValue(true);
            (tokenService.getTokenExpiredTime as jest.Mock).mockReturnValue(172800);

            // Act
            await authService.login(mockLoginRequest.valid);

            // Assert
            expect(tokenService.storeTokenToRedis).toHaveBeenCalled();
            expect(tokenService.storeTokenToRedis).toHaveBeenCalledWith(
                'mock-access-key',
                expect.objectContaining({
                    id: mockActiveUser.user_id,
                    key: 'mock-public-key',
                })
            );
        });
    });

    describe('logout', () => {
        it('should successfully logout', async () => {
            // Arrange
            const mockRequest = {
                get: jest.fn((header) => {
                    if (header === 'Authorization') return 'Bearer mock-token';
                    if (header === 'x-api-key') return 'mock-api-key';
                    return null;
                }),
            } as any;

            (tokenService.getAuthAccount as jest.Mock).mockResolvedValue({
                id: mockActiveUser.user_id,
                key: 'mock-api-key',
                tokenRemoveBearer: 'mock-token',
            });
            (tokenService.removeTokenFromRedis as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await authService.logout(mockRequest);

            // Assert
            expect(result.success).toBe(true);
            expect(result.message).toBe('Logout berhasil');
        });

        it('should call tokenService.removeTokenFromRedis', async () => {
            // Arrange
            const mockRequest = {
                get: jest.fn(),
            } as any;

            (tokenService.getAuthAccount as jest.Mock).mockResolvedValue({
                id: mockActiveUser.user_id,
                key: 'mock-api-key',
                tokenRemoveBearer: 'mock-token',
            });
            (tokenService.removeTokenFromRedis as jest.Mock).mockResolvedValue(1);

            // Act
            await authService.logout(mockRequest);

            // Assert
            expect(tokenService.removeTokenFromRedis).toHaveBeenCalledWith('mock-token', 'mock-api-key');
        });
    });

    describe('requestForgotPasswordOtp', () => {
        it('should send OTP via WhatsApp and store OTP payload in Redis', async () => {
            // Arrange
            (isFonnteConfigured as jest.Mock).mockReturnValue(true);
            (authRepository.findByPhoneNumber as jest.Mock).mockResolvedValue(mockActiveUser);
            (EncryptDecryptClass.prototype.generateCode as jest.Mock).mockReturnValue('123456');
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockReturnValue('hashed-otp');
            (redis.set as jest.Mock).mockResolvedValue('OK');
            (sendWhatsAppMessage as jest.Mock).mockResolvedValue({ status: true });

            // Act
            const result = await authService.requestForgotPasswordOtp(mockForgotPasswordRequest.valid);

            // Assert
            expect(result.success).toBe(true);
            expect(result.expires_in).toBe(otpTtlSeconds);
            expect(authRepository.findByPhoneNumber).toHaveBeenCalledWith('6281234567890');
            expect(redis.set).toHaveBeenCalledWith(
                'auth:forgot-password:otp:6281234567890',
                expect.stringContaining('"otp_hash":"hashed-otp"'),
                'EX',
                otpTtlSeconds
            );
            expect(sendWhatsAppMessage).toHaveBeenCalledWith({
                target: '6281234567890',
                message: expect.stringContaining('123456'),
            });
        });

        it('should throw validation error when Fonnte is not configured', async () => {
            // Arrange
            (isFonnteConfigured as jest.Mock).mockReturnValue(false);

            // Act & Assert
            await expect(authService.requestForgotPasswordOtp(mockForgotPasswordRequest.valid))
                .rejects
                .toThrow(ErrorValidationException);
            expect(authRepository.findByPhoneNumber).not.toHaveBeenCalled();
            expect(sendWhatsAppMessage).not.toHaveBeenCalled();
        });

        it('should throw validation error when phone number is not registered', async () => {
            // Arrange
            (isFonnteConfigured as jest.Mock).mockReturnValue(true);
            (authRepository.findByPhoneNumber as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(authService.requestForgotPasswordOtp(mockForgotPasswordRequest.unregistered))
                .rejects
                .toThrow(ErrorValidationException);
            expect(sendWhatsAppMessage).not.toHaveBeenCalled();
        });

        it('should delete Redis OTP when WhatsApp sending fails', async () => {
            // Arrange
            (isFonnteConfigured as jest.Mock).mockReturnValue(true);
            (authRepository.findByPhoneNumber as jest.Mock).mockResolvedValue(mockActiveUser);
            (EncryptDecryptClass.prototype.generateCode as jest.Mock).mockReturnValue('123456');
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockReturnValue('hashed-otp');
            (redis.set as jest.Mock).mockResolvedValue('OK');
            (redis.del as jest.Mock).mockResolvedValue(1);
            (sendWhatsAppMessage as jest.Mock).mockResolvedValue({
                status: false,
                message: 'Gagal mengirim',
            });

            // Act & Assert
            await expect(authService.requestForgotPasswordOtp(mockForgotPasswordRequest.valid))
                .rejects
                .toThrow('Gagal mengirim');
            expect(redis.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
        });
    });

    describe('resetPassword', () => {
        it('should reset password when OTP is valid', async () => {
            // Arrange
            const otpPayload = createMockPasswordResetOtpPayload();
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(otpPayload));
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(true);
            (EncryptDecryptClass.prototype.encryptBcrypt as jest.Mock).mockReturnValue('hashed-new-password');
            (authRepository.findByPhoneNumber as jest.Mock).mockResolvedValue(mockActiveUser);
            (authRepository.updatePassword as jest.Mock).mockResolvedValue(undefined);
            (redis.del as jest.Mock).mockResolvedValue(1);

            // Act
            const result = await authService.resetPassword(mockResetPasswordRequest.valid);

            // Assert
            expect(result.success).toBe(true);
            expect(authRepository.findByPhoneNumber).toHaveBeenCalledWith('6281234567890');
            expect(authRepository.updatePassword).toHaveBeenCalledWith(
                mockActiveUser.user_id,
                'hashed-new-password'
            );
            expect(redis.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
        });

        it('should throw validation error when OTP is missing or expired', async () => {
            // Arrange
            (redis.get as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(authService.resetPassword(mockResetPasswordRequest.valid))
                .rejects
                .toThrow(ErrorValidationException);
            expect(authRepository.updatePassword).not.toHaveBeenCalled();
        });

        it('should increment attempts when OTP is invalid and attempts are below limit', async () => {
            // Arrange
            const otpPayload = createMockPasswordResetOtpPayload();
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(otpPayload));
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(false);
            (redis.ttl as jest.Mock).mockResolvedValue(120);
            (redis.set as jest.Mock).mockResolvedValue('OK');

            // Act & Assert
            await expect(authService.resetPassword(mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow(ErrorValidationException);
            expect(redis.set).toHaveBeenCalledWith(
                'auth:forgot-password:otp:6281234567890',
                expect.stringContaining('"attempts":1'),
                'EX',
                120
            );
            expect(authRepository.updatePassword).not.toHaveBeenCalled();
        });

        it('should lock OTP verification temporarily after 3 invalid attempts', async () => {
            // Arrange
            const otpPayload = createMockPasswordResetOtpPayload({
                attempts: 2,
            });
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(otpPayload));
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(false);
            (redis.ttl as jest.Mock).mockResolvedValue(120);
            (redis.set as jest.Mock).mockResolvedValue('OK');

            // Act & Assert
            await expect(authService.resetPassword(mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow('OTP tidak valid. Coba lagi');
            expect(redis.set).toHaveBeenCalledWith(
                'auth:forgot-password:otp:6281234567890',
                expect.stringContaining('"attempts":3'),
                'EX',
                120
            );
            expect(redis.set).toHaveBeenCalledWith(
                'auth:forgot-password:otp:6281234567890',
                expect.stringContaining('"locked_until":'),
                'EX',
                120
            );
            expect(authRepository.updatePassword).not.toHaveBeenCalled();
        });

        it('should reject reset password while OTP verification is locked', async () => {
            // Arrange
            const otpPayload = createMockPasswordResetOtpPayload({
                attempts: 3,
                locked_until: Date.now() + 30000,
            });
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(otpPayload));

            // Act & Assert
            await expect(authService.resetPassword(mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow('Terlalu banyak percobaan OTP salah');
            expect(EncryptDecryptClass.prototype.checkBcrypt).not.toHaveBeenCalled();
            expect(authRepository.updatePassword).not.toHaveBeenCalled();
        });

        it('should delete OTP when invalid attempts reach limit', async () => {
            // Arrange
            const otpPayload = createMockPasswordResetOtpPayload({
                attempts: 4,
            });
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(otpPayload));
            (EncryptDecryptClass.prototype.checkBcrypt as jest.Mock).mockResolvedValue(false);
            (redis.del as jest.Mock).mockResolvedValue(1);

            // Act & Assert
            await expect(authService.resetPassword(mockResetPasswordRequest.invalidOtp))
                .rejects
                .toThrow(ErrorValidationException);
            expect(redis.del).toHaveBeenCalledWith('auth:forgot-password:otp:6281234567890');
            expect(authRepository.updatePassword).not.toHaveBeenCalled();
        });
    });
});
