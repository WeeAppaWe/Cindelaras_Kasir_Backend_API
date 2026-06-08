import { Response, NextFunction } from 'express';
import storeSettingService from './store-setting.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get All Store Settings (as array)
 * GET /api/store-setting
 */
export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.getAll(req);
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pengaturan toko' }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Store Settings as Map (key-value object)
 * GET /api/store-setting/map
 */
export const showAllAsMap = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.getAllAsMap(req);
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data pengaturan toko' }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Get Store Setting by Key
 * GET /api/store-setting/:setting_key
 */
export const getByKey = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.getByKey(req);
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil pengaturan' }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Upsert Store Setting (create or update)
 * POST /api/store-setting
 */
export const upsert = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.upsert(req);
    res.status(200).json(responseApi({ code: 200, message: data.message }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Update Store Setting by Key (upsert)
 * PUT /api/store-setting/:setting_key
 */
export const upsertByKey = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.upsertByKey(req);
    res.status(200).json(responseApi({ code: 200, message: data.message }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Batch Update Store Settings
 * PUT /api/store-setting/batch
 */
export const batchUpdate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.batchUpdate(req);
    res.status(200).json(responseApi({ code: 200, message: data.message }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Store Setting by Key (Soft Delete)
 * DELETE /api/store-setting/:setting_key
 */
export const deleteByKey = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.deleteByKey(req);
    res.status(200).json(responseApi({ code: 200, message: data.message }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Get Public Store Info (name and logo only)
 * GET /api/store-setting/public/info
 * This endpoint is accessible by authenticated users (Admin & Cashier)
 */
export const getPublicInfo = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await storeSettingService.getPublicInfo();
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil info toko' }, data));
  } catch (error) {
    next(error);
  }
};

export const storeSettingController = {
  showAll,
  showAllAsMap,
  getByKey,
  upsert,
  upsertByKey,
  batchUpdate,
  deleteByKey,
  getPublicInfo,
};

export default storeSettingController;
