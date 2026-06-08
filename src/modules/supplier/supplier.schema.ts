import { z } from 'zod';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Create supplier schema
 */
export const createSupplierSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama supplier minimal 2 karakter')
        .max(100, 'Nama supplier maksimal 100 karakter'),
    phone: z
        .string()
        .max(20, 'Nomor telepon maksimal 20 karakter')
        .regex(/^[0-9+\-\s()]*$/, 'Format nomor telepon tidak valid')
        .optional()
        .nullable(),
    address: z
        .string()
        .max(500, 'Alamat maksimal 500 karakter')
        .optional()
        .nullable(),
});

/**
 * Update supplier schema
 */
export const updateSupplierSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama supplier minimal 2 karakter')
        .max(100, 'Nama supplier maksimal 100 karakter')
        .optional(),
    phone: z
        .string()
        .max(20, 'Nomor telepon maksimal 20 karakter')
        .regex(/^[0-9+\-\s()]*$/, 'Format nomor telepon tidak valid')
        .optional()
        .nullable(),
    address: z
        .string()
        .max(500, 'Alamat maksimal 500 karakter')
        .optional()
        .nullable(),
});

/**
 * Supplier ID param schema
 */
export const supplierIdParamSchema = z.object({
    supplier_id: z
        .string()
        .uuid('Format supplier_id tidak valid'),
});

/**
 * Query params schema for list suppliers
 */
export const supplierListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
});

// Infer types from schemas
export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;
export type SupplierIdParam = z.infer<typeof supplierIdParamSchema>;
export type SupplierListQuery = z.infer<typeof supplierListQuerySchema>;

// Export schemas
export const supplierSchemas = {
    create: createSupplierSchema,
    update: updateSupplierSchema,
    supplierIdParam: supplierIdParamSchema,
    listQuery: supplierListQuerySchema,
};

export default supplierSchemas;
