import {
    createCompositionSchema,
    updateCompositionSchema,
    bulkAddCompositionsSchema,
    parentIngredientIdParamSchema,
    compositionIdParamSchema,
    hppPreviewSchema,
} from './ingredient-semi-composition.schema';

// Mock composition request data
const mockCreateRequest = {
    valid: {
        child_id: '550e8400-e29b-41d4-a716-446655440000',
        qty_needed: 2.5,
    },
    invalidChildId: {
        child_id: 'invalid-uuid',
        qty_needed: 2,
    },
    zeroQty: {
        child_id: '550e8400-e29b-41d4-a716-446655440000',
        qty_needed: 0,
    },
    negativeQty: {
        child_id: '550e8400-e29b-41d4-a716-446655440000',
        qty_needed: -1,
    },
};

const mockUpdateRequest = {
    valid: {
        qty_needed: 3,
    },
    zeroQty: {
        qty_needed: 0,
    },
    negativeQty: {
        qty_needed: -1,
    },
};

const mockBulkAddRequest = {
    valid: {
        compositions: [
            { child_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 2 },
            { child_id: '550e8400-e29b-41d4-a716-446655440002', qty_needed: 1.5 },
        ],
        target_yield: 1,
    },
    emptyCompositions: {
        compositions: [],
    },
    invalidChildId: {
        compositions: [
            { child_id: 'invalid-uuid', qty_needed: 2 },
        ],
    },
};

const mockHppPreviewRequest = {
    valid: {
        compositions: [
            { ingredient_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 2 },
            { ingredient_id: '550e8400-e29b-41d4-a716-446655440002', qty_needed: 1 },
        ],
        target_yield: 1,
    },
    emptyCompositions: {
        compositions: [],
    },
    invalidIngredientId: {
        compositions: [
            { ingredient_id: 'invalid-uuid', qty_needed: 2 },
        ],
    },
};

describe('Semi Ingredient Composition Schema Validation', () => {
    describe('createCompositionSchema', () => {
        it('should pass validation with valid data', () => {
            const result = createCompositionSchema.safeParse(mockCreateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.child_id).toBe('550e8400-e29b-41d4-a716-446655440000');
                expect(result.data.qty_needed).toBe(2.5);
            }
        });

        it('should fail validation with invalid child_id format', () => {
            const result = createCompositionSchema.safeParse(mockCreateRequest.invalidChildId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const childIdError = result.error.issues.find(
                    (issue) => issue.path.includes('child_id')
                );
                expect(childIdError).toBeDefined();
                expect(childIdError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with zero qty_needed', () => {
            const result = createCompositionSchema.safeParse(mockCreateRequest.zeroQty);

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyError = result.error.issues.find(
                    (issue) => issue.path.includes('qty_needed')
                );
                expect(qtyError).toBeDefined();
            }
        });

        it('should fail validation with negative qty_needed', () => {
            const result = createCompositionSchema.safeParse(mockCreateRequest.negativeQty);

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing fields', () => {
            const result = createCompositionSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });
    });

    describe('updateCompositionSchema', () => {
        it('should pass validation with valid qty_needed', () => {
            const result = updateCompositionSchema.safeParse(mockUpdateRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.qty_needed).toBe(3);
            }
        });

        it('should fail validation with zero qty_needed', () => {
            const result = updateCompositionSchema.safeParse(mockUpdateRequest.zeroQty);

            expect(result.success).toBe(false);
        });

        it('should fail validation with negative qty_needed', () => {
            const result = updateCompositionSchema.safeParse(mockUpdateRequest.negativeQty);

            expect(result.success).toBe(false);
        });
    });

    describe('bulkAddCompositionsSchema', () => {
        it('should pass validation with valid bulk data', () => {
            const result = bulkAddCompositionsSchema.safeParse(mockBulkAddRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.compositions).toHaveLength(2);
                expect(result.data.target_yield).toBe(1);
            }
        });

        it('should fail validation with empty compositions array', () => {
            const result = bulkAddCompositionsSchema.safeParse(mockBulkAddRequest.emptyCompositions);

            expect(result.success).toBe(false);
            if (!result.success) {
                const compositionsError = result.error.issues.find(
                    (issue) => issue.path.includes('compositions')
                );
                expect(compositionsError).toBeDefined();
                expect(compositionsError?.message).toContain('Minimal 1 bahan');
            }
        });

        it('should fail validation with invalid child_id in composition', () => {
            const result = bulkAddCompositionsSchema.safeParse(mockBulkAddRequest.invalidChildId);

            expect(result.success).toBe(false);
        });

        it('should use default target_yield when not provided', () => {
            const result = bulkAddCompositionsSchema.safeParse({
                compositions: [
                    { child_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 2 },
                ],
            });

            expect(result.success).toBe(true);
        });
    });

    describe('parentIngredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = parentIngredientIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID format', () => {
            const result = parentIngredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing ingredient_id', () => {
            const result = parentIngredientIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    describe('compositionIdParamSchema', () => {
        it('should pass validation with valid UUIDs', () => {
            const result = compositionIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
                composition_id: '660e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid ingredient_id', () => {
            const result = compositionIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
                composition_id: '660e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with invalid composition_id', () => {
            const result = compositionIdParamSchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
                composition_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing both IDs', () => {
            const result = compositionIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });
    });

    describe('hppPreviewSchema', () => {
        it('should pass validation with valid preview data', () => {
            const result = hppPreviewSchema.safeParse(mockHppPreviewRequest.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.compositions).toHaveLength(2);
                expect(result.data.target_yield).toBe(1);
            }
        });

        it('should fail validation with empty compositions', () => {
            const result = hppPreviewSchema.safeParse(mockHppPreviewRequest.emptyCompositions);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('Minimal 1 bahan');
            }
        });

        it('should fail validation with invalid ingredient_id', () => {
            const result = hppPreviewSchema.safeParse(mockHppPreviewRequest.invalidIngredientId);

            expect(result.success).toBe(false);
        });

        it('should use default target_yield when not provided', () => {
            const result = hppPreviewSchema.safeParse({
                compositions: [
                    { ingredient_id: '550e8400-e29b-41d4-a716-446655440001', qty_needed: 2 },
                ],
            });

            expect(result.success).toBe(true);
        });
    });
});
