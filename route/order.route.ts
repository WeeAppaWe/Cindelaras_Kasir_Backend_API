import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    createOrderSchema,
    confirmPaymentSchema,
    orderIdParamSchema,
    orderListQuerySchema,
    receiptQuerySchema,
} from '../src/modules/order/order.schema';
import orderController from '../src/modules/order/order.controller';

const router: Router = express.Router();

const pathGroup = 'order';

// Middleware - Cashier and Admin can access order endpoints
const cashierMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];

// ============================================
// CRUD Routes
// ============================================

// GET /api/order - Get all orders (history)
router.get(
    `/${pathGroup}`,
    ...cashierMiddleware,
    zodValidation(orderListQuerySchema, 'query'),
    orderController.showAll
);

// GET /api/order/:order_id - Get order detail
router.get(
    `/${pathGroup}/:order_id`,
    ...cashierMiddleware,
    zodValidation(orderIdParamSchema, 'params'),
    orderController.detail
);

// POST /api/order - Create new order (Checkout)
router.post(
    `/${pathGroup}`,
    ...cashierMiddleware,
    zodValidation(createOrderSchema),
    orderController.create
);

// ============================================
// Order Actions
// ============================================

// PATCH /api/order/:order_id/confirm - Confirm payment (CASH or QRIS)
router.patch(
    `/${pathGroup}/:order_id/confirm`,
    ...cashierMiddleware,
    zodValidation(orderIdParamSchema, 'params'),
    zodValidation(confirmPaymentSchema),
    orderController.confirmPayment
);

// PATCH /api/order/:order_id/cancel - Cancel order
router.patch(
    `/${pathGroup}/:order_id/cancel`,
    ...cashierMiddleware,
    zodValidation(orderIdParamSchema, 'params'),
    orderController.cancelOrder
);

// GET /api/order/:order_id/receipt - Get receipt for printing
router.get(
    `/${pathGroup}/:order_id/receipt`,
    ...cashierMiddleware,
    zodValidation(orderIdParamSchema, 'params'),
    zodValidation(receiptQuerySchema, 'query'),
    orderController.getReceipt
);

export default router;

