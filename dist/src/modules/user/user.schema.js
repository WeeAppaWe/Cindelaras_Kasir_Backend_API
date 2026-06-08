"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = exports.userListQuerySchema = exports.userIdParamSchema = exports.updateUserSchema = exports.createUserSchema = exports.UserStatusName = exports.RoleName = void 0;
const zod_1 = require("zod");
// ============================================
// CONSTANTS (matches values in database tables)
// ============================================
/**
 * Role names - matches 'roles' table in database
 */
var RoleName;
(function (RoleName) {
    RoleName["ADMIN"] = "ADMIN";
    RoleName["CASHIER"] = "CASHIER";
})(RoleName || (exports.RoleName = RoleName = {}));
/**
 * User status names - matches 'user_statuses' table in database
 */
var UserStatusName;
(function (UserStatusName) {
    UserStatusName["ACTIVE"] = "ACTIVE";
    UserStatusName["INACTIVE"] = "INACTIVE";
    UserStatusName["DELETED"] = "DELETED";
})(UserStatusName || (exports.UserStatusName = UserStatusName = {}));
// ============================================
// ZOD SCHEMAS
// ============================================
const phoneNumberSchema = zod_1.z
    .string()
    .min(9, 'Nomor WhatsApp minimal 9 karakter')
    .max(20, 'Nomor WhatsApp maksimal 20 karakter')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor WhatsApp tidak valid');
/**
 * Create user schema
 */
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore'),
    password: zod_1.z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter'),
    name: zod_1.z
        .string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
    phone_number: phoneNumberSchema.optional(),
    role_id: zod_1.z
        .string()
        .uuid('Format role_id tidak valid'),
    user_status_id: zod_1.z
        .string()
        .uuid('Format user_status_id tidak valid')
        .optional(),
});
/**
 * Update user schema
 */
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, 'Username minimal 3 karakter')
        .max(50, 'Username maksimal 50 karakter')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh berisi huruf, angka, dan underscore')
        .optional(),
    password: zod_1.z
        .string()
        .min(6, 'Password minimal 6 karakter')
        .max(255, 'Password maksimal 255 karakter')
        .optional(),
    name: zod_1.z
        .string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter')
        .optional(),
    phone_number: phoneNumberSchema.optional(),
    role_id: zod_1.z
        .string()
        .uuid('Format role_id tidak valid')
        .optional(),
    user_status_id: zod_1.z
        .string()
        .uuid('Format user_status_id tidak valid')
        .optional(),
});
/**
 * User ID param schema
 */
exports.userIdParamSchema = zod_1.z.object({
    user_id: zod_1.z
        .string()
        .uuid('Format user_id tidak valid'),
});
/**
 * Query params schema for list users
 */
exports.userListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    role_id: zod_1.z.string().uuid('Format role_id tidak valid').optional(),
    user_status_id: zod_1.z.string().uuid('Format user_status_id tidak valid').optional(),
});
// Export schemas
exports.userSchemas = {
    create: exports.createUserSchema,
    update: exports.updateUserSchema,
    userIdParam: exports.userIdParamSchema,
    listQuery: exports.userListQuerySchema,
};
exports.default = exports.userSchemas;
//# sourceMappingURL=user.schema.js.map