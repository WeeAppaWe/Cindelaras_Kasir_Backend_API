import { z } from 'zod';
/**
 * Role names - matches 'roles' table in database
 */
export declare enum RoleName {
    ADMIN = "ADMIN",
    CASHIER = "CASHIER"
}
/**
 * User status names - matches 'user_statuses' table in database
 */
export declare enum UserStatusName {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}
/**
 * Create user schema
 */
export declare const createUserSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    phone_number: z.ZodOptional<z.ZodString>;
    role_id: z.ZodString;
    user_status_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Update user schema
 */
export declare const updateUserSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
    role_id: z.ZodOptional<z.ZodString>;
    user_status_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * User ID param schema
 */
export declare const userIdParamSchema: z.ZodObject<{
    user_id: z.ZodString;
}, z.core.$strip>;
/**
 * Query params schema for list users
 */
export declare const userListQuerySchema: z.ZodObject<{
    batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    role_id: z.ZodOptional<z.ZodString>;
    user_status_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;
export declare const userSchemas: {
    create: z.ZodObject<{
        username: z.ZodString;
        password: z.ZodString;
        name: z.ZodString;
        phone_number: z.ZodOptional<z.ZodString>;
        role_id: z.ZodString;
        user_status_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    update: z.ZodObject<{
        username: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        role_id: z.ZodOptional<z.ZodString>;
        user_status_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    userIdParam: z.ZodObject<{
        user_id: z.ZodString;
    }, z.core.$strip>;
    listQuery: z.ZodObject<{
        batch: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        size: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
        search: z.ZodOptional<z.ZodString>;
        role_id: z.ZodOptional<z.ZodString>;
        user_status_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
export default userSchemas;
//# sourceMappingURL=user.schema.d.ts.map