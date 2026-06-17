import { ReportFilter } from './report-operational.types';
export declare const getAllOrdersForPeriod: (filter: ReportFilter) => Promise<({
    order_items: ({
        menu: {
            recipes: ({
                ingredient: {
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
            category: {
                created_at: Date;
                updated_at: Date | null;
                deleted_at: Date | null;
                category_id: string;
                name: string;
            };
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
    user: {
        name: string;
        user_id: string;
    };
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
export declare const getShiftsWithOrderCounts: (filter: ReportFilter) => Promise<({
    orders: {
        status: string;
        order_id: string;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        payment_type: string;
    }[];
    user: {
        name: string;
        user_id: string;
    };
    cash_movements: {
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        type: string;
        amount: import("@prisma/client/runtime/client").Decimal;
        note: string | null;
        cash_movement_id: string;
        shift_id: string;
    }[];
} & {
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user_id: string;
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
            name: string;
            user_id: string;
        };
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
        order_items: ({
            menu: {
                recipes: ({
                    ingredient: {
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
                category: {
                    created_at: Date;
                    updated_at: Date | null;
                    deleted_at: Date | null;
                    category_id: string;
                    name: string;
                };
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
        user: {
            name: string;
            user_id: string;
        };
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
    getShiftsWithOrderCounts: (filter: ReportFilter) => Promise<({
        orders: {
            status: string;
            order_id: string;
            total_amount: import("@prisma/client/runtime/client").Decimal;
            payment_type: string;
        }[];
        user: {
            name: string;
            user_id: string;
        };
        cash_movements: {
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            type: string;
            amount: import("@prisma/client/runtime/client").Decimal;
            note: string | null;
            cash_movement_id: string;
            shift_id: string;
        }[];
    } & {
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        user_id: string;
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
                name: string;
                user_id: string;
            };
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