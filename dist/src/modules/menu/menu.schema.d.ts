import { z } from 'zod';
/**
 * Create menu schema
 */
export declare const createMenuSchema: z.ZodObject<{
    name: z.ZodString;
    category_id: z.ZodString;
    price: z.ZodNumber;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    is_available: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * Update menu schema
 */
export declare const updateMenuSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    category_id: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    is_available: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Menu ID param schema
 */
export declare const menuIdParamSchema: z.ZodObject<{
    menu_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list menus
 */
export declare const menuListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    category_id: z.ZodOptional<z.ZodString>;
    is_available: z.ZodPipe<z.ZodTransform<boolean, unknown>, z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type MenuIdParam = z.infer<typeof menuIdParamSchema>;
export type MenuListQuery = z.infer<typeof menuListQuerySchema>;
export declare const menuSchemas: {
    create: z.ZodObject<{
        name: z.ZodString;
        category_id: z.ZodString;
        price: z.ZodNumber;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        is_available: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        category_id: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        is_available: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    menuIdParam: z.ZodObject<{
        menu_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        category_id: z.ZodOptional<z.ZodString>;
        is_available: z.ZodPipe<z.ZodTransform<boolean, unknown>, z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
};
export default menuSchemas;
//# sourceMappingURL=menu.schema.d.ts.map