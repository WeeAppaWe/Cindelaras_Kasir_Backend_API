"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitMeasureSchemas = exports.unitMeasureReferenceQuerySchema = exports.unitMeasureListQuerySchema = exports.unitMeasureIdParamSchema = exports.updateUnitMeasureSchema = exports.createUnitMeasureSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create unit measure schema
 */
exports.createUnitMeasureSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, 'Nama satuan wajib diisi')
        .max(50, 'Nama satuan maksimal 50 karakter'),
});
/**
 * Update unit measure schema
 */
exports.updateUnitMeasureSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(1, 'Nama satuan wajib diisi')
        .max(50, 'Nama satuan maksimal 50 karakter')
        .optional(),
});
/**
 * Unit measure ID param schema
 */
exports.unitMeasureIdParamSchema = zod_1.z.object({
    unit_measure_id: zod_1.z
        .string()
        .uuid('Format unit_measure_id tidak valid'),
});
/**
 * Query params schema for list unit measures
 */
exports.unitMeasureListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
});
/**
 * Query params schema for unit measure references
 */
exports.unitMeasureReferenceQuerySchema = zod_1.z.object({});
// Export schemas
exports.unitMeasureSchemas = {
    create: exports.createUnitMeasureSchema,
    update: exports.updateUnitMeasureSchema,
    unitMeasureIdParam: exports.unitMeasureIdParamSchema,
    listQuery: exports.unitMeasureListQuerySchema,
    referenceQuery: exports.unitMeasureReferenceQuerySchema,
};
exports.default = exports.unitMeasureSchemas;
//# sourceMappingURL=unit-measure.schema.js.map