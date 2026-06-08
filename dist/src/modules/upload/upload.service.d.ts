import { upload, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '../../../config/upload.config';
import { UploadedFile, UploadImageResponse, DeleteImageResponse, UploadImageTarget } from './upload.types';
export { upload, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES };
/**
 * Process uploaded image and return response data
 */
export declare const processUploadedImage: (file: UploadedFile, target?: UploadImageTarget) => Promise<UploadImageResponse>;
/**
 * Delete an uploaded image by filename
 */
export declare const deleteImage: (filename: string, target?: UploadImageTarget) => Promise<DeleteImageResponse>;
/**
 * Get full URL for an image
 */
export declare const getImageUrl: (filename: string, target?: UploadImageTarget) => string;
declare const _default: {
    upload: import("multer").Multer;
    processUploadedImage: (file: UploadedFile, target?: UploadImageTarget) => Promise<UploadImageResponse>;
    deleteImage: (filename: string, target?: UploadImageTarget) => Promise<DeleteImageResponse>;
    getImageUrl: (filename: string, target?: UploadImageTarget) => string;
};
export default _default;
//# sourceMappingURL=upload.service.d.ts.map