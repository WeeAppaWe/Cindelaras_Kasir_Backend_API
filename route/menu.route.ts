import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    createMenuSchema,
    updateMenuSchema,
    menuIdParamSchema,
    menuListQuerySchema,
} from '../src/modules/menu/menu.schema';
import menuController from '../src/modules/menu/menu.controller';

const router: Router = express.Router();

const pathGroup = 'menu';

// Role configurations
const adminOnly = [tokenValidation, roleValidation([RoleName.ADMIN])];
const adminAndCashier = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];

// ============================================
// READ Routes (ADMIN & CASHIER)
// ============================================

// GET /api/menu - Get all menus (with pagination & filters)
router.get(
    `/${pathGroup}`,
    ...adminAndCashier,
    zodValidation(menuListQuerySchema, 'query'),
    menuController.showAll
);

// GET /api/menu/:menu_id - Get menu detail
router.get(
    `/${pathGroup}/:menu_id`,
    ...adminAndCashier,
    zodValidation(menuIdParamSchema, 'params'),
    menuController.detail
);

// ============================================
// WRITE Routes (ADMIN only)
// ============================================

// POST /api/menu - Create new menu
router.post(
    `/${pathGroup}`,
    ...adminOnly,
    zodValidation(createMenuSchema),
    menuController.create
);

// PATCH /api/menu/:menu_id - Update menu
router.patch(
    `/${pathGroup}/:menu_id`,
    ...adminOnly,
    zodValidation(menuIdParamSchema, 'params'),
    zodValidation(updateMenuSchema),
    menuController.update
);

// PATCH /api/menu/:menu_id/toggle-availability - Toggle menu availability
router.patch(
    `/${pathGroup}/:menu_id/toggle-availability`,
    ...adminOnly,
    zodValidation(menuIdParamSchema, 'params'),
    menuController.toggleAvailability
);

// DELETE /api/menu/:menu_id - Soft delete menu
router.delete(
    `/${pathGroup}/:menu_id`,
    ...adminOnly,
    zodValidation(menuIdParamSchema, 'params'),
    menuController.softDelete
);

export default router;

