import { z } from 'zod';
/**
 * Report filter schema for query parameters
 * - start_date & end_date: Required, format YYYY-MM-DD
 * - shift_id: Optional, filter by specific shift
 * - user_id: Optional, filter by specific cashier
 */
export declare const reportOperationalFilterSchema: z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
    shift_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Menu performance query schema - includes limit parameter
 */
export declare const menuPerformanceQuerySchema: z.ZodIntersection<z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
    shift_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>>;
export type ReportOperationalFilterInput = z.infer<typeof reportOperationalFilterSchema>;
export type MenuPerformanceQueryInput = z.infer<typeof menuPerformanceQuerySchema>;
export declare const reportOperationalSchemas: {
    filter: z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        shift_id: z.ZodOptional<z.ZodString>;
        user_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    menuPerformance: z.ZodIntersection<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        shift_id: z.ZodOptional<z.ZodString>;
        user_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>>;
};
export default reportOperationalSchemas;
//# sourceMappingURL=report-operational.schema.d.ts.map