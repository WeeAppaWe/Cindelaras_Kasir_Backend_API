import { z } from 'zod';

// ============================================
// CONSTANTS (matches values in database)
// ============================================

/**
 * Opname status - matches 'stock_opnames.status' column in database
 */
export enum OpnameStatus {
    DRAFT = 'DRAFT',           // Opname masih dalam proses input
    COMPLETED = 'COMPLETED',   // Opname selesai, belum diaplikasikan
    APPLIED = 'APPLIED',       // Adjustment sudah diaplikasikan ke stok
    CANCELLED = 'CANCELLED',   // Opname dibatalkan
}

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Opname item schema (single item in opname)
 */
export const opnameItemSchema = z.object({
    ingredient_id: z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    physical_qty: z
        .number()
        .min(0, 'Jumlah fisik tidak boleh negatif'),
});

/**
 * Create opname schema
 */
export const createOpnameSchema = z.object({
    opname_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional(),
    items: z
        .array(opnameItemSchema)
        .min(1, 'Minimal harus ada 1 item opname'),
});

/**
 * Update opname schema
 */
export const updateOpnameSchema = z.object({
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional(),
    items: z
        .array(opnameItemSchema)
        .min(1, 'Minimal harus ada 1 item opname')
        .optional(),
});

/**
 * Change status schema
 */
export const changeStatusSchema = z.object({
    status: z
        .enum([OpnameStatus.COMPLETED, OpnameStatus.CANCELLED], {
            message: 'Status harus COMPLETED atau CANCELLED',
        }),
});

/**
 * Apply adjustment schema (just confirmation, no body needed)
 */
export const applyAdjustmentSchema = z.object({}).optional();

/**
 * Opname ID param schema
 */
export const opnameIdParamSchema = z.object({
    stock_opname_id: z
        .string()
        .uuid('Format stock_opname_id tidak valid'),
});

/**
 * Query params schema for list opnames
 */
export const opnameListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    status: z.enum([
        OpnameStatus.DRAFT,
        OpnameStatus.COMPLETED,
        OpnameStatus.APPLIED,
        OpnameStatus.CANCELLED,
    ]).optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD').optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD').optional(),
});

// Infer types from schemas
export type CreateOpnameInput = z.infer<typeof createOpnameSchema>;
export type UpdateOpnameInput = z.infer<typeof updateOpnameSchema>;
export type ChangeStatusInput = z.infer<typeof changeStatusSchema>;
export type OpnameIdParam = z.infer<typeof opnameIdParamSchema>;
export type OpnameListQuery = z.infer<typeof opnameListQuerySchema>;
export type OpnameItemInput = z.infer<typeof opnameItemSchema>;

// Export schemas
export const opnameSchemas = {
    create: createOpnameSchema,
    update: updateOpnameSchema,
    changeStatus: changeStatusSchema,
    applyAdjustment: applyAdjustmentSchema,
    opnameIdParam: opnameIdParamSchema,
    listQuery: opnameListQuerySchema,
    item: opnameItemSchema,
};

export default opnameSchemas;
