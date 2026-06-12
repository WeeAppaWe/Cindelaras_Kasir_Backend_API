import {
    createSemiIngredientSchema,
    updateSemiIngredientSchema,
    semiIngredientIdParamSchema,
    semiIngredientListQuerySchema,
    produceSemiIngredientSchema,
    createAndProduceSemiIngredientSchema,
    semiIngredientReferenceQuerySchema,
} from './ingredient-semi.schema';

import {
    mockSemiIngredientCreateRequest,
    mockSemiIngredientUpdateRequest,
} from '../../../tests/mocks/ingredient.mock';

// Local invalid-only fixtures (not worth exporting to shared mocks)
const mockInvalidCreate = {
    emptyName: {
        name: '',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: 10,
    },
    shortName: {
        name: 'A',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: 10,
    },
    invalidUnitId: {
        name: 'Bumbu Dasar',
        unit_id: 'invalid-uuid',
        min_stock: 10,
    },
    negativeMinStock: {
        name: 'Bumbu Dasar',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: -5,
    },
    invalidTargetYield: {
        name: 'Bumbu Dasar',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: 10,
        target_yield: 0,
    },
};

const mockInvalidUpdate = {
    invalidUnitId: {
        unit_id: 'invalid-uuid',
    },
    negativeMinStock: {
        min_stock: -10,
    },
};

describe('Semi Ingredient Schema Validation', () => {
    describe('createSemiIngredientSchema', () => {
        it('should pass validation with valid complete data', () => {
            const result = createSemiIngredientSchema.safeParse(mockSemiIngredientCreateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Bumbu Dasar');
                expect(result.data.unit_id).toBe('550e8400-e29b-41d4-a716-446655440000');
                expect(result.data.min_stock).toBe(10);
                expect(result.data.target_yield).toBe(1);
            }
        });

        it('should pass validation with minimal required data', () => {
            const result = createSemiIngredientSchema.safeParse(mockSemiIngredientCreateRequest.validMinimal);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Sambal Goreng');
                expect(result.data.min_stock).toBe(5);
            }
        });

        it('should fail validation with empty name', () => {
            const result = createSemiIngredientSchema.safeParse(mockInvalidCreate.emptyName);

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
            }
        });

        it('should fail validation with short name (less than 2 chars)', () => {
            const result = createSemiIngredientSchema.safeParse(mockInvalidCreate.shortName);

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal 2 karakter');
            }
        });

        it('should fail validation with name exceeding max length', () => {
            const longName = 'a'.repeat(101);
            const result = createSemiIngredientSchema.safeParse({
                name: longName,
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 10,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError?.message).toContain('maksimal');
            }
        });

        it('should fail validation with invalid unit_id format', () => {
            const result = createSemiIngredientSchema.safeParse(mockInvalidCreate.invalidUnitId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find(
                    (issue) => issue.path.includes('unit_id')
                );
                expect(unitError).toBeDefined();
                expect(unitError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with negative min_stock', () => {
            const result = createSemiIngredientSchema.safeParse(mockInvalidCreate.negativeMinStock);

            expect(result.success).toBe(false);
            if (!result.success) {
                const minStockError = result.error.issues.find(
                    (issue) => issue.path.includes('min_stock')
                );
                expect(minStockError).toBeDefined();
            }
        });

        it('should fail validation with zero target_yield', () => {
            const result = createSemiIngredientSchema.safeParse(mockInvalidCreate.invalidTargetYield);

            expect(result.success).toBe(false);
            if (!result.success) {
                const targetYieldError = result.error.issues.find(
                    (issue) => issue.path.includes('target_yield')
                );
                expect(targetYieldError).toBeDefined();
            }
        });

        it('should fail validation with missing required fields', () => {
            const result = createSemiIngredientSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
            }
        });

        it('should fail validation with missing name', () => {
            const result = createSemiIngredientSchema.safeParse({
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 10,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing unit_id', () => {
            const result = createSemiIngredientSchema.safeParse({
                name: 'Bumbu Dasar',
                min_stock: 10,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing min_stock', () => {
            const result = createSemiIngredientSchema.safeParse({
                name: 'Bumbu Dasar',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('updateSemiIngredientSchema', () => {
        it('should pass validation with valid update data', () => {
            const result = updateSemiIngredientSchema.safeParse(mockSemiIngredientUpdateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Bumbu Dasar Merah');
                expect(result.data.min_stock).toBe(20);
            }
        });

        it('should pass validation with partial update data', () => {
            const result = updateSemiIngredientSchema.safeParse(mockSemiIngredientUpdateRequest.validPartial);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.min_stock).toBe(15);
            }
        });

        it('should pass validation with empty object (all fields optional)', () => {
            const result = updateSemiIngredientSchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid unit_id format', () => {
            const result = updateSemiIngredientSchema.safeParse(mockInvalidUpdate.invalidUnitId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find(
                    (issue) => issue.path.includes('unit_id')
                );
                expect(unitError).toBeDefined();
            }
        });

        it('should fail validation with negative min_stock', () => {
            const result = updateSemiIngredientSchema.safeParse(mockInvalidUpdate.negativeMinStock);

            expect(result.success).toBe(false);
        });
    });

    describe('semiIngredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = semiIngredientIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID format', () => {
            const result = semiIngredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('tidak valid');
            }
        });

        it('should fail validation with missing ingredient_id', () => {
            const result = semiIngredientIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    describe('semiIngredientListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = semiIngredientListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'bumbu',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with empty query (all optional)', () => {
            const result = semiIngredientListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should coerce string numbers to numbers', () => {
            const result = semiIngredientListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });

        it('should fail validation with size exceeding max', () => {
            const result = semiIngredientListQuerySchema.safeParse({
                size: 101,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with invalid unit_id format', () => {
            const result = semiIngredientListQuerySchema.safeParse({
                unit_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('produceSemiIngredientSchema', () => {
        it('should pass validation with valid qty only', () => {
            const result = produceSemiIngredientSchema.safeParse({ qty: 5 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.qty).toBe(5);
            }
        });

        it('should pass validation with qty and notes', () => {
            const result = produceSemiIngredientSchema.safeParse({ qty: 3, notes: 'Produksi siang' });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.qty).toBe(3);
                expect(result.data.notes).toBe('Produksi siang');
            }
        });

        it('should fail validation with zero qty', () => {
            const result = produceSemiIngredientSchema.safeParse({ qty: 0 });

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyError = result.error.issues.find((issue) => issue.path.includes('qty'));
                expect(qtyError).toBeDefined();
            }
        });

        it('should fail validation with negative qty', () => {
            const result = produceSemiIngredientSchema.safeParse({ qty: -1 });

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyError = result.error.issues.find((issue) => issue.path.includes('qty'));
                expect(qtyError).toBeDefined();
            }
        });

        it('should fail validation with missing qty', () => {
            const result = produceSemiIngredientSchema.safeParse({});

            expect(result.success).toBe(false);
        });

        it('should fail validation with notes exceeding 500 characters', () => {
            const result = produceSemiIngredientSchema.safeParse({
                qty: 5,
                notes: 'a'.repeat(501),
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const notesError = result.error.issues.find((issue) => issue.path.includes('notes'));
                expect(notesError).toBeDefined();
            }
        });
    });

    describe('createAndProduceSemiIngredientSchema', () => {
        const validCompositions = [
            { child_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 2 },
            { child_id: '550e8400-e29b-41d4-a716-446655440002', qty_needed: 0.5 },
        ];

        it('should pass validation with full valid request', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                notes: 'Batch pertama',
                compositions: validCompositions,
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Saus Tomat');
                expect(result.data.qty).toBe(3);
                expect(result.data.compositions).toHaveLength(2);
            }
        });

        it('should pass validation with minimal data (no notes)', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                compositions: validCompositions,
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with empty name', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: '',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                compositions: validCompositions,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((i) => i.path.includes('name'));
                expect(nameError).toBeDefined();
            }
        });

        it('should fail validation with invalid unit_id', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: 'invalid-uuid',
                min_stock: 5,
                qty: 3,
                compositions: validCompositions,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find((i) => i.path.includes('unit_id'));
                expect(unitError).toBeDefined();
                expect(unitError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with negative min_stock', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: -1,
                qty: 3,
                compositions: validCompositions,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const minStockError = result.error.issues.find((i) => i.path.includes('min_stock'));
                expect(minStockError).toBeDefined();
            }
        });

        it('should fail validation with zero qty', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 0,
                compositions: validCompositions,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyError = result.error.issues.find((i) => i.path.includes('qty'));
                expect(qtyError).toBeDefined();
            }
        });

        it('should fail validation with negative qty', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: -1,
                compositions: validCompositions,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with empty compositions array', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                compositions: [],
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const compositionsError = result.error.issues.find((i) => i.path.includes('compositions'));
                expect(compositionsError).toBeDefined();
            }
        });

        it('should fail validation with invalid child_id UUID in composition', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                compositions: [{ child_id: 'invalid-uuid', qty_needed: 2 }],
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const childError = result.error.issues.find((i) => i.path.includes('child_id'));
                expect(childError).toBeDefined();
                expect(childError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with zero qty_needed in composition', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
                compositions: [{ child_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 0 }],
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyNeededError = result.error.issues.find((i) => i.path.includes('qty_needed'));
                expect(qtyNeededError).toBeDefined();
            }
        });

        it('should fail validation with missing compositions field', () => {
            const result = createAndProduceSemiIngredientSchema.safeParse({
                name: 'Saus Tomat',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 5,
                qty: 3,
            });

            expect(result.success).toBe(false);
        });
    });

    describe('semiIngredientReferenceQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = semiIngredientReferenceQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should be exported in semiIngredientSchemas', () => {
            const { semiIngredientSchemas } = require('./ingredient-semi.schema');
            expect(semiIngredientSchemas.referenceQuery).toBe(semiIngredientReferenceQuerySchema);
        });
    });
});
