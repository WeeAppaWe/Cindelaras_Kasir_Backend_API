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
export const calculateWMA = (
    data: number[],
    options: WMAOptions = {}
): number => {
    const { useLinearWeight = true } = options;

    if (data.length === 0) return 0;

    let weightedSum = 0;
    let weightTotal = 0;

    for (let i = 0; i < data.length; i++) {
        const weight = useLinearWeight ? i + 1 : 1;
        weightedSum += data[i] * weight;
        weightTotal += weight;
    }

    return weightTotal > 0 ? weightedSum / weightTotal : 0;
};

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
export const calculateWMAFromDataPoints = (
    dataPoints: WMADataPoint[],
    options: WMAOptions = {}
): WMAResult => {
    const { useLinearWeight = true } = options;

    if (dataPoints.length === 0) {
        return { average: 0, total_weight: 0, data_points: 0 };
    }

    // Sort by date ascending (oldest first)
    const sorted = [...dataPoints].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let weightedSum = 0;
    let weightTotal = 0;

    for (let i = 0; i < sorted.length; i++) {
        const weight = useLinearWeight ? i + 1 : 1;
        weightedSum += sorted[i].value * weight;
        weightTotal += weight;
    }

    const average = weightTotal > 0 ? weightedSum / weightTotal : 0;

    return {
        average,
        total_weight: weightTotal,
        data_points: sorted.length,
    };
};

export default {
    calculateWMA,
    calculateWMAFromDataPoints,
};
