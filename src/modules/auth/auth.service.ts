import crypto from 'crypto';
import { ErrorAuthenticationException } from '../../../exception/error-authentication.exception';
import { ErrorCodeException } from '../../../exception/error-code.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import getPrismaClient from '../../../database/postgres.connection';
import redis from '../../../database/redis.connection';
import { formatPhoneNumber, isFonnteConfigured, sendWhatsAppMessage } from '../../../utility/fonnte.utility';
import tokenService from '../token/token.service';
import authRepository from './auth.repository';
import {
    ForgotPasswordRequestOtpRequest,
    ForgotPasswordRequestOtpResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    PasswordResetOtpPayload,
    PasswordResetTokenPayload,
    ResetPasswordRequest,
    ResetPasswordResponse,
    VerifyForgotPasswordOtpRequest,
    VerifyForgotPasswordOtpResponse,
} from './auth.types';
import { UserStatusName } from './auth.schema';
import { AuthenticatedRequest } from '../../../types';

const prisma = getPrismaClient();
const PasswordResetOtpTtlSeconds = parseInt(process.env.FORGOT_PASSWORD_OTP_TTL_SECONDS || '300', 10);
const PasswordResetOtpMaxAttempts = parseInt(process.env.FORGOT_PASSWORD_OTP_MAX_ATTEMPTS || '5', 10);
const PasswordResetOtpLockAttempts = parseInt(process.env.FORGOT_PASSWORD_OTP_LOCK_ATTEMPTS || '3', 10);
const PasswordResetOtpLockSeconds = parseInt(process.env.FORGOT_PASSWORD_OTP_LOCK_SECONDS || '60', 10);
const PasswordResetTokenTtlSeconds = parseInt(process.env.FORGOT_PASSWORD_RESET_TOKEN_TTL_SECONDS || '600', 10);

const getPasswordResetOtpKey = (phoneNumber: string): string => {
    return `auth:forgot-password:otp:${phoneNumber}`;
};

const getPasswordResetTokenKey = (phoneNumber: string): string => {
    return `auth:forgot-password:reset-token:${phoneNumber}`;
};

const generatePasswordResetToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

const getOtpLockMessage = (remainingSeconds: number): string => {
    return `Terlalu banyak percobaan OTP salah. Coba lagi dalam ${remainingSeconds} detik`;
};

const throwOtpValidationError = (message: string): never => {
    throw new ErrorValidationException(message, [
        { location: 'body', field: 'otp', message },
    ]);
};

const throwResetTokenValidationError = (
    message = 'Token reset password tidak valid atau sudah kedaluwarsa'
): never => {
    throw new ErrorValidationException(message, [
        { location: 'body', field: 'reset_token', message },
    ]);
};

const getInvalidOtpMessage = (lockedUntil?: number): string => {
    return lockedUntil
        ? `OTP tidak valid. Coba lagi dalam ${PasswordResetOtpLockSeconds} detik`
        : 'OTP tidak valid';
};

const buildNextOtpPayload = (
    payload: PasswordResetOtpPayload,
    attempts: number,
    lockedUntil?: number
): PasswordResetOtpPayload => {
    const { locked_until, ...payloadWithoutLock } = payload;

    return lockedUntil
        ? { ...payloadWithoutLock, attempts, locked_until: lockedUntil }
        : { ...payloadWithoutLock, attempts };
};

const handleInvalidPasswordResetOtp = async (
    key: string,
    payload: PasswordResetOtpPayload
): Promise<never> => {
    const nextAttempts = payload.attempts + 1;
    const shouldLock =
        nextAttempts >= PasswordResetOtpLockAttempts &&
        nextAttempts % PasswordResetOtpLockAttempts === 0;
    const lockedUntil = shouldLock
        ? Date.now() + PasswordResetOtpLockSeconds * 1000
        : undefined;
    const message = getInvalidOtpMessage(lockedUntil);

    if (nextAttempts >= PasswordResetOtpMaxAttempts) {
        await redis.del(key);
        return throwOtpValidationError(message);
    }

    const remainingTtl = await redis.ttl(key);

    if (remainingTtl <= 0) {
        return throwOtpValidationError(message);
    }

    await redis.set(
        key,
        JSON.stringify(buildNextOtpPayload(payload, nextAttempts, lockedUntil)),
        'EX',
        remainingTtl
    );

    return throwOtpValidationError(message);
};

const buildPasswordResetOtpMessage = (otp: string): string => {
    const validMinutes = Math.ceil(PasswordResetOtpTtlSeconds / 60);

    return [
        `Kode OTP reset password Sistem Kasir Anda: ${otp}`,
        `Kode berlaku selama ${validMinutes} menit.`,
        'Jangan berikan kode ini kepada siapa pun.',
    ].join('\n');
};

/**
 * Login with username and password
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const { username, password } = data;

        // 1. Find user by username
        const user = await authRepository.findByUsername(username);

        if (!user) {
            throw new ErrorAuthenticationException('Username atau password salah');
        }

        // 2. Verify password
        const encDec = new EncryptDecryptClass();
        const isPasswordValid = await encDec.checkBcrypt(password, user.password);

        if (!isPasswordValid) {
            throw new ErrorAuthenticationException('Username atau password salah');
        }

        // 3. Check account status
        if (user.user_status.name !== UserStatusName.ACTIVE) {
            throw new ErrorAuthenticationException('Akun tidak aktif');
        }

        // 4. Generate token
        const accessKey = await tokenService.generateAccess(user.user_id);
        const { public_key, public_token } = tokenService.generatePublicToken(accessKey);

        // 5. Store token to Redis
        const loginTime = new Date().getTime();
        await tokenService.storeTokenToRedis(accessKey, {
            id: user.user_id,
            key: public_key,
            login_time: loginTime,
            refresh_token: loginTime,
        });

        // 6. Update last login
        await prisma.user.update({
            where: { user_id: user.user_id },
            data: { last_login: new Date() },
        });

        // 7. Return response
        return {
            token: {
                access_token: public_token,
                api_key: public_key,
                token_type: 'Bearer',
                expires_in: tokenService.getTokenExpiredTime(),
            },
            user: {
                user_id: user.user_id,
                username: user.username,
                name: user.name,
                role: {
                    role_id: user.role.role_id,
                    name: user.role.name,
                },
                status: {
                    user_status_id: user.user_status.user_status_id,
                    name: user.user_status.name,
                },
            },
        };
    } catch (error) {
        console.error(`--- Auth Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Logout - remove token from Redis
 */
export const logout = async (req: AuthenticatedRequest): Promise<LogoutResponse> => {
    try {
        const { key, tokenRemoveBearer } = await tokenService.getAuthAccount(req);

        await tokenService.removeTokenFromRedis(tokenRemoveBearer, key);

        return {
            success: true,
            message: 'Logout berhasil',
        };
    } catch (error) {
        console.error(`--- Auth Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Request forgot password OTP via WhatsApp
 */
export const requestForgotPasswordOtp = async (
    data: ForgotPasswordRequestOtpRequest
): Promise<ForgotPasswordRequestOtpResponse> => {
    try {
        if (!isFonnteConfigured()) {
            throw new ErrorValidationException('Fonnte belum dikonfigurasi', [
                { location: 'server', field: 'fonnte_token', message: 'Token Fonnte tidak ditemukan' },
            ]);
        }

        const phoneNumber = formatPhoneNumber(data.phone_number);
        const user = await authRepository.findByPhoneNumber(phoneNumber);

        if (!user) {
            throw new ErrorValidationException('Nomor WhatsApp tidak terdaftar', [
                { location: 'body', field: 'phone_number', message: 'Nomor WhatsApp tidak terdaftar' },
            ]);
        }

        if (user.user_status.name !== UserStatusName.ACTIVE) {
            throw new ErrorAuthenticationException('Akun tidak aktif');
        }

        const encDec = new EncryptDecryptClass();
        const otp = encDec.generateCode(6);
        const otpHash = encDec.encryptBcrypt(otp);
        const key = getPasswordResetOtpKey(phoneNumber);
        const payload: PasswordResetOtpPayload = {
            user_id: user.user_id,
            phone_number: phoneNumber,
            otp_hash: otpHash,
            attempts: 0,
            expires_at: Date.now() + PasswordResetOtpTtlSeconds * 1000,
        };

        await redis.set(key, JSON.stringify(payload), 'EX', PasswordResetOtpTtlSeconds);

        const sendResult = await sendWhatsAppMessage({
            target: phoneNumber,
            message: buildPasswordResetOtpMessage(otp),
        });
        if (!sendResult.status) {
            await redis.del(key);
            throw new ErrorCodeException(sendResult.message || 'Gagal mengirim OTP WhatsApp');
        }

        return {
            success: true,
            message: 'OTP reset password berhasil dikirim ke WhatsApp',
            expires_in: PasswordResetOtpTtlSeconds,
        };
    } catch (error) {
        console.error(`--- Auth Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Verify forgot password OTP and create a short-lived reset token
 */
export const verifyForgotPasswordOtp = async (
    data: VerifyForgotPasswordOtpRequest
): Promise<VerifyForgotPasswordOtpResponse> => {
    try {
        const phoneNumber = formatPhoneNumber(data.phone_number);
        const otpKey = getPasswordResetOtpKey(phoneNumber);
        const otpRecord = await redis.get(otpKey);

        if (!otpRecord) {
            throwOtpValidationError('OTP tidak valid atau sudah kedaluwarsa');
        }

        const payload = JSON.parse(otpRecord) as PasswordResetOtpPayload;
        const now = Date.now();

        if (payload.locked_until && payload.locked_until > now) {
            const remainingSeconds = Math.ceil((payload.locked_until - now) / 1000);
            const message = getOtpLockMessage(remainingSeconds);

            throwOtpValidationError(message);
        }

        const encDec = new EncryptDecryptClass();
        const isOtpValid = await encDec.checkBcrypt(data.otp, payload.otp_hash);

        if (!isOtpValid) {
            await handleInvalidPasswordResetOtp(otpKey, payload);
        }

        const user = await authRepository.findByPhoneNumber(phoneNumber);
        if (!user || user.user_id !== payload.user_id) {
            await redis.del(otpKey);
            throwOtpValidationError('OTP tidak valid atau sudah kedaluwarsa');
        }

        if (user.user_status.name !== UserStatusName.ACTIVE) {
            await redis.del(otpKey);
            throw new ErrorAuthenticationException('Akun tidak aktif');
        }

        const resetToken = generatePasswordResetToken();
        const resetTokenPayload: PasswordResetTokenPayload = {
            user_id: user.user_id,
            phone_number: phoneNumber,
            token_hash: encDec.encryptBcrypt(resetToken),
            expires_at: Date.now() + PasswordResetTokenTtlSeconds * 1000,
        };

        await redis.set(
            getPasswordResetTokenKey(phoneNumber),
            JSON.stringify(resetTokenPayload),
            'EX',
            PasswordResetTokenTtlSeconds
        );
        await redis.del(otpKey);

        return {
            success: true,
            message: 'OTP berhasil diverifikasi',
            reset_token: resetToken,
            expires_in: PasswordResetTokenTtlSeconds,
        };
    } catch (error) {
        console.error(`--- Auth Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Reset password using verified reset token
 */
export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
        const phoneNumber = formatPhoneNumber(data.phone_number);
        const key = getPasswordResetTokenKey(phoneNumber);
        const resetTokenRecord = await redis.get(key);

        if (!resetTokenRecord) {
            throwResetTokenValidationError();
        }

        const payload = JSON.parse(resetTokenRecord) as PasswordResetTokenPayload;
        const encDec = new EncryptDecryptClass();
        const isResetTokenValid = await encDec.checkBcrypt(data.reset_token, payload.token_hash);

        if (!isResetTokenValid) {
            throwResetTokenValidationError();
        }

        const user = await authRepository.findByPhoneNumber(phoneNumber);
        if (!user || user.user_id !== payload.user_id) {
            await redis.del(key);
            throwResetTokenValidationError();
        }

        if (user.user_status.name !== UserStatusName.ACTIVE) {
            await redis.del(key);
            throw new ErrorAuthenticationException('Akun tidak aktif');
        }

        const hashedPassword = encDec.encryptBcrypt(data.password);
        await authRepository.updatePassword(user.user_id, hashedPassword);
        await redis.del(key);

        return {
            success: true,
            message: 'Password berhasil diperbarui',
        };
    } catch (error) {
        console.error(`--- Auth Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const authService = {
    login,
    logout,
    requestForgotPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword,
};

export default authService;
