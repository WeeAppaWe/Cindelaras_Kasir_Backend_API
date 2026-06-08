export interface CashMovementFilter {
    shift_id?: string | null;
    type?: string | null;
}
export interface CashMovementPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateCashMovementRequest {
    type: string;
    amount: number;
    note?: string;
}
export interface CashMovementData {
    cash_movement_id: string;
    shift_id: string;
    type: string;
    amount: number;
    note: string | null;
    created_at: Date;
    updated_at?: Date | null;
}
export interface CashMovementWithShift extends CashMovementData {
    shift?: {
        shift_id: string;
        start_time: Date;
        end_time: Date | null;
    };
}
export interface CashMovementSummary {
    total_in: number;
    total_out: number;
    net_amount: number;
}
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
export type CashMovementDetailResponse = CashMovementWithShift;
export interface CreateCashMovementResponse {
    success: boolean;
    message: string;
    cash_movement: CashMovementWithShift;
}
//# sourceMappingURL=cash-movement.types.d.ts.map