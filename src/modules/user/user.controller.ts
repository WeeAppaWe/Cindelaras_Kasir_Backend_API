import { Response, NextFunction } from 'express';
import userService from './user.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Users
 * GET /api/user
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data user' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get User Detail
 * GET /api/user/:user_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail user' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New User
 * POST /api/user
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'User berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update User
 * PUT /api/user/:user_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'User berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete User (Soft Delete)
 * DELETE /api/user/:user_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'User berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Roles (for dropdown)
 * GET /api/user/roles
 */
export const getRoles = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.getRoles();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data role' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All User Statuses (for dropdown)
 * GET /api/user/statuses
 */
export const getUserStatuses = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await userService.getUserStatuses();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data status user' }, data));
    } catch (error) {
        next(error);
    }
};

export const userController = {
    showAll,
    detail,
    create,
    update,
    softDelete,
    getRoles,
    getUserStatuses,
};

export default userController;
