"use strict";
/**
 * Cost Calculation Utility
 * Pure mathematical functions for cost/HPP calculations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.costCalculation = exports.formatRupiah = exports.roundCurrency = exports.calculatePriceFromMargin = exports.calculateProfit = exports.calculateMarginPercent = exports.calculateHPP = void 0;
/**
 * Calculate HPP (Harga Pokok Penjualan) from recipe items
 * HPP = Σ (ingredient.avg_cost × qty_needed)
 */
const calculateHPP = (recipes) => {
    if (!recipes || recipes.length === 0) {
        return 0;
    }
    return recipes.reduce((total, recipe) => {
        const cost = Number(recipe.avg_cost) * Number(recipe.qty_needed);
        return total + cost;
    }, 0);
};
exports.calculateHPP = calculateHPP;
/**
 * Calculate profit margin percentage
 * Margin = ((price - cost) / price) × 100
 */
const calculateMarginPercent = (price, cost) => {
    if (price <= 0) {
        return 0;
    }
    return ((price - cost) / price) * 100;
};
exports.calculateMarginPercent = calculateMarginPercent;
/**
 * Calculate profit per unit
 * Profit = price - cost
 */
const calculateProfit = (price, cost) => {
    return price - cost;
};
exports.calculateProfit = calculateProfit;
/**
 * Calculate selling price from cost and desired margin
 * Price = cost / (1 - margin/100)
 */
const calculatePriceFromMargin = (cost, marginPercent) => {
    if (marginPercent >= 100) {
        throw new Error('Margin tidak boleh >= 100%');
    }
    return cost / (1 - marginPercent / 100);
};
exports.calculatePriceFromMargin = calculatePriceFromMargin;
/**
 * Round to 2 decimal places (for currency)
 */
const roundCurrency = (value) => {
    return Math.round(value * 100) / 100;
};
exports.roundCurrency = roundCurrency;
/**
 * Format number as Indonesian Rupiah
 */
const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};
exports.formatRupiah = formatRupiah;
exports.costCalculation = {
    calculateHPP: exports.calculateHPP,
    calculateMarginPercent: exports.calculateMarginPercent,
    calculateProfit: exports.calculateProfit,
    calculatePriceFromMargin: exports.calculatePriceFromMargin,
    roundCurrency: exports.roundCurrency,
    formatRupiah: exports.formatRupiah,
};
exports.default = exports.costCalculation;
//# sourceMappingURL=cost-calculation.utility.js.map