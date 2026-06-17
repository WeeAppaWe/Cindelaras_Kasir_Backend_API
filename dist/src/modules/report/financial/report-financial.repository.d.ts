import { ReportFilter } from './report-financial.types';
export declare const getCompletedOrdersForPeriod: (filter: ReportFilter) => Promise<({
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
export declare const getCashMovementsForPeriod: (filter: ReportFilter) => Promise<{
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    type: string;
    amount: import("@prisma/client/runtime/client").Decimal;
    note: string | null;
    cash_movement_id: string;
    shift_id: string;
}[]>;
export declare const getShiftsForPeriod: (filter: ReportFilter) => Promise<({
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
export declare const getOrdersForFullReport: (filter: ReportFilter) => Promise<{
    created_at: Date;
    order_items: {
        menu: {
            cost: import("@prisma/client/runtime/client").Decimal;
        };
        qty: number;
    }[];
    order_id: string;
    total_amount: import("@prisma/client/runtime/client").Decimal;
}[]>;
export declare const getCashMovementsOutForFullReport: (filter: ReportFilter) => Promise<{
    created_at: Date;
    amount: import("@prisma/client/runtime/client").Decimal;
}[]>;
export declare const getOrderItemsAggregatedByMenu: (filter: ReportFilter, limit?: number) => Promise<{
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
}[]>;
export declare const getOrderItemsAggregatedByCategory: (filter: ReportFilter) => Promise<{
    category_id: string;
    category_name: string;
    qty_sold: number;
    revenue: number;
}[]>;
export declare const reportFinancialRepository: {
    getCompletedOrdersForPeriod: (filter: ReportFilter) => Promise<({
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
    getOrdersForFullReport: (filter: ReportFilter) => Promise<{
        created_at: Date;
        order_items: {
            menu: {
                cost: import("@prisma/client/runtime/client").Decimal;
            };
            qty: number;
        }[];
        order_id: string;
        total_amount: import("@prisma/client/runtime/client").Decimal;
    }[]>;
    getCashMovementsForPeriod: (filter: ReportFilter) => Promise<{
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        type: string;
        amount: import("@prisma/client/runtime/client").Decimal;
        note: string | null;
        cash_movement_id: string;
        shift_id: string;
    }[]>;
    getCashMovementsOutForFullReport: (filter: ReportFilter) => Promise<{
        created_at: Date;
        amount: import("@prisma/client/runtime/client").Decimal;
    }[]>;
    getShiftsForPeriod: (filter: ReportFilter) => Promise<({
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
    getOrderItemsAggregatedByMenu: (filter: ReportFilter, limit?: number) => Promise<{
        menu_id: string;
        name: string;
        category: string;
        qty_sold: number;
        revenue: number;
    }[]>;
    getOrderItemsAggregatedByCategory: (filter: ReportFilter) => Promise<{
        category_id: string;
        category_name: string;
        qty_sold: number;
        revenue: number;
    }[]>;
};
export default reportFinancialRepository;
//# sourceMappingURL=report-financial.repository.d.ts.map