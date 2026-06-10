import { Response, NextFunction } from 'express';
import unitMeasureService from './unit-measure.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get Unit Measure References (for dropdown)
 * GET /api/unit-measure/options
 */
export const getReferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.getAllReferences();
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pilihan satuan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Unit Measures
 * GET /api/unit-measure
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const units = await unitMeasureService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data satuan' }, units));
    } catch (error) {
        next(error);
    }
};

/**
 * Get Unit Measure Detail
 * GET /api/unit-measure/:unit_measure_id
 */
export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil detail satuan' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Create New Unit Measure
 * POST /api/unit-measure
 */
export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.create(req);
        res.status(201).json(responseApi({ code: 201, message: 'Satuan berhasil dibuat' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Update Unit Measure
 * PATCH /api/unit-measure/:unit_measure_id
 */
export const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.update(req);
        res.status(200).json(responseApi({ code: 200, message: 'Satuan berhasil diperbarui' }, data));
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Unit Measure (Soft Delete)
 * DELETE /api/unit-measure/:unit_measure_id
 */
export const softDelete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await unitMeasureService.softDelete(req);
        res.status(200).json(responseApi({ code: 200, message: 'Satuan berhasil dihapus' }, data));
    } catch (error) {
        next(error);
    }
};

export const unitMeasureController = {
    getReferences,
    showAll,
    detail,
    create,
    update,
    softDelete,
};

export default unitMeasureController;
