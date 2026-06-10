import { Response, NextFunction } from 'express';
import rawIngredientService from './ingredient-raw.service';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

/**
 * Get Raw Ingredient References (for dropdown)
 * GET /api/ingredient/raw/options
 */
export const getReferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pilihan bahan baku' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Raw Ingredients
 * GET /api/ingredient/raw
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data bahan baku' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Raw Ingredient Detail
 * GET /api/ingredient/raw/:ingredient_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail bahan baku' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Raw Ingredient
 * POST /api/ingredient/raw
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Bahan baku berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Raw Ingredient
 * PUT /api/ingredient/raw/:ingredient_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Bahan baku berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Raw Ingredient (Soft Delete)
 * DELETE /api/ingredient/raw/:ingredient_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Bahan baku berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/raw/units
 */
export const getUnitMeasures = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data satuan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Low Stock Alerts
 * GET /api/ingredient/raw/low-stock
 */
export const getLowStockAlerts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await rawIngredientService.getLowStockAlerts();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data stok rendah' }, data));
    } catch (error) {
        next(error);
    }
};

export const rawIngredientController = {
    getReferences,
    showAll,
    detail,
    create,
    update,
    softDelete,
    getUnitMeasures,
    getLowStockAlerts,
};

export default rawIngredientController;
