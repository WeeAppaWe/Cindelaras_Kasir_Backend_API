"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabasePublicUrl = exports.deleteImageFromSupabase = exports.uploadImageToSupabase = exports.buildStorageObjectPath = exports.buildStorageFilename = void 0;
const path_1 = __importDefault(require("path"));
const error_not_found_exception_1 = require("../exception/error-not-found.exception");
const supabase_config_1 = require("../config/supabase.config");
let uuidModulePromise = null;
const DEFAULT_STORAGE_TARGET = 'menu';
const generateUuidV7 = async () => {
    uuidModulePromise = uuidModulePromise || import('uuid').then((uuidModule) => ({
        v7: uuidModule.v7,
    }));
    const { v7: uuidv7 } = await uuidModulePromise;
    return uuidv7();
};
/**
 * Build a unique object key while preserving the original image extension.
 */
const buildStorageFilename = async (originalName) => {
    const ext = path_1.default.extname(originalName).toLowerCase();
    const uuid = await generateUuidV7();
    return `${uuid}${ext}`;
};
exports.buildStorageFilename = buildStorageFilename;
/**
 * Build Supabase Storage object path for the selected upload target.
 */
const buildStorageObjectPath = async (originalName, target = DEFAULT_STORAGE_TARGET) => {
    const filename = await (0, exports.buildStorageFilename)(originalName);
    const folder = (0, supabase_config_1.getSupabaseStorageFolder)(target);
    return {
        filename,
        folder,
        path: `${folder}/${filename}`,
    };
};
exports.buildStorageObjectPath = buildStorageObjectPath;
/**
 * Upload an image buffer to Supabase Storage.
 */
const uploadImageToSupabase = async (file, options = {}) => {
    const supabase = (0, supabase_config_1.getSupabaseClient)();
    const object = await (0, exports.buildStorageObjectPath)(file.originalname, options.target || DEFAULT_STORAGE_TARGET);
    const { data, error } = await supabase.storage
        .from(supabase_config_1.SUPABASE_STORAGE_BUCKET)
        .upload(object.path, file.buffer, {
        cacheControl: '3600',
        contentType: file.mimetype,
        upsert: false,
    });
    if (error) {
        throw error;
    }
    const { data: publicUrlData } = supabase.storage
        .from(supabase_config_1.SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(data.path);
    return {
        filename: object.filename,
        folder: object.folder,
        path: data.path,
        publicUrl: publicUrlData.publicUrl,
    };
};
exports.uploadImageToSupabase = uploadImageToSupabase;
/**
 * Delete an image object from Supabase Storage.
 */
const deleteImageFromSupabase = async (filename, target = DEFAULT_STORAGE_TARGET) => {
    const supabase = (0, supabase_config_1.getSupabaseClient)();
    const folder = (0, supabase_config_1.getSupabaseStorageFolder)(target);
    const objectPath = `${folder}/${filename}`;
    const { data, error } = await supabase.storage
        .from(supabase_config_1.SUPABASE_STORAGE_BUCKET)
        .remove([objectPath]);
    if (error) {
        throw error;
    }
    if (!data || data.length === 0) {
        throw new error_not_found_exception_1.ErrorNotFoundException('File tidak ditemukan');
    }
};
exports.deleteImageFromSupabase = deleteImageFromSupabase;
/**
 * Get public URL for an object in the configured bucket.
 */
const getSupabasePublicUrl = (filename, target = DEFAULT_STORAGE_TARGET) => {
    const supabase = (0, supabase_config_1.getSupabaseClient)();
    const folder = (0, supabase_config_1.getSupabaseStorageFolder)(target);
    const objectPath = `${folder}/${filename}`;
    const { data } = supabase.storage
        .from(supabase_config_1.SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(objectPath);
    return data.publicUrl;
};
exports.getSupabasePublicUrl = getSupabasePublicUrl;
//# sourceMappingURL=supabase-storage.utility.js.map