/**
 * Mock data for SPK (Smart Purchasing) tests
 */
export declare const mockUnitKg: {
    unit_measure_id: string;
    name: string;
};
export declare const mockIngredientBeras: {
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
export declare const mockIngredientTelur: {
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
export declare const mockIngredientBumbu: {
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
export declare const mockRecipeBeras: {
    recipe_id: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: number;
    deleted_at: any;
    ingredient: {
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
};
export declare const mockRecipeTelur: {
    recipe_id: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: number;
    deleted_at: any;
    ingredient: {
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
};
export declare const mockMenu: {
    menu_id: string;
    name: string;
    deleted_at: any;
    recipes: {
        recipe_id: string;
        menu_id: string;
        ingredient_id: string;
        qty_needed: number;
        deleted_at: any;
        ingredient: {
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
    }[];
};
export declare const mockOrderItem: {
    order_item_id: string;
    menu_id: string;
    qty: number;
    deleted_at: any;
    menu: {
        menu_id: string;
        name: string;
        deleted_at: any;
        recipes: {
            recipe_id: string;
            menu_id: string;
            ingredient_id: string;
            qty_needed: number;
            deleted_at: any;
            ingredient: {
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
        }[];
    };
};
export declare const mockOrdersWithRecipes: {
    order_id: string;
    created_at: Date;
    status: string;
    deleted_at: any;
    order_items: {
        qty: number;
        order_item_id: string;
        menu_id: string;
        deleted_at: any;
        menu: {
            menu_id: string;
            name: string;
            deleted_at: any;
            recipes: {
                recipe_id: string;
                menu_id: string;
                ingredient_id: string;
                qty_needed: number;
                deleted_at: any;
                ingredient: {
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
            }[];
        };
    }[];
}[];
export declare const mockAllIngredients: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    unit_name: string;
}[];
export declare const mockSuppliers: {
    ingredient_id: string;
    supplier_id: string;
    supplier_name: string;
    supplier_contact: string;
}[];
/**
 * Recipe Explosion:
 * - Beras: 0.2kg/porsi
 * - Telur: 2 butir/porsi
 *
 * Penjualan:
 * - Day 1: 10 porsi -> Beras 2kg, Telur 20
 * - Day 2: 15 porsi -> Beras 3kg, Telur 30
 * - Day 3: 20 porsi -> Beras 4kg, Telur 40
 * - Day 4: 25 porsi -> Beras 5kg, Telur 50
 * - Day 5: 30 porsi -> Beras 6kg, Telur 60
 *
 * WMA Calculation (weight = index + 1):
 * Beras: (2*1 + 3*2 + 4*3 + 5*4 + 6*5) / (1+2+3+4+5) = (2+6+12+20+30)/15 = 70/15 = 4.67 kg/hari
 * Telur: (20*1 + 30*2 + 40*3 + 50*4 + 60*5) / 15 = (20+60+120+200+300)/15 = 700/15 = 46.67 butir/hari
 */
export declare const expectedBerasWMA: number;
export declare const expectedTelurWMA: number;
//# sourceMappingURL=spk.mock.d.ts.map