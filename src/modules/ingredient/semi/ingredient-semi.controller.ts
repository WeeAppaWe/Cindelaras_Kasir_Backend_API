import { Response, NextFunction } from 'express';
import semiIngredientService from './ingredient-semi.service';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

/**
 * Get Semi Ingredient References (for dropdown)
 * GET /api/ingredient/semi/options
 */
export const getReferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pilihan bahan setengah jadi' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Semi Ingredients
 * GET /api/ingredient/semi
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data bahan setengah jadi' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Semi Ingredient Detail (with compositions and HPP)
 * GET /api/ingredient/semi/:ingredient_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail bahan setengah jadi' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Semi Ingredient
 * POST /api/ingredient/semi
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Bahan setengah jadi berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Semi Ingredient
 * PUT /api/ingredient/semi/:ingredient_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Bahan setengah jadi berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Semi Ingredient (Soft Delete)
 * DELETE /api/ingredient/semi/:ingredient_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Bahan setengah jadi berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/semi/units
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
 * Get HPP Calculation for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/hpp
 */
export const getHPPCalculation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const targetYield = parseFloat(req.query.target_yield as string) || 1;

        const data = await semiIngredientService.getHPPCalculation(ingredientId, targetYield);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil menghitung HPP' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Recalculate and Update avg_cost (HPP per unit)
 * POST /api/ingredient/semi/:ingredient_id/recalculate-hpp
 */
export const recalculateHPP = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const targetYield = parseFloat(req.body.target_yield as string) || 1;

        const newAvgCost = await semiIngredientService.recalculateAvgCost(ingredientId, targetYield);
        res.status(200).json(responseApi({ code: 200, message: 'HPP berhasil dihitung ulang' }, { avg_cost: newAvgCost }));
    } catch (error) {
        next(error);
    }
};

/**
 * Produce Semi Ingredient — deduct child stock, increment semi stock
 * POST /api/ingredient/semi/:ingredient_id/produce
 */
export const produce = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.produce(req);
        res.status(200).json(responseApi({ code: 200, message: 'Produksi berhasil dicatat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create and Produce Semi Ingredient (all-in-one)
 * POST /api/ingredient/semi/create-and-produce
 */
export const createAndProduce = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await semiIngredientService.createAndProduce(req);
        res.status(201).json(responseApi({ code: 201, message: 'Bahan setengah jadi berhasil dibuat dan diproduksi' }, data));
    } catch (error) {
        next(error);
    }
};

export const semiIngredientController = {
    getReferences,
    showAll,
    detail,
    create,
    update,
    softDelete,
    getUnitMeasures,
    getHPPCalculation,
    recalculateHPP,
    produce,
    createAndProduce,
};

export default semiIngredientController;
