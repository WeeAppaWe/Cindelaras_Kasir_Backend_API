import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    startShiftSchema,
    endShiftSchema,
    shiftIdParamSchema,
    shiftListQuerySchema,
} from '../src/modules/shift/shift.schema';
import shiftController from '../src/modules/shift/shift.controller';

const router: Router = express.Router();

const pathGroup = 'shift';

// Middleware - Cashier and Admin can access shift endpoints
const cashierMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Shift Action Routes (must be before :shift_id routes)
// ============================================

// GET /api/shift/active - Check active shift for current user
router.get(
    `/${pathGroup}/active`,
    ...cashierMiddleware,
    shiftController.getActiveShift
);

// GET /api/shift/my - Get current user's shifts
router.get(
    `/${pathGroup}/my`,
    ...cashierMiddleware,
    zodValidation(shiftListQuerySchema, 'query'),
    shiftController.getMyShifts
);

// POST /api/shift/start - Start new shift (Buka Kas)
router.post(
    `/${pathGroup}/start`,
    ...cashierMiddleware,
    zodValidation(startShiftSchema),
    shiftController.startShift
);

// POST /api/shift/end - End current shift (Tutup Kas)
router.post(
    `/${pathGroup}/end`,
    ...cashierMiddleware,
    zodValidation(endShiftSchema),
    shiftController.endShift
);

// ============================================
// CRUD Routes
// ============================================

// GET /api/shift - Get all shifts (Admin only)
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(shiftListQuerySchema, 'query'),
    shiftController.showAll
);

// GET /api/shift/:shift_id - Get shift detail
router.get(
    `/${pathGroup}/:shift_id`,
    ...cashierMiddleware,
    zodValidation(shiftIdParamSchema, 'params'),
    shiftController.detail
);

// GET /api/shift/:shift_id/summary - Get shift summary with order stats
router.get(
    `/${pathGroup}/:shift_id/summary`,
    ...cashierMiddleware,
    zodValidation(shiftIdParamSchema, 'params'),
    shiftController.getShiftSummary
);

export default router;
