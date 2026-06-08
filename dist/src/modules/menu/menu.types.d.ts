export interface MenuFilter {
    search?: string | null;
    category_id?: string | null;
    is_available?: boolean | null;
}
export interface MenuPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateMenuRequest {
    name: string;
    category_id: string;
    price: number;
    description?: string;
    image_url?: string;
    is_available?: boolean;
}
export interface UpdateMenuRequest {
    name?: string;
    category_id?: string;
    price?: number;
    cost?: number;
    description?: string;
    image_url?: string;
    is_available?: boolean;
}
export interface MenuData {
    menu_id: string;
    name: string;
    price: number;
    cost: number;
    description: string | null;
    image_url: string | null;
    is_available: boolean;
    created_at: Date;
    updated_at: Date | null;
    category: {
        category_id: string;
        name: string;
    };
}
export interface MenuWithDetails extends MenuData {
    _count?: {
        recipes: number;
    };
    margin_percent?: number;
    profit?: number;
}
export interface MenuListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: MenuWithDetails[];
}
export interface MenuDetailResponse extends MenuData {
    recipes: {
        menu_recipe_id: string;
        ingredient_id: string;
        ingredient_name: string;
        qty_needed: number;
        unit_name: string;
        unit_cost: number;
        subtotal: number;
    }[];
    cost_summary: {
        hpp: number;
        price: number;
        margin_percent: number;
        profit: number;
    };
}
export interface DeleteMenuResponse {
    success: boolean;
    message: string;
}
//# sourceMappingURL=menu.types.d.ts.map