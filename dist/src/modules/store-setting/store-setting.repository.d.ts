import { StoreSettingData } from './store-setting.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all store settings
 */
export declare const findAll: () => Promise<StoreSettingData[]>;
/**
 * Find setting by key
 */
export declare const findByKey: (settingKey: string) => Promise<StoreSettingData | null>;
/**
 * Find setting by ID
 */
export declare const findById: (settingId: string) => Promise<StoreSettingData | null>;
/**
 * Create new setting
 */
export declare const create: (data: {
    setting_key: string;
    setting_value: string;
}, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
/**
 * Update setting by key
 */
export declare const updateByKey: (settingKey: string, settingValue: string, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
/**
 * Upsert setting (create or update)
 */
export declare const upsert: (settingKey: string, settingValue: string, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
/**
 * Batch upsert settings
 */
export declare const batchUpsert: (settings: {
    setting_key: string;
    setting_value: string;
}[], transaction?: Prisma.TransactionClient) => Promise<number>;
/**
 * Soft delete setting by key
 */
export declare const softDeleteByKey: (settingKey: string, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const storeSettingRepository: {
    findAll: () => Promise<StoreSettingData[]>;
    findByKey: (settingKey: string) => Promise<StoreSettingData | null>;
    findById: (settingId: string) => Promise<StoreSettingData | null>;
    create: (data: {
        setting_key: string;
        setting_value: string;
    }, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
    updateByKey: (settingKey: string, settingValue: string, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
    upsert: (settingKey: string, settingValue: string, transaction?: Prisma.TransactionClient) => Promise<StoreSettingData>;
    batchUpsert: (settings: {
        setting_key: string;
        setting_value: string;
    }[], transaction?: Prisma.TransactionClient) => Promise<number>;
    softDeleteByKey: (settingKey: string, transaction?: Prisma.TransactionClient) => Promise<void>;
};
export default storeSettingRepository;
//# sourceMappingURL=store-setting.repository.d.ts.map