/**
 * Mock data for Financial Report tests
 */
export declare const mockReportUser: {
    user_id: string;
    name: string;
};
export declare const mockReportShift: {
    shift_id: string;
    user_id: string;
    start_time: Date;
    end_time: Date;
    start_cash: number;
    end_cash: number;
    sold_total: number;
    user: {
        user_id: string;
        name: string;
    };
    cash_movements: any[];
};
export declare const mockCategory: {
    category_id: string;
    name: string;
};
export declare const mockCategory2: {
    category_id: string;
    name: string;
};
export declare const mockIngredient: {
    ingredient_id: string;
    name: string;
    avg_cost: number;
};
export declare const mockRecipe: {
    recipe_id: string;
    ingredient_id: string;
    qty_needed: number;
    ingredient: {
        ingredient_id: string;
        name: string;
        avg_cost: number;
    };
};
export declare const mockMenu1: {
    menu_id: string;
    name: string;
    category_id: string;
    category: {
        category_id: string;
        name: string;
    };
    recipes: {
        recipe_id: string;
        ingredient_id: string;
        qty_needed: number;
        ingredient: {
            ingredient_id: string;
            name: string;
            avg_cost: number;
        };
    }[];
};
export declare const mockMenu2: {
    menu_id: string;
    name: string;
    category_id: string;
    category: {
        category_id: string;
        name: string;
    };
    recipes: any[];
};
export declare const mockOrderItem1: {
    order_item_id: string;
    menu_id: string;
    qty: number;
    price: number;
    subtotal: number;
    menu: {
        menu_id: string;
        name: string;
        category_id: string;
        category: {
            category_id: string;
            name: string;
        };
        recipes: {
            recipe_id: string;
            ingredient_id: string;
            qty_needed: number;
            ingredient: {
                ingredient_id: string;
                name: string;
                avg_cost: number;
            };
        }[];
    };
};
export declare const mockOrderItem2: {
    order_item_id: string;
    menu_id: string;
    qty: number;
    price: number;
    subtotal: number;
    menu: {
        menu_id: string;
        name: string;
        category_id: string;
        category: {
            category_id: string;
            name: string;
        };
        recipes: any[];
    };
};
export declare const mockCompletedOrderCash: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: {
        order_item_id: string;
        menu_id: string;
        qty: number;
        price: number;
        subtotal: number;
        menu: {
            menu_id: string;
            name: string;
            category_id: string;
            category: {
                category_id: string;
                name: string;
            };
            recipes: any[];
        };
    }[];
};
export declare const mockCompletedOrderQris: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: {
        order_item_id: string;
        menu_id: string;
        qty: number;
        price: number;
        subtotal: number;
        menu: {
            menu_id: string;
            name: string;
            category_id: string;
            category: {
                category_id: string;
                name: string;
            };
            recipes: {
                recipe_id: string;
                ingredient_id: string;
                qty_needed: number;
                ingredient: {
                    ingredient_id: string;
                    name: string;
                    avg_cost: number;
                };
            }[];
        };
    }[];
};
export declare const mockCompletedOrderCash2: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: {
        order_item_id: string;
        menu_id: string;
        qty: number;
        price: number;
        subtotal: number;
        menu: {
            menu_id: string;
            name: string;
            category_id: string;
            category: {
                category_id: string;
                name: string;
            };
            recipes: any[];
        };
    }[];
};
export declare const mockCompletedOrders: {
    order_id: string;
    shift_id: string;
    user_id: string;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    user: {
        user_id: string;
        name: string;
    };
    order_items: {
        order_item_id: string;
        menu_id: string;
        qty: number;
        price: number;
        subtotal: number;
        menu: {
            menu_id: string;
            name: string;
            category_id: string;
            category: {
                category_id: string;
                name: string;
            };
            recipes: any[];
        };
    }[];
}[];
export declare const mockCashMovementIn: {
    cash_movement_id: string;
    shift_id: string;
    type: string;
    amount: number;
    notes: string;
    created_at: Date;
};
export declare const mockCashMovementOut: {
    cash_movement_id: string;
    shift_id: string;
    type: string;
    amount: number;
    notes: string;
    created_at: Date;
};
export declare const mockCashMovements: {
    cash_movement_id: string;
    shift_id: string;
    type: string;
    amount: number;
    notes: string;
    created_at: Date;
}[];
export declare const mockShifts: {
    shift_id: string;
    user_id: string;
    start_time: Date;
    end_time: Date;
    start_cash: number;
    end_cash: number;
    sold_total: number;
    user: {
        user_id: string;
        name: string;
    };
    cash_movements: any[];
}[];
export declare const mockAggregatedByMenu: {
    menu_id: string;
    name: string;
    category: string;
    qty_sold: number;
    revenue: number;
}[];
export declare const mockAggregatedByCategory: {
    category_id: string;
    category_name: string;
    qty_sold: number;
    revenue: number;
}[];
export declare const expectedTotalSales = 160000;
export declare const expectedTotalCOGS = 40000;
export declare const expectedCashSales = 110000;
export declare const expectedQrisSales = 50000;
//# sourceMappingURL=report-financial.mock.d.ts.map