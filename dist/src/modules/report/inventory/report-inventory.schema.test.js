"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_inventory_schema_1 = require("./report-inventory.schema");
describe('Report Inventory Schemas', () => {
    // ============================================
    // REPORT INVENTORY FILTER SCHEMA TESTS
    // ============================================
    describe('reportInventoryFilterSchema', () => {
        it('should validate valid date range', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(true);
        });
        it('should validate with optional ingredient_id', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should validate with optional supplier_id', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                supplier_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
        });
        it('should validate with optional ingredient_type (raw)', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                ingredient_type: 'raw',
            });
            expect(result.success).toBe(true);
        });
        it('should validate with optional ingredient_type (semi)', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                ingredient_type: 'semi',
            });
            expect(result.success).toBe(true);
        });
        it('should reject invalid ingredient_type', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
                ingredient_type: 'other',
            });
            expect(result.success).toBe(false);
        });
        it('should reject invalid date format', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '01-01-2026',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(false);
        });
        it('should reject when start_date > end_date', () => {
            const result = report_inventory_schema_1.reportInventoryFilterSchema.safeParse({
                start_date: '2026-01-31',
                end_date: '2026-01-01',
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // CURRENT STOCK QUERY SCHEMA TESTS
    // ============================================
    describe('currentStockQuerySchema', () => {
        it('should validate empty query (all defaults)', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({});
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.status).toBe('all');
            }
        });
        it('should validate with ingredient_type filter', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({
                ingredient_type: 'raw',
            });
            expect(result.success).toBe(true);
        });
        it('should validate status filter (low)', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({
                status: 'low',
            });
            expect(result.success).toBe(true);
        });
        it('should validate status filter (out)', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({
                status: 'out',
            });
            expect(result.success).toBe(true);
        });
        it('should validate with limit', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({
                limit: '50',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.limit).toBe(50);
            }
        });
        it('should reject limit exceeding max (500)', () => {
            const result = report_inventory_schema_1.currentStockQuerySchema.safeParse({
                limit: '600',
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // INGREDIENT CARD QUERY SCHEMA TESTS
    // ============================================
    describe('ingredientCardQuerySchema', () => {
        it('should validate valid query', () => {
            const result = report_inventory_schema_1.ingredientCardQuerySchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(true);
        });
        it('should reject missing ingredient_id', () => {
            const result = report_inventory_schema_1.ingredientCardQuerySchema.safeParse({
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(false);
        });
        it('should reject invalid ingredient_id UUID', () => {
            const result = report_inventory_schema_1.ingredientCardQuerySchema.safeParse({
                ingredient_id: 'invalid-uuid',
                start_date: '2026-01-01',
                end_date: '2026-01-31',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('ingredient_id tidak valid');
            }
        });
        it('should reject when start_date > end_date', () => {
            const result = report_inventory_schema_1.ingredientCardQuerySchema.safeParse({
                ingredient_id: '550e8400-e29b-41d4-a716-446655440000',
                start_date: '2026-01-31',
                end_date: '2026-01-01',
            });
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=report-inventory.schema.test.js.map