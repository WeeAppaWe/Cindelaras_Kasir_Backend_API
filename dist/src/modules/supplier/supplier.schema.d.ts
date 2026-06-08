import { z } from 'zod';
/**
 * Create supplier schema
 */
export declare const createSupplierSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Update supplier schema
 */
export declare const updateSupplierSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Supplier ID param schema
 */
export declare const supplierIdParamSchema: z.ZodObject<{
    supplier_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list suppliers
 */
export declare const supplierListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;
export type SupplierIdParam = z.infer<typeof supplierIdParamSchema>;
export type SupplierListQuery = z.infer<typeof supplierListQuerySchema>;
export declare const supplierSchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
    supplierIdParam: z.ZodObject<{
        supplier_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default supplierSchemas;
//# sourceMappingURL=supplier.schema.d.ts.map