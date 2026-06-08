import {
    reportOperationalFilterSchema,
    menuPerformanceQuerySchema,
} from './report-operational.schema';

describe('Report Operational Schemas', () => {
    // ============================================
    // REPORT OPERATIONAL FILTER SCHEMA TESTS
    // ============================================
    describe('reportOperationalFilterSchema', () => {
        it('should validate valid date range', () => {
            const result = reportOperationalFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(true);
        });

        it('should validate with optional shift_id', () => {
            const result = reportOperationalFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                shift_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should validate with optional user_id', () => {
            const result = reportOperationalFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                user_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });

        it('should reject invalid date format', () => {
            const result = reportOperationalFilterSchema.safeParse({
                start_date: '01-01-2026',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(false);
        });

        it('should reject when start_date > end_date', () => {
            const result = reportOperationalFilterSchema.safeParse({
                start_date: '2026-01-31',
                end_date: '2026-01-01',
            });
            expect(result.success).toBe(false);
        });

        it('should reject missing required fields', () => {
            const result = reportOperationalFilterSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });

    // ============================================
    // MENU PERFORMANCE QUERY SCHEMA TESTS
    // ============================================
    describe('menuPerformanceQuerySchema', () => {
        it('should validate with limit parameter', () => {
            const result = menuPerformanceQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '20',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.limit).toBe(20);
            }
        });

        it('should reject limit exceeding max (100)', () => {
            const result = menuPerformanceQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                limit: '150',
            });
            expect(result.success).toBe(false);
        });
    });
});
