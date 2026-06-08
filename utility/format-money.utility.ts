import { CURRENCIES } from '../types/currency.types';
import type { CurrencyConfig, CurrencyCode } from '../types/currency.types';

/**
 * Default currency - can be configured via environment variable
 */
const DEFAULT_CURRENCY: CurrencyCode = (process.env.DEFAULT_CURRENCY as CurrencyCode) || 'IDR';

/**
 * Get currency config by code
 */
const getCurrencyConfig = (currency?: CurrencyCode): CurrencyConfig => {
    return CURRENCIES[currency || DEFAULT_CURRENCY];
};

// ============================================
// FORMATTING FUNCTIONS
// ============================================

/**
 * Format a number to currency format with symbol
 * @param amount - The number to format
 * @param currency - Currency code (default: IDR)
 * @returns Formatted string like "Rp 1.234.567" or "$1,234.56"
 * 
 * @example
 * formatMoney(50000)           // → "Rp 50.000"
 * formatMoney(50000, 'USD')    // → "$50,000.00"
 * formatMoney(50000, 'EUR')    // → "50.000,00 €"
 */
export const formatMoney = (amount: number, currency?: CurrencyCode): string => {
    const config = getCurrencyConfig(currency);

    // Use Intl.NumberFormat for proper locale-aware formatting
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: config.currency === 'IDR' || config.currency === 'JPY' ? 0 : 2,
        maximumFractionDigits: config.currency === 'IDR' || config.currency === 'JPY' ? 0 : 2,
    }).format(amount);
};

/**
 * Format a number with thousand separators (no currency symbol)
 * @param amount - The number to format
 * @param currency - Currency code for locale (default: IDR)
 * @returns Formatted string like "1.234.567" or "1,234.56"
 * 
 * @example
 * formatNumber(50000)           // → "50.000"
 * formatNumber(50000, 'USD')    // → "50,000"
 */
export const formatNumber = (amount: number, currency?: CurrencyCode): string => {
    const config = getCurrencyConfig(currency);
    return amount.toLocaleString(config.locale);
};

/**
 * Format a number to compact notation (short format)
 * @param amount - The number to format
 * @param currency - Currency code (default: IDR)
 * @returns Formatted string like "Rp 1,5 jt" or "$1.5M"
 * 
 * @example
 * formatMoneyCompact(1500000)          // → "Rp 1,5 jt"
 * formatMoneyCompact(1500000, 'USD')   // → "$1.5M"
 */
export const formatMoneyCompact = (amount: number, currency?: CurrencyCode): string => {
    const config = getCurrencyConfig(currency);

    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        notation: 'compact',
        compactDisplay: 'short',
    }).format(amount);
};

/**
 * Format a number with custom symbol (simple format)
 * @param amount - The number to format
 * @param symbol - Custom symbol to use (default: "Rp")
 * @returns Formatted string like "Rp 50.000"
 * 
 * @example
 * formatWithSymbol(50000)              // → "Rp 50.000"
 * formatWithSymbol(50000, '$')         // → "$ 50.000"
 */
export const formatWithSymbol = (amount: number, symbol: string = 'Rp'): string => {
    return `${symbol} ${amount.toLocaleString('id-ID')}`;
};

// ============================================
// PARSING FUNCTIONS
// ============================================

/**
 * Parse formatted currency string back to number
 * @param value - The formatted string like "Rp 50.000" or "$50,000.00"
 * @returns The parsed number
 * 
 * @example
 * parseFormattedNumber("Rp 50.000")    // → 50000
 * parseFormattedNumber("$50,000.00")   // → 50000
 */
export const parseFormattedNumber = (value: string): number => {
    // Remove all non-numeric characters except dot, comma, and minus
    let cleaned = value.replace(/[^0-9.,-]/g, '');

    // Check what separators are present
    const hasComma = cleaned.includes(',');
    const hasDot = cleaned.includes('.');

    // Scenario 1: Mixed separators (e.g., 1.234,56 or 1,234.56)
    if (hasComma && hasDot) {
        const lastComma = cleaned.lastIndexOf(',');
        const lastDot = cleaned.lastIndexOf('.');

        if (lastComma > lastDot) {
            // IDR/EU format (1.234,56) - Comma is decimal
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        } else {
            // US format (1,234.56) - Dot is decimal
            cleaned = cleaned.replace(/,/g, '');
        }
    }
    // Scenario 2: Only Dot (e.g., 50.000 or 50.00)
    else if (hasDot) {
        // If strict 3-digit grouping found 1.234.567 -> it's thousands
        // Indonesian simple logic: if it looks like thousands (more than 1 dot OR follows 3 digit pattern), remove dots.
        // Ambiguity: 50.000 (50k) vs 10.50 (10 point 5)

        // Count number of dots
        const dotCount = (cleaned.match(/\./g) || []).length;

        if (dotCount > 1) {
            // Multiple dots -> definitely thousands
            cleaned = cleaned.replace(/\./g, '');
        } else {
            // Single dot. Check decimal digits.
            // 50.000 -> 3 digits after dot -> likely thousands in IDR context
            // 12.50 -> 2 digits after dot -> likely decimal
            const parts = cleaned.split('.');
            if (parts[1] && parts[1].length === 3) {
                // Assume thousands for IDR context consistency
                cleaned = cleaned.replace(/\./g, '');
            }
            // else 50.00 or 50.5 -> treat as decimal (standard flow)
        }
    }
    // Scenario 3: Only Comma (e.g. 50,000 or 50,00)
    else if (hasComma) {
        // Count number of commas
        const commaCount = (cleaned.match(/,/g) || []).length;

        if (commaCount > 1) {
            // Multiple commas -> definitely thousands (US: 1,000,000)
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // Single comma. Check decimal digits.
            // 50,000 -> 3 digits after comma -> likely thousands in US context
            // 50,00 -> 2 digits after comma -> likely decimal
            const parts = cleaned.split(',');
            if (parts[1] && parts[1].length === 3) {
                // Assume thousands
                cleaned = cleaned.replace(/,/g, '');
            } else {
                // Assume decimal (European)
                cleaned = cleaned.replace(',', '.');
            }
        }
    }

    return parseFloat(cleaned) || 0;
};

// ============================================
// RE-EXPORT TYPES AND CONSTANTS
// ============================================

export { CURRENCIES };
export type { CurrencyCode, CurrencyConfig };

export default {
    formatMoney,
    formatNumber,
    formatMoneyCompact,
    formatWithSymbol,
    parseFormattedNumber,
    CURRENCIES,
};
