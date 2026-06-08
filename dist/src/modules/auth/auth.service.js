"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.resetPassword = exports.requestForgotPasswordOtp = exports.logout = exports.login = void 0;
const error_authentication_exception_1 = require("../../../exception/error-authentication.exception");
const error_code_exception_1 = require("../../../exception/error-code.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const encrypt_decrypt_1 = __importDefault(require("../../../utility/encrypt-decrypt"));
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const redis_connection_1 = __importDefault(require("../../../database/redis.connection"));
const fonnte_utility_1 = require("../../../utility/fonnte.utility");
const token_service_1 = __importDefault(require("../token/token.service"));
const auth_repository_1 = __importDefault(require("./auth.repository"));
const auth_schema_1 = require("./auth.schema");
const prisma = (0, postgres_connection_1.default)();
const PasswordResetOtpTtlSeconds = parseInt(process.env.FORGOT_PASSWORD_OTP_TTL_SECONDS || '300', 10);
const PasswordResetOtpMaxAttempts = parseInt(process.env.FORGOT_PASSWORD_OTP_MAX_ATTEMPTS || '5', 10);
const PasswordResetOtpLockAttempts = parseInt(process.env.FORGOT_PASSWORD_OTP_LOCK_ATTEMPTS || '3', 10);
const PasswordResetOtpLockSeconds = parseInt(process.env.FORGOT_PASSWORD_OTP_LOCK_SECONDS || '60', 10);
const getPasswordResetOtpKey = (phoneNumber) => {
    return `auth:forgot-password:otp:${phoneNumber}`;
};
const getOtpLockMessage = (remainingSeconds) => {
    return `Terlalu banyak percobaan OTP salah. Coba lagi dalam ${remainingSeconds} detik`;
};
const throwOtpValidationError = (message) => {
    throw new error_validation_exception_1.ErrorValidationException(message, [
        { location: 'body', field: 'otp', message },
    ]);
};
const getInvalidOtpMessage = (lockedUntil) => {
    return lockedUntil
        ? `OTP tidak valid. Coba lagi dalam ${PasswordResetOtpLockSeconds} detik`
        : 'OTP tidak valid';
};
const buildNextOtpPayload = (payload, attempts, lockedUntil) => {
    const { locked_until, ...payloadWithoutLock } = payload;
    return lockedUntil
        ? { ...payloadWithoutLock, attempts, locked_until: lockedUntil }
        : { ...payloadWithoutLock, attempts };
};
const handleInvalidPasswordResetOtp = async (key, payload) => {
    const nextAttempts = payload.attempts + 1;
    const shouldLock = nextAttempts >= PasswordResetOtpLockAttempts &&
        nextAttempts % PasswordResetOtpLockAttempts === 0;
    const lockedUntil = shouldLock
        ? Date.now() + PasswordResetOtpLockSeconds * 1000
        : undefined;
    const message = getInvalidOtpMessage(lockedUntil);
    if (nextAttempts >= PasswordResetOtpMaxAttempts) {
        await redis_connection_1.default.del(key);
        return throwOtpValidationError(message);
    }
    const remainingTtl = await redis_connection_1.default.ttl(key);
    if (remainingTtl <= 0) {
        return throwOtpValidationError(message);
    }
    await redis_connection_1.default.set(key, JSON.stringify(buildNextOtpPayload(payload, nextAttempts, lockedUntil)), 'EX', remainingTtl);
    return throwOtpValidationError(message);
};
const buildPasswordResetOtpMessage = (otp) => {
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
const login = async (data) => {
    try {
        const { username, password } = data;
        // 1. Find user by username
        const user = await auth_repository_1.default.findByUsername(username);
        if (!user) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Username atau password salah');
        }
        // 2. Verify password
        const encDec = new encrypt_decrypt_1.default();
        const isPasswordValid = await encDec.checkBcrypt(password, user.password);
        if (!isPasswordValid) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Username atau password salah');
        }
        // 3. Check account status
        if (user.user_status.name !== auth_schema_1.UserStatusName.ACTIVE) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Akun tidak aktif');
        }
        // 4. Generate token
        const accessKey = await token_service_1.default.generateAccess(user.user_id);
        const { public_key, public_token } = token_service_1.default.generatePublicToken(accessKey);
        // 5. Store token to Redis
        const loginTime = new Date().getTime();
        await token_service_1.default.storeTokenToRedis(accessKey, {
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
                expires_in: token_service_1.default.getTokenExpiredTime(),
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
    }
    catch (error) {
        console.error(`--- Auth Service Error: ${error.message}`);
        throw error;
    }
};
exports.login = login;
/**
 * Logout - remove token from Redis
 */
const logout = async (req) => {
    try {
        const { key, tokenRemoveBearer } = await token_service_1.default.getAuthAccount(req);
        await token_service_1.default.removeTokenFromRedis(tokenRemoveBearer, key);
        return {
            success: true,
            message: 'Logout berhasil',
        };
    }
    catch (error) {
        console.error(`--- Auth Service Error: ${error.message}`);
        throw error;
    }
};
exports.logout = logout;
/**
 * Request forgot password OTP via WhatsApp
 */
const requestForgotPasswordOtp = async (data) => {
    try {
        if (!(0, fonnte_utility_1.isFonnteConfigured)()) {
            throw new error_validation_exception_1.ErrorValidationException('Fonnte belum dikonfigurasi', [
                { location: 'server', field: 'fonnte_token', message: 'Token Fonnte tidak ditemukan' },
            ]);
        }
        const phoneNumber = (0, fonnte_utility_1.formatPhoneNumber)(data.phone_number);
        const user = await auth_repository_1.default.findByPhoneNumber(phoneNumber);
        if (!user) {
            throw new error_validation_exception_1.ErrorValidationException('Nomor WhatsApp tidak terdaftar', [
                { location: 'body', field: 'phone_number', message: 'Nomor WhatsApp tidak terdaftar' },
            ]);
        }
        if (user.user_status.name !== auth_schema_1.UserStatusName.ACTIVE) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Akun tidak aktif');
        }
        const encDec = new encrypt_decrypt_1.default();
        const otp = encDec.generateCode(6);
        const otpHash = encDec.encryptBcrypt(otp);
        const key = getPasswordResetOtpKey(phoneNumber);
        const payload = {
            user_id: user.user_id,
            phone_number: phoneNumber,
            otp_hash: otpHash,
            attempts: 0,
            expires_at: Date.now() + PasswordResetOtpTtlSeconds * 1000,
        };
        await redis_connection_1.default.set(key, JSON.stringify(payload), 'EX', PasswordResetOtpTtlSeconds);
        const sendResult = await (0, fonnte_utility_1.sendWhatsAppMessage)({
            target: phoneNumber,
            message: buildPasswordResetOtpMessage(otp),
        });
        if (!sendResult.status) {
            await redis_connection_1.default.del(key);
            throw new error_code_exception_1.ErrorCodeException(sendResult.message || 'Gagal mengirim OTP WhatsApp');
        }
        return {
            success: true,
            message: 'OTP reset password berhasil dikirim ke WhatsApp',
            expires_in: PasswordResetOtpTtlSeconds,
        };
    }
    catch (error) {
        console.error(`--- Auth Service Error: ${error.message}`);
        throw error;
    }
};
exports.requestForgotPasswordOtp = requestForgotPasswordOtp;
/**
 * Reset password using OTP
 */
const resetPassword = async (data) => {
    try {
        const phoneNumber = (0, fonnte_utility_1.formatPhoneNumber)(data.phone_number);
        const key = getPasswordResetOtpKey(phoneNumber);
        const otpRecord = await redis_connection_1.default.get(key);
        if (!otpRecord) {
            throw new error_validation_exception_1.ErrorValidationException('OTP tidak valid atau sudah kedaluwarsa', [
                { location: 'body', field: 'otp', message: 'OTP tidak valid atau sudah kedaluwarsa' },
            ]);
        }
        const payload = JSON.parse(otpRecord);
        const now = Date.now();
        if (payload.locked_until && payload.locked_until > now) {
            const remainingSeconds = Math.ceil((payload.locked_until - now) / 1000);
            const message = getOtpLockMessage(remainingSeconds);
            throwOtpValidationError(message);
        }
        const encDec = new encrypt_decrypt_1.default();
        const isOtpValid = await encDec.checkBcrypt(data.otp, payload.otp_hash);
        if (!isOtpValid) {
            await handleInvalidPasswordResetOtp(key, payload);
        }
        const user = await auth_repository_1.default.findByPhoneNumber(phoneNumber);
        if (!user || user.user_id !== payload.user_id) {
            await redis_connection_1.default.del(key);
            throw new error_validation_exception_1.ErrorValidationException('OTP tidak valid atau sudah kedaluwarsa', [
                { location: 'body', field: 'otp', message: 'OTP tidak valid atau sudah kedaluwarsa' },
            ]);
        }
        if (user.user_status.name !== auth_schema_1.UserStatusName.ACTIVE) {
            await redis_connection_1.default.del(key);
            throw new error_authentication_exception_1.ErrorAuthenticationException('Akun tidak aktif');
        }
        const hashedPassword = encDec.encryptBcrypt(data.password);
        await auth_repository_1.default.updatePassword(user.user_id, hashedPassword);
        await redis_connection_1.default.del(key);
        return {
            success: true,
            message: 'Password berhasil diperbarui',
        };
    }
    catch (error) {
        console.error(`--- Auth Service Error: ${error.message}`);
        throw error;
    }
};
exports.resetPassword = resetPassword;
exports.authService = {
    login: exports.login,
    logout: exports.logout,
    requestForgotPasswordOtp: exports.requestForgotPasswordOtp,
    resetPassword: exports.resetPassword,
};
exports.default = exports.authService;
//# sourceMappingURL=auth.service.js.map