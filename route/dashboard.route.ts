import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    dashboardKPIQuerySchema,
    dashboardSalesTrendQuerySchema,
    dashboardTopMenusQuerySchema,
} from '../src/modules/dashboard/dashboard.schema';
import dashboardController from '../src/modules/dashboard/dashboard.controller';

const router: Router = express.Router();

const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// DASHBOARD ROUTES (/api/dashboard)
// ============================================
const basePath = 'dashboard';

// GET /api/dashboard/kpi — 4 KPI cards
router.get(
    `/${basePath}/kpi`,
    ...adminMiddleware,
    zodValidation(dashboardKPIQuerySchema, 'query'),
    dashboardController.getKPI
);

// GET /api/dashboard/sales-trend — daily revenue + transaction count chart
router.get(
    `/${basePath}/sales-trend`,
    ...adminMiddleware,
    zodValidation(dashboardSalesTrendQuerySchema, 'query'),
    dashboardController.getSalesTrend
);

// GET /api/dashboard/top-menus — top 5 best-selling menus
router.get(
    `/${basePath}/top-menus`,
    ...adminMiddleware,
    zodValidation(dashboardTopMenusQuerySchema, 'query'),
    dashboardController.getTopMenus
);

// GET /api/dashboard/stock-status — stock status distribution (radial chart)
router.get(
    `/${basePath}/stock-status`,
    ...adminMiddleware,
    dashboardController.getStockStatus
);

// GET /api/dashboard/recent-stock-movements — 10 mutasi stok terbaru
router.get(
    `/${basePath}/recent-stock-movements`,
    ...adminMiddleware,
    dashboardController.getRecentStockMovements
);

export default router;
