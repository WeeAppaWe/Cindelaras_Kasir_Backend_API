import { Response, NextFunction } from 'express';
import supplierService from './supplier.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Suppliers
 * GET /api/supplier
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await supplierService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data supplier' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Supplier Detail
 * GET /api/supplier/:supplier_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await supplierService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail supplier' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Supplier
 * POST /api/supplier
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await supplierService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Supplier berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Supplier
 * PATCH /api/supplier/:supplier_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await supplierService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Supplier berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Supplier (Soft Delete)
 * DELETE /api/supplier/:supplier_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await supplierService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Supplier berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

export const supplierController = {
    showAll,
    detail,
    create,
    update,
    softDelete,
};

export default supplierController;
