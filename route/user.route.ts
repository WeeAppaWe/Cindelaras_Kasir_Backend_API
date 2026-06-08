import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { createUserSchema, updateUserSchema, userIdParamSchema, userListQuerySchema } from '../src/modules/user/user.schema';
import userController from '../src/modules/user/user.controller';

const router: Router = express.Router();

const pathGroup = 'user';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Reference/Dropdown Routes (must be before :user_id routes)
// ============================================

// GET /api/user/roles - Get all roles for dropdown
router.get(`/${pathGroup}/roles`, ...adminMiddleware, userController.getRoles);

// GET /api/user/statuses - Get all user statuses for dropdown
router.get(`/${pathGroup}/statuses`, ...adminMiddleware, userController.getUserStatuses);

// ============================================
// CRUD Routes
// ============================================

// GET /api/user - Get all users
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(userListQuerySchema, 'query'),
    userController.showAll
);

// GET /api/user/:user_id - Get user detail
router.get(
    `/${pathGroup}/:user_id`,
    ...adminMiddleware,
    zodValidation(userIdParamSchema, 'params'),
    userController.detail
);

// POST /api/user - Create new user
router.post(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(createUserSchema),
    userController.create
);

// PUT /api/user/:user_id - Update user
router.patch(
    `/${pathGroup}/:user_id`,
    ...adminMiddleware,
    zodValidation(userIdParamSchema, 'params'),
    zodValidation(updateUserSchema),
    userController.update
);

// DELETE /api/user/:user_id - Soft delete user
router.delete(
    `/${pathGroup}/:user_id`,
    ...adminMiddleware,
    zodValidation(userIdParamSchema, 'params'),
    userController.softDelete
);

export default router;

