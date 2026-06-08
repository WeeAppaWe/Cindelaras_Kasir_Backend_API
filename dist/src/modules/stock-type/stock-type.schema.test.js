"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stock_type_schema_1 = require("./stock-type.schema");
describe('Stock Type Schema', () => {
    // ============================================
    // CONSTANTS TESTS
    // ============================================
    describe('StockTypeName Constants', () => {
        it('should have correct constant values', () => {
            expect(stock_type_schema_1.StockTypeName.IN_PURCHASE).toBe('IN_PURCHASE');
            expect(stock_type_schema_1.StockTypeName.IN_PRODUCTION).toBe('IN_PRODUCTION');
            expect(stock_type_schema_1.StockTypeName.OUT_SALES).toBe('OUT_SALES');
            expect(stock_type_schema_1.StockTypeName.OUT_PRODUCTION).toBe('OUT_PRODUCTION');
            expect(stock_type_schema_1.StockTypeName.OUT_DAMAGED).toBe('OUT_DAMAGED');
            expect(stock_type_schema_1.StockTypeName.OUT_EXPIRED).toBe('OUT_EXPIRED');
            expect(stock_type_schema_1.StockTypeName.ADJUSTMENT_OPNAME).toBe('ADJUSTMENT_OPNAME');
        });
    });
    // ============================================
    // PARAM SCHEMA TESTS
    // ============================================
    describe('stockTypeIdParamSchema', () => {
        it('should validate valid UUID', () => {
            const validData = {
                stock_type_id: '550e8400-e29b-41d4-a716-446655440000',
            };
            const result = stock_type_schema_1.stockTypeIdParamSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });
        it('should reject invalid UUID', () => {
            const invalidData = {
                stock_type_id: 'invalid-uuid',
            };
            const result = stock_type_schema_1.stockTypeIdParamSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Format stock_type_id tidak valid');
            }
        });
        it('should reject empty string', () => {
            const invalidData = {
                stock_type_id: '',
            };
            const result = stock_type_schema_1.stockTypeIdParamSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
        it('should reject missing field', () => {
            const invalidData = {};
            const result = stock_type_schema_1.stockTypeIdParamSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=stock-type.schema.test.js.map