/**
 * Mock data for Operational Report tests
 */
export declare const mockCashier1: {
    user_id: string;
    name: string;
};
export declare const mockCashier2: {
    user_id: string;
    name: string;
};
export declare const mockShift1: {
    shift_id: string;
    user_id: string;
    start_time: Date;
    end_time: Date;
    start_cash: number;
    end_cash: number;
    sold_total: number;
    deleted_at: any;
    user: {
        user_id: string;
        name: string;
    };
    orders: {
        order_id: string;
        status: string;
        total_amount: number;
    }[];
    cash_movements: {
        cash_movement_id: string;
        type: string;
        amount: number;
    }[];
};
export declare const mockShift2: {
    shift_id: string;
    user_id: string;
    start_time: Date;
    end_time: any;
    start_cash: number;
    end_cash: any;
    sold_total: any;
    deleted_at: any;
    user: {
        user_id: string;
        name: string;
    };
    orders: {
        order_id: string;
        status: string;
        total_amount: number;
    }[];
    cash_movements: any[];
};
export declare const mockShiftsWithOrders: {
    shift_id: string;
    user_id: string;
    start_time: Date;
    end_time: any;
    start_cash: number;
    end_cash: any;
    sold_total: any;
    deleted_at: any;
    user: {
        user_id: string;
        name: string;
    };
    orders: {
        order_id: string;
        status: string;
        total_amount: number;
    }[];
    cash_movements: any[];
}[];
export declare const mockOrderCompleted1: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: any[];
};
export declare const mockOrderCompleted2: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: any[];
};
export declare const mockOrderCancelled: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: any[];
};
export declare const mockOrderCompleted3: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: any[];
};
export declare const mockAllOrders: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: any[];
}[];
export declare const mockUserOrdersAndShifts: {
    orders: {
        order_id: string;
        shift_id: string;
        user_id: string;
        customer_name: string;
        total_amount: number;
        payment_type: string;
        status: string;
        created_at: Date;
        user: {
            user_id: string;
            name: string;
        };
        order_items: any[];
    }[];
    shifts: {
        shift_id: string;
        user_id: string;
    }[];
};
export declare const mockMenuPerformanceData: {
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
    cost: number;
}[];
export declare const expectedTotalCompletedOrders = 3;
export declare const expectedTotalSales = 160000;
export declare const expectedCashier1Transactions = 3;
export declare const expectedCashier1Completed = 2;
export declare const expectedCashier1Cancelled = 1;
export declare const expectedClosedShifts = 1;
export declare const expectedActiveShifts = 1;
//# sourceMappingURL=report-operational.mock.d.ts.map