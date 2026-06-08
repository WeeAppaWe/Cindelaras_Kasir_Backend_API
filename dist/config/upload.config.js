"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.MAX_FILE_SIZE = exports.ALLOWED_IMAGE_TYPES = void 0;
const multer_1 = __importDefault(require("multer"));
// ============================================
// CONSTANTS
// ============================================
/**
 * Allowed image MIME types
 */
exports.ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
];
/**
 * Maximum file size (5MB)
 */
exports.MAX_FILE_SIZE = 5 * 1024 * 1024;
// ============================================
// MULTER CONFIGURATION
// ============================================
/**
 * Storage configuration.
 *
 * Keep files in memory because the final persistence layer is Supabase Storage,
 * not the local filesystem.
 */
const storage = multer_1.default.memoryStorage();
/**
 * File filter - only allow images
 */
const fileFilter = (_req, file, cb) => {
    if (exports.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Tipe file tidak diizinkan. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.'));
    }
};
/**
 * Multer upload middleware instance
 */
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: exports.MAX_FILE_SIZE,
    },
});
exports.default = exports.upload;
//# sourceMappingURL=upload.config.js.map