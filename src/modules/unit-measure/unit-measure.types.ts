// Unit Measure module types

// Filter options for unit measure queries
export interface UnitMeasureFilter {
    search?: string | null;
}

// Pagination options
export interface UnitMeasurePaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create unit measure request
export interface CreateUnitMeasureRequest {
    name: string;
}

// Update unit measure request
export interface UpdateUnitMeasureRequest {
    name?: string;
}

// Unit measure reference (for dropdown/selection)
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}

// Unit measure data returned from database
export interface UnitMeasureData extends UnitMeasureReference {
    created_at: Date;
    updated_at?: Date | null;
}

// Unit measure list response
export interface UnitMeasureListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: UnitMeasureData[];
}

// Unit measure detail response
export type UnitMeasureDetailResponse = UnitMeasureData;

// Create unit measure response
export type CreateUnitMeasureResponse = UnitMeasureData;

// Update unit measure response
export type UpdateUnitMeasureResponse = UnitMeasureData;

// Delete unit measure response
export interface DeleteUnitMeasureResponse {
    success: boolean;
    message: string;
}
