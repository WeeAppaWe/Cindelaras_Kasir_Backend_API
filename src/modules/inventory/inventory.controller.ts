import { Response, NextFunction } from 'express';
import inventoryService from './inventory.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get Stock Movement History
 * GET /api/inventory
 */
export const getHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await inventoryService.getHistory(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil riwayat stok' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Stock Movement Detail
 * GET /api/inventory/:stock_movement_id
 */
export const getDetail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await inventoryService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail pergerakan stok' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Stock IN - Barang Masuk dari Supplier
 * POST /api/inventory/stock-in
 */
export const stockIn = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await inventoryService.stockIn(req);
        res.status(201).json(responseApi({ code: 201, message: 'Barang masuk berhasil dicatat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Stock OUT - Barang Keluar (Rusak/Kedaluarsa)
 * POST /api/inventory/stock-out
 */
export const stockOut = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await inventoryService.stockOut(req);
        res.status(201).json(responseApi({ code: 201, message: 'Barang keluar berhasil dicatat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Stock Movement History by Ingredient
 * GET /api/inventory/ingredient/:ingredient_id
 */
export const getHistoryByIngredient = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = await inventoryService.getHistoryByIngredient(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil riwayat stok bahan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Available Stock Types
 * GET /api/inventory/stock-types
 */
export const getStockTypes = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = await inventoryService.getStockTypes();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil tipe stok' }, data));
    } catch (error) {
        next(error);
    }
};

export const inventoryController = {
    getHistory,
    getDetail,
    stockIn,
    stockOut,
    getHistoryByIngredient,
    getStockTypes,
};

export default inventoryController;
