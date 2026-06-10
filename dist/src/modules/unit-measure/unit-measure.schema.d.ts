import { z } from 'zod';
/**
 * Create unit measure schema
 */
export declare const createUnitMeasureSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Update unit measure schema
 */
export declare const updateUnitMeasureSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Unit measure ID param schema
 */
export declare const unitMeasureIdParamSchema: z.ZodObject<{
    unit_measure_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list unit measures
 */
export declare const unitMeasureListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Query params schema for unit measure references
 */
export declare const unitMeasureReferenceQuerySchema: z.ZodObject<{}, z.core.$strip>;
export type CreateUnitMeasureInput = z.infer<typeof createUnitMeasureSchema>;
export type UpdateUnitMeasureInput = z.infer<typeof updateUnitMeasureSchema>;
export type UnitMeasureIdParam = z.infer<typeof unitMeasureIdParamSchema>;
export type UnitMeasureListQuery = z.infer<typeof unitMeasureListQuerySchema>;
export type UnitMeasureReferenceQuery = z.infer<typeof unitMeasureReferenceQuerySchema>;
export declare const unitMeasureSchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    unitMeasureIdParam: z.ZodObject<{
        unit_measure_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    referenceQuery: z.ZodObject<{}, z.core.$strip>;
};
export default unitMeasureSchemas;
//# sourceMappingURL=unit-measure.schema.d.ts.map