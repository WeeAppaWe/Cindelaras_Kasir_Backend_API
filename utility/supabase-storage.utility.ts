import path from 'path';
import type {} from 'multer';
import { ErrorNotFoundException } from '../exception/error-not-found.exception';
import {
  getSupabaseClient,
  getSupabaseStorageFolder,
  SUPABASE_STORAGE_BUCKET,
} from '../config/supabase.config';
import {
  SupabaseStorageFolderTarget,
  SupabaseStorageUploadOptions,
  SupabaseStorageUploadResult,
  UuidV7Module,
} from '../types/supabase-storage.types';

let uuidModulePromise: Promise<UuidV7Module> | null = null;
const DEFAULT_STORAGE_TARGET: SupabaseStorageFolderTarget = 'menu';

const generateUuidV7 = async (): Promise<string> => {
  uuidModulePromise = uuidModulePromise || import('uuid').then((uuidModule) => ({
    v7: uuidModule.v7,
  }));
  const { v7: uuidv7 } = await uuidModulePromise;

  return uuidv7();
};

/**
 * Build a unique object key while preserving the original image extension.
 */
export const buildStorageFilename = async (originalName: string): Promise<string> => {
  const ext = path.extname(originalName).toLowerCase();
  const uuid = await generateUuidV7();

  return `${uuid}${ext}`;
};

/**
 * Build Supabase Storage object path for the selected upload target.
 */
export const buildStorageObjectPath = async (
  originalName: string,
  target: SupabaseStorageFolderTarget = DEFAULT_STORAGE_TARGET
): Promise<{ filename: string; folder: string; path: string }> => {
  const filename = await buildStorageFilename(originalName);
  const folder = getSupabaseStorageFolder(target);

  return {
    filename,
    folder,
    path: `${folder}/${filename}`,
  };
};

/**
 * Upload an image buffer to Supabase Storage.
 */
export const uploadImageToSupabase = async (
  file: Express.Multer.File,
  options: SupabaseStorageUploadOptions = {}
): Promise<SupabaseStorageUploadResult> => {
  const supabase = getSupabaseClient();
  const object = await buildStorageObjectPath(file.originalname, options.target || DEFAULT_STORAGE_TARGET);

  const { data, error } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(object.path, file.buffer, {
      cacheControl: '3600',
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return {
    filename: object.filename,
    folder: object.folder,
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
};

/**
 * Delete an image object from Supabase Storage.
 */
export const deleteImageFromSupabase = async (
  filename: string,
  target: SupabaseStorageFolderTarget = DEFAULT_STORAGE_TARGET
): Promise<void> => {
  const supabase = getSupabaseClient();
  const folder = getSupabaseStorageFolder(target);
  const objectPath = `${folder}/${filename}`;

  const { data, error } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .remove([objectPath]);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new ErrorNotFoundException('File tidak ditemukan');
  }
};

/**
 * Get public URL for an object in the configured bucket.
 */
export const getSupabasePublicUrl = (
  filename: string,
  target: SupabaseStorageFolderTarget = DEFAULT_STORAGE_TARGET
): string => {
  const supabase = getSupabaseClient();
  const folder = getSupabaseStorageFolder(target);
  const objectPath = `${folder}/${filename}`;

  const { data } = supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(objectPath);

  return data.publicUrl;
};
