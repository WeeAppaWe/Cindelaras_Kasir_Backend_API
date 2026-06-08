import multer from 'multer';
/**
 * Allowed image MIME types
 */
export declare const ALLOWED_IMAGE_TYPES: readonly ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];
/**
 * Maximum file size (5MB)
 */
export declare const MAX_FILE_SIZE: number;
/**
 * Multer upload middleware instance
 */
export declare const upload: multer.Multer;
export default upload;
//# sourceMappingURL=upload.config.d.ts.map