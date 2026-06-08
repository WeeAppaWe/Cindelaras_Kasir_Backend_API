"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spkSchemas = exports.spkConfigSchema = void 0;
const zod_1 = require("zod");
// ============================================
// SPK ANALYSIS CONFIG SCHEMA
// ============================================
/**
 * Schema untuk konfigurasi analisa SPK
 */
exports.spkConfigSchema = zod_1.z.object({
    target_days: zod_1.z.coerce
        .number()
        .int()
        .min(1, { message: 'Target hari minimal 1' })
        .max(90, { message: 'Target hari maksimal 90' })
        .default(7),
    buffer_percent: zod_1.z.coerce
        .number()
        .min(0, { message: 'Buffer tidak boleh negatif' })
        .max(100, { message: 'Buffer maksimal 100%' })
        .default(10),
    lookback_days: zod_1.z.coerce
        .number()
        .int()
        .min(7, { message: 'Lookback minimal 7 hari' })
        .max(90, { message: 'Lookback maksimal 90 hari' })
        .default(30),
    ingredient_type: zod_1.z
        .enum(['raw', 'semi', 'all'])
        .optional()
        .default('all'),
    supplier_id: zod_1.z
        .string()
        .uuid({ message: 'Format supplier_id tidak valid' })
        .optional(),
});
// ============================================
// EXPORT SCHEMAS
// ============================================
exports.spkSchemas = {
    config: exports.spkConfigSchema,
};
exports.default = exports.spkSchemas;
//# sourceMappingURL=spk.schema.js.map