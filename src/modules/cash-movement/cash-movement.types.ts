// Cash Movement module types

// Filter options for cash movement queries
export interface CashMovementFilter {
    shift_id?: string | null;
    type?: string | null;
}

// Pagination options
export interface CashMovementPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create cash movement request
export interface CreateCashMovementRequest {
    type: string;
    amount: number;
    note?: string;
}

// Cash movement data returned from database
export interface CashMovementData {
    cash_movement_id: string;
    shift_id: string;
    type: string;
    amount: number;
    note: string | null;
    created_at: Date;
    updated_at?: Date | null;
}

// Cash movement with shift info (for detail view)
export interface CashMovementWithShift extends CashMovementData {
    shift?: {
        shift_id: string;
        start_time: Date;
        end_time: Date | null;
    };
}

// Summary for shift cash movements
export interface CashMovementSummary {
    total_in: number;
    total_out: number;
    net_amount: number;
}

// Cash movement list response
export interface CashMovementListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: CashMovementWithShift[];
    summary: CashMovementSummary;
}

// Cash movement detail response
export type CashMovementDetailResponse = CashMovementWithShift;

// Create cash movement response
export interface CreateCashMovementResponse {
    success: boolean;
    message: string;
    cash_movement: CashMovementWithShift;
}
