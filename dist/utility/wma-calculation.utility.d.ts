/**
 * WMA (Weighted Moving Average) Calculation Utility
 *
 * Weighted Moving Average memberikan bobot lebih tinggi ke data yang lebih baru.
 * Berguna untuk forecasting, trend analysis, dan demand prediction.
 */
import { WMADataPoint, WMAOptions, WMAResult } from '../types/wma.types';
/**
 * Calculate Weighted Moving Average dari array of numbers
 *
 * Weight menggunakan linear weight: index + 1
 * Contoh untuk 5 data points: [1, 2, 3, 4, 5] (index 0 = weight 1, index 4 = weight 5)
 * Data harus sudah terurut dari oldest ke newest
 *
 * @param data Array of numbers (oldest first)
 * @param options WMA calculation options
 * @returns WMA average value
 *
 * @example
 * const dailyUsage = [2, 3, 4, 5, 6]; // Kg per day
 * const wma = calculateWMA(dailyUsage);
 * // Result: (2*1 + 3*2 + 4*3 + 5*4 + 6*5) / (1+2+3+4+5) = 70/15 = 4.67
 */
export declare const calculateWMA: (data: number[], options?: WMAOptions) => number;
/**
 * Calculate Weighted Moving Average dari array of data points dengan tanggal
 * Data akan di-sort berdasarkan tanggal secara otomatis
 *
 * @param dataPoints Array of { date, value } objects
 * @param options WMA calculation options
 * @returns WMAResult with average, total weight, and data points count
 *
 * @example
 * const dailyUsage = [
 *   { date: '2026-01-01', value: 2 },
 *   { date: '2026-01-02', value: 3 },
 *   { date: '2026-01-03', value: 4 },
 * ];
 * const result = calculateWMAFromDataPoints(dailyUsage);
 * // Result: { average: 3.33, total_weight: 6, data_points: 3 }
 */
export declare const calculateWMAFromDataPoints: (dataPoints: WMADataPoint[], options?: WMAOptions) => WMAResult;
declare const _default: {
    calculateWMA: (data: number[], options?: WMAOptions) => number;
    calculateWMAFromDataPoints: (dataPoints: WMADataPoint[], options?: WMAOptions) => WMAResult;
};
export default _default;
//# sourceMappingURL=wma-calculation.utility.d.ts.map