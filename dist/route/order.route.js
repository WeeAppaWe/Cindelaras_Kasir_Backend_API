"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const role_validation_middleware_1 = require("../middleware/role-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const order_schema_1 = require("../src/modules/order/order.schema");
const order_controller_1 = __importDefault(require("../src/modules/order/order.controller"));
const router = express_1.default.Router();
const pathGroup = 'order';
// Middleware - Cashier and Admin can access order endpoints
const cashierMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
// ============================================
// CRUD Routes
// ============================================
// GET /api/order - Get all orders (history)
router.get(`/${pathGroup}`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.orderListQuerySchema, 'query'), order_controller_1.default.showAll);
// GET /api/order/:order_id - Get order detail
router.get(`/${pathGroup}/:order_id`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.orderIdParamSchema, 'params'), order_controller_1.default.detail);
// POST /api/order - Create new order (Checkout)
router.post(`/${pathGroup}`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.createOrderSchema), order_controller_1.default.create);
// ============================================
// Order Actions
// ============================================
// PATCH /api/order/:order_id/confirm - Confirm payment (CASH or QRIS)
router.patch(`/${pathGroup}/:order_id/confirm`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.orderIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(order_schema_1.confirmPaymentSchema), order_controller_1.default.confirmPayment);
// PATCH /api/order/:order_id/cancel - Cancel order
router.patch(`/${pathGroup}/:order_id/cancel`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.orderIdParamSchema, 'params'), order_controller_1.default.cancelOrder);
// GET /api/order/:order_id/receipt - Get receipt for printing
router.get(`/${pathGroup}/:order_id/receipt`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(order_schema_1.orderIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(order_schema_1.receiptQuerySchema, 'query'), order_controller_1.default.getReceipt);
exports.default = router;
//# sourceMappingURL=order.route.js.map