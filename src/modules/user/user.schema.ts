import { z } from 'zod';

// ============================================
// CONSTANTS (matches values in database tables)
// ============================================

/**
 * Role names - matches 'roles' table in database
 */
export enum RoleName {
    ADMIN = 'ADMIN',
    CASHIER = 'CASHIER',
}

/**
 * User status names - matches 'user_statuses' table in database
 */
export enum UserStatusName {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
}

// ============================================
// ZOD SCHEMAS
// ============================================

const phoneNumberSchema = z
    .string()
    .min(9, 'Nomor WhatsApp minimal 9 karakter')
    .max(20, 'Nomor WhatsApp maksimal 20 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor WhatsApp tidak valid');

/**
 * Create user schema
 */
export const createUserSchema = z.object({
    username: z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore'),
    password: z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
    name: z
        .string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
    phone_number: phoneNumberSchema.optional(),
    role_id: z
        .string()
        .uuid('Format role_id tidak valid'),
    user_status_id: z
        .string()
        .uuid('Format user_status_id tidak valid')
        .optional(),
});

/**
 * Update user schema
 */
export const updateUserSchema = z.object({
    username: z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore')
        .optional(),
    password: z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter')
        .optional(),
    name: z
        .string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter')
        .optional(),
    phone_number: phoneNumberSchema.optional(),
    role_id: z
        .string()
        .uuid('Format role_id tidak valid')
        .optional(),
    user_status_id: z
        .string()
        .uuid('Format user_status_id tidak valid')
        .optional(),
});

/**
 * User ID param schema
 */
export const userIdParamSchema = z.object({
    user_id: z
        .string()
        .uuid('Format user_id tidak valid'),
});

/**
 * Query params schema for list users
 */
export const userListQuerySchema = z.object({
    batch: z.coerce.number().min(1).default(1).optional(),
    size: z.coerce.number().min(1).max(100).default(10).optional(),
    search: z.string().optional(),
    role_id: z.string().uuid('Format role_id tidak valid').optional(),
    user_status_id: z.string().uuid('Format user_status_id tidak valid').optional(),
});

// Infer types from schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;

// Export schemas
export const userSchemas = {
    create: createUserSchema,
    update: updateUserSchema,
    userIdParam: userIdParamSchema,
    listQuery: userListQuerySchema,
};

export default userSchemas;
