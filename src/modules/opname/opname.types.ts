// Stock Opname module types

// Filter options for opname queries
export interface OpnameFilter {
    search?: string | null;
    status?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

// Pagination options
export interface OpnamePaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Opname item input (for create/update)
export interface OpnameItemInput {
    ingredient_id: string;
    physical_qty: number;
}

// Create opname request
export interface CreateOpnameRequest {
    opname_date: string;
    notes?: string;
    items: OpnameItemInput[];
}

// Update opname request (update items or notes)
export interface UpdateOpnameRequest {
    notes?: string;
    items?: OpnameItemInput[];
}

// Change status request
export interface ChangeStatusRequest {
    status: string;
}

// Opname item with ingredient details
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

// Opname with user relation
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

// Opname with full details (including items)
export interface OpnameWithDetails extends OpnameWithUser {
    items: OpnameItemWithDetails[];
}

// Opname list response
export interface OpnameListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: OpnameWithUser[];
}

// Opname detail response
export type OpnameDetailResponse = OpnameWithDetails;

// Create opname response
export type CreateOpnameResponse = OpnameWithDetails;

// Update opname response
export type UpdateOpnameResponse = OpnameWithDetails;

// Delete opname response
export interface DeleteOpnameResponse {
    success: boolean;
    message: string;
}

// Apply adjustment response
export interface ApplyAdjustmentResponse {
    success: boolean;
    message: string;
    adjustments_count: number;
}

// Summary statistics for opname
export interface OpnameSummary {
    total_items: number;
    items_match: number;
    items_shortage: number;
    items_excess: number;
}

// Ingredient reference for opname form
export interface IngredientForOpname {
    ingredient_id: string;
    name: string;
    stock_qty: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
