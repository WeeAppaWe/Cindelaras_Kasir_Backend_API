import { z } from 'zod';
/**
 * Setting key param schema
 */
export declare const settingKeyParamSchema: z.ZodObject<{
    setting_key: z.ZodString;
}, z.core.$strip>;
/**
 * Update single setting schema
 */
export declare const updateSettingSchema: z.ZodObject<{
    setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Upsert setting schema (create or update by key)
 */
export declare const upsertSettingSchema: z.ZodObject<{
    setting_key: z.ZodString;
    setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Batch update settings schema
 */
export declare const batchUpdateSettingsSchema: z.ZodObject<{
    settings: z.ZodArray<z.ZodObject<{
        setting_key: z.ZodString;
        setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SettingKeyParam = z.infer<typeof settingKeyParamSchema>;
export type UpdateSettingInput = z.infer<typeof updateSettingSchema>;
export type UpsertSettingInput = z.infer<typeof upsertSettingSchema>;
export type BatchUpdateSettingsInput = z.infer<typeof batchUpdateSettingsSchema>;
export declare const storeSettingSchemas: {
    settingKeyParam: z.ZodObject<{
        setting_key: z.ZodString;
    }, z.core.$strip>;
    update: z.ZodObject<{
        setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    upsert: z.ZodObject<{
        setting_key: z.ZodString;
        setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    batchUpdate: z.ZodObject<{
        settings: z.ZodArray<z.ZodObject<{
            setting_key: z.ZodString;
            setting_value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
};
export default storeSettingSchemas;
//# sourceMappingURL=store-setting.schema.d.ts.map