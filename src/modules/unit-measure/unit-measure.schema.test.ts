import {
    unitMeasureReferenceQuerySchema,
    unitMeasureSchemas,
} from './unit-measure.schema';

describe('Unit Measure Schema Validation', () => {
    describe('unitMeasureReferenceQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = unitMeasureReferenceQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should be exported in unitMeasureSchemas', () => {
            expect(unitMeasureSchemas.referenceQuery).toBe(unitMeasureReferenceQuerySchema);
        });
    });
});
