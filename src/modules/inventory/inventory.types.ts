// Inventory (Stock Movement) module types

// ============================================
// FILTER & PAGINATION
// ============================================

export interface StockMovementFilter {
    search?: string | null;
    ingredient_id?: string | null;
    supplier_id?: string | null;
    stock_type_id?: string | null;
    date_from?: Date | null;
    date_to?: Date | null;
}

export interface StockMovementPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// ============================================
// REQUEST TYPES
// ============================================

// Base request for stock movement
interface BaseStockMovementRequest {
    ingredient_id: string;
    qty: number;
    notes?: string;
}

// Stock IN request (barang masuk dari supplier)
export interface StockInRequest extends BaseStockMovementRequest {
    supplier_id: string;
    unit_cost: number;
}

// Stock OUT request (barang keluar - rusak/kedaluarsa)
export interface StockOutRequest extends BaseStockMovementRequest {
    reason: 'DAMAGED' | 'EXPIRED' | 'OTHER';
}

// ============================================
// DATA TYPES
// ============================================

// Stock movement data from database
export interface StockMovementData {
    stock_movement_id: string;
    supplier_id: string | null;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: number;
    unit_cost: number | null;
    current_stock: number;
    notes: string | null;
    created_at: Date;
}

// Stock movement with relations
export interface StockMovementWithDetails extends StockMovementData {
    ingredient: {
        ingredient_id: string;
        name: string;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
    supplier: {
        supplier_id: string;
        name: string;
    } | null;
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    user: {
        user_id: string;
        name: string;
    };
}

// Stock type reference
export interface StockTypeData {
    stock_type_id: string;
    name: string;
}

// ============================================
// RESPONSE TYPES
// ============================================

// List stock movements response
export interface StockMovementListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: StockMovementWithDetails[];
}

// Create stock movement response
export type StockMovementCreateResponse = StockMovementWithDetails;

// Stock summary per ingredient
export interface IngredientStockSummary {
    ingredient_id: string;
    ingredient_name: string;
    unit_name: string;
    current_stock: number;
    total_in: number;
    total_out: number;
    last_movement_date: Date | null;
}
