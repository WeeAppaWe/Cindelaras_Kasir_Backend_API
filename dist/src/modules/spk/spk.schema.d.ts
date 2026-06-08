import { z } from 'zod';
/**
 * Schema untuk konfigurasi analisa SPK
 */
export declare const spkConfigSchema: z.ZodObject<{
    target_days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    buffer_percent: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    lookback_days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    ingredient_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        all: "all";
        raw: "raw";
        semi: "semi";
    }>>>;
    supplier_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SPKConfigInput = z.infer<typeof spkConfigSchema>;
export declare const spkSchemas: {
    config: z.ZodObject<{
        target_days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        buffer_percent: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        lookback_days: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        ingredient_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            all: "all";
            raw: "raw";
            semi: "semi";
        }>>>;
        supplier_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default spkSchemas;
//# sourceMappingURL=spk.schema.d.ts.map