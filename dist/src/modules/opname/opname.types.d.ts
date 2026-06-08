export interface OpnameFilter {
    search?: string | null;
    status?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}
export interface OpnamePaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface OpnameItemInput {
    ingredient_id: string;
    physical_qty: number;
}
export interface CreateOpnameRequest {
    opname_date: string;
    notes?: string;
    items: OpnameItemInput[];
}
export interface UpdateOpnameRequest {
    notes?: string;
    items?: OpnameItemInput[];
}
export interface ChangeStatusRequest {
    status: string;
}
export interface OpnameItemWithDetails {
    stock_opname_item_id: string;
    ingredient_id: string;
    system_qty: number;
    physical_qty: number;
    difference: number;
    ingredient: {
        ingredient_id: string;
        name: string;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
}
export interface OpnameWithUser {
    stock_opname_id: string;
    opname_date: Date;
    status: string;
    notes?: string | null;
    created_at: Date;
    updated_at?: Date | null;
    user: {
        user_id: string;
        name: string;
    };
    _count?: {
        items: number;
    };
}
export interface OpnameWithDetails extends OpnameWithUser {
    items: OpnameItemWithDetails[];
}
export interface OpnameListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: OpnameWithUser[];
}
export type OpnameDetailResponse = OpnameWithDetails;
export type CreateOpnameResponse = OpnameWithDetails;
export type UpdateOpnameResponse = OpnameWithDetails;
export interface DeleteOpnameResponse {
    success: boolean;
    message: string;
}
export interface ApplyAdjustmentResponse {
    success: boolean;
    message: string;
    adjustments_count: number;
}
export interface OpnameSummary {
    total_items: number;
    items_match: number;
    items_shortage: number;
    items_excess: number;
}
export interface IngredientForOpname {
    ingredient_id: string;
    name: string;
    stock_qty: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
//# sourceMappingURL=opname.types.d.ts.map