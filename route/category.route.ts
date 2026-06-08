import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema, categoryListQuerySchema } from '../src/modules/category/category.schema';
import categoryController from '../src/modules/category/category.controller';

const router: Router = express.Router();

const pathGroup = 'category';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// CRUD Routes
// ============================================

// GET /api/category - Get all categories
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(categoryListQuerySchema, 'query'),
    categoryController.showAll
);

// GET /api/category/:category_id - Get category detail
router.get(
    `/${pathGroup}/:category_id`,
    ...adminMiddleware,
    zodValidation(categoryIdParamSchema, 'params'),
    categoryController.detail
);

// POST /api/category - Create new category
router.post(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(createCategorySchema),
    categoryController.create
);

// PATCH /api/category/:category_id - Update category
router.patch(
    `/${pathGroup}/:category_id`,
    ...adminMiddleware,
    zodValidation(categoryIdParamSchema, 'params'),
    zodValidation(updateCategorySchema),
    categoryController.update
);

// DELETE /api/category/:category_id - Soft delete category
router.delete(
    `/${pathGroup}/:category_id`,
    ...adminMiddleware,
    zodValidation(categoryIdParamSchema, 'params'),
    categoryController.softDelete
);

export default router;

