import {
    createCategorySchema,
    updateCategorySchema,
    categoryIdParamSchema,
    categoryReferenceQuerySchema,
    categoryListQuerySchema,
    categorySchemas,
} from './category.schema';
import { mockCreateCategoryData } from '../../tests/mocks/category.mock';

// ============================================
// CREATE CATEGORY SCHEMA TESTS
// ============================================

describe('Category Schema Validation', () => {
    describe('createCategorySchema', () => {
        it('should pass validation with valid name', () => {
            const result = createCategorySchema.safeParse(mockCreateCategoryData.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Dessert');
            }
        });

        it('should fail validation with empty name', () => {
            const result = createCategorySchema.safeParse({ name: '' });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
            }
        });

        it('should fail validation with name less than 2 characters', () => {
            const result = createCategorySchema.safeParse(mockCreateCategoryData.tooShort);

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal');
            }
        });

        it('should fail validation with name more than 50 characters', () => {
            const result = createCategorySchema.safeParse(mockCreateCategoryData.tooLong);

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('maksimal');
            }
        });

        it('should fail validation with missing name', () => {
            const result = createCategorySchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // UPDATE CATEGORY SCHEMA TESTS
    // ============================================

    describe('updateCategorySchema', () => {
        it('should pass validation with valid name', () => {
            const result = updateCategorySchema.safeParse({ name: 'Updated Name' });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Updated Name');
            }
        });

        it('should pass validation with empty object (no updates)', () => {
            const result = updateCategorySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should fail validation with name less than 2 characters when provided', () => {
            const result = updateCategorySchema.safeParse({ name: 'A' });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
            }
        });

        it('should fail validation with name more than 50 characters when provided', () => {
            const result = updateCategorySchema.safeParse({ name: 'A'.repeat(51) });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
            }
        });
    });

    // ============================================
    // CATEGORY ID PARAM SCHEMA TESTS
    // ============================================

    describe('categoryIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = categoryIdParamSchema.safeParse({
                category_id: '880e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.category_id).toBe('880e8400-e29b-41d4-a716-446655440001');
            }
        });

        it('should fail validation with invalid UUID format', () => {
            const result = categoryIdParamSchema.safeParse({
                category_id: 'invalid-uuid-format',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const categoryIdError = result.error.issues.find(
                    (issue) => issue.path.includes('category_id')
                );
                expect(categoryIdError).toBeDefined();
                expect(categoryIdError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with missing category_id', () => {
            const result = categoryIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });

        it('should fail validation with empty category_id', () => {
            const result = categoryIdParamSchema.safeParse({
                category_id: '',
            });

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // CATEGORY LIST QUERY SCHEMA TESTS
    // ============================================

    describe('categoryListQuerySchema', () => {
        it('should pass validation with empty query (uses defaults)', () => {
            const result = categoryListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should pass validation with batch and size', () => {
            const result = categoryListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });

        it('should pass validation with search query', () => {
            const result = categoryListQuerySchema.safeParse({
                search: 'makanan',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.search).toBe('makanan');
            }
        });

        it('should coerce string batch to number', () => {
            const result = categoryListQuerySchema.safeParse({
                batch: '5',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(typeof result.data.batch).toBe('number');
                expect(result.data.batch).toBe(5);
            }
        });

        it('should fail validation with batch less than 1', () => {
            const result = categoryListQuerySchema.safeParse({
                batch: '0',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with size greater than 100', () => {
            const result = categoryListQuerySchema.safeParse({
                size: '101',
            });

            expect(result.success).toBe(false);
        });

        it('should pass validation with all query params', () => {
            const result = categoryListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                search: 'test',
            });

            expect(result.success).toBe(true);
        });
    });

    // ============================================
    // CATEGORY REFERENCE QUERY SCHEMA TESTS
    // ============================================

    describe('categoryReferenceQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = categoryReferenceQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should be exported in categorySchemas', () => {
            expect(categorySchemas.referenceQuery).toBe(categoryReferenceQuerySchema);
        });
    });
});
