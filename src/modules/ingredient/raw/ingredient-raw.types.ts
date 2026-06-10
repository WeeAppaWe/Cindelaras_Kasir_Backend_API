// Raw Ingredient module types

// Ingredient type enum
export enum IngredientType {
    RAW = 'RAW',
    SEMI = 'SEMI',
}

// Filter options for raw ingredient queries
export interface RawIngredientFilter {
    search?: string | null;
    unit_id?: string | null;
    low_stock?: boolean | null; // Filter ingredients below min_stock
}

// Pagination options
export interface RawIngredientPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create raw ingredient request
export interface CreateRawIngredientRequest {
    name: string;
    unit_id: string;
    stock_qty?: number;
    min_stock: number;
    avg_cost?: number;
}

// Update raw ingredient request
export interface UpdateRawIngredientRequest {
    name?: string;
    unit_id?: string;
    min_stock?: number;
    avg_cost?: number;
}

// Raw ingredient with relations - data returned from database
export interface RawIngredientWithRelations {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: any; // Prisma Decimal
    min_stock: any; // Prisma Decimal
    avg_cost: any; // Prisma Decimal
    created_at: Date;
    updated_at?: Date | null;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}

// Raw ingredient reference (for dropdown/selection)
export interface RawIngredientReference {
    ingredient_id: string;
    name: string;
    type: string;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}

// Raw ingredient list response
export interface RawIngredientListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: RawIngredientWithRelations[];
}

// Raw ingredient detail response
export type RawIngredientDetailResponse = RawIngredientWithRelations;

// Create raw ingredient response
export type CreateRawIngredientResponse = RawIngredientWithRelations;

// Update raw ingredient response
export type UpdateRawIngredientResponse = RawIngredientWithRelations;

// Delete raw ingredient response
export interface DeleteRawIngredientResponse {
    success: boolean;
    message: string;
}

// Unit measure reference (for dropdown/selection)
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}

// Low stock alert response
export interface LowStockAlertResponse {
    total_count: number;
    records: RawIngredientWithRelations[];
}
