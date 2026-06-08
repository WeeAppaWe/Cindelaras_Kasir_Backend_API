"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const auth_controller_1 = __importDefault(require("../src/modules/auth/auth.controller"));
const router = express_1.default.Router();
const pathGroup = 'auth';
// Public routes (no authentication required)
router.post(`/${pathGroup}/login`, (0, zod_validation_middleware_1.zodValidation)(auth_schema_1.loginSchema), auth_controller_1.default.login);
router.post(`/${pathGroup}/forgot-password/request-otp`, (0, zod_validation_middleware_1.zodValidation)(auth_schema_1.forgotPasswordRequestOtpSchema), auth_controller_1.default.requestForgotPasswordOtp);
router.post(`/${pathGroup}/forgot-password/reset-password`, (0, zod_validation_middleware_1.zodValidation)(auth_schema_1.resetPasswordSchema), auth_controller_1.default.resetPassword);
// Protected routes (authentication required)
router.post(`/${pathGroup}/logout`, token_validation_middleware_1.tokenValidation, auth_controller_1.default.logout);
exports.default = router;
//# sourceMappingURL=authentication.route.js.map