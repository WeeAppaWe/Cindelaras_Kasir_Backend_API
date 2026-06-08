"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseClient = exports.getSupabaseStorageFolder = exports.SUPABASE_STORAGE_FOLDERS = exports.SUPABASE_STORAGE_BUCKET = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
let supabaseClient = null;
/**
 * Storage bucket used for uploaded image assets.
 */
exports.SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'images';
const normalizeStorageFolder = (folder, fallback) => {
    const normalized = (folder || fallback).trim().replace(/^\/+|\/+$/g, '');
    return normalized || fallback;
};
/**
 * Storage folders used to separate uploaded image assets by business context.
 */
exports.SUPABASE_STORAGE_FOLDERS = {
    menu: normalizeStorageFolder(process.env.SUPABASE_FOLDER_MENU, 'menus'),
    logo: normalizeStorageFolder(process.env.SUPABASE_FOLDER_LOGO, 'logos'),
};
const getSupabaseStorageFolder = (target) => {
    return exports.SUPABASE_STORAGE_FOLDERS[target];
};
exports.getSupabaseStorageFolder = getSupabaseStorageFolder;
/**
 * Create a Supabase client for trusted server-side operations.
 *
 * Use the service role key only on the backend. It bypasses Storage RLS, so it
 * must never be exposed to the frontend.
 */
const getSupabaseClient = () => {
    if (!supabaseClient) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseServiceRoleKey) {
            throw new Error('SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi');
        }
        supabaseClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                detectSessionInUrl: false,
                persistSession: false,
            },
        });
    }
    return supabaseClient;
};
exports.getSupabaseClient = getSupabaseClient;
exports.default = exports.getSupabaseClient;
//# sourceMappingURL=supabase.config.js.map