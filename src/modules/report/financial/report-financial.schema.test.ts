import {
    reportFilterSchema,
    topMenusQuerySchema,
} from './report-financial.schema';

describe('Report Financial Schemas', () => {
    // ============================================
    // REPORT FILTER SCHEMA TESTS
    // ============================================
    describe('reportFilterSchema', () => {
        it('should validate valid date range', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(true);
        });

        it('should validate with optional shift_id', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                shift_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should validate with optional user_id', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                user_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid date format', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '01-01-2026',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('YYYY-MM-DD');
            }
        });

        it('should reject when start_date > end_date', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-31',
                end_date: '2026-01-01',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('start_date harus sebelum');
            }
        });

        it('should reject missing required fields', () => {
            const result = reportFilterSchema.safeParse({});
            expect(result.success).toBe(false);
        });

        it('should reject invalid shift_id UUID', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                shift_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('shift_id tidak valid');
            }
        });

        it('should reject invalid user_id UUID', () => {
            const result = reportFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                user_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('user_id tidak valid');
            }
        });
    });

    // ============================================
    // TOP MENUS QUERY SCHEMA TESTS
    // ============================================
    describe('topMenusQuerySchema', () => {
        it('should validate with limit parameter', () => {
            const result = topMenusQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '10',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.limit).toBe(10);
            }
        });

        it('should coerce string limit to number', () => {
            const result = topMenusQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '25',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.limit).toBe(25);
            }
        });

        it('should reject limit exceeding max (50)', () => {
            const result = topMenusQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '100',
            });
            expect(result.success).toBe(false);
        });

        it('should reject limit below min (1)', () => {
            const result = topMenusQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '0',
            });
            expect(result.success).toBe(false);
        });
    });
});
