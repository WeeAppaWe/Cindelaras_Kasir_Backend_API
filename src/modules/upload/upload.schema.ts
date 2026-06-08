import { z } from 'zod';
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../../config/upload.config';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Allowed storage folder target.
 */
export const uploadTargetSchema = z.enum(['menu', 'logo'], {
  message: 'Target folder tidak valid. Gunakan menu atau logo.',
});

/**
 * Validate uploaded file (used for manual validation in service)
 */
export const uploadedFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string().min(1, 'Nama file tidak boleh kosong'),
  encoding: z.string(),
  mimetype: z.enum(ALLOWED_IMAGE_TYPES, {
    message: 'Tipe file tidak valid. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.',
  }),
  size: z.number().max(MAX_FILE_SIZE, 'Ukuran file terlalu besar. Maksimal 5MB.'),
  buffer: z.instanceof(Buffer),
});

/**
 * Upload image folder params schema
 */
export const uploadImageFolderParamsSchema = z.object({
  folder: uploadTargetSchema,
});

/**
 * Delete image params schema
 */
export const deleteImageParamsSchema = z.object({
  filename: z
    .string()
    .min(1, 'Nama file tidak boleh kosong')
    .regex(/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/i, 'Format nama file tidak valid'),
});

/**
 * Delete image params schema with folder target
 */
export const deleteImageFolderParamsSchema = deleteImageParamsSchema.extend({
  folder: uploadTargetSchema,
});

// ============================================
// TYPE EXPORTS
// ============================================

export type UploadedFileInput = z.infer<typeof uploadedFileSchema>;
export type UploadImageFolderParams = z.infer<typeof uploadImageFolderParamsSchema>;
export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;
export type DeleteImageFolderParams = z.infer<typeof deleteImageFolderParamsSchema>;
