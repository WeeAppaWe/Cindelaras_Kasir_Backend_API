export type SupabaseStorageFolderTarget = 'menu' | 'logo';

export interface SupabaseStorageUploadOptions {
  target?: SupabaseStorageFolderTarget;
}

export interface SupabaseStorageUploadResult {
  filename: string;
  folder: string;
  path: string;
  publicUrl: string;
}

export type UuidV7Module = {
  v7: () => string;
};
