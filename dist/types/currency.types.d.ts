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
export declare const CURRENCIES: {
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
/**
 * Currency code type
 */
export type CurrencyCode = keyof typeof CURRENCIES;
//# sourceMappingURL=currency.types.d.ts.map