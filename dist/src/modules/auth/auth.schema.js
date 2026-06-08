"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchemas = exports.resetPasswordSchema = exports.forgotPasswordRequestOtpSchema = exports.loginSchema = exports.UserStatusName = exports.RoleName = void 0;
const zod_1 = require("zod");
// ============================================
// CONSTANTS (matches values in database tables)
// ============================================
/**
 * Role names - matches 'roles' table in database
 */
var RoleName;
(function (RoleName) {
    RoleName["ADMIN"] = "ADMIN";
    RoleName["CASHIER"] = "CASHIER";
})(RoleName || (exports.RoleName = RoleName = {}));
/**
 * User status names - matches 'user_statuses' table in database
 */
var UserStatusName;
(function (UserStatusName) {
    UserStatusName["ACTIVE"] = "ACTIVE";
    UserStatusName["INACTIVE"] = "INACTIVE";
    UserStatusName["DELETED"] = "DELETED";
})(UserStatusName || (exports.UserStatusName = UserStatusName = {}));
// ============================================
// ZOD SCHEMAS
// ============================================
const phoneNumberSchema = zod_1.z
    .string()
    .min(9, 'Nomor WhatsApp minimal 9 karakter')
    .max(20, 'Nomor WhatsApp maksimal 20 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor WhatsApp tidak valid');
/**
 * Login schema - username + password validation
 */
exports.loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter'),
    password: zod_1.z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
});
/**
 * Forgot password - request OTP schema
 */
exports.forgotPasswordRequestOtpSchema = zod_1.z.object({
    phone_number: phoneNumberSchema,
});
/**
 * Forgot password - reset password schema
 */
exports.resetPasswordSchema = zod_1.z.object({
    phone_number: phoneNumberSchema,
    otp: zod_1.z
        .string()
        .length(6, 'OTP harus 6 digit')
        .regex(/^\d+$/, 'OTP hanya boleh berisi angka'),
    password: zod_1.z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
    confirm_password: zod_1.z
        .string()
        .min(6, 'Konfirmasi password minimal 6 karakter')
        .max(255, 'Konfirmasi password maksimal 255 karakter'),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirm_password'],
});
// Export schemas
exports.authSchemas = {
    login: exports.loginSchema,
    forgotPasswordRequestOtp: exports.forgotPasswordRequestOtpSchema,
    resetPassword: exports.resetPasswordSchema,
};
//# sourceMappingURL=auth.schema.js.map