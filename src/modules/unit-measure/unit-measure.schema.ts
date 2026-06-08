import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create unit measure schema
 */
export const createUnitMeasureSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Nama satuan wajib diisi')
        .max(50, 'Nama satuan maksimal 50 karakter'),
});

/**
 * Update unit measure schema
 */
export const updateUnitMeasureSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Nama satuan wajib diisi')
        .max(50, 'Nama satuan maksimal 50 karakter')
        .optional(),
});

/**
 * Unit measure ID param schema
 */
export const unitMeasureIdParamSchema = z.object({
    unit_measure_id: z
        .string()
        .uuid('Format unit_measure_id tidak valid'),
});

/**
 * Query params schema for list unit measures
 */
export const unitMeasureListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
});

// Infer types from schemas
export type CreateUnitMeasureInput = z.infer<typeof createUnitMeasureSchema>;
export type UpdateUnitMeasureInput = z.infer<typeof updateUnitMeasureSchema>;
export type UnitMeasureIdParam = z.infer<typeof unitMeasureIdParamSchema>;
export type UnitMeasureListQuery = z.infer<typeof unitMeasureListQuerySchema>;

// Export schemas
export const unitMeasureSchemas = {
    create: createUnitMeasureSchema,
    update: updateUnitMeasureSchema,
    unitMeasureIdParam: unitMeasureIdParamSchema,
    listQuery: unitMeasureListQuerySchema,
};

export default unitMeasureSchemas;
