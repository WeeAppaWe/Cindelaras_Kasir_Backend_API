import { StockMovementWithDetails, StockTypeData } from '../../modules/inventory/inventory.types';
export declare const mockStockTypeIn: StockTypeData;
export declare const mockStockTypeOut: StockTypeData;
export declare const mockStockTypes: StockTypeData[];
export declare const mockIngredientForInventory: {
    ingredient_id: string;
    name: string;
    stock_qty: number;
    avg_cost: number;
    unit: {
        unit_measure_id: string;
        name: string;
    };
};
export declare const mockSupplierForInventory: {
    supplier_id: string;
    name: string;
};
export declare const mockStockMovementIn: StockMovementWithDetails;
export declare const mockStockMovementOut: StockMovementWithDetails;
export declare const mockStockMovements: StockMovementWithDetails[];
export declare const mockStockInData: {
    valid: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
        notes: string;
    };
    invalidIngredientId: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
    };
    invalidSupplierId: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
    };
    zeroQty: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
    };
    negativeQty: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
    };
    negativeUnitCost: {
        ingredient_id: string;
        supplier_id: string;
        qty: number;
        unit_cost: number;
    };
};
export declare const mockStockOutData: {
    valid: {
        ingredient_id: string;
        qty: number;
        reason: string;
        notes: string;
    };
    validExpired: {
        ingredient_id: string;
        qty: number;
        reason: string;
    };
    validOther: {
        ingredient_id: string;
        qty: number;
        reason: string;
        notes: string;
    };
    invalidReason: {
        ingredient_id: string;
        qty: number;
        reason: string;
    };
    zeroQty: {
        ingredient_id: string;
        qty: number;
        reason: string;
    };
};
export declare const createMockInventoryRequest: (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
    user?: {
        user_id: string;
        name: string;
    };
}) => {
    params: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, unknown>;
    user: {
        user_id: string;
        name: string;
    };
};
//# sourceMappingURL=inventory.mock.d.ts.map