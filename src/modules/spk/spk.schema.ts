import { z } from 'zod';

// ============================================
// SPK ANALYSIS CONFIG SCHEMA
// ============================================

/**
 * Schema untuk konfigurasi analisa SPK
 */
export const spkConfigSchema = z.object({
    target_days: z.coerce
        .number()
        .int()
        .min(1, { message: 'Target hari minimal 1' })
        .max(90, { message: 'Target hari maksimal 90' })
        .default(7),
    buffer_percent: z.coerce
        .number()
        .min(0, { message: 'Buffer tidak boleh negatif' })
        .max(100, { message: 'Buffer maksimal 100%' })
        .default(10),
    lookback_days: z.coerce
        .number()
        .int()
        .min(7, { message: 'Lookback minimal 7 hari' })
        .max(90, { message: 'Lookback maksimal 90 hari' })
        .default(30),
    ingredient_type: z
        .enum(['raw', 'semi', 'all'])
        .optional()
        .default('all'),
    supplier_id: z
        .string()
        .uuid({ message: 'Format supplier_id tidak valid' })
        .optional(),
});

// ============================================
// INFERRED TYPES
// ============================================

export type SPKConfigInput = z.infer<typeof spkConfigSchema>;

// ============================================
// EXPORT SCHEMAS
// ============================================

export const spkSchemas = {
    config: spkConfigSchema,
};

export default spkSchemas;
