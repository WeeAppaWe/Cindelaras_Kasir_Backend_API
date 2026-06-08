import { AuthenticatedRequest } from '../../../types';
import { StoreSettingData, StoreSettingsMapResponse, StoreSettingListResponse, UpdateSettingResponse, BatchUpdateSettingsResponse } from './store-setting.types';
/**
 * Get all store settings (as array)
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<StoreSettingListResponse>;
/**
 * Get all store settings as key-value map (easier for FE)
 */
export declare const getAllAsMap: (req: AuthenticatedRequest) => Promise<StoreSettingsMapResponse>;
/**
 * Get single setting by key
 */
export declare const getByKey: (req: AuthenticatedRequest) => Promise<StoreSettingData>;
/**
 * Update or create single setting by key (upsert)
 */
export declare const upsertByKey: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
/**
 * Upsert setting (create or update) - POST endpoint
 */
export declare const upsert: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
/**
 * Batch update multiple settings (upsert)
 */
export declare const batchUpdate: (req: AuthenticatedRequest) => Promise<BatchUpdateSettingsResponse>;
/**
 * Delete setting by key (soft delete)
 */
export declare const deleteByKey: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
/**
 * Get public store info (name and logo only)
 * Accessible by all authenticated users
 */
export declare const getPublicInfo: () => Promise<{
    store_name: string;
    store_logo: string;
}>;
export declare const storeSettingService: {
    getAll: (req: AuthenticatedRequest) => Promise<StoreSettingListResponse>;
    getAllAsMap: (req: AuthenticatedRequest) => Promise<StoreSettingsMapResponse>;
    getByKey: (req: AuthenticatedRequest) => Promise<StoreSettingData>;
    upsertByKey: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
    upsert: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
    batchUpdate: (req: AuthenticatedRequest) => Promise<BatchUpdateSettingsResponse>;
    deleteByKey: (req: AuthenticatedRequest) => Promise<UpdateSettingResponse>;
    getPublicInfo: () => Promise<{
        store_name: string;
        store_logo: string;
    }>;
};
export default storeSettingService;
//# sourceMappingURL=store-setting.service.d.ts.map