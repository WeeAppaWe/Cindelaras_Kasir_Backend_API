import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Setting key param schema
 */
export const settingKeyParamSchema = z.object({
  setting_key: z
    .string()
    .min(1, 'Setting key tidak boleh kosong')
    .max(50, 'Setting key maksimal 50 karakter')
    .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
});

/**
 * Update single setting schema
 */
export const updateSettingSchema = z.object({
  setting_value: z
    .string()
    .max(5000, 'Setting value maksimal 5000 karakter')
    .optional()
    .default(''),
});

/**
 * Upsert setting schema (create or update by key)
 */
export const upsertSettingSchema = z.object({
  setting_key: z
    .string()
    .min(1, 'Setting key tidak boleh kosong')
    .max(50, 'Setting key maksimal 50 karakter')
    .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
  setting_value: z
    .string()
    .max(5000, 'Setting value maksimal 5000 karakter')
    .optional()
    .default(''),
});

/**
 * Batch update settings schema
 */
export const batchUpdateSettingsSchema = z.object({
  settings: z
    .array(
      z.object({
        setting_key: z
          .string()
          .min(1, 'Setting key tidak boleh kosong')
          .max(50, 'Setting key maksimal 50 karakter')
          .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
        setting_value: z
          .string()
          .max(5000, 'Setting value maksimal 5000 karakter')
          .optional()
          .default(''),
      })
    )
    .min(1, 'Minimal 1 setting harus diupdate')
    .max(50, 'Maksimal 50 settings dalam satu request'),
});

// Infer types from schemas
export type SettingKeyParam = z.infer<typeof settingKeyParamSchema>;
export type UpdateSettingInput = z.infer<typeof updateSettingSchema>;
export type UpsertSettingInput = z.infer<typeof upsertSettingSchema>;
export type BatchUpdateSettingsInput = z.infer<typeof batchUpdateSettingsSchema>;

// Export schemas
export const storeSettingSchemas = {
  settingKeyParam: settingKeyParamSchema,
  update: updateSettingSchema,
  upsert: upsertSettingSchema,
  batchUpdate: batchUpdateSettingsSchema,
};

export default storeSettingSchemas;
