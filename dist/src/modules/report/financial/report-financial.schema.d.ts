import { z } from 'zod';
/**
 * Report filter schema for query parameters
 * - start_date & end_date: Required, format YYYY-MM-DD
 * - shift_id: Optional, filter by specific shift
 * - user_id: Optional, filter by specific cashier
 */
export declare const reportFilterSchema: z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
    shift_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Top menus query schema - includes limit parameter
 */
export declare const topMenusQuerySchema: z.ZodIntersection<z.ZodObject<{
    start_date: z.ZodString;
    end_date: z.ZodString;
    shift_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>>;
export type ReportFilterInput = z.infer<typeof reportFilterSchema>;
export type TopMenusQueryInput = z.infer<typeof topMenusQuerySchema>;
export declare const reportFinancialSchemas: {
    filter: z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        shift_id: z.ZodOptional<z.ZodString>;
        user_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    topMenus: z.ZodIntersection<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
        shift_id: z.ZodOptional<z.ZodString>;
        user_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        limit: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>>;
};
export default reportFinancialSchemas;
//# sourceMappingURL=report-financial.schema.d.ts.map