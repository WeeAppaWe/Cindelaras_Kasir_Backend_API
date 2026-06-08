import { Response, NextFunction } from 'express';
import opnameService from './opname.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Stock Opnames
 * GET /api/opname
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data stock opname' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Stock Opname Detail
 * GET /api/opname/:stock_opname_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail stock opname' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Stock Opname
 * POST /api/opname
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Stock opname berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Stock Opname
 * PATCH /api/opname/:stock_opname_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Stock opname berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Change Stock Opname Status
 * PATCH /api/opname/:stock_opname_id/status
 */
export const changeStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.changeStatus(req);
        res.status(200).json(responseApi({ code: 200, message: 'Status stock opname berhasil diubah' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Apply Adjustment to Stock
 * POST /api/opname/:stock_opname_id/apply
 */
export const applyAdjustment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.applyAdjustment(req);
        res.status(200).json(responseApi({ code: 200, message: 'Adjustment berhasil diaplikasikan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Stock Opname (Soft Delete)
 * DELETE /api/opname/:stock_opname_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Stock opname berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Ingredients (for opname form)
 * GET /api/opname/ingredients
 */
export const getIngredients = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await opnameService.getIngredients();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data bahan' }, data));
    } catch (error) {
        next(error);
    }
};

export const opnameController = {
    showAll,
    detail,
    create,
    update,
    changeStatus,
    applyAdjustment,
    softDelete,
    getIngredients,
};

export default opnameController;
