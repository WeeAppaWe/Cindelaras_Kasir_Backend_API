import {
    createOrderSchema,
    confirmPaymentSchema,
    orderIdParamSchema,
    orderListQuerySchema,
    PaymentType,
    OrderStatus
} from './order.schema';

describe('Order Schemas', () => {
    // ============================================
    // CREATE ORDER SCHEMA TESTS
    // ============================================
    describe('createOrderSchema', () => {
        it('should validate valid payload', () => {
            const result = createOrderSchema.safeParse({
                customer_name: 'Budi',
                customer_phone: '08123456789',
                payment_type: 'CASH',
                items: [
                    { menu_id: '550e8400-e29b-41d4-a716-446655440000', qty: 2, price: 15000 }
                ]
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid phone format', () => {
            const result = createOrderSchema.safeParse({
                customer_name: 'Test Customer',
                payment_type: 'CASH',
                items: [{ menu_id: '550e8400-e29b-41d4-a716-446655440000', qty: 1, price: 1000 }],
                customer_phone: 'abcde'
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const phoneIssue = result.error.issues.find(i => i.path.includes('customer_phone'));
                expect(phoneIssue?.message).toContain('Format nomor telepon');
            }
        });

        it('should reject invalid payment type', () => {
            const result = createOrderSchema.safeParse({
                payment_type: 'PAYLATER',
                items: [{ menu_id: '550e8400-e29b-41d4-a716-446655440000', qty: 1, price: 1000 }]
            });
            expect(result.success).toBe(false);
        });

        it('should reject empty items array', () => {
            const result = createOrderSchema.safeParse({
                payment_type: 'CASH',
                items: []
            });
            expect(result.success).toBe(false);
        });

        it('should validate item fields', () => {
            const result = createOrderSchema.safeParse({
                payment_type: 'CASH',
                items: [
                    { menu_id: 'invalid-id', qty: 0, price: -1 }
                ]
            });
            expect(result.success).toBe(false);
            // Should have multiple errors (uuid, min qty, min price)
            if (!result.success) {
                expect(result.error.issues.length).toBeGreaterThanOrEqual(1);
            }
        });
    });

    // ============================================
    // CONFIRM PAYMENT SCHEMA TESTS
    // ============================================
    describe('confirmPaymentSchema', () => {
        it('should validate valid payload', () => {
            const result = confirmPaymentSchema.safeParse({ paid_amount: 50000 });
            expect(result.success).toBe(true);
        });

        it('should validate empty payload (optional)', () => {
            const result = confirmPaymentSchema.safeParse({});
            expect(result.success).toBe(true);
        });

        it('should reject negative paid_amount', () => {
            const result = confirmPaymentSchema.safeParse({ paid_amount: -1 });
            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // LIST QUERY SCHEMA TESTS
    // ============================================
    describe('orderListQuerySchema', () => {
        it('should validate valid query params', () => {
            const result = orderListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                status: 'PENDING',
                payment_type: 'CASH',
                start_date: '2024-01-01',
                end_date: '2024-01-02'
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(1);
                expect(result.data.status).toBe('PENDING');
            }
        });

        it('should reject invalid date format', () => {
            const result = orderListQuerySchema.safeParse({ start_date: '01-01-2024' });
            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // PARAM SCHEMA TESTS
    // ============================================
    describe('orderIdParamSchema', () => {
        it('should validate valid UUID', () => {
            const result = orderIdParamSchema.safeParse({
                order_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid UUID', () => {
            const result = orderIdParamSchema.safeParse({ order_id: 'invalid-id' });
            expect(result.success).toBe(false);
        });
    });
});
