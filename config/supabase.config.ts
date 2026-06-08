import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseStorageFolderTarget } from '../types/supabase-storage.types';

let supabaseClient: SupabaseClient | null = null;

/**
 * Storage bucket used for uploaded image assets.
 */
export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'images';

const normalizeStorageFolder = (folder: string | undefined, fallback: string): string => {
  const normalized = (folder || fallback).trim().replace(/^\/+|\/+$/g, '');

  return normalized || fallback;
};

/**
 * Storage folders used to separate uploaded image assets by business context.
 */
export const SUPABASE_STORAGE_FOLDERS: Record<SupabaseStorageFolderTarget, string> = {
  menu: normalizeStorageFolder(process.env.SUPABASE_FOLDER_MENU, 'menus'),
  logo: normalizeStorageFolder(process.env.SUPABASE_FOLDER_LOGO, 'logos'),
};

export const getSupabaseStorageFolder = (target: SupabaseStorageFolderTarget): string => {
  return SUPABASE_STORAGE_FOLDERS[target];
};

/**
 * Create a Supabase client for trusted server-side operations.
 *
 * Use the service role key only on the backend. It bypasses Storage RLS, so it
 * must never be exposed to the frontend.
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi');
    }

    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
};

export default getSupabaseClient;
