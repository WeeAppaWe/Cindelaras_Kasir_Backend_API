import { z } from 'zod';
export declare const SALES_TREND_PERIODS: readonly [7, 14, 30];
export type SalesTrendPeriod = typeof SALES_TREND_PERIODS[number];
/**
 * Query params schema for dashboard KPI endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
export declare const dashboardKPIQuerySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Query params schema for sales trend endpoint
 * days: opsional, default 7 — hanya menerima 7, 14, atau 30
 */
export declare const dashboardSalesTrendQuerySchema: z.ZodObject<{
    days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
/**
 * Query params schema for top menus endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
export declare const dashboardTopMenusQuerySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DashboardKPIQuery = z.infer<typeof dashboardKPIQuerySchema>;
export type DashboardSalesTrendQuery = z.infer<typeof dashboardSalesTrendQuerySchema>;
export type DashboardTopMenusQuery = z.infer<typeof dashboardTopMenusQuerySchema>;
export declare const dashboardSchemas: {
    kpiQuery: z.ZodObject<{
        date: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    salesTrendQuery: z.ZodObject<{
        days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
    topMenusQuery: z.ZodObject<{
        date: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default dashboardSchemas;
//# sourceMappingURL=dashboard.schema.d.ts.map