/**
 * Currency configuration for different locales
 */
export interface CurrencyConfig {
    locale: string;
    currency: string;
    symbol: string;
}

/**
 * Predefined currency configurations
 */
export const CURRENCIES = {
    IDR: { locale: 'id-ID', currency: 'IDR', symbol: 'Rp' },
    USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
    EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
    JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
    SGD: { locale: 'en-SG', currency: 'SGD', symbol: 'S$' },
    MYR: { locale: 'ms-MY', currency: 'MYR', symbol: 'RM' },
} as const;

/**
 * Currency code type
 */
export type CurrencyCode = keyof typeof CURRENCIES;
