import { Response, NextFunction } from 'express';
import reportOperationalService from './report-operational.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

// ============================================
// GET CASHIER PERFORMANCE
// ============================================

/**
 * Get Cashier Performance Report
 * GET /api/report/operational/cashier
 */
export const getCashierPerformance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getCashierPerformance(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil performa kasir' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET SHIFT SUMMARY
// ============================================

/**
 * Get Shift Summary Report
 * GET /api/report/operational/shift
 */
export const getShiftSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getShiftSummary(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil rekap shift' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET TRANSACTION STATISTICS
// ============================================

/**
 * Get Transaction Statistics
 * GET /api/report/operational/transactions
 */
export const getTransactionStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getTransactionStats(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil statistik transaksi' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET MENU PERFORMANCE
// ============================================

/**
 * Get Menu Performance Report
 * GET /api/report/operational/menu
 */
export const getMenuPerformance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getMenuPerformance(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil performa menu' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET ORDER STATUS
// ============================================

/**
 * Get Order Status Summary
 * GET /api/report/operational/order-status
 */
export const getOrderStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getOrderStatus(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil status order' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET FULL REPORT
// ============================================

/**
 * Get Full Operational Report
 * GET /api/report/operational
 */
export const getFullReport = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportOperationalService.getFullReport(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil laporan operasional lengkap' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// EXPORT CONTROLLER
// ============================================

export const reportOperationalController = {
    getCashierPerformance,
    getShiftSummary,
    getTransactionStats,
    getMenuPerformance,
    getOrderStatus,
    getFullReport,
};

export default reportOperationalController;
