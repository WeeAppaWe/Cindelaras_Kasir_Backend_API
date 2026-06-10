import { Response, NextFunction } from 'express';
import ingredientAllService from './ingredient-all.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

/**
 * Get Ingredient References (for dropdown)
 * GET /api/ingredient/options
 */
export const getReferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await ingredientAllService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pilihan bahan' }, data));
    } catch (error) {
        next(error);
    }
};

export const ingredientAllController = {
    getReferences,
};

export default ingredientAllController;
