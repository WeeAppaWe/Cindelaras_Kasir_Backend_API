import { z } from 'zod';

// ============================================
// START SHIFT SCHEMA (Buka Kas)
// ============================================

export const startShiftSchema = z.object({
    start_cash: z.number()
        .min(0, { message: 'Modal awal tidak boleh negatif' })
        .max(100000000, { message: 'Modal awal maksimal 100 juta' }),
});

// ============================================
// END SHIFT SCHEMA (Tutup Kas)
// ============================================

export const endShiftSchema = z.object({
    end_cash: z.number()
        .min(0, { message: 'Kas akhir tidak boleh negatif' })
        .max(100000000, { message: 'Kas akhir maksimal 100 juta' }),
    notes: z.string()
        .max(500, { message: 'Catatan maksimal 500 karakter' })
        .optional(),
});

// ============================================
// PARAM SCHEMAS
// ============================================

export const shiftIdParamSchema = z.object({
    shift_id: z.string().uuid({ message: 'Format shift ID tidak valid' }),
});

// ============================================
// LIST QUERY SCHEMA
// ============================================

export const shiftListQuerySchema = z.object({
    batch: z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().min(1))
        .optional(),
    size: z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().min(1).max(100))
        .optional(),
    user_id: z.string().uuid({ message: 'Format user ID tidak valid' }).optional(),
    start_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    end_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    is_active: z.string()
        .transform((val) => val === 'true')
        .optional(),
});

// ============================================
// EXPORT TYPES
// ============================================

export type StartShiftInput = z.infer<typeof startShiftSchema>;
export type EndShiftInput = z.infer<typeof endShiftSchema>;
export type ShiftIdParam = z.infer<typeof shiftIdParamSchema>;
export type ShiftListQuery = z.infer<typeof shiftListQuerySchema>;
