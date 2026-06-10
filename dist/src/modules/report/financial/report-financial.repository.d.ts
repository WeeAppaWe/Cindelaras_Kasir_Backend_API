import { ReportFilter } from './report-financial.types';
export declare const getCompletedOrdersForPeriod: (filter: ReportFilter) => Promise<({
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
export declare const getCashMovementsForPeriod: (filter: ReportFilter) => Promise<{
    type: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    amount: import("@prisma/client/runtime/client").Decimal;
    note: string | null;
    cash_movement_id: string;
    shift_id: string;
}[]>;
export declare const getShiftsForPeriod: (filter: ReportFilter) => Promise<({
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
        type: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
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