import { CURRENCIES } from '../types/currency.types';
import type { CurrencyConfig, CurrencyCode } from '../types/currency.types';
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
export declare const formatMoney: (amount: number, currency?: CurrencyCode) => string;
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
export declare const formatNumber: (amount: number, currency?: CurrencyCode) => string;
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
export declare const formatMoneyCompact: (amount: number, currency?: CurrencyCode) => string;
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
export declare const formatWithSymbol: (amount: number, symbol?: string) => string;
/**
 * Parse formatted currency string back to number
 * @param value - The formatted string like "Rp 50.000" or "$50,000.00"
 * @returns The parsed number
 *
 * @example
 * parseFormattedNumber("Rp 50.000")    // → 50000
 * parseFormattedNumber("$50,000.00")   // → 50000
 */
export declare const parseFormattedNumber: (value: string) => number;
export { CURRENCIES };
export type { CurrencyCode, CurrencyConfig };
declare const _default: {
    formatMoney: (amount: number, currency?: CurrencyCode) => string;
    formatNumber: (amount: number, currency?: CurrencyCode) => string;
    formatMoneyCompact: (amount: number, currency?: CurrencyCode) => string;
    formatWithSymbol: (amount: number, symbol?: string) => string;
    parseFormattedNumber: (value: string) => number;
    CURRENCIES: {
        readonly IDR: {
            readonly locale: "id-ID";
            readonly currency: "IDR";
            readonly symbol: "Rp";
        };
        readonly USD: {
            readonly locale: "en-US";
            readonly currency: "USD";
            readonly symbol: "$";
        };
        readonly EUR: {
            readonly locale: "de-DE";
            readonly currency: "EUR";
            readonly symbol: "€";
        };
        readonly JPY: {
            readonly locale: "ja-JP";
            readonly currency: "JPY";
            readonly symbol: "¥";
        };
        readonly SGD: {
            readonly locale: "en-SG";
            readonly currency: "SGD";
            readonly symbol: "S$";
        };
        readonly MYR: {
            readonly locale: "ms-MY";
            readonly currency: "MYR";
            readonly symbol: "RM";
        };
    };
};
export default _default;
//# sourceMappingURL=format-money.utility.d.ts.map