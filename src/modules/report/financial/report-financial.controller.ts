import { Response, NextFunction } from 'express';
import reportFinancialService from './report-financial.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

// ============================================
// GET SUMMARY
// ============================================

/**
 * Get Financial Summary (Revenue, COGS, Profit, Margin)
 * GET /api/report/financial/summary
 */
export const getSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getSummary(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil ringkasan keuangan' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET PAYMENT BREAKDOWN
// ============================================

/**
 * Get Payment Breakdown (CASH vs QRIS)
 * GET /api/report/financial/payment
 */
export const getPaymentBreakdown = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getPaymentBreakdown(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil breakdown pembayaran' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET CASH FLOW
// ============================================

/**
 * Get Cash Flow Report
 * GET /api/report/financial/cash-flow
 */
export const getCashFlow = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getCashFlow(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil laporan arus kas' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET TOP MENUS
// ============================================

/**
 * Get Top Selling Menus
 * GET /api/report/financial/top-menus
 */
export const getTopMenus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getTopMenus(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil menu terlaris' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET SALES BY CATEGORY
// ============================================

/**
 * Get Sales By Category
 * GET /api/report/financial/by-category
 */
export const getSalesByCategory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getSalesByCategory(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil penjualan per kategori' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET FULL REPORT
// ============================================

/**
 * Get Full Financial Report
 * GET /api/report/financial
 */
export const getFullReport = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportFinancialService.getFullReport(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil laporan keuangan lengkap' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// EXPORT CONTROLLER
// ============================================

export const reportFinancialController = {
    getSummary,
    getPaymentBreakdown,
    getCashFlow,
    getTopMenus,
    getSalesByCategory,
    getFullReport,
};

export default reportFinancialController;
