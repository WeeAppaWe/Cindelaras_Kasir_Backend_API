export declare enum IngredientType {
    RAW = "RAW",
    SEMI = "SEMI"
}
export interface IngredientReference {
    ingredient_id: string;
    name: string;
    type: string;
    avg_cost: any;
    unit: {
        unit_measure_id: string;
        name: string;
    };
}
//# sourceMappingURL=ingredient-all.types.d.ts.map