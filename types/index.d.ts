// Global type definitions - re-export all types for backward compatibility

export * from './express.types';
export * from './database.types';
export * from './receipt.types';
export * from './currency.types';
export * from './report-export.types';
export * from './supabase-storage.types';

// Import external module declarations (these are ambient modules, no re-export needed)
/// <reference path="./external-modules.types.d.ts" />

