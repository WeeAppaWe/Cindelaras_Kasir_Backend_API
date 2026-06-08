import {
    createCashMovementSchema,
    cashMovementIdParamSchema,
    cashMovementListQuerySchema,
} from './cash-movement.schema';

describe('Cash Movement Schemas', () => {
    // ============================================
    // CREATE SCHEMA TESTS
    // ============================================
    describe('createCashMovementSchema', () => {
        it('should validate valid payload (IN)', () => {
            const result = createCashMovementSchema.safeParse({
                type: 'IN',
                amount: 50000,
                note: 'Modal tambahan',
            });
            expect(result.success).toBe(true);
        });

        it('should validate valid payload (OUT)', () => {
            const result = createCashMovementSchema.safeParse({
                type: 'OUT',
                amount: 10000,
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid type', () => {
            const result = createCashMovementSchema.safeParse({
                type: 'INVALID',
                amount: 50000,
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Tipe mutasi harus IN atau OUT');
            }
        });

        it('should reject negative amount', () => {
            const result = createCashMovementSchema.safeParse({
                type: 'IN',
                amount: -50000,
            });
            expect(result.success).toBe(false);
        });

        it('should reject zero amount', () => {
            const result = createCashMovementSchema.safeParse({
                type: 'IN',
                amount: 0,
            });
            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // PARAM SCHEMA TESTS
    // ============================================
    describe('cashMovementIdParamSchema', () => {
        it('should validate valid UUID', () => {
            const result = cashMovementIdParamSchema.safeParse({
                cash_movement_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid UUID', () => {
            const result = cashMovementIdParamSchema.safeParse({
                cash_movement_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // LIST QUERY SCHEMA TESTS
    // ============================================
    describe('cashMovementListQuerySchema', () => {
        it('should validate valid query params', () => {
            const result = cashMovementListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                type: 'IN',
                shift_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(1);
                expect(result.data.size).toBe(10);
                expect(result.data.type).toBe('IN');
            }
        });

        it('should validate empty query params', () => {
            const result = cashMovementListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should reject invalid shift_id UUID', () => {
            const result = cashMovementListQuerySchema.safeParse({
                shift_id: 'invalid',
            });
            expect(result.success).toBe(false);
        });
    });
});
