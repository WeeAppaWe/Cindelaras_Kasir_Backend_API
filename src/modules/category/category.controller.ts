import { Response, NextFunction } from 'express';
import categoryService from './category.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get Category References (for dropdown)
 * GET /api/category/options
 */
export const getReferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pilihan kategori' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Categories
 * GET /api/category
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data kategori' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Category Detail
 * GET /api/category/:category_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail kategori' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Category
 * POST /api/category
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Kategori berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Category
 * PUT /api/category/:category_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Kategori berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Category (Soft Delete)
 * DELETE /api/category/:category_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await categoryService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Kategori berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

export const categoryController = {
    getReferences,
    showAll,
    detail,
    create,
    update,
    softDelete,
};

export default categoryController;
