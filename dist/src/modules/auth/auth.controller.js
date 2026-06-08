"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.resetPassword = exports.requestForgotPasswordOtp = exports.logout = exports.login = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Login Controller
 * POST /api/auth/login
 * Note: Request body is already validated by zodValidation middleware
 */
const login = async (req, res, next) => {
    try {
        // req.body is already validated by middleware
        const data = await auth_service_1.default.login(req.body);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Login berhasil' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
/**
 * Logout Controller
 * POST /api/auth/logout
 */
const logout = async (req, res, next) => {
    try {
        const data = await auth_service_1.default.logout(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Logout berhasil' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
/**
 * Request Forgot Password OTP Controller
 * POST /api/auth/forgot-password/request-otp
 */
const requestForgotPasswordOtp = async (req, res, next) => {
    try {
        const data = await auth_service_1.default.requestForgotPasswordOtp(req.body);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'OTP reset password berhasil dikirim' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.requestForgotPasswordOtp = requestForgotPasswordOtp;
/**
 * Reset Password Controller
 * POST /api/auth/forgot-password/reset-password
 */
const resetPassword = async (req, res, next) => {
    try {
        const data = await auth_service_1.default.resetPassword(req.body);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Password berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
exports.authController = {
    login: exports.login,
    logout: exports.logout,
    requestForgotPasswordOtp: exports.requestForgotPasswordOtp,
    resetPassword: exports.resetPassword,
};
exports.default = exports.authController;
//# sourceMappingURL=auth.controller.js.map