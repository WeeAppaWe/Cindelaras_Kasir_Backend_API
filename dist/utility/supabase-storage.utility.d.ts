import { SupabaseStorageFolderTarget, SupabaseStorageUploadOptions, SupabaseStorageUploadResult } from '../types/supabase-storage.types';
/**
 * Build a unique object key while preserving the original image extension.
 */
export declare const buildStorageFilename: (originalName: string) => Promise<string>;
/**
 * Build Supabase Storage object path for the selected upload target.
 */
export declare const buildStorageObjectPath: (originalName: string, target?: SupabaseStorageFolderTarget) => Promise<{
    filename: string;
    folder: string;
    path: string;
}>;
/**
 * Upload an image buffer to Supabase Storage.
 */
export declare const uploadImageToSupabase: (file: Express.Multer.File, options?: SupabaseStorageUploadOptions) => Promise<SupabaseStorageUploadResult>;
/**
 * Delete an image object from Supabase Storage.
 */
export declare const deleteImageFromSupabase: (filename: string, target?: SupabaseStorageFolderTarget) => Promise<void>;
/**
 * Get public URL for an object in the configured bucket.
 */
export declare const getSupabasePublicUrl: (filename: string, target?: SupabaseStorageFolderTarget) => string;
//# sourceMappingURL=supabase-storage.utility.d.ts.map