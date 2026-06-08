import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { AuthenticatedRequest } from '../../../types';
import storeSettingRepository from './store-setting.repository';
import {
  StoreSettingData,
  StoreSettingsMapResponse,
  StoreSettingListResponse,
  UpdateSettingResponse,
  BatchUpdateSettingsResponse,
  BatchUpdateSettingsRequest,
  UpsertSettingRequest,
} from './store-setting.types';

const prisma = getPrismaClient();

/**
 * Get all store settings (as array)
 */
export const getAll = async (req: AuthenticatedRequest): Promise<StoreSettingListResponse> => {
  try {
    const settings = await storeSettingRepository.findAll();

    return {
      records: settings,
      total: settings.length,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Get all store settings as key-value map (easier for FE)
 */
export const getAllAsMap = async (req: AuthenticatedRequest): Promise<StoreSettingsMapResponse> => {
  try {
    const settings = await storeSettingRepository.findAll();

    // Convert to key-value object
    const settingsMap: StoreSettingsMapResponse = {};
    for (const setting of settings) {
      settingsMap[setting.setting_key] = setting.setting_value;
    }

    return settingsMap;
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Get single setting by key
 */
export const getByKey = async (req: AuthenticatedRequest): Promise<StoreSettingData> => {
  try {
    const settingKey = req.params.setting_key;

    const setting = await storeSettingRepository.findByKey(settingKey);

    if (!setting) {
      throw new ErrorNotFoundException(`Setting '${settingKey}' tidak ditemukan`);
    }

    return setting;
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Update or create single setting by key (upsert)
 */
export const upsertByKey = async (req: AuthenticatedRequest): Promise<UpdateSettingResponse> => {
  try {
    const settingKey = req.params.setting_key;
    const { setting_value } = req.body;

    const result = await storeSettingRepository.upsert(settingKey, setting_value);

    return {
      success: true,
      message: `Setting '${settingKey}' berhasil disimpan`,
      data: result,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Upsert setting (create or update) - POST endpoint
 */
export const upsert = async (req: AuthenticatedRequest): Promise<UpdateSettingResponse> => {
  try {
    const body: UpsertSettingRequest = req.body;

    const result = await storeSettingRepository.upsert(body.setting_key, body.setting_value);

    return {
      success: true,
      message: `Setting '${body.setting_key}' berhasil disimpan`,
      data: result,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Batch update multiple settings (upsert)
 */
export const batchUpdate = async (req: AuthenticatedRequest): Promise<BatchUpdateSettingsResponse> => {
  try {
    const body: BatchUpdateSettingsRequest = req.body;

    // Use transaction for batch update
    const updatedCount = await prisma.$transaction(async (tx) => {
      return await storeSettingRepository.batchUpsert(body.settings, tx);
    });

    return {
      success: true,
      message: `${updatedCount} setting berhasil diperbarui`,
      updated_count: updatedCount,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Delete setting by key (soft delete)
 */
export const deleteByKey = async (req: AuthenticatedRequest): Promise<UpdateSettingResponse> => {
  try {
    const settingKey = req.params.setting_key;

    // Check if exists
    const existing = await storeSettingRepository.findByKey(settingKey);
    if (!existing) {
      throw new ErrorNotFoundException(`Setting '${settingKey}' tidak ditemukan`);
    }

    await storeSettingRepository.softDeleteByKey(settingKey);

    return {
      success: true,
      message: `Setting '${settingKey}' berhasil dihapus`,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Get public store info (name and logo only)
 * Accessible by all authenticated users
 */
export const getPublicInfo = async (): Promise<{ store_name: string; store_logo: string }> => {
  try {
    const settings = await storeSettingRepository.findAll();

    // Extract only name and logo
    let storeName = '';
    let storeLogo = '';

    for (const setting of settings) {
      if (setting.setting_key === 'store_name') {
        storeName = setting.setting_value;
      } else if (setting.setting_key === 'store_logo') {
        storeLogo = setting.setting_value;
      }
    }

    return {
      store_name: storeName,
      store_logo: storeLogo,
    };
  } catch (error) {
    console.error(`--- Store Setting Service Error: ${(error as Error).message}`);
    throw error;
  }
};

export const storeSettingService = {
  getAll,
  getAllAsMap,
  getByKey,
  upsertByKey,
  upsert,
  batchUpdate,
  deleteByKey,
  getPublicInfo,
};

export default storeSettingService;
