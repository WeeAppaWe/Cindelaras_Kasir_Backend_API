import { ForgotPasswordRequestOtpRequest, ForgotPasswordRequestOtpResponse, LoginRequest, LoginResponse, LogoutResponse, ResetPasswordRequest, ResetPasswordResponse } from './auth.types';
import { AuthenticatedRequest } from '../../../types';
/**
 * Login with username and password
 */
export declare const login: (data: LoginRequest) => Promise<LoginResponse>;
/**
 * Logout - remove token from Redis
 */
export declare const logout: (req: AuthenticatedRequest) => Promise<LogoutResponse>;
/**
 * Request forgot password OTP via WhatsApp
 */
export declare const requestForgotPasswordOtp: (data: ForgotPasswordRequestOtpRequest) => Promise<ForgotPasswordRequestOtpResponse>;
/**
 * Reset password using OTP
 */
export declare const resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
export declare const authService: {
    login: (data: LoginRequest) => Promise<LoginResponse>;
    logout: (req: AuthenticatedRequest) => Promise<LogoutResponse>;
    requestForgotPasswordOtp: (data: ForgotPasswordRequestOtpRequest) => Promise<ForgotPasswordRequestOtpResponse>;
    resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
};
export default authService;
//# sourceMappingURL=auth.service.d.ts.map