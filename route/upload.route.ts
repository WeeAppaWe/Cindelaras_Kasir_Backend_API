import express, { Router, Request, Response, NextFunction } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
  deleteImageFolderParamsSchema,
  deleteImageParamsSchema,
  uploadImageFolderParamsSchema,
} from '../src/modules/upload/upload.schema';
import uploadService from '../src/modules/upload/upload.service';
import uploadController from '../src/modules/upload/upload.controller';

const router: Router = express.Router();

const pathGroup = 'upload';

// Role configurations
const adminOnly = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Multer error handler middleware
// ============================================
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        code: 400,
        message: 'Ukuran file terlalu besar. Maksimal 5MB.',
        response: null,
      });
    }
    if (err.message) {
      return res.status(400).json({
        code: 400,
        message: err.message,
        response: null,
      });
    }
  }
  next(err);
};

// ============================================
// Upload Routes (ADMIN only)
// ============================================

router.post(
  `/${pathGroup}/image/:folder`,
  ...adminOnly,
  zodValidation(uploadImageFolderParamsSchema, 'params'),
  uploadService.upload.single('image'),
  handleMulterError,
  uploadController.uploadImage
);

router.post(
  `/${pathGroup}/image`,
  ...adminOnly,
  uploadService.upload.single('image'),
  handleMulterError,
  uploadController.uploadImage
);

router.delete(
  `/${pathGroup}/image/:folder/:filename`,
  ...adminOnly,
  zodValidation(deleteImageFolderParamsSchema, 'params'),
  uploadController.deleteImage
);

router.delete(
  `/${pathGroup}/image/:filename`,
  ...adminOnly,
  zodValidation(deleteImageParamsSchema, 'params'),
  uploadController.deleteImage
);

export default router;
