// Store Setting module types

// Predefined setting keys for type safety
export type SettingKey =
  | 'store_name'
  | 'store_code'
  | 'store_category'
  | 'store_address'
  | 'store_logo'
  | 'store_phone'
  | 'store_email'
  | 'store_instagram'
  | 'store_facebook'
  | 'store_whatsapp'
  | 'store_website'
  | 'receipt_header'
  | 'receipt_footer'
  | 'printer_receipt_config'
  | 'printer_kitchen_config'
  | string; // Allow custom keys

// Store setting data from database
export interface StoreSettingData {
  store_setting_id: string;
  setting_key: string;
  setting_value: string;
  created_at: Date;
  updated_at?: Date | null;
}

// Get all settings response (key-value object for easier FE usage)
export interface StoreSettingsMapResponse {
  [key: string]: string;
}

// Single setting update request
export interface UpdateSettingRequest {
  setting_value: string;
}

// Batch update request (multiple settings at once)
export interface BatchUpdateSettingsRequest {
  settings: {
    setting_key: string;
    setting_value: string;
  }[];
}

// Upsert setting request (create or update)
export interface UpsertSettingRequest {
  setting_key: string;
  setting_value: string;
}

// List response with array format
export interface StoreSettingListResponse {
  records: StoreSettingData[];
  total: number;
}

// Update response
export interface UpdateSettingResponse {
  success: boolean;
  message: string;
  data?: StoreSettingData;
}

// Batch update response
export interface BatchUpdateSettingsResponse {
  success: boolean;
  message: string;
  updated_count: number;
}
