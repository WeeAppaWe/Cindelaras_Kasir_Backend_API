import { ReportFilter } from './report-operational.types';
export declare const getAllOrdersForPeriod: (filter: ReportFilter) => Promise<({
    user: {
        user_id: string;
        name: string;
    };
    order_items: ({
        menu: {
            category: {
                name: string;
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
                category_id: string;
            };
            recipes: ({
                ingredient: {
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
export declare const getShiftsWithOrderCounts: (filter: ReportFilter) => Promise<({
    orders: {
        status: string;
        order_id: string;
        total_amount: import("@prisma/client/runtime/client").Decimal;
    }[];
    user: {
        user_id: string;
        name: string;
    };
    cash_movements: {
        type: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        amount: import("@prisma/client/runtime/client").Decimal;
        note: string | null;
        cash_movement_id: string;
        shift_id: string;
    }[];
} & {
    user_id: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    shift_id: string;
    start_cash: import("@prisma/client/runtime/client").Decimal;
    end_cash: import("@prisma/client/runtime/client").Decimal | null;
    sold_total: import("@prisma/client/runtime/client").Decimal | null;
    start_time: Date;
    end_time: Date | null;
})[]>;
export declare const getUsersWithOrderStats: (filter: ReportFilter) => Promise<{
    orders: ({
        user: {
            user_id: string;
            name: string;
        };
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
    })[];
    shifts: {
        user_id: string;
        shift_id: string;
    }[];
}>;
export declare const getMenuPerformanceData: (filter: ReportFilter, limit?: number) => Promise<{
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
    cost: number;
}[]>;
export declare const reportOperationalRepository: {
    getAllOrdersForPeriod: (filter: ReportFilter) => Promise<({
        user: {
            user_id: string;
            name: string;
        };
        order_items: ({
            menu: {
                category: {
                    name: string;
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                    category_id: string;
                };
                recipes: ({
                    ingredient: {
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
    getShiftsWithOrderCounts: (filter: ReportFilter) => Promise<({
        orders: {
            status: string;
            order_id: string;
            total_amount: import("@prisma/client/runtime/client").Decimal;
        }[];
        user: {
            user_id: string;
            name: string;
        };
        cash_movements: {
            type: string;
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            amount: import("@prisma/client/runtime/client").Decimal;
            note: string | null;
            cash_movement_id: string;
            shift_id: string;
        }[];
    } & {
        user_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        shift_id: string;
        start_cash: import("@prisma/client/runtime/client").Decimal;
        end_cash: import("@prisma/client/runtime/client").Decimal | null;
        sold_total: import("@prisma/client/runtime/client").Decimal | null;
        start_time: Date;
        end_time: Date | null;
    })[]>;
    getUsersWithOrderStats: (filter: ReportFilter) => Promise<{
        orders: ({
            user: {
                user_id: string;
                name: string;
            };
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
        })[];
        shifts: {
            user_id: string;
            shift_id: string;
        }[];
    }>;
    getMenuPerformanceData: (filter: ReportFilter, limit?: number) => Promise<{
        menu_id: string;
        name: string;
        category: string;
        qty_sold: number;
        revenue: number;
        cost: number;
    }[]>;
};
export default reportOperationalRepository;
//# sourceMappingURL=report-operational.repository.d.ts.map