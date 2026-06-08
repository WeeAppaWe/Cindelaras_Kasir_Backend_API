import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';

// Supplier imports
import {
    createSupplierSchema,
    updateSupplierSchema,
    supplierIdParamSchema,
} from '../src/modules/supplier/supplier.schema';
import supplierController from '../src/modules/supplier/supplier.controller';

const router: Router = express.Router();

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// SUPPLIER ROUTES (/api/supplier)
// ============================================
const basePath = 'supplier';

// CRUD Routes
router.get(`/${basePath}`, ...adminMiddleware, supplierController.showAll);

router.get(
    `/${basePath}/:supplier_id`,
    ...adminMiddleware,
    zodValidation(supplierIdParamSchema, 'params'),
    supplierController.detail
);

router.post(
    `/${basePath}`,
    ...adminMiddleware,
    zodValidation(createSupplierSchema),
    supplierController.create
);

router.patch(
    `/${basePath}/:supplier_id`,
    ...adminMiddleware,
    zodValidation(supplierIdParamSchema, 'params'),
    zodValidation(updateSupplierSchema),
    supplierController.update
);

router.delete(
    `/${basePath}/:supplier_id`,
    ...adminMiddleware,
    zodValidation(supplierIdParamSchema, 'params'),
    supplierController.softDelete
);

export default router;
