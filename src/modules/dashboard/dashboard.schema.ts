import { z } from 'zod';

// ============================================
// ALLOWED PERIOD VALUES
// ============================================

export const SALES_TREND_PERIODS = [7, 14, 30] as const;
export type SalesTrendPeriod = typeof SALES_TREND_PERIODS[number];

/**
 * Query params schema for dashboard KPI endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
export const dashboardKPIQuerySchema = z.object({
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format date tidak valid, gunakan YYYY-MM-DD')
        .optional(),
});

/**
 * Query params schema for sales trend endpoint
 * days: opsional, default 7 — hanya menerima 7, 14, atau 30
 */
export const dashboardSalesTrendQuerySchema = z.object({
    days: z.coerce
        .number()
        .refine(
            (val) => (SALES_TREND_PERIODS as readonly number[]).includes(val),
            { message: 'Nilai days tidak valid, gunakan 7, 14, atau 30' }
        )
        .default(7),
});

/**
 * Query params schema for top menus endpoint
 * date: opsional, default ke tanggal hari ini (YYYY-MM-DD)
 */
export const dashboardTopMenusQuerySchema = z.object({
    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format date tidak valid, gunakan YYYY-MM-DD')
        .optional(),
});

// stock-status tidak membutuhkan query params — selalu real-time

export type DashboardKPIQuery = z.infer<typeof dashboardKPIQuerySchema>;
export type DashboardSalesTrendQuery = z.infer<typeof dashboardSalesTrendQuerySchema>;
export type DashboardTopMenusQuery = z.infer<typeof dashboardTopMenusQuerySchema>;

export const dashboardSchemas = {
    kpiQuery: dashboardKPIQuerySchema,
    salesTrendQuery: dashboardSalesTrendQuerySchema,
    topMenusQuery: dashboardTopMenusQuerySchema,
};

export default dashboardSchemas;
