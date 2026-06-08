import { z } from 'zod';

// ============================================
// CONSTANTS (matches values in database tables)
// ============================================

/**
 * Role names - matches 'roles' table in database
 */
export enum RoleName {
    ADMIN = 'ADMIN',
    CASHIER = 'CASHIER',
}

/**
 * User status names - matches 'user_statuses' table in database
 */
export enum UserStatusName {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}

// ============================================
// ZOD SCHEMAS
// ============================================

const phoneNumberSchema = z
    .string()
    .min(9, 'Nomor WhatsApp minimal 9 karakter')
    .max(20, 'Nomor WhatsApp maksimal 20 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor WhatsApp tidak valid');

/**
 * Login schema - username + password validation
 */
export const loginSchema = z.object({
    username: z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter'),
    password: z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
});

/**
 * Forgot password - request OTP schema
 */
export const forgotPasswordRequestOtpSchema = z.object({
    phone_number: phoneNumberSchema,
});

/**
 * Forgot password - reset password schema
 */
export const resetPasswordSchema = z.object({
    phone_number: phoneNumberSchema,
    otp: z
        .string()
        .length(6, 'OTP harus 6 digit')
        .regex(/^\d+$/, 'OTP hanya boleh berisi angka'),
    password: z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
    confirm_password: z
        .string()
        .min(6, 'Konfirmasi password minimal 6 karakter')
        .max(255, 'Konfirmasi password maksimal 255 karakter'),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirm_password'],
});

// Infer types from schema
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordRequestOtpInput = z.infer<typeof forgotPasswordRequestOtpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Export schemas
export const authSchemas = {
    login: loginSchema,
    forgotPasswordRequestOtp: forgotPasswordRequestOtpSchema,
    resetPassword: resetPasswordSchema,
};
