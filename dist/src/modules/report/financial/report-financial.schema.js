"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFinancialSchemas = exports.topMenusQuerySchema = exports.reportFilterSchema = void 0;
const zod_1 = require("zod");
// ============================================
// FILTER SCHEMAS
// ============================================
/**
 * Report filter schema for query parameters
 * - start_date & end_date: Required, format YYYY-MM-DD
 * - shift_id: Optional, filter by specific shift
 * - user_id: Optional, filter by specific cashier
 */
exports.reportFilterSchema = zod_1.z.object({
    start_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    end_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
    shift_id: zod_1.z
        .string()
        .uuid({ message: 'Format shift_id tidak valid' })
        .optional(),
    user_id: zod_1.z
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
 * Top menus query schema - includes limit parameter
 */
exports.topMenusQuerySchema = exports.reportFilterSchema.and(zod_1.z.object({
    limit: zod_1.z.coerce.number().min(1).max(50).default(10).optional(),
}));
// ============================================
// EXPORT SCHEMAS
// ============================================
exports.reportFinancialSchemas = {
    filter: exports.reportFilterSchema,
    topMenus: exports.topMenusQuerySchema,
};
exports.default = exports.reportFinancialSchemas;
//# sourceMappingURL=report-financial.schema.js.map