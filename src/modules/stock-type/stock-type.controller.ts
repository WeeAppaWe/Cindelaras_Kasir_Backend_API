import { Response, NextFunction } from 'express';
import stockTypeService from './stock-type.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Stock Types
 * GET /api/stock-type
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await stockTypeService.getAll();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil daftar tipe stok' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Stock Type Detail
 * GET /api/stock-type/:stock_type_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await stockTypeService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail tipe stok' }, data));
    } catch (error) {
        next(error);
    }
};

export const stockTypeController = {
    showAll,
    detail,
};

export default stockTypeController;
