import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseStorageFolderTarget } from '../types/supabase-storage.types';
/**
 * Storage bucket used for uploaded image assets.
 */
export declare const SUPABASE_STORAGE_BUCKET: string;
/**
 * Storage folders used to separate uploaded image assets by business context.
 */
export declare const SUPABASE_STORAGE_FOLDERS: Record<SupabaseStorageFolderTarget, string>;
export declare const getSupabaseStorageFolder: (target: SupabaseStorageFolderTarget) => string;
/**
 * Create a Supabase client for trusted server-side operations.
 *
 * Use the service role key only on the backend. It bypasses Storage RLS, so it
 * must never be exposed to the frontend.
 */
export declare const getSupabaseClient: () => SupabaseClient;
export default getSupabaseClient;
//# sourceMappingURL=supabase.config.d.ts.map