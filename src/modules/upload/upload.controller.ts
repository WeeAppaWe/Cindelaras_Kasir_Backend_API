import { Response, NextFunction } from 'express';
import uploadService from './upload.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';
import { UploadedFile, UploadImageTarget } from './upload.types';

/**
 * Upload Image
 * POST /api/upload/image
 */
export const uploadImage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const file = req.file as UploadedFile | undefined;

    if (!file) {
      res.status(400).json(responseApi(
        { code: 400, message: 'File tidak ditemukan. Mohon pilih file gambar.' },
        null
      ));
      return;
    }

    const target = req.params.folder as UploadImageTarget | undefined;
    const data = await uploadService.processUploadedImage(file, target);
    res.status(201).json(responseApi({ code: 201, message: 'Gambar berhasil diupload' }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Image
 * DELETE /api/upload/image/:filename
 */
export const deleteImage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { filename } = req.params;
    const target = req.params.folder as UploadImageTarget | undefined;
    const data = await uploadService.deleteImage(filename, target);
    res.status(200).json(responseApi({ code: 200, message: 'Gambar berhasil dihapus' }, data));
  } catch (error) {
    next(error);
  }
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  uploadImage,
  deleteImage,
};
