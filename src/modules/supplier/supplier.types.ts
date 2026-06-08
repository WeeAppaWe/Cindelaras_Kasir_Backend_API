// Supplier module types

// Filter options for supplier queries
export interface SupplierFilter {
    search?: string | null;
}

// Pagination options
export interface SupplierPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create supplier request
export interface CreateSupplierRequest {
    name: string;
    phone?: string;
    address?: string;
}

// Update supplier request
export interface UpdateSupplierRequest {
    name?: string;
    phone?: string;
    address?: string;
}

// Supplier data returned from database
export interface SupplierData {
    supplier_id: string;
    name: string;
    phone: string | null;
    address: string | null;
    created_at: Date;
    updated_at: Date | null;
}

// Supplier with stock movement count
export interface SupplierWithDetails extends SupplierData {
    _count?: {
        stock_movements: number;
    };
}

// Supplier list response
export interface SupplierListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: SupplierWithDetails[];
}

// Supplier detail response
export type SupplierDetailResponse = SupplierWithDetails;

// Create supplier response
export type CreateSupplierResponse = SupplierData;

// Update supplier response
export type UpdateSupplierResponse = SupplierData;

// Delete supplier response
export interface DeleteSupplierResponse {
    success: boolean;
    message: string;
}
