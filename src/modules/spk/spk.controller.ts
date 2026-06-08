import { Response, NextFunction } from 'express';
import spkService from './spk.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

// ============================================
// RUN SPK ANALYSIS
// ============================================

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
export const runAnalysis = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await spkService.runAnalysis(req);
        res.status(200).json(responseApi({ code: 200, message: 'Analisa SPK berhasil' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// EXPORT CONTROLLER
// ============================================

export const spkController = {
    runAnalysis,
};

export default spkController;
