import { z } from 'zod';
export declare const startShiftSchema: z.ZodObject<{
    start_cash: z.ZodNumber;
}, z.core.$strip>;
export declare const endShiftSchema: z.ZodObject<{
    end_cash: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const shiftIdParamSchema: z.ZodObject<{
    shift_id: z.ZodString;
}, z.core.$strip>;
export declare const shiftListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    size: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    user_id: z.ZodOptional<z.ZodString>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
    is_active: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>>;
}, z.core.$strip>;
export type StartShiftInput = z.infer<typeof startShiftSchema>;
export type EndShiftInput = z.infer<typeof endShiftSchema>;
export type ShiftIdParam = z.infer<typeof shiftIdParamSchema>;
export type ShiftListQuery = z.infer<typeof shiftListQuerySchema>;
//# sourceMappingURL=shift.schema.d.ts.map