// Category module types

// Filter options for category queries
export interface CategoryFilter {
    search?: string | null;
}

// Pagination options
export interface CategoryPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create category request
export interface CreateCategoryRequest {
    name: string;
}

// Update category request
export interface UpdateCategoryRequest {
    name?: string;
}

// Category data returned from database
export interface CategoryData {
    category_id: string;
    name: string;
    created_at: Date;
    updated_at?: Date | null;
}

// Category reference (for dropdown/selection)
export interface CategoryReference {
    category_id: string;
    name: string;
}

// Category with menus count (for list view)
export interface CategoryWithCount extends CategoryData {
    _count?: {
        menus: number;
    };
}

// Category list response
export interface CategoryListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: CategoryWithCount[];
}

// Category detail response (same as CategoryData)
export type CategoryDetailResponse = CategoryData;

// Create category response
export type CreateCategoryResponse = CategoryData;

// Update category response
export type UpdateCategoryResponse = CategoryData;

// Delete category response
export interface DeleteCategoryResponse {
    success: boolean;
    message: string;
}
