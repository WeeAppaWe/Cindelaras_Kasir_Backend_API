import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';

// Inventory imports
import {
    stockInSchema,
    stockOutSchema,
    stockMovementIdParamSchema,
    ingredientIdParamSchema,
} from '../src/modules/inventory/inventory.schema';
import inventoryController from '../src/modules/inventory/inventory.controller';

const router: Router = express.Router();

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// INVENTORY ROUTES (/api/inventory)
// ============================================
const basePath = 'inventory';

// Reference routes (must be before param routes)
router.get(`/${basePath}/stock-types`, ...adminMiddleware, inventoryController.getStockTypes);

// Stock IN - Barang Masuk dari Supplier
router.post(
    `/${basePath}/stock-in`,
    ...adminMiddleware,
    zodValidation(stockInSchema),
    inventoryController.stockIn
);

// Stock OUT - Barang Keluar (Rusak/Kedaluarsa)
router.post(
    `/${basePath}/stock-out`,
    ...adminMiddleware,
    zodValidation(stockOutSchema),
    inventoryController.stockOut
);

// Get stock history by ingredient
router.get(
    `/${basePath}/ingredient/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(ingredientIdParamSchema, 'params'),
    inventoryController.getHistoryByIngredient
);

// Get all stock movements (history)
router.get(`/${basePath}`, ...adminMiddleware, inventoryController.getHistory);

// Get stock movement detail
router.get(
    `/${basePath}/:stock_movement_id`,
    ...adminMiddleware,
    zodValidation(stockMovementIdParamSchema, 'params'),
    inventoryController.getDetail
);

export default router;
