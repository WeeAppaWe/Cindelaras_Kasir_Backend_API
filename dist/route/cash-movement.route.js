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
const cash_movement_schema_1 = require("../src/modules/cash-movement/cash-movement.schema");
const cash_movement_controller_1 = __importDefault(require("../src/modules/cash-movement/cash-movement.controller"));
const router = express_1.default.Router();
const pathGroup = 'cash-movement';
// All routes require authentication and CASHIER or ADMIN role
const cashierMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
// ============================================
// CRUD Routes
// ============================================
// GET /api/cash-movement - Get all cash movements
router.get(`/${pathGroup}`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(cash_movement_schema_1.cashMovementListQuerySchema, 'query'), cash_movement_controller_1.default.showAll);
// GET /api/cash-movement/:cash_movement_id - Get cash movement detail
router.get(`/${pathGroup}/:cash_movement_id`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(cash_movement_schema_1.cashMovementIdParamSchema, 'params'), cash_movement_controller_1.default.detail);
// POST /api/cash-movement - Create new cash movement
router.post(`/${pathGroup}`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(cash_movement_schema_1.createCashMovementSchema), cash_movement_controller_1.default.create);
exports.default = router;
//# sourceMappingURL=cash-movement.route.js.map