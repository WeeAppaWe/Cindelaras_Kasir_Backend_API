import { z } from 'zod';
/**
 * Create cash movement schema
 */
export declare const createCashMovementSchema: z.ZodObject<{
    type: z.ZodEnum<{
        IN: "IN";
        OUT: "OUT";
    }>;
    amount: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Cash movement ID param schema
 */
export declare const cashMovementIdParamSchema: z.ZodObject<{
    cash_movement_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list cash movements
 */
export declare const cashMovementListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    type: z.ZodOptional<z.ZodEnum<{
        IN: "IN";
        OUT: "OUT";
    }>>;
    shift_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCashMovementInput = z.infer<typeof createCashMovementSchema>;
export type CashMovementIdParam = z.infer<typeof cashMovementIdParamSchema>;
export type CashMovementListQuery = z.infer<typeof cashMovementListQuerySchema>;
export declare const cashMovementSchemas: {
    create: z.ZodObject<{
        type: z.ZodEnum<{
            IN: "IN";
            OUT: "OUT";
        }>;
        amount: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    cashMovementIdParam: z.ZodObject<{
        cash_movement_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        type: z.ZodOptional<z.ZodEnum<{
            IN: "IN";
            OUT: "OUT";
        }>>;
        shift_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default cashMovementSchemas;
//# sourceMappingURL=cash-movement.schema.d.ts.map