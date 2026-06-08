"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const role_validation_middleware_1 = require("../middleware/role-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const user_schema_1 = require("../src/modules/user/user.schema");
const user_controller_1 = __importDefault(require("../src/modules/user/user.controller"));
const router = express_1.default.Router();
const pathGroup = 'user';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Reference/Dropdown Routes (must be before :user_id routes)
// ============================================
// GET /api/user/roles - Get all roles for dropdown
router.get(`/${pathGroup}/roles`, ...adminMiddleware, user_controller_1.default.getRoles);
// GET /api/user/statuses - Get all user statuses for dropdown
router.get(`/${pathGroup}/statuses`, ...adminMiddleware, user_controller_1.default.getUserStatuses);
// ============================================
// CRUD Routes
// ============================================
// GET /api/user - Get all users
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(user_schema_1.userListQuerySchema, 'query'), user_controller_1.default.showAll);
// GET /api/user/:user_id - Get user detail
router.get(`/${pathGroup}/:user_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(user_schema_1.userIdParamSchema, 'params'), user_controller_1.default.detail);
// POST /api/user - Create new user
router.post(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(user_schema_1.createUserSchema), user_controller_1.default.create);
// PUT /api/user/:user_id - Update user
router.patch(`/${pathGroup}/:user_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(user_schema_1.userIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(user_schema_1.updateUserSchema), user_controller_1.default.update);
// DELETE /api/user/:user_id - Soft delete user
router.delete(`/${pathGroup}/:user_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(user_schema_1.userIdParamSchema, 'params'), user_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=user.route.js.map