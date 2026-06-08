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
const report_financial_schema_1 = require("../src/modules/report/financial/report-financial.schema");
const report_financial_controller_1 = __importDefault(require("../src/modules/report/financial/report-financial.controller"));
const router = express_1.default.Router();
const pathGroup = 'report/financial';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// FINANCIAL REPORT ROUTES
// ============================================
// GET /api/report/financial - Get full financial report
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.reportFilterSchema, 'query'), report_financial_controller_1.default.getFullReport);
// GET /api/report/financial/summary - Get revenue summary
router.get(`/${pathGroup}/summary`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.reportFilterSchema, 'query'), report_financial_controller_1.default.getSummary);
// GET /api/report/financial/payment - Get payment breakdown
router.get(`/${pathGroup}/payment`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.reportFilterSchema, 'query'), report_financial_controller_1.default.getPaymentBreakdown);
// GET /api/report/financial/cash-flow - Get cash flow report
router.get(`/${pathGroup}/cash-flow`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.reportFilterSchema, 'query'), report_financial_controller_1.default.getCashFlow);
// GET /api/report/financial/top-menus - Get top selling menus
router.get(`/${pathGroup}/top-menus`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.topMenusQuerySchema, 'query'), report_financial_controller_1.default.getTopMenus);
// GET /api/report/financial/by-category - Get sales by category
router.get(`/${pathGroup}/by-category`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_financial_schema_1.reportFilterSchema, 'query'), report_financial_controller_1.default.getSalesByCategory);
exports.default = router;
//# sourceMappingURL=report-financial.route.js.map