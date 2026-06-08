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
                        name: string;
                        created_at: Date;
                        updated_at: Date | null;
                        deleted_at: Date | null;
                        unit_measure_id: string;
                    };
                } & {
                    type: string;
                    name: string;
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                    ingredient_id: string;
                    unit_id: string;
                    stock_qty: import("@prisma/client/runtime/client").Decimal;
                    min_stock: import("@prisma/client/runtime/client").Decimal;
                    avg_cost: import("@prisma/client/runtime/client").Decimal;
                };
            } & {
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
                menu_id: string;
                menu_recipe_id: string;
                ingredient_id: string;
                qty_needed: import("@prisma/client/runtime/client").Decimal;
            })[];
        } & {
            name: string;
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            description: string | null;
            menu_id: string;
            category_id: string;
            price: import("@prisma/client/runtime/client").Decimal;
            cost: import("@prisma/client/runtime/client").Decimal;
            image_url: string | null;
            is_available: boolean;
        };
    } & {
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        menu_id: string;
        price: import("@prisma/client/runtime/client").Decimal;
        order_item_id: string;
        order_id: string;
        qty: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
    })[];
} & {
    user_id: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
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
                            name: string;
                            created_at: Date;
                            updated_at: Date | null;
                            deleted_at: Date | null;
                            unit_measure_id: string;
                        };
                    } & {
                        type: string;
                        name: string;
                        created_at: Date;
                        updated_at: Date | null;
                        deleted_at: Date | null;
                        ingredient_id: string;
                        unit_id: string;
                        stock_qty: import("@prisma/client/runtime/client").Decimal;
                        min_stock: import("@prisma/client/runtime/client").Decimal;
                        avg_cost: import("@prisma/client/runtime/client").Decimal;
                    };
                } & {
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                    menu_id: string;
                    menu_recipe_id: string;
                    ingredient_id: string;
                    qty_needed: import("@prisma/client/runtime/client").Decimal;
                })[];
            } & {
                name: string;
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
                description: string | null;
                menu_id: string;
                category_id: string;
                price: import("@prisma/client/runtime/client").Decimal;
                cost: import("@prisma/client/runtime/client").Decimal;
                image_url: string | null;
                is_available: boolean;
            };
        } & {
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            menu_id: string;
            price: import("@prisma/client/runtime/client").Decimal;
            order_item_id: string;
            order_id: string;
            qty: number;
            subtotal: import("@prisma/client/runtime/client").Decimal;
        })[];
    } & {
        user_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
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
    })[]>;
    getAllIngredients: (ingredientType?: "raw" | "semi" | "all" | null) => Promise<IngredientData[] | undefined>;
    getLastSupplierForIngredients: (ingredientIds: string[]) => Promise<IngredientSupplier[] | undefined>;
};
export default spkRepository;
//# sourceMappingURL=spk.repository.d.ts.map