/**
 * WMA (Weighted Moving Average) Types
 */

/**
 * Data point untuk WMA calculation
 */
export interface WMADataPoint {
    date: string;
    value: number;
}

/**
 * Options untuk WMA calculation
 */
export interface WMAOptions {
    /**
     * If true, use linear weight (index + 1) where newer = higher weight
     * If false, use equal weights
     * Default: true
     */
    useLinearWeight?: boolean;
}

/**
 * Result dari WMA calculation
 */
export interface WMAResult {
    average: number;
    total_weight: number;
    data_points: number;
}
