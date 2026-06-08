import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Run Smart Purchasing Analysis
 * GET /api/spk/analysis
 *
 * Query params:
 * - target_days (default: 7) - Target hari stok aman
 * - buffer_percent (default: 10) - Buffer keamanan %
 * - lookback_days (default: 30) - Periode analisa ke belakang
 * - ingredient_type (optional) - Filter: raw, semi, all
 * - supplier_id (optional) - Filter by supplier
 */
export declare const runAnalysis: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const spkController: {
    runAnalysis: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default spkController;
//# sourceMappingURL=spk.controller.d.ts.map