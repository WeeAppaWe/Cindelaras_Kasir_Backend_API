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
const dashboard_schema_1 = require("../src/modules/dashboard/dashboard.schema");
const dashboard_controller_1 = __importDefault(require("../src/modules/dashboard/dashboard.controller"));
const router = express_1.default.Router();
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// DASHBOARD ROUTES (/api/dashboard)
// ============================================
const basePath = 'dashboard';
// GET /api/dashboard/kpi — 4 KPI cards
router.get(`/${basePath}/kpi`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(dashboard_schema_1.dashboardKPIQuerySchema, 'query'), dashboard_controller_1.default.getKPI);
// GET /api/dashboard/sales-trend — daily revenue + transaction count chart
router.get(`/${basePath}/sales-trend`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(dashboard_schema_1.dashboardSalesTrendQuerySchema, 'query'), dashboard_controller_1.default.getSalesTrend);
// GET /api/dashboard/top-menus — top 5 best-selling menus
router.get(`/${basePath}/top-menus`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(dashboard_schema_1.dashboardTopMenusQuerySchema, 'query'), dashboard_controller_1.default.getTopMenus);
// GET /api/dashboard/stock-status — stock status distribution (radial chart)
router.get(`/${basePath}/stock-status`, ...adminMiddleware, dashboard_controller_1.default.getStockStatus);
// GET /api/dashboard/recent-stock-movements — 10 mutasi stok terbaru
router.get(`/${basePath}/recent-stock-movements`, ...adminMiddleware, dashboard_controller_1.default.getRecentStockMovements);
exports.default = router;
//# sourceMappingURL=dashboard.route.js.map