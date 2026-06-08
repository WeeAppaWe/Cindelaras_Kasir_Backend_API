import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    reportInventoryFilterSchema,
    currentStockQuerySchema,
    ingredientCardQuerySchema,
} from '../src/modules/report/inventory/report-inventory.schema';
import reportInventoryController from '../src/modules/report/inventory/report-inventory.controller';

const router: Router = express.Router();

const pathGroup = 'report/inventory';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// INVENTORY REPORT ROUTES
// ============================================

// GET /api/report/inventory - Get full inventory report (requires date filter)
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(reportInventoryFilterSchema, 'query'),
    reportInventoryController.getFullReport
);

// GET /api/report/inventory/current - Get current stock (no date filter)
router.get(
    `/${pathGroup}/current`,
    ...adminMiddleware,
    zodValidation(currentStockQuerySchema, 'query'),
    reportInventoryController.getCurrentStock
);

// GET /api/report/inventory/movement - Get stock movement summary
router.get(
    `/${pathGroup}/movement`,
    ...adminMiddleware,
    zodValidation(reportInventoryFilterSchema, 'query'),
    reportInventoryController.getMovementSummary
);

// GET /api/report/inventory/alerts - Get stock alerts (low/out of stock)
router.get(
    `/${pathGroup}/alerts`,
    ...adminMiddleware,
    reportInventoryController.getStockAlerts
);

// GET /api/report/inventory/valuation - Get inventory valuation
router.get(
    `/${pathGroup}/valuation`,
    ...adminMiddleware,
    reportInventoryController.getInventoryValuation
);

// GET /api/report/inventory/opname - Get stock opname history
router.get(
    `/${pathGroup}/opname`,
    ...adminMiddleware,
    zodValidation(reportInventoryFilterSchema, 'query'),
    reportInventoryController.getOpnameHistory
);

// GET /api/report/inventory/card - Get ingredient movement card (kartu stok)
router.get(
    `/${pathGroup}/card`,
    ...adminMiddleware,
    zodValidation(ingredientCardQuerySchema, 'query'),
    reportInventoryController.getIngredientCard
);

export default router;
