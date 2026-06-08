import { Response, NextFunction } from 'express';
import menuRecipeService from './menu-recipe.service';
import responseApi from '../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../types';

/**
 * Get All Recipes for a Menu
 * GET /api/menu/:menu_id/recipe
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuRecipeService.getByMenuId(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data resep' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Add Recipe to Menu
 * POST /api/menu/:menu_id/recipe
 */
export const addRecipe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuRecipeService.addRecipe(req);
        res.status(201).json(responseApi({ code: 201, message: 'Bahan berhasil ditambahkan ke resep' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Recipe Qty
 * PUT /api/menu/:menu_id/recipe/:recipe_id
 */
export const updateRecipe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuRecipeService.updateRecipe(req);
        res.status(200).json(responseApi({ code: 200, message: 'Jumlah bahan berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Remove Recipe from Menu
 * DELETE /api/menu/:menu_id/recipe/:recipe_id
 */
export const removeRecipe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuRecipeService.removeRecipe(req);
        res.status(200).json(responseApi({ code: 200, message: 'Bahan berhasil dihapus dari resep' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk Update Recipes (Replace All)
 * PUT /api/menu/:menu_id/recipe
 */
export const bulkUpdate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await menuRecipeService.bulkUpdateRecipes(req);
        res.status(200).json(responseApi({ code: 200, message: 'Resep berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

export const menuRecipeController = {
    showAll,
    addRecipe,
    updateRecipe,
    removeRecipe,
    bulkUpdate,
};

export default menuRecipeController;


