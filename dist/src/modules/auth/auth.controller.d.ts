import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Login Controller
 * POST /api/auth/login
 * Note: Request body is already validated by zodValidation middleware
 */
export declare const login: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Logout Controller
 * POST /api/auth/logout
 */
export declare const logout: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Request Forgot Password OTP Controller
 * POST /api/auth/forgot-password/request-otp
 */
export declare const requestForgotPasswordOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Verify Forgot Password OTP Controller
 * POST /api/auth/forgot-password/verify-otp
 */
export declare const verifyForgotPasswordOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Reset Password Controller
 * POST /api/auth/forgot-password/reset-password
 */
export declare const resetPassword: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authController: {
    login: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    requestForgotPasswordOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    verifyForgotPasswordOtp: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default authController;
//# sourceMappingURL=auth.controller.d.ts.map