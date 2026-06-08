import { Response, NextFunction } from 'express';
import reportInventoryService from './report-inventory.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';
import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';

// ============================================
// GET CURRENT STOCK
// ============================================

/**
 * Get Current Stock Report
 * GET /api/report/inventory/current
 */
export const getCurrentStock = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getCurrentStock(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil stok saat ini' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET MOVEMENT SUMMARY
// ============================================

/**
 * Get Stock Movement Summary
 * GET /api/report/inventory/movement
 */
export const getMovementSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getMovementSummary(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil ringkasan pergerakan stok' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET STOCK ALERTS
// ============================================

/**
 * Get Stock Alerts (Low/Out of Stock)
 * GET /api/report/inventory/alerts
 */
export const getStockAlerts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getStockAlerts(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil alert stok' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET INVENTORY VALUATION
// ============================================

/**
 * Get Inventory Valuation
 * GET /api/report/inventory/valuation
 */
export const getInventoryValuation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getInventoryValuation(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil valuasi inventaris' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET OPNAME HISTORY
// ============================================

/**
 * Get Stock Opname History
 * GET /api/report/inventory/opname
 */
export const getOpnameHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getOpnameHistory(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil riwayat stock opname' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET INGREDIENT MOVEMENT CARD
// ============================================

/**
 * Get Ingredient Movement Card (Kartu Stok)
 * GET /api/report/inventory/card
 */
export const getIngredientCard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getIngredientCard(req);

        if (!data) {
            throw new ErrorNotFoundException('Bahan tidak ditemukan');
        }

        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil kartu stok' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET FULL REPORT
// ============================================

/**
 * Get Full Inventory Report
 * GET /api/report/inventory
 */
export const getFullReport = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await reportInventoryService.getFullReport(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil laporan persediaan lengkap' }, data));
    } catch (error) {
        next(error);
    }
};

// ============================================
// EXPORT CONTROLLER
// ============================================

export const reportInventoryController = {
    getCurrentStock,
    getMovementSummary,
    getStockAlerts,
    getInventoryValuation,
    getOpnameHistory,
    getIngredientCard,
    getFullReport,
};

export default reportInventoryController;
