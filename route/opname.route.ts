import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    createOpnameSchema,
    updateOpnameSchema,
    changeStatusSchema,
    opnameIdParamSchema,
    opnameListQuerySchema,
} from '../src/modules/opname/opname.schema';
import opnameController from '../src/modules/opname/opname.controller';

const router: Router = express.Router();

const pathGroup = 'opname';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Reference/Dropdown Routes (must be before :stock_opname_id routes)
// ============================================

// GET /api/opname/ingredients - Get all ingredients for opname form
router.get(`/${pathGroup}/ingredients`, ...adminMiddleware, opnameController.getIngredients);

// ============================================
// CRUD Routes
// ============================================

// GET /api/opname - Get all stock opnames
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(opnameListQuerySchema, 'query'),
    opnameController.showAll
);

// GET /api/opname/:stock_opname_id - Get stock opname detail
router.get(
    `/${pathGroup}/:stock_opname_id`,
    ...adminMiddleware,
    zodValidation(opnameIdParamSchema, 'params'),
    opnameController.detail
);

// POST /api/opname - Create new stock opname
router.post(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(createOpnameSchema),
    opnameController.create
);

// PATCH /api/opname/:stock_opname_id - Update stock opname
router.patch(
    `/${pathGroup}/:stock_opname_id`,
    ...adminMiddleware,
    zodValidation(opnameIdParamSchema, 'params'),
    zodValidation(updateOpnameSchema),
    opnameController.update
);

// PATCH /api/opname/:stock_opname_id/status - Change stock opname status
router.patch(
    `/${pathGroup}/:stock_opname_id/status`,
    ...adminMiddleware,
    zodValidation(opnameIdParamSchema, 'params'),
    zodValidation(changeStatusSchema),
    opnameController.changeStatus
);

// POST /api/opname/:stock_opname_id/apply - Apply adjustment to stock
router.post(
    `/${pathGroup}/:stock_opname_id/apply`,
    ...adminMiddleware,
    zodValidation(opnameIdParamSchema, 'params'),
    opnameController.applyAdjustment
);

// DELETE /api/opname/:stock_opname_id - Soft delete stock opname
router.delete(
    `/${pathGroup}/:stock_opname_id`,
    ...adminMiddleware,
    zodValidation(opnameIdParamSchema, 'params'),
    opnameController.softDelete
);

export default router;
