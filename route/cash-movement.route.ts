import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { createCashMovementSchema, cashMovementIdParamSchema, cashMovementListQuerySchema } from '../src/modules/cash-movement/cash-movement.schema';
import cashMovementController from '../src/modules/cash-movement/cash-movement.controller';

const router: Router = express.Router();

const pathGroup = 'cash-movement';

// All routes require authentication and CASHIER or ADMIN role
const cashierMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];

// ============================================
// CRUD Routes
// ============================================

// GET /api/cash-movement - Get all cash movements
router.get(
    `/${pathGroup}`,
    ...cashierMiddleware,
    zodValidation(cashMovementListQuerySchema, 'query'),
    cashMovementController.showAll
);

// GET /api/cash-movement/:cash_movement_id - Get cash movement detail
router.get(
    `/${pathGroup}/:cash_movement_id`,
    ...cashierMiddleware,
    zodValidation(cashMovementIdParamSchema, 'params'),
    cashMovementController.detail
);

// POST /api/cash-movement - Create new cash movement
router.post(
    `/${pathGroup}`,
    ...cashierMiddleware,
    zodValidation(createCashMovementSchema),
    cashMovementController.create
);

export default router;
