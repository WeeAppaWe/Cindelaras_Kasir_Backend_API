import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    createUnitMeasureSchema,
    updateUnitMeasureSchema,
    unitMeasureIdParamSchema,
    unitMeasureListQuerySchema,
} from '../src/modules/unit-measure/unit-measure.schema';
import unitMeasureController from '../src/modules/unit-measure/unit-measure.controller';

const router: Router = express.Router();

const pathGroup = 'unit-measure';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Unit Measure Routes
// ============================================

// GET /api/unit-measure - Get all unit measures
router.get(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(unitMeasureListQuerySchema, 'query'),
    unitMeasureController.showAll
);

// GET /api/unit-measure/:unit_measure_id - Get unit measure detail
router.get(
    `/${pathGroup}/:unit_measure_id`,
    ...adminMiddleware,
    zodValidation(unitMeasureIdParamSchema, 'params'),
    unitMeasureController.detail
);

// POST /api/unit-measure - Create new unit measure
router.post(
    `/${pathGroup}`,
    ...adminMiddleware,
    zodValidation(createUnitMeasureSchema),
    unitMeasureController.create
);

// PATCH /api/unit-measure/:unit_measure_id - Update unit measure
router.patch(
    `/${pathGroup}/:unit_measure_id`,
    ...adminMiddleware,
    zodValidation(unitMeasureIdParamSchema, 'params'),
    zodValidation(updateUnitMeasureSchema),
    unitMeasureController.update
);

// DELETE /api/unit-measure/:unit_measure_id - Soft delete unit measure
router.delete(
    `/${pathGroup}/:unit_measure_id`,
    ...adminMiddleware,
    zodValidation(unitMeasureIdParamSchema, 'params'),
    unitMeasureController.softDelete
);

export default router;
