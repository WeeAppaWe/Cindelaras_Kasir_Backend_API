"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spkController = exports.runAnalysis = void 0;
const spk_service_1 = __importDefault(require("./spk.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
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
const runAnalysis = async (req, res, next) => {
    try {
        const data = await spk_service_1.default.runAnalysis(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Analisa SPK berhasil' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.runAnalysis = runAnalysis;
// ============================================
// EXPORT CONTROLLER
// ============================================
exports.spkController = {
    runAnalysis: exports.runAnalysis,
};
exports.default = exports.spkController;
//# sourceMappingURL=spk.controller.js.map