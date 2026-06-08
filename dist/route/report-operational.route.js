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
const report_operational_schema_1 = require("../src/modules/report/operational/report-operational.schema");
const report_operational_controller_1 = __importDefault(require("../src/modules/report/operational/report-operational.controller"));
const router = express_1.default.Router();
const pathGroup = 'report/operational';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// OPERATIONAL REPORT ROUTES
// ============================================
// GET /api/report/operational - Get full operational report
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.reportOperationalFilterSchema, 'query'), report_operational_controller_1.default.getFullReport);
// GET /api/report/operational/cashier - Get cashier performance
router.get(`/${pathGroup}/cashier`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.reportOperationalFilterSchema, 'query'), report_operational_controller_1.default.getCashierPerformance);
// GET /api/report/operational/shift - Get shift summary
router.get(`/${pathGroup}/shift`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.reportOperationalFilterSchema, 'query'), report_operational_controller_1.default.getShiftSummary);
// GET /api/report/operational/transactions - Get transaction statistics
router.get(`/${pathGroup}/transactions`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.reportOperationalFilterSchema, 'query'), report_operational_controller_1.default.getTransactionStats);
// GET /api/report/operational/menu - Get menu performance
router.get(`/${pathGroup}/menu`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.menuPerformanceQuerySchema, 'query'), report_operational_controller_1.default.getMenuPerformance);
// GET /api/report/operational/order-status - Get order status summary
router.get(`/${pathGroup}/order-status`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_operational_schema_1.reportOperationalFilterSchema, 'query'), report_operational_controller_1.default.getOrderStatus);
exports.default = router;
//# sourceMappingURL=report-operational.route.js.map