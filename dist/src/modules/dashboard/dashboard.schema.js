"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSchemas = exports.dashboardTopMenusQuerySchema = exports.dashboardSalesTrendQuerySchema = exports.dashboardKPIQuerySchema = exports.SALES_TREND_PERIODS = void 0;
const zod_1 = require("zod");
// ============================================
// ALLOWED PERIOD VALUES
// ============================================
exports.SALES_TREND_PERIODS = [7, 14, 30];
/**
 * Query params schema for dashboard KPI endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
exports.dashboardKPIQuerySchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format date tidak valid, gunakan YYYY-MM-DD')
        .optional(),
});
/**
 * Query params schema for sales trend endpoint
 * days: opsional, default 7 — hanya menerima 7, 14, atau 30
 */
exports.dashboardSalesTrendQuerySchema = zod_1.z.object({
    days: zod_1.z.coerce
        .number()
        .refine((val) => exports.SALES_TREND_PERIODS.includes(val), { message: 'Nilai days tidak valid, gunakan 7, 14, atau 30' })
        .default(7),
});
/**
 * Query params schema for top menus endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
exports.dashboardTopMenusQuerySchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format date tidak valid, gunakan YYYY-MM-DD')
        .optional(),
});
exports.dashboardSchemas = {
    kpiQuery: exports.dashboardKPIQuerySchema,
    salesTrendQuery: exports.dashboardSalesTrendQuerySchema,
    topMenusQuery: exports.dashboardTopMenusQuerySchema,
};
exports.default = exports.dashboardSchemas;
//# sourceMappingURL=dashboard.schema.js.map