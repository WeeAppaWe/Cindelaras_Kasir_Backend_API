import {
    createOpnameSchema,
    updateOpnameSchema,
    changeStatusSchema,
    opnameIdParamSchema,
    opnameListQuerySchema,
    opnameItemSchema,
    OpnameStatus,
} from './opname.schema';
import { mockCreateOpnameData, mockUpdateOpnameData, mockChangeStatusData } from '../../tests/mocks/opname.mock';

// ============================================
// OPNAME ITEM SCHEMA TESTS
// ============================================

describe('Opname Schema Validation', () => {
    describe('opnameItemSchema', () => {
        it('should pass validation with valid item data', () => {
            const result = opnameItemSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                physical_qty: 100,
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.ingredient_id).toBe('bb0e8400-e29b-41d4-a716-446655440001');
                expect(result.data.physical_qty).toBe(100);
            }
        });

        it('should pass validation with zero physical_qty', () => {
            const result = opnameItemSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                physical_qty: 0,
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with decimal physical_qty', () => {
            const result = opnameItemSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                physical_qty: 50.5,
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.physical_qty).toBe(50.5);
            }
        });

        it('should fail validation with negative physical_qty', () => {
            const result = opnameItemSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
                physical_qty: -5,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const qtyError = result.error.issues.find(
                    (issue) => issue.path.includes('physical_qty')
                );
                expect(qtyError).toBeDefined();
            }
        });

        it('should fail validation with invalid UUID for ingredient_id', () => {
            const result = opnameItemSchema.safeParse({
                ingredient_id: 'invalid-uuid',
                physical_qty: 100,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const idError = result.error.issues.find(
                    (issue) => issue.path.includes('ingredient_id')
                );
                expect(idError).toBeDefined();
            }
        });

        it('should fail validation with missing fields', () => {
            const result = opnameItemSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });
    });

    // ============================================
    // CREATE OPNAME SCHEMA TESTS
    // ============================================

    describe('createOpnameSchema', () => {
        it('should pass validation with valid data', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.opname_date).toBe('2024-01-15');
                expect(result.data.notes).toBe('Opname akhir bulan');
                expect(result.data.items).toHaveLength(2);
            }
        });

        it('should pass validation without optional notes', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.validWithoutNotes);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.notes).toBeUndefined();
            }
        });

        it('should fail validation with invalid date format', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.invalidDate);

            expect(result.success).toBe(false);
            if (!result.success) {
                const dateError = result.error.issues.find(
                    (issue) => issue.path.includes('opname_date')
                );
                expect(dateError).toBeDefined();
                expect(dateError?.message).toContain('YYYY-MM-DD');
            }
        });

        it('should fail validation with empty items array', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.emptyItems);

            expect(result.success).toBe(false);
            if (!result.success) {
                const itemsError = result.error.issues.find(
                    (issue) => issue.path.includes('items')
                );
                expect(itemsError).toBeDefined();
            }
        });

        it('should fail validation with invalid ingredient_id in items', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.invalidIngredientId);

            expect(result.success).toBe(false);
        });

        it('should fail validation with negative physical_qty in items', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.negativePhysicalQty);

            expect(result.success).toBe(false);
        });

        it('should fail validation with notes exceeding 500 characters', () => {
            const result = createOpnameSchema.safeParse(mockCreateOpnameData.longNotes);

            expect(result.success).toBe(false);
            if (!result.success) {
                const notesError = result.error.issues.find(
                    (issue) => issue.path.includes('notes')
                );
                expect(notesError).toBeDefined();
                expect(notesError?.message).toContain('maksimal');
            }
        });

        it('should fail validation with missing required fields', () => {
            const result = createOpnameSchema.safeParse({});

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
            }
        });

        it('should pass validation with multiple items', () => {
            const result = createOpnameSchema.safeParse({
                opname_date: '2024-01-15',
                items: [
                    { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
                    { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002', physical_qty: 50 },
                    { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003', physical_qty: 25.5 },
                ],
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.items).toHaveLength(3);
            }
        });
    });

    // ============================================
    // UPDATE OPNAME SCHEMA TESTS
    // ============================================

    describe('updateOpnameSchema', () => {
        it('should pass validation with notes only', () => {
            const result = updateOpnameSchema.safeParse(mockUpdateOpnameData.validNotesOnly);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.notes).toBe('Updated notes');
            }
        });

        it('should pass validation with items only', () => {
            const result = updateOpnameSchema.safeParse(mockUpdateOpnameData.validItemsOnly);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.items).toHaveLength(1);
            }
        });

        it('should pass validation with both notes and items', () => {
            const result = updateOpnameSchema.safeParse(mockUpdateOpnameData.validBoth);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.notes).toBe('Updated notes with items');
                expect(result.data.items).toHaveLength(2);
            }
        });

        it('should pass validation with empty object (no updates)', () => {
            const result = updateOpnameSchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should fail validation with empty items array when provided', () => {
            const result = updateOpnameSchema.safeParse(mockUpdateOpnameData.emptyItems);

            expect(result.success).toBe(false);
        });

        it('should fail validation with invalid item in items array', () => {
            const result = updateOpnameSchema.safeParse({
                items: [
                    { ingredient_id: 'invalid-uuid', physical_qty: 100 },
                ],
            });

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // CHANGE STATUS SCHEMA TESTS
    // ============================================

    describe('changeStatusSchema', () => {
        it('should pass validation with COMPLETED status', () => {
            const result = changeStatusSchema.safeParse(mockChangeStatusData.toCompleted);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.status).toBe('COMPLETED');
            }
        });

        it('should pass validation with CANCELLED status', () => {
            const result = changeStatusSchema.safeParse(mockChangeStatusData.toCancelled);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.status).toBe('CANCELLED');
            }
        });

        it('should fail validation with invalid status', () => {
            const result = changeStatusSchema.safeParse(mockChangeStatusData.invalidStatus);

            expect(result.success).toBe(false);
        });

        it('should fail validation with APPLIED status (not allowed)', () => {
            const result = changeStatusSchema.safeParse(mockChangeStatusData.toApplied);

            expect(result.success).toBe(false);
        });

        it('should fail validation with DRAFT status (not allowed)', () => {
            const result = changeStatusSchema.safeParse(mockChangeStatusData.toDraft);

            expect(result.success).toBe(false);
        });

        it('should fail validation with missing status', () => {
            const result = changeStatusSchema.safeParse({});

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // OPNAME ID PARAM SCHEMA TESTS
    // ============================================

    describe('opnameIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = opnameIdParamSchema.safeParse({
                stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.stock_opname_id).toBe('ee0e8400-e29b-41d4-a716-446655440001');
            }
        });

        it('should fail validation with invalid UUID format', () => {
            const result = opnameIdParamSchema.safeParse({
                stock_opname_id: 'invalid-uuid-format',
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                const idError = result.error.issues.find(
                    (issue) => issue.path.includes('stock_opname_id')
                );
                expect(idError).toBeDefined();
                expect(idError?.message).toContain('tidak valid');
            }
        });

        it('should fail validation with missing stock_opname_id', () => {
            const result = opnameIdParamSchema.safeParse({});

            expect(result.success).toBe(false);
        });

        it('should fail validation with empty stock_opname_id', () => {
            const result = opnameIdParamSchema.safeParse({
                stock_opname_id: '',
            });

            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // OPNAME LIST QUERY SCHEMA TESTS
    // ============================================

    describe('opnameListQuerySchema', () => {
        it('should pass validation with empty query (uses defaults)', () => {
            const result = opnameListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should pass validation with batch and size', () => {
            const result = opnameListQuerySchema.safeParse({
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
            const result = opnameListQuerySchema.safeParse({
                search: 'akhir bulan',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.search).toBe('akhir bulan');
            }
        });

        it('should pass validation with valid status filter', () => {
            const result = opnameListQuerySchema.safeParse({
                status: 'DRAFT',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.status).toBe('DRAFT');
            }
        });

        it('should fail validation with invalid status filter', () => {
            const result = opnameListQuerySchema.safeParse({
                status: 'INVALID_STATUS',
            });

            expect(result.success).toBe(false);
        });

        it('should pass validation with valid date filters', () => {
            const result = opnameListQuerySchema.safeParse({
                start_date: '2024-01-01',
                end_date: '2024-01-31',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.start_date).toBe('2024-01-01');
                expect(result.data.end_date).toBe('2024-01-31');
            }
        });

        it('should fail validation with invalid date format', () => {
            const result = opnameListQuerySchema.safeParse({
                start_date: '01-01-2024', // Wrong format
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with batch less than 1', () => {
            const result = opnameListQuerySchema.safeParse({
                batch: '0',
            });

            expect(result.success).toBe(false);
        });

        it('should fail validation with size greater than 100', () => {
            const result = opnameListQuerySchema.safeParse({
                size: '101',
            });

            expect(result.success).toBe(false);
        });

        it('should pass validation with all query params', () => {
            const result = opnameListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                search: 'test',
                status: 'COMPLETED',
                start_date: '2024-01-01',
                end_date: '2024-01-31',
            });

            expect(result.success).toBe(true);
        });

        it('should coerce string batch to number', () => {
            const result = opnameListQuerySchema.safeParse({
                batch: '5',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(typeof result.data.batch).toBe('number');
                expect(result.data.batch).toBe(5);
            }
        });
    });

    // ============================================
    // ENUM TESTS
    // ============================================

    describe('OpnameStatus Enum', () => {
        it('should have DRAFT value', () => {
            expect(OpnameStatus.DRAFT).toBe('DRAFT');
        });

        it('should have COMPLETED value', () => {
            expect(OpnameStatus.COMPLETED).toBe('COMPLETED');
        });

        it('should have APPLIED value', () => {
            expect(OpnameStatus.APPLIED).toBe('APPLIED');
        });

        it('should have CANCELLED value', () => {
            expect(OpnameStatus.CANCELLED).toBe('CANCELLED');
        });
    });
});
