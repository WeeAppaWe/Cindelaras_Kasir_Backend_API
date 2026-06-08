import { Response, NextFunction } from 'express';
import compositionService from './ingredient-semi-composition.service';
import responseApi from '../../../../../utility/response-api';
import { AuthenticatedRequest } from '../../../../../types';

/**
 * Get All Compositions for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/composition
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.getCompositions(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil komposisi bahan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Add Composition to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition
 */
export const addComposition = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.addComposition(req);
        res.status(201).json(responseApi({ code: 201, message: 'Bahan berhasil ditambahkan ke komposisi' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Bulk Add Compositions to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition/bulk
 */
export const bulkAddCompositions = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.bulkAddCompositions(req);
        res.status(201).json(responseApi({ code: 201, message: 'Komposisi berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Composition Quantity
 * PUT /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
export const updateComposition = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.updateComposition(req);
        res.status(200).json(responseApi({ code: 200, message: 'Komposisi berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Composition
 * DELETE /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
export const deleteComposition = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.deleteComposition(req);
        res.status(200).json(responseApi({ code: 200, message: 'Komposisi berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Available Raw Ingredients for Composition
 * GET /api/ingredient/semi/composition/available-ingredients
 */
export const getAvailableIngredients = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.getAvailableIngredients();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil daftar bahan baku' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Preview HPP Calculation
 * POST /api/ingredient/semi/composition/preview-hpp
 */
export const previewHPP = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await compositionService.previewHPP(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil menghitung preview HPP' }, data));
    } catch (error) {
        next(error);
    }
};

export const compositionController = {
    showAll,
    addComposition,
    bulkAddCompositions,
    updateComposition,
    deleteComposition,
    getAvailableIngredients,
    previewHPP,
};

export default compositionController;
