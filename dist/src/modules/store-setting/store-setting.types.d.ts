export type SettingKey = 'store_name' | 'store_code' | 'store_category' | 'store_address' | 'store_logo' | 'store_phone' | 'store_email' | 'store_instagram' | 'store_facebook' | 'store_whatsapp' | 'store_website' | 'receipt_header' | 'receipt_footer' | 'printer_receipt_config' | 'printer_kitchen_config' | string;
export interface StoreSettingData {
    store_setting_id: string;
    setting_key: string;
    setting_value: string;
    created_at: Date;
    updated_at?: Date | null;
}
export interface StoreSettingsMapResponse {
    [key: string]: string;
}
export interface UpdateSettingRequest {
    setting_value: string;
}
export interface BatchUpdateSettingsRequest {
    settings: {
        setting_key: string;
        setting_value: string;
    }[];
}
export interface UpsertSettingRequest {
    setting_key: string;
    setting_value: string;
}
export interface StoreSettingListResponse {
    records: StoreSettingData[];
    total: number;
}
export interface UpdateSettingResponse {
    success: boolean;
    message: string;
    data?: StoreSettingData;
}
export interface BatchUpdateSettingsResponse {
    success: boolean;
    message: string;
    updated_count: number;
}
//# sourceMappingURL=store-setting.types.d.ts.map