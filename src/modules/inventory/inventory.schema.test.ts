import {
    stockInSchema,
    stockOutSchema,
    stockMovementIdParamSchema,
    ingredientIdParamSchema,
    stockMovementListQuerySchema,
} from './inventory.schema';
import {
    mockStockInData,
    mockStockOutData,
} from '../../tests/mocks/inventory.mock';

describe('Inventory Schema Validation', () => {
    describe('stockInSchema', () => {
        it('should pass validation with valid stock in data', () => {
            const result = stockInSchema.safeParse(mockStockInData.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.qty).toBe(50);
                expect(result.data.unit_cost).toBe(11000);
            }
        });

        it('should fail validation with invalid ingredient_id', () => {
            const result = stockInSchema.safeParse(mockStockInData.invalidIngredientId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find(
                    (issue) => issue.path.includes('ingredient_id')
                );
                expect(error).toBeDefined();
            }
        });

        it('should fail validation with invalid supplier_id', () => {
            const result = stockInSchema.safeParse(mockStockInData.invalidSupplierId);

            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find(
                    (issue) => issue.path.includes('supplier_id')
                );
                expect(error).toBeDefined();
            }
        });

        it('should fail validation with zero qty', () => {
            const result = stockInSchema.safeParse(mockStockInData.zeroQty);

            expect(result.success).toBe(false);
        });

        it('should fail validation with negative qty', () => {
            const result = stockInSchema.safeParse(mockStockInData.negativeQty);

            expect(result.success).toBe(false);
        });

        it('should fail validation with negative unit_cost', () => {
            const result = stockInSchema.safeParse(mockStockInData.negativeUnitCost);

            expect(result.success).toBe(false);
        });

        it('should allow null notes', () => {
            const result = stockInSchema.safeParse({
                ...mockStockInData.valid,
                notes: null,
            });

            expect(result.success).toBe(true);
        });
    });

    describe('stockOutSchema', () => {
        it('should pass validation with valid stock out data (DAMAGED)', () => {
            const result = stockOutSchema.safeParse(mockStockOutData.valid);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('DAMAGED');
            }
        });

        it('should pass validation with EXPIRED reason', () => {
            const result = stockOutSchema.safeParse(mockStockOutData.validExpired);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('EXPIRED');
            }
        });

        it('should pass validation with OTHER reason', () => {
            const result = stockOutSchema.safeParse(mockStockOutData.validOther);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('OTHER');
            }
        });

        it('should fail validation with invalid reason', () => {
            const result = stockOutSchema.safeParse(mockStockOutData.invalidReason);

            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find(
                    (issue) => issue.path.includes('reason')
                );
                expect(error).toBeDefined();
            }
        });

        it('should fail validation with zero qty', () => {
            const result = stockOutSchema.safeParse(mockStockOutData.zeroQty);

            expect(result.success).toBe(false);
        });
    });

    describe('stockMovementIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = stockMovementIdParamSchema.safeParse({
                stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID', () => {
            const result = stockMovementIdParamSchema.safeParse({
                stock_movement_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('ingredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = ingredientIdParamSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should fail validation with invalid UUID', () => {
            const result = ingredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });

            expect(result.success).toBe(false);
        });
    });

    describe('stockMovementListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = stockMovementListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'beras',
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
            });

            expect(result.success).toBe(true);
        });

        it('should pass validation with empty query (all optional)', () => {
            const result = stockMovementListQuerySchema.safeParse({});

            expect(result.success).toBe(true);
        });

        it('should coerce string numbers', () => {
            const result = stockMovementListQuerySchema.safeParse({
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
            const result = stockMovementListQuerySchema.safeParse({
                size: 101,
            });

            expect(result.success).toBe(false);
        });

        it('should parse date strings', () => {
            const result = stockMovementListQuerySchema.safeParse({
                date_from: '2024-01-01',
                date_to: '2024-12-31',
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.date_from).toBeInstanceOf(Date);
                expect(result.data.date_to).toBeInstanceOf(Date);
            }
        });
    });
});
