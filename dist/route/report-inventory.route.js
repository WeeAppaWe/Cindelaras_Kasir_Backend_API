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
const report_inventory_schema_1 = require("../src/modules/report/inventory/report-inventory.schema");
const report_inventory_controller_1 = __importDefault(require("../src/modules/report/inventory/report-inventory.controller"));
const router = express_1.default.Router();
const pathGroup = 'report/inventory';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// INVENTORY REPORT ROUTES
// ============================================
// GET /api/report/inventory - Get full inventory report (requires date filter)
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_inventory_schema_1.reportInventoryFilterSchema, 'query'), report_inventory_controller_1.default.getFullReport);
// GET /api/report/inventory/current - Get current stock (no date filter)
router.get(`/${pathGroup}/current`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_inventory_schema_1.currentStockQuerySchema, 'query'), report_inventory_controller_1.default.getCurrentStock);
// GET /api/report/inventory/movement - Get stock movement summary
router.get(`/${pathGroup}/movement`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_inventory_schema_1.reportInventoryFilterSchema, 'query'), report_inventory_controller_1.default.getMovementSummary);
// GET /api/report/inventory/alerts - Get stock alerts (low/out of stock)
router.get(`/${pathGroup}/alerts`, ...adminMiddleware, report_inventory_controller_1.default.getStockAlerts);
// GET /api/report/inventory/valuation - Get inventory valuation
router.get(`/${pathGroup}/valuation`, ...adminMiddleware, report_inventory_controller_1.default.getInventoryValuation);
// GET /api/report/inventory/opname - Get stock opname history
router.get(`/${pathGroup}/opname`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_inventory_schema_1.reportInventoryFilterSchema, 'query'), report_inventory_controller_1.default.getOpnameHistory);
// GET /api/report/inventory/card - Get ingredient movement card (kartu stok)
router.get(`/${pathGroup}/card`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_inventory_schema_1.ingredientCardQuerySchema, 'query'), report_inventory_controller_1.default.getIngredientCard);
exports.default = router;
//# sourceMappingURL=report-inventory.route.js.map