import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import {
    forgotPasswordRequestOtpSchema,
    loginSchema,
    resetPasswordSchema,
} from '../src/modules/auth/auth.schema';
import authController from '../src/modules/auth/auth.controller';

const router: Router = express.Router();

const pathGroup = 'auth';

// Public routes (no authentication required)
router.post(`/${pathGroup}/login`, zodValidation(loginSchema), authController.login);
router.post(
    `/${pathGroup}/forgot-password/request-otp`,
    zodValidation(forgotPasswordRequestOtpSchema),
    authController.requestForgotPasswordOtp
);
router.post(
    `/${pathGroup}/forgot-password/reset-password`,
    zodValidation(resetPasswordSchema),
    authController.resetPassword
);

// Protected routes (authentication required)
router.post(`/${pathGroup}/logout`, tokenValidation, authController.logout);

export default router;
