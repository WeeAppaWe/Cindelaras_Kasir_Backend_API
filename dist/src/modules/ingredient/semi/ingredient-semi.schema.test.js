"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_semi_schema_1 = require("./ingredient-semi.schema");
// Mock semi ingredient request data
const mockCreateRequest = {
    valid: {
        name: 'Bumbu Dasar',
        unit_id: '550e8400-e29b-41d4-a716-446655440000',
        min_stock: 10,
        target_yield: 1,
    },
    validMinimal: {
        name: 'Sambal Goreng',
        unit_id: '550e8400-e29b-41d4-a716-446655440001',
        min_stock: 5,
    },
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
const mockUpdateRequest = {
    valid: {
        name: 'Bumbu Dasar Merah',
        min_stock: 20,
    },
    validPartial: {
        min_stock: 15,
    },
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
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Bumbu Dasar');
                expect(result.data.unit_id).toBe('550e8400-e29b-41d4-a716-446655440000');
                expect(result.data.min_stock).toBe(10);
                expect(result.data.target_yield).toBe(1);
            }
        });
        it('should pass validation with minimal required data', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.validMinimal);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Sambal Goreng');
                expect(result.data.min_stock).toBe(5);
            }
        });
        it('should fail validation with empty name', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.emptyName);
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
            }
        });
        it('should fail validation with short name (less than 2 chars)', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.shortName);
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal 2 karakter');
            }
        });
        it('should fail validation with name exceeding max length', () => {
            const longName = 'a'.repeat(101);
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse({
                name: longName,
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 10,
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError?.message).toContain('maksimal');
            }
        });
        it('should fail validation with invalid unit_id format', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.invalidUnitId);
            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find((issue) => issue.path.includes('unit_id'));
                expect(unitError).toBeDefined();
                expect(unitError?.message).toContain('tidak valid');
            }
        });
        it('should fail validation with negative min_stock', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.negativeMinStock);
            expect(result.success).toBe(false);
            if (!result.success) {
                const minStockError = result.error.issues.find((issue) => issue.path.includes('min_stock'));
                expect(minStockError).toBeDefined();
            }
        });
        it('should fail validation with zero target_yield', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse(mockCreateRequest.invalidTargetYield);
            expect(result.success).toBe(false);
            if (!result.success) {
                const targetYieldError = result.error.issues.find((issue) => issue.path.includes('target_yield'));
                expect(targetYieldError).toBeDefined();
            }
        });
        it('should fail validation with missing required fields', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse({});
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
            }
        });
        it('should fail validation with missing name', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse({
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
                min_stock: 10,
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with missing unit_id', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse({
                name: 'Bumbu Dasar',
                min_stock: 10,
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with missing min_stock', () => {
            const result = ingredient_semi_schema_1.createSemiIngredientSchema.safeParse({
                name: 'Bumbu Dasar',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(false);
        });
    });
    describe('updateSemiIngredientSchema', () => {
        it('should pass validation with valid update data', () => {
            const result = ingredient_semi_schema_1.updateSemiIngredientSchema.safeParse(mockUpdateRequest.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Bumbu Dasar Merah');
                expect(result.data.min_stock).toBe(20);
            }
        });
        it('should pass validation with partial update data', () => {
            const result = ingredient_semi_schema_1.updateSemiIngredientSchema.safeParse(mockUpdateRequest.validPartial);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.min_stock).toBe(15);
            }
        });
        it('should pass validation with empty object (all fields optional)', () => {
            const result = ingredient_semi_schema_1.updateSemiIngredientSchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid unit_id format', () => {
            const result = ingredient_semi_schema_1.updateSemiIngredientSchema.safeParse(mockUpdateRequest.invalidUnitId);
            expect(result.success).toBe(false);
            if (!result.success) {
                const unitError = result.error.issues.find((issue) => issue.path.includes('unit_id'));
                expect(unitError).toBeDefined();
            }
        });
        it('should fail validation with negative min_stock', () => {
            const result = ingredient_semi_schema_1.updateSemiIngredientSchema.safeParse(mockUpdateRequest.negativeMinStock);
            expect(result.success).toBe(false);
        });
    });
    describe('semiIngredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = ingredient_semi_schema_1.semiIngredientIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid UUID format', () => {
            const result = ingredient_semi_schema_1.semiIngredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('tidak valid');
            }
        });
        it('should fail validation with missing ingredient_id', () => {
            const result = ingredient_semi_schema_1.semiIngredientIdParamSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
    describe('semiIngredientListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = ingredient_semi_schema_1.semiIngredientListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'bumbu',
                unit_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should pass validation with empty query (all optional)', () => {
            const result = ingredient_semi_schema_1.semiIngredientListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should coerce string numbers to numbers', () => {
            const result = ingredient_semi_schema_1.semiIngredientListQuerySchema.safeParse({
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
            const result = ingredient_semi_schema_1.semiIngredientListQuerySchema.safeParse({
                size: 101,
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with invalid unit_id format', () => {
            const result = ingredient_semi_schema_1.semiIngredientListQuerySchema.safeParse({
                unit_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=ingredient-semi.schema.test.js.map