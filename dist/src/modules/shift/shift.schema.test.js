"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shift_schema_1 = require("./shift.schema");
describe('Shift Schemas', () => {
    // ============================================
    // START SHIFT SCHEMA TESTS
    // ============================================
    describe('startShiftSchema', () => {
        it('should validate valid payload', () => {
            const result = shift_schema_1.startShiftSchema.safeParse({ start_cash: 50000 });
            expect(result.success).toBe(true);
        });
        it('should reject negative start_cash', () => {
            const result = shift_schema_1.startShiftSchema.safeParse({ start_cash: -1 });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Modal awal tidak boleh negatif');
            }
        });
        it('should reject start_cash > 100 million', () => {
            const result = shift_schema_1.startShiftSchema.safeParse({ start_cash: 100000001 });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Modal awal maksimal 100 juta');
            }
        });
        it('should reject invalid type (string instead of number)', () => {
            const result = shift_schema_1.startShiftSchema.safeParse({ start_cash: '50000' });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // END SHIFT SCHEMA TESTS
    // ============================================
    describe('endShiftSchema', () => {
        it('should validate valid payload', () => {
            const result = shift_schema_1.endShiftSchema.safeParse({
                end_cash: 150000,
                notes: 'Shift selesai',
            });
            expect(result.success).toBe(true);
        });
        it('should validate payload without optional notes', () => {
            const result = shift_schema_1.endShiftSchema.safeParse({ end_cash: 150000 });
            expect(result.success).toBe(true);
        });
        it('should reject negative end_cash', () => {
            const result = shift_schema_1.endShiftSchema.safeParse({ end_cash: -1 });
            expect(result.success).toBe(false);
        });
        it('should reject notes too long', () => {
            const result = shift_schema_1.endShiftSchema.safeParse({
                end_cash: 150000,
                notes: 'a'.repeat(501),
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // PARAM SCHEMA TESTS
    // ============================================
    describe('shiftIdParamSchema', () => {
        it('should validate valid UUID', () => {
            const result = shift_schema_1.shiftIdParamSchema.safeParse({
                shift_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should reject invalid UUID', () => {
            const result = shift_schema_1.shiftIdParamSchema.safeParse({ shift_id: 'invalid-id' });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // LIST QUERY SCHEMA TESTS
    // ============================================
    describe('shiftListQuerySchema', () => {
        it('should validate valid query params', () => {
            const result = shift_schema_1.shiftListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                is_active: 'true',
                start_date: '2024-01-01',
                end_date: '2024-01-02',
                user_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(1);
                expect(result.data.size).toBe(10);
                expect(result.data.is_active).toBe(true);
            }
        });
        it('should validate empty query params (optional)', () => {
            const result = shift_schema_1.shiftListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should transform numeric strings', () => {
            const result = shift_schema_1.shiftListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });
        it('should reject invalid date format', () => {
            const result = shift_schema_1.shiftListQuerySchema.safeParse({ start_date: '01-01-2024' });
            expect(result.success).toBe(false);
        });
        it('should reject invalid user_id UUID', () => {
            const result = shift_schema_1.shiftListQuerySchema.safeParse({ user_id: 'invalid' });
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=shift.schema.test.js.map