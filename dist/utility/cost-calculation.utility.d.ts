/**
 * Cost Calculation Utility
 * Pure mathematical functions for cost/HPP calculations
 */
export interface RecipeCostItem {
    ingredient_id: string;
    qty_needed: number;
    avg_cost: number;
}
/**
 * Calculate HPP (Harga Pokok Penjualan) from recipe items
 * HPP = Σ (ingredient.avg_cost × qty_needed)
 */
export declare const calculateHPP: (recipes: RecipeCostItem[]) => number;
/**
 * Calculate profit margin percentage
 * Margin = ((price - cost) / price) × 100
 */
export declare const calculateMarginPercent: (price: number, cost: number) => number;
/**
 * Calculate profit per unit
 * Profit = price - cost
 */
export declare const calculateProfit: (price: number, cost: number) => number;
/**
 * Calculate selling price from cost and desired margin
 * Price = cost / (1 - margin/100)
 */
export declare const calculatePriceFromMargin: (cost: number, marginPercent: number) => number;
/**
 * Round to 2 decimal places (for currency)
 */
export declare const roundCurrency: (value: number) => number;
/**
 * Format number as Indonesian Rupiah
 */
export declare const formatRupiah: (value: number) => string;
export declare const costCalculation: {
    calculateHPP: (recipes: RecipeCostItem[]) => number;
    calculateMarginPercent: (price: number, cost: number) => number;
    calculateProfit: (price: number, cost: number) => number;
    calculatePriceFromMargin: (cost: number, marginPercent: number) => number;
    roundCurrency: (value: number) => number;
    formatRupiah: (value: number) => string;
};
export default costCalculation;
//# sourceMappingURL=cost-calculation.utility.d.ts.map