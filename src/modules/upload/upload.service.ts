import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { upload, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '../../../config/upload.config';
import { getSupabaseStorageFolder } from '../../../config/supabase.config';
import {
  deleteImageFromSupabase,
  getSupabasePublicUrl,
  uploadImageToSupabase,
} from '../../../utility/supabase-storage.utility';
import { UploadedFile, UploadImageResponse, DeleteImageResponse, UploadImageTarget } from './upload.types';

const DEFAULT_UPLOAD_TARGET: UploadImageTarget = 'menu';

// ============================================
// RE-EXPORT CONFIG FOR CONVENIENCE
// ============================================

export { upload, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES };

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Process uploaded image and return response data
 */
export const processUploadedImage = async (
  file: UploadedFile,
  target: UploadImageTarget = DEFAULT_UPLOAD_TARGET
): Promise<UploadImageResponse> => {
  if (!file) {
    throw new ErrorValidationException('File tidak ditemukan');
  }

  if (!file.buffer) {
    throw new ErrorValidationException('File upload tidak valid');
  }

  try {
    const uploaded = await uploadImageToSupabase(file, { target });

    return {
      filename: uploaded.filename,
      folder: uploaded.folder,
      path: uploaded.path,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: uploaded.publicUrl,
    };
  } catch (error) {
    console.error(`--- Upload Service Error: ${(error as Error).message}`);
    throw new ErrorValidationException('Gagal mengupload file');
  }
};

/**
 * Delete an uploaded image by filename
 */
export const deleteImage = async (
  filename: string,
  target: UploadImageTarget = DEFAULT_UPLOAD_TARGET
): Promise<DeleteImageResponse> => {
  try {
    await deleteImageFromSupabase(filename, target);
    const folder = getSupabaseStorageFolder(target);

    return {
      success: true,
      filename,
      path: `${folder}/${filename}`,
      message: 'File berhasil dihapus',
    };
  } catch (error) {
    console.error(`--- Upload Service Error: ${(error as Error).message}`);
    if (error instanceof ErrorNotFoundException) {
      throw error;
    }
    throw new ErrorValidationException('Gagal menghapus file');
  }
};

/**
 * Get full URL for an image
 */
export const getImageUrl = (
  filename: string,
  target: UploadImageTarget = DEFAULT_UPLOAD_TARGET
): string => {
  return getSupabasePublicUrl(filename, target);
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  upload,
  processUploadedImage,
  deleteImage,
  getImageUrl,
};
