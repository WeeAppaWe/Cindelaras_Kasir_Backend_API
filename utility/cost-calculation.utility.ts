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
export const calculateHPP = (recipes: RecipeCostItem[]): number => {
    if (!recipes || recipes.length === 0) {
        return 0;
    }

    return recipes.reduce((total, recipe) => {
        const cost = Number(recipe.avg_cost) * Number(recipe.qty_needed);
        return total + cost;
    }, 0);
};

/**
 * Calculate profit margin percentage
 * Margin = ((price - cost) / price) × 100
 */
export const calculateMarginPercent = (price: number, cost: number): number => {
    if (price <= 0) {
        return 0;
    }
    return ((price - cost) / price) * 100;
};

/**
 * Calculate profit per unit
 * Profit = price - cost
 */
export const calculateProfit = (price: number, cost: number): number => {
    return price - cost;
};

/**
 * Calculate selling price from cost and desired margin
 * Price = cost / (1 - margin/100)
 */
export const calculatePriceFromMargin = (cost: number, marginPercent: number): number => {
    if (marginPercent >= 100) {
        throw new Error('Margin tidak boleh >= 100%');
    }
    const price = cost / (1 - marginPercent / 100);
    return Math.round(price * 100) / 100;
};

/**
 * Round to 2 decimal places (for currency)
 */
export const roundCurrency = (value: number): number => {
    return Math.round(value * 100) / 100;
};

/**
 * Format number as Indonesian Rupiah
 */
export const formatRupiah = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const costCalculation = {
    calculateHPP,
    calculateMarginPercent,
    calculateProfit,
    calculatePriceFromMargin,
    roundCurrency,
    formatRupiah,
};

export default costCalculation;
