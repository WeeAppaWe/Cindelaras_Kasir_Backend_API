"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_schema_1 = require("./inventory.schema");
const inventory_mock_1 = require("../../tests/mocks/inventory.mock");
describe('Inventory Schema Validation', () => {
    describe('stockInSchema', () => {
        it('should pass validation with valid stock in data', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.qty).toBe(50);
                expect(result.data.unit_cost).toBe(11000);
            }
        });
        it('should fail validation with invalid ingredient_id', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.invalidIngredientId);
            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find((issue) => issue.path.includes('ingredient_id'));
                expect(error).toBeDefined();
            }
        });
        it('should fail validation with invalid supplier_id', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.invalidSupplierId);
            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find((issue) => issue.path.includes('supplier_id'));
                expect(error).toBeDefined();
            }
        });
        it('should fail validation with zero qty', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.zeroQty);
            expect(result.success).toBe(false);
        });
        it('should fail validation with negative qty', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.negativeQty);
            expect(result.success).toBe(false);
        });
        it('should fail validation with negative unit_cost', () => {
            const result = inventory_schema_1.stockInSchema.safeParse(inventory_mock_1.mockStockInData.negativeUnitCost);
            expect(result.success).toBe(false);
        });
        it('should allow null notes', () => {
            const result = inventory_schema_1.stockInSchema.safeParse({
                ...inventory_mock_1.mockStockInData.valid,
                notes: null,
            });
            expect(result.success).toBe(true);
        });
    });
    describe('stockOutSchema', () => {
        it('should pass validation with valid stock out data (DAMAGED)', () => {
            const result = inventory_schema_1.stockOutSchema.safeParse(inventory_mock_1.mockStockOutData.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('DAMAGED');
            }
        });
        it('should pass validation with EXPIRED reason', () => {
            const result = inventory_schema_1.stockOutSchema.safeParse(inventory_mock_1.mockStockOutData.validExpired);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('EXPIRED');
            }
        });
        it('should pass validation with OTHER reason', () => {
            const result = inventory_schema_1.stockOutSchema.safeParse(inventory_mock_1.mockStockOutData.validOther);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.reason).toBe('OTHER');
            }
        });
        it('should fail validation with invalid reason', () => {
            const result = inventory_schema_1.stockOutSchema.safeParse(inventory_mock_1.mockStockOutData.invalidReason);
            expect(result.success).toBe(false);
            if (!result.success) {
                const error = result.error.issues.find((issue) => issue.path.includes('reason'));
                expect(error).toBeDefined();
            }
        });
        it('should fail validation with zero qty', () => {
            const result = inventory_schema_1.stockOutSchema.safeParse(inventory_mock_1.mockStockOutData.zeroQty);
            expect(result.success).toBe(false);
        });
    });
    describe('stockMovementIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = inventory_schema_1.stockMovementIdParamSchema.safeParse({
                stock_movement_id: 'ee0e8400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid UUID', () => {
            const result = inventory_schema_1.stockMovementIdParamSchema.safeParse({
                stock_movement_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
    });
    describe('ingredientIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = inventory_schema_1.ingredientIdParamSchema.safeParse({
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid UUID', () => {
            const result = inventory_schema_1.ingredientIdParamSchema.safeParse({
                ingredient_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
    });
    describe('stockMovementListQuerySchema', () => {
        it('should pass validation with valid query params', () => {
            const result = inventory_schema_1.stockMovementListQuerySchema.safeParse({
                batch: 1,
                size: 10,
                search: 'beras',
                ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should pass validation with empty query (all optional)', () => {
            const result = inventory_schema_1.stockMovementListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should coerce string numbers', () => {
            const result = inventory_schema_1.stockMovementListQuerySchema.safeParse({
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
            const result = inventory_schema_1.stockMovementListQuerySchema.safeParse({
                size: 101,
            });
            expect(result.success).toBe(false);
        });
        it('should parse date strings', () => {
            const result = inventory_schema_1.stockMovementListQuerySchema.safeParse({
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
//# sourceMappingURL=inventory.schema.test.js.map