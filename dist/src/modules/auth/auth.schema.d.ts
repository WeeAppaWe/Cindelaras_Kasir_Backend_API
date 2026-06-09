import { z } from 'zod';
/**
 * Role names - matches 'roles' table in database
 */
export declare enum RoleName {
    ADMIN = "ADMIN",
    CASHIER = "CASHIER"
}
/**
 * User status names - matches 'user_statuses' table in database
 */
export declare enum UserStatusName {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}
/**
 * Login schema - username + password validation
 */
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
/**
 * Forgot password - request OTP schema
 */
export declare const forgotPasswordRequestOtpSchema: z.ZodObject<{
    phone_number: z.ZodString;
}, z.core.$strip>;
/**
 * Forgot password - verify OTP schema
 */
export declare const verifyForgotPasswordOtpSchema: z.ZodObject<{
    phone_number: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
/**
 * Forgot password - reset password schema
 */
export declare const resetPasswordSchema: z.ZodObject<{
    phone_number: z.ZodString;
    reset_token: z.ZodString;
    password: z.ZodString;
    confirm_password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordRequestOtpInput = z.infer<typeof forgotPasswordRequestOtpSchema>;
export type VerifyForgotPasswordOtpInput = z.infer<typeof verifyForgotPasswordOtpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export declare const authSchemas: {
    login: z.ZodObject<{
        username: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
    forgotPasswordRequestOtp: z.ZodObject<{
        phone_number: z.ZodString;
    }, z.core.$strip>;
    verifyForgotPasswordOtp: z.ZodObject<{
        phone_number: z.ZodString;
        otp: z.ZodString;
    }, z.core.$strip>;
    resetPassword: z.ZodObject<{
        phone_number: z.ZodString;
        reset_token: z.ZodString;
        password: z.ZodString;
        confirm_password: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.schema.d.ts.map