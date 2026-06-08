import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { reportOperationalFilterSchema, menuPerformanceQuerySchema } from '../src/modules/report/operational/report-operational.schema';
import reportOperationalController from '../src/modules/report/operational/report-operational.controller';

const router: Router = express.Router();

const pathGroup = 'report/operational';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// OPERATIONAL REPORT ROUTES
// ============================================

// GET /api/report/operational - Get full operational report
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(reportOperationalFilterSchema, 'query'),
    reportOperationalController.getFullReport
);

// GET /api/report/operational/cashier - Get cashier performance
router.get(
    `/${pathGroup}/cashier`,
    ...adminMiddleware,
    zodValidation(reportOperationalFilterSchema, 'query'),
    reportOperationalController.getCashierPerformance
);

// GET /api/report/operational/shift - Get shift summary
router.get(
    `/${pathGroup}/shift`,
    ...adminMiddleware,
    zodValidation(reportOperationalFilterSchema, 'query'),
    reportOperationalController.getShiftSummary
);

// GET /api/report/operational/transactions - Get transaction statistics
router.get(
    `/${pathGroup}/transactions`,
    ...adminMiddleware,
    zodValidation(reportOperationalFilterSchema, 'query'),
    reportOperationalController.getTransactionStats
);

// GET /api/report/operational/menu - Get menu performance
router.get(
    `/${pathGroup}/menu`,
    ...adminMiddleware,
    zodValidation(menuPerformanceQuerySchema, 'query'),
    reportOperationalController.getMenuPerformance
);

// GET /api/report/operational/order-status - Get order status summary
router.get(
    `/${pathGroup}/order-status`,
    ...adminMiddleware,
    zodValidation(reportOperationalFilterSchema, 'query'),
    reportOperationalController.getOrderStatus
);

export default router;
