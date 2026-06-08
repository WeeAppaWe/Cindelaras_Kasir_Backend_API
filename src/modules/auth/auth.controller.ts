import { Response, NextFunction } from 'express';
import authService from './auth.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Login Controller
 * POST /api/auth/login
 * Note: Request body is already validated by zodValidation middleware
 */
export const login = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // req.body is already validated by middleware
        const data = await authService.login(req.body);

        res.status(200).json(responseApi({ code: 200, message: 'Login berhasil' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Logout Controller
 * POST /api/auth/logout
 */
export const logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await authService.logout(req);

        res.status(200).json(responseApi({ code: 200, message: 'Logout berhasil' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Request Forgot Password OTP Controller
 * POST /api/auth/forgot-password/request-otp
 */
export const requestForgotPasswordOtp = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await authService.requestForgotPasswordOtp(req.body);

        res.status(200).json(responseApi({ code: 200, message: 'OTP reset password berhasil dikirim' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Reset Password Controller
 * POST /api/auth/forgot-password/reset-password
 */
export const resetPassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await authService.resetPassword(req.body);

        res.status(200).json(responseApi({ code: 200, message: 'Password berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

export const authController = {
    login,
    logout,
    requestForgotPasswordOtp,
    resetPassword,
};

export default authController;
