import {
    createRawIngredientSchema,
    updateRawIngredientSchema,
    ingredientIdParamSchema,
    rawIngredientReferenceQuerySchema,
    rawIngredientListQuerySchema,
    rawIngredientSchemas,
} from './ingredient-raw.schema';

import {
    mockRawIngredientCreateRequest,
    mockRawIngredientUpdateRequest,
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
        name: 'Tepung Terigu',
        unit_id: 'invalid-uuid',
        min_stock: 10,
    },
    negativeStock: {
        name: 'Tepung Terigu',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        stock_qty: -10,
        min_stock: 10,
    },
    negativeMinStock: {
        name: 'Tepung Terigu',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: -5,
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

describe('Raw Ingredient Schema Validation', () => {
    describe('createRawIngredientSchema', () => {
        it('should pass validation with valid complete data', () => {
            const result = createRawIngredientSchema.safeParse(mockRawIngredientCreateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Tepung Terigu');
                expect(result.data.unit_id).toBe('550e8400-e29b-41d4-a716-446655440000');
                expect(result.data.stock_qty).toBe(100);
                expect(result.data.min_stock).toBe(10);
                expect(result.data.avg_cost).toBe(15000);
            }
        });

        it('should pass validation with minimal required data', () => {
            const result = createRawIngredientSchema.safeParse(mockRawIngredientCreateRequest.validMinimal);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Gula Pasir');
                expect(result.data.min_stock).toBe(5);
            }
        });

        it('should fail validation with empty name', () => {
            const result = createRawIngredientSchema.safeParse(mockInvalidCreate.emptyName);

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal');
            }
        });

        it('should fail validation with short name (less than 2 chars)', () => {
            const result = createRawIngredientSchema.safeParse(mockInvalidCreate.shortName);

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
            const result = createRawIngredientSchema.safeParse({
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
            const result = createRawIngredientSchema.safeParse(mockInvalidCreate.invalidUnitId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find(
                    (issue) => issue.path.includes('unit_id')
                );
                expect(unitError).toBeDefined();
                expect(unitError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with negative stock_qty', () => {
            const result = createRawIngredientSchema.safeParse(mockInvalidCreate.negativeStock);

            expect(result.success).toBe(false);
            if (!result.success) {
                const stockError = result.error.issues.find(
                    (issue) => issue.path.includes('stock_qty')
                );
                expect(stockError).toBeDefined();
                expect(stockError?.message).toContain('negatif');
            }
        });

        it('should fail validation with negative min_stock', () => {
            const result = createRawIngredientSchema.safeParse(mockInvalidCreate.negativeMinStock);

            expect(result.success).toBe(false);
            if (!result.success) {
                const minStockError = result.error.issues.find(
                    (issue) => issue.path.includes('min_stock')
                );
                expect(minStockError).toBeDefined();
            }
        });

        it('should fail validation with missing required fields', () => {
            const result = createRawIngredientSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
            }
        });

        it('should fail validation with missing name', () => {
            const result = createRawIngredientSchema.safeParse({
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 10,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing unit_id', () => {
            const result = createRawIngredientSchema.safeParse({
                name: 'Tepung Terigu',
                min_stock: 10,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing min_stock', () => {
            const result = createRawIngredientSchema.safeParse({
                name: 'Tepung Terigu',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('updateRawIngredientSchema', () => {
        it('should pass validation with valid update data', () => {
            const result = updateRawIngredientSchema.safeParse(mockRawIngredientUpdateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Tepung Terigu Premium');
                expect(result.data.min_stock).toBe(20);
            }
        });

        it('should pass validation with partial update data', () => {
            const result = updateRawIngredientSchema.safeParse(mockRawIngredientUpdateRequest.validPartial);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.avg_cost).toBe(18000);
            }
        });

        it('should pass validation with empty object (all fields optional)', () => {
            const result = updateRawIngredientSchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid unit_id format', () => {
            const result = updateRawIngredientSchema.safeParse(mockInvalidUpdate.invalidUnitId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find(
                    (issue) => issue.path.includes('unit_id')
                );
                expect(unitError).toBeDefined();
            }
        });

        it('should fail validation with negative min_stock', () => {
            const result = updateRawIngredientSchema.safeParse(mockInvalidUpdate.negativeMinStock);

            expect(result.success).toBe(false);
        });
    });

    describe('ingredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = ingredientIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID format', () => {
            const result = ingredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('tidak valid');
            }
        });

        it('should fail validation with missing ingredient_id', () => {
            const result = ingredientIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    describe('rawIngredientListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = rawIngredientListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'tepung',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with empty query (all optional)', () => {
            const result = rawIngredientListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should coerce string numbers to numbers', () => {
            const result = rawIngredientListQuerySchema.safeParse({
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
            const result = rawIngredientListQuerySchema.safeParse({
                size: 101,
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with invalid unit_id format', () => {
            const result = rawIngredientListQuerySchema.safeParse({
                unit_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('rawIngredientReferenceQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = rawIngredientReferenceQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should be exported in rawIngredientSchemas', () => {
            expect(rawIngredientSchemas.referenceQuery).toBe(rawIngredientReferenceQuerySchema);
        });
    });
});
