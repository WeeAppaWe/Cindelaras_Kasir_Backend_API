import {
    ingredientAllReferenceQuerySchema,
    ingredientAllSchemas,
} from './ingredient-all.schema';

describe('Ingredient All Schema Validation', () => {
    describe('ingredientAllReferenceQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = ingredientAllReferenceQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should be exported in ingredientAllSchemas', () => {
            expect(ingredientAllSchemas.referenceQuery).toBe(ingredientAllReferenceQuerySchema);
        });
    });
});
