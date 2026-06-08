"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUrl = exports.deleteImage = exports.processUploadedImage = exports.ALLOWED_IMAGE_TYPES = exports.MAX_FILE_SIZE = exports.upload = void 0;
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const upload_config_1 = require("../../../config/upload.config");
Object.defineProperty(exports, "upload", { enumerable: true, get: function () { return upload_config_1.upload; } });
Object.defineProperty(exports, "MAX_FILE_SIZE", { enumerable: true, get: function () { return upload_config_1.MAX_FILE_SIZE; } });
Object.defineProperty(exports, "ALLOWED_IMAGE_TYPES", { enumerable: true, get: function () { return upload_config_1.ALLOWED_IMAGE_TYPES; } });
const supabase_config_1 = require("../../../config/supabase.config");
const supabase_storage_utility_1 = require("../../../utility/supabase-storage.utility");
const DEFAULT_UPLOAD_TARGET = 'menu';
// ============================================
// SERVICE FUNCTIONS
// ============================================
/**
 * Process uploaded image and return response data
 */
const processUploadedImage = async (file, target = DEFAULT_UPLOAD_TARGET) => {
    if (!file) {
        throw new error_validation_exception_1.ErrorValidationException('File tidak ditemukan');
    }
    if (!file.buffer) {
        throw new error_validation_exception_1.ErrorValidationException('File upload tidak valid');
    }
    try {
        const uploaded = await (0, supabase_storage_utility_1.uploadImageToSupabase)(file, { target });
        return {
            filename: uploaded.filename,
            folder: uploaded.folder,
            path: uploaded.path,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: uploaded.publicUrl,
        };
    }
    catch (error) {
        console.error(`--- Upload Service Error: ${error.message}`);
        throw new error_validation_exception_1.ErrorValidationException('Gagal mengupload file');
    }
};
exports.processUploadedImage = processUploadedImage;
/**
 * Delete an uploaded image by filename
 */
const deleteImage = async (filename, target = DEFAULT_UPLOAD_TARGET) => {
    try {
        await (0, supabase_storage_utility_1.deleteImageFromSupabase)(filename, target);
        const folder = (0, supabase_config_1.getSupabaseStorageFolder)(target);
        return {
            success: true,
            filename,
            path: `${folder}/${filename}`,
            message: 'File berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Upload Service Error: ${error.message}`);
        if (error instanceof error_not_found_exception_1.ErrorNotFoundException) {
            throw error;
        }
        throw new error_validation_exception_1.ErrorValidationException('Gagal menghapus file');
    }
};
exports.deleteImage = deleteImage;
/**
 * Get full URL for an image
 */
const getImageUrl = (filename, target = DEFAULT_UPLOAD_TARGET) => {
    return (0, supabase_storage_utility_1.getSupabasePublicUrl)(filename, target);
};
exports.getImageUrl = getImageUrl;
// ============================================
// DEFAULT EXPORT
// ============================================
exports.default = {
    upload: upload_config_1.upload,
    processUploadedImage: exports.processUploadedImage,
    deleteImage: exports.deleteImage,
    getImageUrl: exports.getImageUrl,
};
//# sourceMappingURL=upload.service.js.map