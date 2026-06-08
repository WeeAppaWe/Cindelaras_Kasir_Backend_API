import { z } from 'zod';
/**
 * Opname status - matches 'stock_opnames.status' column in database
 */
export declare enum OpnameStatus {
    DRAFT = "DRAFT",// Opname masih dalam proses input
    COMPLETED = "COMPLETED",// Opname selesai, belum diaplikasikan
    APPLIED = "APPLIED",// Adjustment sudah diaplikasikan ke stok
    CANCELLED = "CANCELLED"
}
/**
 * Opname item schema (single item in opname)
 */
export declare const opnameItemSchema: z.ZodObject<{
    ingredient_id: z.ZodString;
    physical_qty: z.ZodNumber;
}, z.core.$strip>;
/**
 * Create opname schema
 */
export declare const createOpnameSchema: z.ZodObject<{
    opname_date: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        ingredient_id: z.ZodString;
        physical_qty: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Update opname schema
 */
export declare const updateOpnameSchema: z.ZodObject<{
    notes: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ingredient_id: z.ZodString;
        physical_qty: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * Change status schema
 */
export declare const changeStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        COMPLETED: OpnameStatus.COMPLETED;
        CANCELLED: OpnameStatus.CANCELLED;
    }>;
}, z.core.$strip>;
/**
 * Apply adjustment schema (just confirmation, no body needed)
 */
export declare const applyAdjustmentSchema: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
/**
 * Opname ID param schema
 */
export declare const opnameIdParamSchema: z.ZodObject<{
    stock_opname_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list opnames
 */
export declare const opnameListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: OpnameStatus.DRAFT;
        COMPLETED: OpnameStatus.COMPLETED;
        APPLIED: OpnameStatus.APPLIED;
        CANCELLED: OpnameStatus.CANCELLED;
    }>>;
    start_date: z.ZodOptional<z.ZodString>;
    end_date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateOpnameInput = z.infer<typeof createOpnameSchema>;
export type UpdateOpnameInput = z.infer<typeof updateOpnameSchema>;
export type ChangeStatusInput = z.infer<typeof changeStatusSchema>;
export type OpnameIdParam = z.infer<typeof opnameIdParamSchema>;
export type OpnameListQuery = z.infer<typeof opnameListQuerySchema>;
export type OpnameItemInput = z.infer<typeof opnameItemSchema>;
export declare const opnameSchemas: {
    create: z.ZodObject<{
        opname_date: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            ingredient_id: z.ZodString;
            physical_qty: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        notes: z.ZodOptional<z.ZodString>;
        items: z.ZodOptional<z.ZodArray<z.ZodObject<{
            ingredient_id: z.ZodString;
            physical_qty: z.ZodNumber;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    changeStatus: z.ZodObject<{
        status: z.ZodEnum<{
            COMPLETED: OpnameStatus.COMPLETED;
            CANCELLED: OpnameStatus.CANCELLED;
        }>;
    }, z.core.$strip>;
    applyAdjustment: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    opnameIdParam: z.ZodObject<{
        stock_opname_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            DRAFT: OpnameStatus.DRAFT;
            COMPLETED: OpnameStatus.COMPLETED;
            APPLIED: OpnameStatus.APPLIED;
            CANCELLED: OpnameStatus.CANCELLED;
        }>>;
        start_date: z.ZodOptional<z.ZodString>;
        end_date: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    item: z.ZodObject<{
        ingredient_id: z.ZodString;
        physical_qty: z.ZodNumber;
    }, z.core.$strip>;
};
export default opnameSchemas;
//# sourceMappingURL=opname.schema.d.ts.map