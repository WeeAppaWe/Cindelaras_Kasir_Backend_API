/**
 * Mock data for Inventory Report tests
 */
export declare const mockUnitKg: {
    unit_measure_id: string;
    name: string;
};
export declare const mockUnitLiter: {
    unit_measure_id: string;
    name: string;
};
export declare const mockIngredientNormal: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    deleted_at: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredientLowStock: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    deleted_at: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredientOutOfStock: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    deleted_at: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredientSemi: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    deleted_at: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockAllIngredients: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    deleted_at: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}[];
export declare const mockStockMovementIn: {
    stock_movement_id: string;
    ingredient_id: string;
    qty: number;
    unit_cost: number;
    current_stock: number;
    created_at: Date;
    deleted_at: any;
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    supplier: {
        supplier_id: string;
        name: string;
    };
    user: {
        user_id: string;
        name: string;
    };
};
export declare const mockStockMovementOutSales: {
    stock_movement_id: string;
    ingredient_id: string;
    qty: number;
    unit_cost: number;
    current_stock: number;
    created_at: Date;
    deleted_at: any;
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    supplier: any;
    user: {
        user_id: string;
        name: string;
    };
};
export declare const mockStockMovementDamaged: {
    stock_movement_id: string;
    ingredient_id: string;
    qty: number;
    unit_cost: number;
    current_stock: number;
    created_at: Date;
    deleted_at: any;
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    supplier: any;
    user: {
        user_id: string;
        name: string;
    };
};
export declare const mockStockMovementExpired: {
    stock_movement_id: string;
    ingredient_id: string;
    qty: number;
    unit_cost: number;
    current_stock: number;
    created_at: Date;
    deleted_at: any;
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    supplier: any;
    user: {
        user_id: string;
        name: string;
    };
};
export declare const mockAllStockMovements: {
    stock_movement_id: string;
    ingredient_id: string;
    qty: number;
    unit_cost: number;
    current_stock: number;
    created_at: Date;
    deleted_at: any;
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        unit: {
            name: string;
        };
    };
    stock_type: {
        stock_type_id: string;
        name: string;
    };
    supplier: any;
    user: {
        user_id: string;
        name: string;
    };
}[];
export declare const mockStockOpname: {
    stock_opname_id: string;
    opname_date: Date;
    status: string;
    notes: string;
    deleted_at: any;
    user: {
        user_id: string;
        name: string;
    };
    items: {
        stock_opname_item_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }[];
};
export declare const mockStockOpnames: {
    stock_opname_id: string;
    opname_date: Date;
    status: string;
    notes: string;
    deleted_at: any;
    user: {
        user_id: string;
        name: string;
    };
    items: {
        stock_opname_item_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }[];
}[];
export declare const mockIngredientMovementsData: {
    ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        unit: {
            name: string;
        };
    };
    movements: {
        stock_movement_id: string;
        ingredient_id: string;
        qty: number;
        unit_cost: number;
        current_stock: number;
        created_at: Date;
        deleted_at: any;
        ingredient: {
            ingredient_id: string;
            name: string;
            type: string;
            avg_cost: number;
            unit: {
                name: string;
            };
        };
        stock_type: {
            stock_type_id: string;
            name: string;
        };
        supplier: any;
        user: {
            user_id: string;
            name: string;
        };
    }[];
    openingBalance: number;
};
export declare const expectedTotalStockValue = 886000;
export declare const expectedLowStockCount = 1;
export declare const expectedOutOfStockCount = 1;
export declare const expectedTotalInQty = 50;
export declare const expectedTotalInValue = 750000;
export declare const expectedTotalOutQty = 17;
export declare const expectedShrinkageValue = 124000;
//# sourceMappingURL=report-inventory.mock.d.ts.map