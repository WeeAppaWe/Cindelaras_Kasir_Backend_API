export interface UnitMeasureFilter {
    search?: string | null;
}
export interface UnitMeasurePaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateUnitMeasureRequest {
    name: string;
}
export interface UpdateUnitMeasureRequest {
    name?: string;
}
export interface UnitMeasureReference {
    unit_measure_id: string;
    name: string;
}
export interface UnitMeasureData extends UnitMeasureReference {
    created_at: Date;
    updated_at?: Date | null;
}
export interface UnitMeasureListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: UnitMeasureData[];
}
export type UnitMeasureDetailResponse = UnitMeasureData;
export type CreateUnitMeasureResponse = UnitMeasureData;
export type UpdateUnitMeasureResponse = UnitMeasureData;
export interface DeleteUnitMeasureResponse {
    success: boolean;
    message: string;
}
//# sourceMappingURL=unit-measure.types.d.ts.map