import multer from 'multer';

// ============================================
// CONSTANTS
// ============================================

/**
 * Allowed image MIME types
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

/**
 * Maximum file size (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ============================================
// MULTER CONFIGURATION
// ============================================

/**
 * Storage configuration.
 *
 * Keep files in memory because the final persistence layer is Supabase Storage,
 * not the local filesystem.
 */
const storage = multer.memoryStorage();

/**
 * File filter - only allow images
 */
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype as AllowedImageType)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak diizinkan. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.'));
  }
};

/**
 * Multer upload middleware instance
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

export default upload;
