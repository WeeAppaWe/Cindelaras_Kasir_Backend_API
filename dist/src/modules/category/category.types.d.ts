export interface CategoryFilter {
    search?: string | null;
}
export interface CategoryPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateCategoryRequest {
    name: string;
}
export interface UpdateCategoryRequest {
    name?: string;
}
export interface CategoryData {
    category_id: string;
    name: string;
    created_at: Date;
    updated_at?: Date | null;
}
export interface CategoryReference {
    category_id: string;
    name: string;
}
export interface CategoryWithCount extends CategoryData {
    _count?: {
        menus: number;
    };
}
export interface CategoryListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: CategoryWithCount[];
}
export type CategoryDetailResponse = CategoryData;
export type CreateCategoryResponse = CategoryData;
export type UpdateCategoryResponse = CategoryData;
export interface DeleteCategoryResponse {
    success: boolean;
    message: string;
}
//# sourceMappingURL=category.types.d.ts.map