"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wma_calculation_utility_1 = require("./wma-calculation.utility");
describe('WMA Calculation Utility', () => {
    // ============================================
    // calculateWMA TESTS
    // ============================================
    describe('calculateWMA', () => {
        it('should return 0 for empty array', () => {
            const result = (0, wma_calculation_utility_1.calculateWMA)([]);
            expect(result).toBe(0);
        });
        it('should return the value for single element', () => {
            const result = (0, wma_calculation_utility_1.calculateWMA)([5]);
            expect(result).toBe(5);
        });
        it('should calculate linear weighted average correctly', () => {
            // [2, 3, 4, 5, 6] with weights [1, 2, 3, 4, 5]
            // (2*1 + 3*2 + 4*3 + 5*4 + 6*5) / (1+2+3+4+5) = 70/15 = 4.6667
            const result = (0, wma_calculation_utility_1.calculateWMA)([2, 3, 4, 5, 6]);
            expect(result).toBeCloseTo(70 / 15, 4);
        });
        it('should give higher weight to later elements', () => {
            // [10, 20] with weights [1, 2]
            // (10*1 + 20*2) / (1+2) = 50/3 = 16.67
            const result = (0, wma_calculation_utility_1.calculateWMA)([10, 20]);
            expect(result).toBeCloseTo(50 / 3, 4);
            expect(result).toBeGreaterThan(15); // Would be 15 with equal weights
        });
        it('should calculate equal weights when useLinearWeight is false', () => {
            // [10, 20] with equal weights
            // (10*1 + 20*1) / (1+1) = 30/2 = 15
            const result = (0, wma_calculation_utility_1.calculateWMA)([10, 20], { useLinearWeight: false });
            expect(result).toBe(15);
        });
        it('should handle array with zeros', () => {
            // [0, 0, 10] with weights [1, 2, 3]
            // (0*1 + 0*2 + 10*3) / (1+2+3) = 30/6 = 5
            const result = (0, wma_calculation_utility_1.calculateWMA)([0, 0, 10]);
            expect(result).toBe(5);
        });
        it('should handle all zeros', () => {
            const result = (0, wma_calculation_utility_1.calculateWMA)([0, 0, 0]);
            expect(result).toBe(0);
        });
        it('should handle decimal values', () => {
            // [1.5, 2.5] with weights [1, 2]
            // (1.5*1 + 2.5*2) / (1+2) = 6.5/3 = 2.1667
            const result = (0, wma_calculation_utility_1.calculateWMA)([1.5, 2.5]);
            expect(result).toBeCloseTo(6.5 / 3, 4);
        });
    });
    // ============================================
    // calculateWMAFromDataPoints TESTS
    // ============================================
    describe('calculateWMAFromDataPoints', () => {
        it('should return zero result for empty array', () => {
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([]);
            expect(result.average).toBe(0);
            expect(result.total_weight).toBe(0);
            expect(result.data_points).toBe(0);
        });
        it('should return correct result for single data point', () => {
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([
                { date: '2026-01-01', value: 10 },
            ]);
            expect(result.average).toBe(10);
            expect(result.total_weight).toBe(1);
            expect(result.data_points).toBe(1);
        });
        it('should sort by date automatically', () => {
            // Input in wrong order, should be sorted before calculation
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([
                { date: '2026-01-03', value: 30 }, // Should be last (weight 3)
                { date: '2026-01-01', value: 10 }, // Should be first (weight 1)
                { date: '2026-01-02', value: 20 }, // Should be middle (weight 2)
            ]);
            // Sorted: [10, 20, 30] with weights [1, 2, 3]
            // (10*1 + 20*2 + 30*3) / (1+2+3) = 140/6 = 23.33
            expect(result.average).toBeCloseTo(140 / 6, 4);
        });
        it('should calculate WMA with linear weights', () => {
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([
                { date: '2026-01-01', value: 2 },
                { date: '2026-01-02', value: 4 },
                { date: '2026-01-03', value: 6 },
            ]);
            // [2, 4, 6] with weights [1, 2, 3]
            // (2*1 + 4*2 + 6*3) / (1+2+3) = 28/6 = 4.67
            expect(result.average).toBeCloseTo(28 / 6, 4);
            expect(result.total_weight).toBe(6);
            expect(result.data_points).toBe(3);
        });
        it('should calculate equal weights when useLinearWeight is false', () => {
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([
                { date: '2026-01-01', value: 10 },
                { date: '2026-01-02', value: 20 },
                { date: '2026-01-03', value: 30 },
            ], { useLinearWeight: false });
            // Simple average: (10 + 20 + 30) / 3 = 20
            expect(result.average).toBe(20);
            expect(result.total_weight).toBe(3);
        });
        it('should handle same dates', () => {
            const result = (0, wma_calculation_utility_1.calculateWMAFromDataPoints)([
                { date: '2026-01-01', value: 10 },
                { date: '2026-01-01', value: 20 },
            ]);
            // Order preserved for same dates, both get different weights
            expect(result.data_points).toBe(2);
            expect(result.total_weight).toBe(3);
        });
        it('should not modify original array', () => {
            const original = [
                { date: '2026-01-02', value: 20 },
                { date: '2026-01-01', value: 10 },
            ];
            const originalCopy = JSON.stringify(original);
            (0, wma_calculation_utility_1.calculateWMAFromDataPoints)(original);
            expect(JSON.stringify(original)).toBe(originalCopy);
        });
    });
});
//# sourceMappingURL=wma-calculation.utility.test.js.map