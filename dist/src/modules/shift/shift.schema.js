"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftListQuerySchema = exports.shiftIdParamSchema = exports.endShiftSchema = exports.startShiftSchema = void 0;
const zod_1 = require("zod");
// ============================================
// START SHIFT SCHEMA (Buka Kas)
// ============================================
exports.startShiftSchema = zod_1.z.object({
    start_cash: zod_1.z.number()
        .min(0, { message: 'Modal awal tidak boleh negatif' })
        .max(100000000, { message: 'Modal awal maksimal 100 juta' }),
});
// ============================================
// END SHIFT SCHEMA (Tutup Kas)
// ============================================
exports.endShiftSchema = zod_1.z.object({
    end_cash: zod_1.z.number()
        .min(0, { message: 'Kas akhir tidak boleh negatif' })
        .max(100000000, { message: 'Kas akhir maksimal 100 juta' }),
    notes: zod_1.z.string()
        .max(500, { message: 'Catatan maksimal 500 karakter' })
        .optional(),
});
// ============================================
// PARAM SCHEMAS
// ============================================
exports.shiftIdParamSchema = zod_1.z.object({
    shift_id: zod_1.z.string().uuid({ message: 'Format shift ID tidak valid' }),
});
// ============================================
// LIST QUERY SCHEMA
// ============================================
exports.shiftListQuerySchema = zod_1.z.object({
    batch: zod_1.z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(zod_1.z.number().min(1))
        .optional(),
    size: zod_1.z.string()
        .transform((val) => parseInt(val, 10))
        .pipe(zod_1.z.number().min(1).max(100))
        .optional(),
    user_id: zod_1.z.string().uuid({ message: 'Format user ID tidak valid' }).optional(),
    start_date: zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    end_date: zod_1.z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
        .optional(),
    is_active: zod_1.z.string()
        .transform((val) => val === 'true')
        .optional(),
});
//# sourceMappingURL=shift.schema.js.map