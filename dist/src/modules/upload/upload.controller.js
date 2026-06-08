"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const upload_service_1 = __importDefault(require("./upload.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Upload Image
 * POST /api/upload/image
 */
const uploadImage = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json((0, response_api_1.default)({ code: 400, message: 'File tidak ditemukan. Mohon pilih file gambar.' }, null));
            return;
        }
        const target = req.params.folder;
        const data = await upload_service_1.default.processUploadedImage(file, target);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Gambar berhasil diupload' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.uploadImage = uploadImage;
/**
 * Delete Image
 * DELETE /api/upload/image/:filename
 */
const deleteImage = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const target = req.params.folder;
        const data = await upload_service_1.default.deleteImage(filename, target);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Gambar berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteImage = deleteImage;
// ============================================
// DEFAULT EXPORT
// ============================================
exports.default = {
    uploadImage: exports.uploadImage,
    deleteImage: exports.deleteImage,
};
//# sourceMappingURL=upload.controller.js.map