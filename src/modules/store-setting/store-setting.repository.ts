import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { StoreSettingData } from './store-setting.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for store setting queries
const storeSettingSelectFields = {
  store_setting_id: true,
  setting_key: true,
  setting_value: true,
  created_at: true,
  updated_at: true,
};

/**
 * Find all store settings
 */
export const findAll = async (): Promise<StoreSettingData[]> => {
  try {
    const settings = await prisma.storeSetting.findMany({
      where: {
        deleted_at: null,
      },
      select: storeSettingSelectFields,
      orderBy: { setting_key: 'asc' },
    });

    return settings as StoreSettingData[];
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Find setting by key
 */
export const findByKey = async (settingKey: string): Promise<StoreSettingData | null> => {
  try {
    const setting = await prisma.storeSetting.findFirst({
      where: {
        setting_key: settingKey,
        deleted_at: null,
      },
      select: storeSettingSelectFields,
    });

    return setting as StoreSettingData | null;
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Find setting by ID
 */
export const findById = async (settingId: string): Promise<StoreSettingData | null> => {
  try {
    const setting = await prisma.storeSetting.findUnique({
      where: {
        store_setting_id: settingId,
        deleted_at: null,
      },
      select: storeSettingSelectFields,
    });

    return setting as StoreSettingData | null;
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Create new setting
 */
export const create = async (
  data: { setting_key: string; setting_value: string },
  transaction?: Prisma.TransactionClient
): Promise<StoreSettingData> => {
  try {
    const client = transaction || prisma;

    const setting = await client.storeSetting.create({
      data: {
        setting_key: data.setting_key,
        setting_value: data.setting_value,
      },
      select: storeSettingSelectFields,
    });

    return setting as StoreSettingData;
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Update setting by key
 */
export const updateByKey = async (
  settingKey: string,
  settingValue: string,
  transaction?: Prisma.TransactionClient
): Promise<StoreSettingData> => {
  try {
    const client = transaction || prisma;

    // Find the setting first
    const existing = await client.storeSetting.findFirst({
      where: {
        setting_key: settingKey,
        deleted_at: null,
      },
    });

    if (!existing) {
      throw new Error('Setting not found');
    }

    const setting = await client.storeSetting.update({
      where: { store_setting_id: existing.store_setting_id },
      data: { setting_value: settingValue },
      select: storeSettingSelectFields,
    });

    return setting as StoreSettingData;
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Upsert setting (create or update)
 */
export const upsert = async (
  settingKey: string,
  settingValue: string,
  transaction?: Prisma.TransactionClient
): Promise<StoreSettingData> => {
  try {
    const client = transaction || prisma;

    // Check if setting exists
    const existing = await client.storeSetting.findFirst({
      where: {
        setting_key: settingKey,
        deleted_at: null,
      },
    });

    if (existing) {
      // Update existing
      const setting = await client.storeSetting.update({
        where: { store_setting_id: existing.store_setting_id },
        data: { setting_value: settingValue },
        select: storeSettingSelectFields,
      });
      return setting as StoreSettingData;
    } else {
      // Create new
      const setting = await client.storeSetting.create({
        data: {
          setting_key: settingKey,
          setting_value: settingValue,
        },
        select: storeSettingSelectFields,
      });
      return setting as StoreSettingData;
    }
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Batch upsert settings
 */
export const batchUpsert = async (
  settings: { setting_key: string; setting_value: string }[],
  transaction?: Prisma.TransactionClient
): Promise<number> => {
  try {
    const client = transaction || prisma;
    let count = 0;

    for (const setting of settings) {
      await upsert(setting.setting_key, setting.setting_value, client as Prisma.TransactionClient);
      count++;
    }

    return count;
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

/**
 * Soft delete setting by key
 */
export const softDeleteByKey = async (
  settingKey: string,
  transaction?: Prisma.TransactionClient
): Promise<void> => {
  try {
    const client = transaction || prisma;

    const existing = await client.storeSetting.findFirst({
      where: {
        setting_key: settingKey,
        deleted_at: null,
      },
    });

    if (existing) {
      await client.storeSetting.update({
        where: { store_setting_id: existing.store_setting_id },
        data: { deleted_at: new Date() },
      });
    }
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

export const storeSettingRepository = {
  findAll,
  findByKey,
  findById,
  create,
  updateByKey,
  upsert,
  batchUpsert,
  softDeleteByKey,
};

export default storeSettingRepository;
