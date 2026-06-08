"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFolderParamsSchema = exports.deleteImageParamsSchema = exports.uploadImageFolderParamsSchema = exports.uploadedFileSchema = exports.uploadTargetSchema = void 0;
const zod_1 = require("zod");
const upload_config_1 = require("../../../config/upload.config");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Allowed storage folder target.
 */
exports.uploadTargetSchema = zod_1.z.enum(['menu', 'logo'], {
    message: 'Target folder tidak valid. Gunakan menu atau logo.',
});
/**
 * Validate uploaded file (used for manual validation in service)
 */
exports.uploadedFileSchema = zod_1.z.object({
    fieldname: zod_1.z.string(),
    originalname: zod_1.z.string().min(1, 'Nama file tidak boleh kosong'),
    encoding: zod_1.z.string(),
    mimetype: zod_1.z.enum(upload_config_1.ALLOWED_IMAGE_TYPES, {
        message: 'Tipe file tidak valid. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.',
    }),
    size: zod_1.z.number().max(upload_config_1.MAX_FILE_SIZE, 'Ukuran file terlalu besar. Maksimal 5MB.'),
    buffer: zod_1.z.instanceof(Buffer),
});
/**
 * Upload image folder params schema
 */
exports.uploadImageFolderParamsSchema = zod_1.z.object({
    folder: exports.uploadTargetSchema,
});
/**
 * Delete image params schema
 */
exports.deleteImageParamsSchema = zod_1.z.object({
    filename: zod_1.z
        .string()
        .min(1, 'Nama file tidak boleh kosong')
        .regex(/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/i, 'Format nama file tidak valid'),
});
/**
 * Delete image params schema with folder target
 */
exports.deleteImageFolderParamsSchema = exports.deleteImageParamsSchema.extend({
    folder: exports.uploadTargetSchema,
});
//# sourceMappingURL=upload.schema.js.map