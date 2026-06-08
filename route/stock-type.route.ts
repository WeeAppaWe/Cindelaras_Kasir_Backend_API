import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';

// Stock Type imports
import { stockTypeIdParamSchema } from '../src/modules/stock-type/stock-type.schema';
import stockTypeController from '../src/modules/stock-type/stock-type.controller';

const router: Router = express.Router();

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// STOCK TYPE ROUTES (/api/stock-type)
// ============================================
const basePath = 'stock-type';

// Get all stock types
router.get(`/${basePath}`, ...adminMiddleware, stockTypeController.showAll);

// Get stock type detail
router.get(
    `/${basePath}/:stock_type_id`,
    ...adminMiddleware,
    zodValidation(stockTypeIdParamSchema, 'params'),
    stockTypeController.detail
);

export default router;
