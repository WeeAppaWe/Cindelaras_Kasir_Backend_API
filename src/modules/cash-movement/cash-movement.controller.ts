import { Response, NextFunction } from 'express';
import cashMovementService from './cash-movement.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Cash Movements
 * GET /api/cash-movement
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await cashMovementService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data mutasi kas' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Cash Movement Detail
 * GET /api/cash-movement/:cash_movement_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await cashMovementService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail mutasi kas' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Cash Movement
 * POST /api/cash-movement
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await cashMovementService.create(req);
        res.status(201).json(responseApi({ code: 201, message: data.message }, data));
    } catch (error) {
        next(error);
    }
};

export const cashMovementController = {
    showAll,
    detail,
    create,
};

export default cashMovementController;
