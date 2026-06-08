"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingSchemas = exports.batchUpdateSettingsSchema = exports.upsertSettingSchema = exports.updateSettingSchema = exports.settingKeyParamSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Setting key param schema
 */
exports.settingKeyParamSchema = zod_1.z.object({
    setting_key: zod_1.z
        .string()
        .min(1, 'Setting key tidak boleh kosong')
        .max(50, 'Setting key maksimal 50 karakter')
        .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
});
/**
 * Update single setting schema
 */
exports.updateSettingSchema = zod_1.z.object({
    setting_value: zod_1.z
        .string()
        .max(5000, 'Setting value maksimal 5000 karakter')
        .optional()
        .default(''),
});
/**
 * Upsert setting schema (create or update by key)
 */
exports.upsertSettingSchema = zod_1.z.object({
    setting_key: zod_1.z
        .string()
        .min(1, 'Setting key tidak boleh kosong')
        .max(50, 'Setting key maksimal 50 karakter')
        .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
    setting_value: zod_1.z
        .string()
        .max(5000, 'Setting value maksimal 5000 karakter')
        .optional()
        .default(''),
});
/**
 * Batch update settings schema
 */
exports.batchUpdateSettingsSchema = zod_1.z.object({
    settings: zod_1.z
        .array(zod_1.z.object({
        setting_key: zod_1.z
            .string()
            .min(1, 'Setting key tidak boleh kosong')
            .max(50, 'Setting key maksimal 50 karakter')
            .regex(/^[a-z_]+$/, 'Setting key hanya boleh huruf kecil dan underscore'),
        setting_value: zod_1.z
            .string()
            .max(5000, 'Setting value maksimal 5000 karakter')
            .optional()
            .default(''),
    }))
        .min(1, 'Minimal 1 setting harus diupdate')
        .max(50, 'Maksimal 50 settings dalam satu request'),
});
// Export schemas
exports.storeSettingSchemas = {
    settingKeyParam: exports.settingKeyParamSchema,
    update: exports.updateSettingSchema,
    upsert: exports.upsertSettingSchema,
    batchUpdate: exports.batchUpdateSettingsSchema,
};
exports.default = exports.storeSettingSchemas;
//# sourceMappingURL=store-setting.schema.js.map