"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = require("./auth.schema");
const auth_mock_1 = require("../../tests/mocks/auth.mock");
describe('Auth Schema Validation', () => {
    describe('loginSchema', () => {
        it('should pass validation with valid credentials', () => {
            const result = auth_schema_1.loginSchema.safeParse(auth_mock_1.mockLoginRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.username).toBe('admin');
                expect(result.data.password).toBe('password123');
            }
        });
        it('should fail validation with empty username', () => {
            const result = auth_schema_1.loginSchema.safeParse(auth_mock_1.mockLoginRequest.emptyUsername);
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
            }
        });
        it('should fail validation with short password', () => {
            const result = auth_schema_1.loginSchema.safeParse(auth_mock_1.mockLoginRequest.shortPassword);
            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find((issue) => issue.path.includes('password'));
                expect(passwordError).toBeDefined();
                expect(passwordError?.message).toContain('minimal');
            }
        });
        it('should fail validation with missing username', () => {
            const result = auth_schema_1.loginSchema.safeParse({ password: 'password123' });
            expect(result.success).toBe(false);
        });
        it('should fail validation with missing password', () => {
            const result = auth_schema_1.loginSchema.safeParse({ username: 'admin' });
            expect(result.success).toBe(false);
        });
        it('should fail validation with empty object', () => {
            const result = auth_schema_1.loginSchema.safeParse({});
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });
        it('should trim and validate username with max length', () => {
            const longUsername = 'a'.repeat(51);
            const result = auth_schema_1.loginSchema.safeParse({
                username: longUsername,
                password: 'password123',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError?.message).toContain('maksimal');
            }
        });
    });
    describe('forgotPasswordRequestOtpSchema', () => {
        it('should pass validation with valid phone number', () => {
            const result = auth_schema_1.forgotPasswordRequestOtpSchema.safeParse(auth_mock_1.mockForgotPasswordRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.phone_number).toBe('081234567890');
            }
        });
        it('should fail validation with invalid phone number format', () => {
            const result = auth_schema_1.forgotPasswordRequestOtpSchema.safeParse(auth_mock_1.mockForgotPasswordRequest.invalidPhone);
            expect(result.success).toBe(false);
            if (!result.success) {
                const phoneError = result.error.issues.find((issue) => issue.path.includes('phone_number'));
                expect(phoneError).toBeDefined();
            }
        });
        it('should fail validation with missing phone number', () => {
            const result = auth_schema_1.forgotPasswordRequestOtpSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
    describe('resetPasswordSchema', () => {
        it('should pass validation with valid reset password payload', () => {
            const result = auth_schema_1.resetPasswordSchema.safeParse(auth_mock_1.mockResetPasswordRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.phone_number).toBe('081234567890');
                expect(result.data.otp).toBe('123456');
                expect(result.data.password).toBe(auth_mock_1.mockResetPasswordRequest.valid.password);
                expect(result.data.confirm_password).toBe(auth_mock_1.mockResetPasswordRequest.valid.confirm_password);
            }
        });
        it('should fail validation with invalid OTP length', () => {
            const result = auth_schema_1.resetPasswordSchema.safeParse(auth_mock_1.mockResetPasswordRequest.invalidOtpLength);
            expect(result.success).toBe(false);
            if (!result.success) {
                const otpError = result.error.issues.find((issue) => issue.path.includes('otp'));
                expect(otpError).toBeDefined();
                expect(otpError?.message).toContain('6 digit');
            }
        });
        it('should fail validation when password confirmation does not match', () => {
            const result = auth_schema_1.resetPasswordSchema.safeParse(auth_mock_1.mockResetPasswordRequest.mismatchPassword);
            expect(result.success).toBe(false);
            if (!result.success) {
                const confirmPasswordError = result.error.issues.find((issue) => issue.path.includes('confirm_password'));
                expect(confirmPasswordError).toBeDefined();
                expect(confirmPasswordError?.message).toContain('tidak sesuai');
            }
        });
        it('should fail validation with missing required fields', () => {
            const result = auth_schema_1.resetPasswordSchema.safeParse({});
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
            }
        });
    });
});
//# sourceMappingURL=auth.schema.test.js.map