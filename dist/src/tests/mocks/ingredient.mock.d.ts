export declare const mockIngredient: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredient2: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockLowStockIngredients: {
    stock_qty: number;
    min_stock: number;
    ingredient_id: string;
    name: string;
    type: string;
    avg_cost: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}[];
export declare const mockSemiIngredient: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockSemiIngredient2: {
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockChildIngredient1: {
    ingredient_id: string;
    name: string;
    type: string;
    avg_cost: number;
    stock_qty: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockChildIngredient2: {
    ingredient_id: string;
    name: string;
    type: string;
    avg_cost: number;
    stock_qty: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockComposition1: {
    ingredient_composition_id: string;
    parent_id: string;
    child_id: string;
    qty_needed: number;
    child_ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        stock_qty: number;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
};
export declare const mockComposition2: {
    ingredient_composition_id: string;
    parent_id: string;
    child_id: string;
    qty_needed: number;
    child_ingredient: {
        ingredient_id: string;
        name: string;
        type: string;
        avg_cost: number;
        stock_qty: number;
        unit: {
            unit_measure_id: string;
            name: string;
        };
    };
};
export declare const mockIngredientWithCompositions: {
    avg_cost: number;
    child_compositions: {
        ingredient_composition_id: string;
        parent_id: string;
        child_id: string;
        qty_needed: number;
        child_ingredient: {
            ingredient_id: string;
            name: string;
            type: string;
            avg_cost: number;
            stock_qty: number;
            unit: {
                unit_measure_id: string;
                name: string;
            };
        };
    }[];
    ingredient_id: string;
    name: string;
    type: string;
    stock_qty: number;
    min_stock: number;
    created_at: Date;
    updated_at: Date;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockIngredientCosts: {
    ingredient_id: string;
    name: string;
    avg_cost: number;
    unit_name: string;
}[];
//# sourceMappingURL=ingredient.mock.d.ts.map