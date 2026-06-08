import {
    forgotPasswordRequestOtpSchema,
    loginSchema,
    resetPasswordSchema,
} from './auth.schema';
import {
    mockForgotPasswordRequest,
    mockLoginRequest,
    mockResetPasswordRequest,
} from '../../tests/mocks/auth.mock';

describe('Auth Schema Validation', () => {
    describe('loginSchema', () => {
        it('should pass validation with valid credentials', () => {
            const result = loginSchema.safeParse(mockLoginRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.username).toBe('admin');
                expect(result.data.password).toBe('password123');
            }
        });

        it('should fail validation with empty username', () => {
            const result = loginSchema.safeParse(mockLoginRequest.emptyUsername);

            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find(
                    (issue) => issue.path.includes('username')
                );
                expect(usernameError).toBeDefined();
            }
        });

        it('should fail validation with short password', () => {
            const result = loginSchema.safeParse(mockLoginRequest.shortPassword);

            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find(
                    (issue) => issue.path.includes('password')
                );
                expect(passwordError).toBeDefined();
                expect(passwordError?.message).toContain('minimal');
            }
        });

        it('should fail validation with missing username', () => {
            const result = loginSchema.safeParse({ password: 'password123' });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing password', () => {
            const result = loginSchema.safeParse({ username: 'admin' });

            expect(result.success).toBe(false);
        });

        it('should fail validation with empty object', () => {
            const result = loginSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });

        it('should trim and validate username with max length', () => {
            const longUsername = 'a'.repeat(51);
            const result = loginSchema.safeParse({
                username: longUsername,
                password: 'password123',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find(
                    (issue) => issue.path.includes('username')
                );
                expect(usernameError?.message).toContain('maksimal');
            }
        });
    });

    describe('forgotPasswordRequestOtpSchema', () => {
        it('should pass validation with valid phone number', () => {
            const result = forgotPasswordRequestOtpSchema.safeParse(mockForgotPasswordRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.phone_number).toBe('081234567890');
            }
        });

        it('should fail validation with invalid phone number format', () => {
            const result = forgotPasswordRequestOtpSchema.safeParse(mockForgotPasswordRequest.invalidPhone);

            expect(result.success).toBe(false);
            if (!result.success) {
                const phoneError = result.error.issues.find(
                    (issue) => issue.path.includes('phone_number')
                );
                expect(phoneError).toBeDefined();
            }
        });

        it('should fail validation with missing phone number', () => {
            const result = forgotPasswordRequestOtpSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    describe('resetPasswordSchema', () => {
        it('should pass validation with valid reset password payload', () => {
            const result = resetPasswordSchema.safeParse(mockResetPasswordRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.phone_number).toBe('081234567890');
                expect(result.data.otp).toBe('123456');
                expect(result.data.password).toBe(mockResetPasswordRequest.valid.password);
                expect(result.data.confirm_password).toBe(mockResetPasswordRequest.valid.confirm_password);
            }
        });

        it('should fail validation with invalid OTP length', () => {
            const result = resetPasswordSchema.safeParse(mockResetPasswordRequest.invalidOtpLength);

            expect(result.success).toBe(false);
            if (!result.success) {
                const otpError = result.error.issues.find(
                    (issue) => issue.path.includes('otp')
                );
                expect(otpError).toBeDefined();
                expect(otpError?.message).toContain('6 digit');
            }
        });

        it('should fail validation when password confirmation does not match', () => {
            const result = resetPasswordSchema.safeParse(mockResetPasswordRequest.mismatchPassword);

            expect(result.success).toBe(false);
            if (!result.success) {
                const confirmPasswordError = result.error.issues.find(
                    (issue) => issue.path.includes('confirm_password')
                );
                expect(confirmPasswordError).toBeDefined();
                expect(confirmPasswordError?.message).toContain('tidak sesuai');
            }
        });

        it('should fail validation with missing required fields', () => {
            const result = resetPasswordSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
            }
        });
    });
});
