import { IngredientData, IngredientSupplier } from './spk.types';
/**
 * Ambil semua order items dalam periode tertentu dengan data recipe explosion
 * untuk menghitung pemakaian bahan per hari
 */
export declare const getOrderItemsWithRecipes: (startDate: Date, endDate: Date) => Promise<({
    order_items: ({
        menu: {
            recipes: ({
                ingredient: {
                    unit: {
                        created_at: Date;
                        updated_at: Date | null;
                        deleted_at: Date | null;
                        name: string;
                        unit_measure_id: string;
                    };
                } & {
                    ingredient_id: string;
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                    name: string;
                    type: string;
                    unit_id: string;
                    stock_qty: import("@prisma/client/runtime/client").Decimal;
                    min_stock: import("@prisma/client/runtime/client").Decimal;
                    avg_cost: import("@prisma/client/runtime/client").Decimal;
                };
            } & {
                menu_recipe_id: string;
                menu_id: string;
                ingredient_id: string;
                qty_needed: import("@prisma/client/runtime/client").Decimal;
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
            })[];
        } & {
            menu_id: string;
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            category_id: string;
            name: string;
            price: import("@prisma/client/runtime/client").Decimal;
            cost: import("@prisma/client/runtime/client").Decimal;
            description: string | null;
            image_url: string | null;
            is_available: boolean;
        };
    } & {
        menu_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        price: import("@prisma/client/runtime/client").Decimal;
        order_item_id: string;
        order_id: string;
        qty: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
    })[];
} & {
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user_id: string;
    status: string;
    shift_id: string;
    order_id: string;
    customer_name: string | null;
    customer_phone: string | null;
    receipt: string | null;
    total_amount: import("@prisma/client/runtime/client").Decimal;
    paid_amount: import("@prisma/client/runtime/client").Decimal;
    change_amount: import("@prisma/client/runtime/client").Decimal;
    payment_type: string;
    order_type: string;
})[]>;
/**
 * Ambil semua ingredients untuk analisa
 */
export declare const getAllIngredients: (ingredientType?: "raw" | "semi" | "all" | null) => Promise<IngredientData[] | undefined>;
/**
 * Ambil supplier terakhir untuk setiap ingredient dari stock movements
 */
export declare const getLastSupplierForIngredients: (ingredientIds: string[]) => Promise<IngredientSupplier[] | undefined>;
export declare const spkRepository: {
    getOrderItemsWithRecipes: (startDate: Date, endDate: Date) => Promise<({
        order_items: ({
            menu: {
                recipes: ({
                    ingredient: {
                        unit: {
                            created_at: Date;
                            updated_at: Date | null;
                            deleted_at: Date | null;
                            name: string;
                            unit_measure_id: string;
                        };
                    } & {
                        ingredient_id: string;
                        created_at: Date;
                        updated_at: Date | null;
                        deleted_at: Date | null;
                        name: string;
                        type: string;
                        unit_id: string;
                        stock_qty: import("@prisma/client/runtime/client").Decimal;
                        min_stock: import("@prisma/client/runtime/client").Decimal;
                        avg_cost: import("@prisma/client/runtime/client").Decimal;
                    };
                } & {
                    menu_recipe_id: string;
                    menu_id: string;
                    ingredient_id: string;
                    qty_needed: import("@prisma/client/runtime/client").Decimal;
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                })[];
            } & {
                menu_id: string;
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
                category_id: string;
                name: string;
                price: import("@prisma/client/runtime/client").Decimal;
                cost: import("@prisma/client/runtime/client").Decimal;
                description: string | null;
                image_url: string | null;
                is_available: boolean;
            };
        } & {
            menu_id: string;
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            price: import("@prisma/client/runtime/client").Decimal;
            order_item_id: string;
            order_id: string;
            qty: number;
            subtotal: import("@prisma/client/runtime/client").Decimal;
        })[];
    } & {
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        user_id: string;
        status: string;
        shift_id: string;
        order_id: string;
        customer_name: string | null;
        customer_phone: string | null;
        receipt: string | null;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        paid_amount: import("@prisma/client/runtime/client").Decimal;
        change_amount: import("@prisma/client/runtime/client").Decimal;
        payment_type: string;
        order_type: string;
    })[]>;
    getAllIngredients: (ingredientType?: "raw" | "semi" | "all" | null) => Promise<IngredientData[] | undefined>;
    getLastSupplierForIngredients: (ingredientIds: string[]) => Promise<IngredientSupplier[] | undefined>;
};
export default spkRepository;
//# sourceMappingURL=spk.repository.d.ts.map