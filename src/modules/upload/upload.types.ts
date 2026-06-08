// Upload module types

import type {} from 'multer';
import { SupabaseStorageFolderTarget } from '../../../types/supabase-storage.types';

/**
 * Uploaded file data from multer
 */
export interface UploadedFile extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

/**
 * Upload image response
 */
export interface UploadImageResponse {
  filename: string;
  folder: string;
  path: string;
  originalname: string;
  mimetype: string;
  size: number;
  url: string;
}

export type UploadImageTarget = SupabaseStorageFolderTarget;

/**
 * Delete image response
 */
export interface DeleteImageResponse {
  success: boolean;
  filename: string;
  path: string;
  message: string;
}
