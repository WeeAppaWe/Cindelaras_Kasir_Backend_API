export interface SupplierFilter {
    search?: string | null;
}
export interface SupplierPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateSupplierRequest {
    name: string;
    phone?: string;
    address?: string;
}
export interface UpdateSupplierRequest {
    name?: string;
    phone?: string;
    address?: string;
}
export interface SupplierData {
    supplier_id: string;
    name: string;
    phone: string | null;
    address: string | null;
    created_at: Date;
    updated_at: Date | null;
}
export interface SupplierWithDetails extends SupplierData {
    _count?: {
        stock_movements: number;
    };
}
export interface SupplierListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: SupplierWithDetails[];
}
export type SupplierDetailResponse = SupplierWithDetails;
export type CreateSupplierResponse = SupplierData;
export type UpdateSupplierResponse = SupplierData;
export interface DeleteSupplierResponse {
    success: boolean;
    message: string;
}
//# sourceMappingURL=supplier.types.d.ts.map