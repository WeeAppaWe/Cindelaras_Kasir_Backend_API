import { z } from 'zod';

// ============================================
// FILTER SCHEMAS
// ============================================

/**
 * Report filter schema for query parameters
 * - start_date & end_date: Required, format YYYY-MM-DD
 * - shift_id: Optional, filter by specific shift
 * - user_id: Optional, filter by specific cashier
 */
export const reportOperationalFilterSchema = z.object({
    start_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    shift_id: z
        .string()
        .uuid({ message: 'Format shift_id tidak valid' })
        .optional(),
    user_id: z
        .string()
        .uuid({ message: 'Format user_id tidak valid' })
        .optional(),
}).refine((data) => {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    return start <= end;
}, {
    message: 'start_date harus sebelum atau sama dengan end_date',
    path: ['start_date'],
});

/**
 * Menu performance query schema - includes limit parameter
 */
export const menuPerformanceQuerySchema = reportOperationalFilterSchema.and(
    z.object({
        limit: z.coerce.number().min(1).max(100).default(20).optional(),
    })
);

// ============================================
// INFERRED TYPES
// ============================================

export type ReportOperationalFilterInput = z.infer<typeof reportOperationalFilterSchema>;
export type MenuPerformanceQueryInput = z.infer<typeof menuPerformanceQuerySchema>;

// ============================================
// EXPORT SCHEMAS
// ============================================

export const reportOperationalSchemas = {
    filter: reportOperationalFilterSchema,
    menuPerformance: menuPerformanceQuerySchema,
};

export default reportOperationalSchemas;
