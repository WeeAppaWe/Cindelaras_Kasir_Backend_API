// Stock Type types

// ============================================
// DATA TYPES
// ============================================

export interface StockTypeData {
    stock_type_id: string;
    name: string;
    created_at?: Date;
    updated_at?: Date | null;
}

// ============================================
// RESPONSE TYPES
// ============================================

export type StockTypeListResponse = StockTypeData[];
