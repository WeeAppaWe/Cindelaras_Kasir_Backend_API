import { Response, NextFunction } from 'express';
import menuService from './menu.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Menus
 * GET /api/menu
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data menu' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Menu Detail
 * GET /api/menu/:menu_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail menu' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Menu
 * POST /api/menu
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Menu berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Menu
 * PUT /api/menu/:menu_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Menu berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Menu (Soft Delete)
 * DELETE /api/menu/:menu_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Menu berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Toggle Menu Availability
 * PATCH /api/menu/:menu_id/toggle-availability
 */
export const toggleAvailability = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuService.toggleAvailability(req);
        const message = data.is_available ? 'Menu diaktifkan' : 'Menu dinonaktifkan';
        res.status(200).json(responseApi({ code: 200, message }, data));
    } catch (error) {
        next(error);
    }
};

export const menuController = {
    showAll,
    detail,
    create,
    update,
    softDelete,
    toggleAvailability,
};

export default menuController;
