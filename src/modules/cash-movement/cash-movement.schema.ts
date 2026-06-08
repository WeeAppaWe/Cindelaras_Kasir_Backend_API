import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create cash movement schema
 */
export const createCashMovementSchema = z.object({
    type: z
        .enum(['IN', 'OUT'], { message: 'Tipe mutasi harus IN atau OUT' }),
    amount: z
        .number()
        .positive('Jumlah harus lebih dari 0'),
    note: z
        .string()
        .max(255, 'Catatan maksimal 255 karakter')
        .optional(),
});

/**
 * Cash movement ID param schema
 */
export const cashMovementIdParamSchema = z.object({
    cash_movement_id: z
        .string()
        .uuid('Format cash_movement_id tidak valid'),
});

/**
 * Query params schema for list cash movements
 */
export const cashMovementListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    type: z.enum(['IN', 'OUT']).optional(),
    shift_id: z.string().uuid('Format shift_id tidak valid').optional(),
});

// Infer types from schemas
export type CreateCashMovementInput = z.infer<typeof createCashMovementSchema>;
export type CashMovementIdParam = z.infer<typeof cashMovementIdParamSchema>;
export type CashMovementListQuery = z.infer<typeof cashMovementListQuerySchema>;

// Export schemas
export const cashMovementSchemas = {
    create: createCashMovementSchema,
    cashMovementIdParam: cashMovementIdParamSchema,
    listQuery: cashMovementListQuerySchema,
};

export default cashMovementSchemas;
