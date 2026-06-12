import { dashboardKPIQuerySchema, dashboardSalesTrendQuerySchema, dashboardTopMenusQuerySchema, dashboardSchemas, SALES_TREND_PERIODS } from './dashboard.schema';
import { StockStatus } from './dashboard.types';

describe('Dashboard Schema Validation', () => {
    describe('dashboardKPIQuerySchema', () => {
        it('should pass validation with valid date', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: '2024-06-15' });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.date).toBe('2024-06-15');
            }
        });

        it('should pass validation with empty query (date is optional)', () => {
            const result = dashboardKPIQuerySchema.safeParse({});

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.date).toBeUndefined();
            }
        });

        it('should fail validation with invalid date format (DD-MM-YYYY)', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: '15-06-2024' });

            expect(result.success).toBe(false);
            if (!result.success) {
                const dateError = result.error.issues.find((i) => i.path.includes('date'));
                expect(dateError).toBeDefined();
                expect(dateError?.message).toContain('YYYY-MM-DD');
            }
        });

        it('should fail validation with date as plain string text', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: 'today' });

            expect(result.success).toBe(false);
        });

        it('should fail validation with partial date (YYYY-MM)', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: '2024-06' });

            expect(result.success).toBe(false);
        });

        it('should pass validation with first day of year', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: '2024-01-01' });

            expect(result.success).toBe(true);
        });

        it('should pass validation with last day of year', () => {
            const result = dashboardKPIQuerySchema.safeParse({ date: '2024-12-31' });

            expect(result.success).toBe(true);
        });

        it('should be exported in dashboardSchemas', () => {
            expect(dashboardSchemas.kpiQuery).toBe(dashboardKPIQuerySchema);
        });
    });

    describe('dashboardSalesTrendQuerySchema', () => {
        it('should pass validation with days=7', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 7 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.days).toBe(7);
            }
        });

        it('should pass validation with days=14', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 14 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.days).toBe(14);
            }
        });

        it('should pass validation with days=30', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 30 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.days).toBe(30);
            }
        });

        it('should coerce string "7" to number 7', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: '7' });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.days).toBe(7);
            }
        });

        it('should default to 7 when days is not provided', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({});

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.days).toBe(7);
            }
        });

        it('should fail validation with days=1 (not in allowed list)', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 1 });

            expect(result.success).toBe(false);
            if (!result.success) {
                const daysError = result.error.issues.find((i) => i.path.includes('days'));
                expect(daysError).toBeDefined();
                expect(daysError?.message).toContain('7, 14, atau 30');
            }
        });

        it('should fail validation with days=60 (not in allowed list)', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 60 });

            expect(result.success).toBe(false);
        });

        it('should fail validation with days=0', () => {
            const result = dashboardSalesTrendQuerySchema.safeParse({ days: 0 });

            expect(result.success).toBe(false);
        });

        it('should be exported in dashboardSchemas', () => {
            expect(dashboardSchemas.salesTrendQuery).toBe(dashboardSalesTrendQuerySchema);
        });
    });

    describe('dashboardTopMenusQuerySchema', () => {
        it('should pass validation with valid date', () => {
            const result = dashboardTopMenusQuerySchema.safeParse({ date: '2024-06-15' });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.date).toBe('2024-06-15');
            }
        });

        it('should pass validation with empty query (date is optional)', () => {
            const result = dashboardTopMenusQuerySchema.safeParse({});

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.date).toBeUndefined();
            }
        });

        it('should fail validation with invalid date format', () => {
            const result = dashboardTopMenusQuerySchema.safeParse({ date: '15/06/2024' });

            expect(result.success).toBe(false);
            if (!result.success) {
                const dateError = result.error.issues.find((i) => i.path.includes('date'));
                expect(dateError).toBeDefined();
                expect(dateError?.message).toContain('YYYY-MM-DD');
            }
        });

        it('should fail validation with plain text date', () => {
            const result = dashboardTopMenusQuerySchema.safeParse({ date: 'today' });

            expect(result.success).toBe(false);
        });

        it('should be exported in dashboardSchemas', () => {
            expect(dashboardSchemas.topMenusQuery).toBe(dashboardTopMenusQuerySchema);
        });
    });

    describe('SALES_TREND_PERIODS constant', () => {
        it('should contain exactly [7, 14, 30]', () => {
            expect(SALES_TREND_PERIODS).toEqual([7, 14, 30]);
        });
    });

    describe('StockStatus enum', () => {
        it('should have AMAN value', () => {
            expect(StockStatus.AMAN).toBe('AMAN');
        });

        it('should have MENIPIS value', () => {
            expect(StockStatus.MENIPIS).toBe('MENIPIS');
        });

        it('should have KRITIS value', () => {
            expect(StockStatus.KRITIS).toBe('KRITIS');
        });
    });
});
