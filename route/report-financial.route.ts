import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { reportFilterSchema, topMenusQuerySchema } from '../src/modules/report/financial/report-financial.schema';
import reportFinancialController from '../src/modules/report/financial/report-financial.controller';

const router: Router = express.Router();

const pathGroup = 'report/financial';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// FINANCIAL REPORT ROUTES
// ============================================

// GET /api/report/financial - Get full financial report
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(reportFilterSchema, 'query'),
    reportFinancialController.getFullReport
);

// GET /api/report/financial/summary - Get revenue summary
router.get(
    `/${pathGroup}/summary`,
    ...adminMiddleware,
    zodValidation(reportFilterSchema, 'query'),
    reportFinancialController.getSummary
);

// GET /api/report/financial/payment - Get payment breakdown
router.get(
    `/${pathGroup}/payment`,
    ...adminMiddleware,
    zodValidation(reportFilterSchema, 'query'),
    reportFinancialController.getPaymentBreakdown
);

// GET /api/report/financial/cash-flow - Get cash flow report
router.get(
    `/${pathGroup}/cash-flow`,
    ...adminMiddleware,
    zodValidation(reportFilterSchema, 'query'),
    reportFinancialController.getCashFlow
);

// GET /api/report/financial/top-menus - Get top selling menus
router.get(
    `/${pathGroup}/top-menus`,
    ...adminMiddleware,
    zodValidation(topMenusQuerySchema, 'query'),
    reportFinancialController.getTopMenus
);

// GET /api/report/financial/by-category - Get sales by category
router.get(
    `/${pathGroup}/by-category`,
    ...adminMiddleware,
    zodValidation(reportFilterSchema, 'query'),
    reportFinancialController.getSalesByCategory
);

export default router;
