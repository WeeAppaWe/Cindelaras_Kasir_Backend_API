import {
    createMenuSchema,
    updateMenuSchema,
    menuIdParamSchema,
    menuListQuerySchema,
} from './menu.schema';
import { mockCreateMenuData } from '../../tests/mocks/menu.mock';

// ============================================
// CREATE MENU SCHEMA TESTS
// ============================================

describe('Menu Schema Validation', () => {
    describe('createMenuSchema', () => {
        it('should pass validation with valid required fields', () => {
            const result = createMenuSchema.safeParse(mockCreateMenuData.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Ayam Goreng');
                expect(result.data.price).toBe(20000);
            }
        });

        it('should pass validation with all optional fields', () => {
            const result = createMenuSchema.safeParse(mockCreateMenuData.withOptionals);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.description).toBe('Ayam bakar dengan bumbu special');
                expect(result.data.image_url).toBe('https://example.com/ayam.jpg');
                expect(result.data.is_available).toBe(true);
            }
        });

        it('should fail validation with empty name', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                name: '',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with name less than 2 characters', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                name: 'A',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(
                    (issue) => issue.path.includes('name')
                );
                expect(nameError).toBeDefined();
            }
        });

        it('should fail validation with name more than 100 characters', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                name: 'A'.repeat(101),
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with invalid category_id format', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                category_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with negative price', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                price: -100,
            });

            expect(result.success).toBe(false);
        });

        it('should pass validation with price = 0', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                price: 0,
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid image_url format', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                image_url: 'not-a-valid-url',
            });

            expect(result.success).toBe(false);
        });

        it('should pass validation with null description', () => {
            const result = createMenuSchema.safeParse({
                ...mockCreateMenuData.valid,
                description: null,
            });

            expect(result.success).toBe(true);
        });
    });

    // ============================================
    // UPDATE MENU SCHEMA TESTS
    // ============================================

    describe('updateMenuSchema', () => {
        it('should pass validation with partial update (name only)', () => {
            const result = updateMenuSchema.safeParse({ name: 'New Name' });

            expect(result.success).toBe(true);
        });

        it('should pass validation with empty object', () => {
            const result = updateMenuSchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid price', () => {
            const result = updateMenuSchema.safeParse({ price: -100 });

            expect(result.success).toBe(false);
        });

        it('should pass with all fields', () => {
            const result = updateMenuSchema.safeParse({
                name: 'Updated Menu',
                price: 25000,
                is_available: false,
            });

            expect(result.success).toBe(true);
        });
    });

    // ============================================
    // MENU ID PARAM SCHEMA TESTS
    // ============================================

    describe('menuIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = menuIdParamSchema.safeParse({
                menu_id: '990e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID', () => {
            const result = menuIdParamSchema.safeParse({
                menu_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing menu_id', () => {
            const result = menuIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // MENU LIST QUERY SCHEMA TESTS
    // ============================================

    describe('menuListQuerySchema', () => {
        it('should pass validation with empty query', () => {
            const result = menuListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should pass validation with pagination params', () => {
            const result = menuListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });

        it('should pass validation with search', () => {
            const result = menuListQuerySchema.safeParse({
                search: 'nasi',
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with category_id filter', () => {
            const result = menuListQuerySchema.safeParse({
                category_id: '880e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with is_available filter (true)', () => {
            const result = menuListQuerySchema.safeParse({
                is_available: 'true',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.is_available).toBe(true);
            }
        });

        it('should pass validation with is_available filter (false)', () => {
            const result = menuListQuerySchema.safeParse({
                is_available: 'false',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.is_available).toBe(false);
            }
        });

        it('should fail validation with invalid category_id', () => {
            const result = menuListQuerySchema.safeParse({
                category_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with size > 100', () => {
            const result = menuListQuerySchema.safeParse({
                size: '101',
            });

            expect(result.success).toBe(false);
        });
    });
});
