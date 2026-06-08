import {
    calculateHPP,
    calculateMarginPercent,
    calculateProfit,
    calculatePriceFromMargin,
    roundCurrency,
    formatRupiah,
    RecipeCostItem,
} from './cost-calculation.utility';

describe('Cost Calculation Utility', () => {
    // ============================================
    // CALCULATE HPP TESTS
    // ============================================

    describe('calculateHPP', () => {
        it('should calculate HPP correctly from recipe items', () => {
            const recipes: RecipeCostItem[] = [
                { ingredient_id: '1', qty_needed: 100, avg_cost: 15 },
                { ingredient_id: '2', qty_needed: 2, avg_cost: 2000 },
            ];

            const result = calculateHPP(recipes);

            // 100 * 15 + 2 * 2000 = 1500 + 4000 = 5500
            expect(result).toBe(5500);
        });

        it('should return 0 for empty recipes', () => {
            const result = calculateHPP([]);
            expect(result).toBe(0);
        });

        it('should return 0 for null/undefined recipes', () => {
            expect(calculateHPP(null as unknown as RecipeCostItem[])).toBe(0);
            expect(calculateHPP(undefined as unknown as RecipeCostItem[])).toBe(0);
        });

        it('should handle single recipe item', () => {
            const recipes: RecipeCostItem[] = [
                { ingredient_id: '1', qty_needed: 50, avg_cost: 100 },
            ];

            const result = calculateHPP(recipes);
            expect(result).toBe(5000);
        });

        it('should handle decimal values', () => {
            const recipes: RecipeCostItem[] = [
                { ingredient_id: '1', qty_needed: 0.5, avg_cost: 10000 },
            ];

            const result = calculateHPP(recipes);
            expect(result).toBe(5000);
        });
    });

    // ============================================
    // CALCULATE MARGIN PERCENT TESTS
    // ============================================

    describe('calculateMarginPercent', () => {
        it('should calculate margin correctly', () => {
            const result = calculateMarginPercent(10000, 3000);
            // (10000 - 3000) / 10000 * 100 = 70%
            expect(result).toBe(70);
        });

        it('should return 0 for zero price', () => {
            const result = calculateMarginPercent(0, 3000);
            expect(result).toBe(0);
        });

        it('should return 0 for negative price', () => {
            const result = calculateMarginPercent(-100, 50);
            expect(result).toBe(0);
        });

        it('should handle 100% margin (cost = 0)', () => {
            const result = calculateMarginPercent(10000, 0);
            expect(result).toBe(100);
        });

        it('should handle negative margin (cost > price)', () => {
            const result = calculateMarginPercent(10000, 15000);
            expect(result).toBe(-50); // (10000 - 15000) / 10000 * 100 = -50%
        });
    });

    // ============================================
    // CALCULATE PROFIT TESTS
    // ============================================

    describe('calculateProfit', () => {
        it('should calculate profit correctly', () => {
            const result = calculateProfit(10000, 3000);
            expect(result).toBe(7000);
        });

        it('should handle negative profit', () => {
            const result = calculateProfit(5000, 8000);
            expect(result).toBe(-3000);
        });

        it('should handle zero cost', () => {
            const result = calculateProfit(10000, 0);
            expect(result).toBe(10000);
        });

        it('should handle zero price', () => {
            const result = calculateProfit(0, 5000);
            expect(result).toBe(-5000);
        });
    });

    // ============================================
    // CALCULATE PRICE FROM MARGIN TESTS
    // ============================================

    describe('calculatePriceFromMargin', () => {
        it('should calculate price from cost and margin', () => {
            // If cost is 3000 and margin is 70%, price = 3000 / (1 - 0.7) = 10000
            const result = calculatePriceFromMargin(3000, 70);
            expect(result).toBe(10000);
        });

        it('should throw error for margin >= 100%', () => {
            expect(() => calculatePriceFromMargin(3000, 100)).toThrow('Margin tidak boleh >= 100%');
            expect(() => calculatePriceFromMargin(3000, 150)).toThrow('Margin tidak boleh >= 100%');
        });

        it('should handle 0% margin', () => {
            const result = calculatePriceFromMargin(5000, 0);
            expect(result).toBe(5000);
        });

        it('should handle 50% margin', () => {
            // price = 5000 / (1 - 0.5) = 10000
            const result = calculatePriceFromMargin(5000, 50);
            expect(result).toBe(10000);
        });
    });

    // ============================================
    // ROUND CURRENCY TESTS
    // ============================================

    describe('roundCurrency', () => {
        it('should round to 2 decimal places', () => {
            expect(roundCurrency(10.456)).toBe(10.46);
            expect(roundCurrency(10.454)).toBe(10.45);
            expect(roundCurrency(10.455)).toBe(10.46); // rounds up
        });

        it('should handle whole numbers', () => {
            expect(roundCurrency(100)).toBe(100);
        });

        it('should handle negative numbers', () => {
            expect(roundCurrency(-10.456)).toBe(-10.46);
        });
    });

    // ============================================
    // FORMAT RUPIAH TESTS
    // ============================================

    describe('formatRupiah', () => {
        it('should format number as Indonesian Rupiah', () => {
            const result = formatRupiah(10000);
            expect(result).toContain('10');
            expect(result).toContain('000');
            // Note: format may vary by locale, just check it contains expected parts
        });

        it('should handle zero', () => {
            const result = formatRupiah(0);
            expect(result).toContain('0');
        });

        it('should handle large numbers', () => {
            const result = formatRupiah(1000000);
            expect(result).toContain('1');
        });
    });
});
