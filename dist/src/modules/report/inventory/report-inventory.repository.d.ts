import { ReportFilter } from './report-inventory.types';
export declare const getAllIngredientsWithStatus: (ingredientType?: "raw" | "semi" | null, status?: "all" | "low" | "out" | null, limit?: number) => Promise<({
    unit: {
        name: string;
        unit_measure_id: string;
    };
} & {
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
})[]>;
export declare const getStockMovementsForPeriod: (filter: ReportFilter) => Promise<({
    user: {
        user_id: string;
        name: string;
    };
    supplier: {
        name: string;
        supplier_id: string;
    };
    ingredient: {
        type: string;
        name: string;
        ingredient_id: string;
        avg_cost: import("@prisma/client/runtime/client").Decimal;
        unit: {
            name: string;
        };
    };
    stock_type: {
        name: string;
        stock_type_id: string;
    };
} & {
    user_id: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    ingredient_id: string;
    qty: import("@prisma/client/runtime/client").Decimal;
    stock_movement_id: string;
    supplier_id: string | null;
    stock_type_id: string;
    unit_cost: import("@prisma/client/runtime/client").Decimal | null;
    current_stock: import("@prisma/client/runtime/client").Decimal;
    notes: string | null;
})[]>;
export declare const getStockOpnamesForPeriod: (filter: ReportFilter) => Promise<({
    user: {
        user_id: string;
        name: string;
    };
    items: {
        stock_opname_item_id: string;
        system_qty: import("@prisma/client/runtime/client").Decimal;
        physical_qty: import("@prisma/client/runtime/client").Decimal;
        difference: import("@prisma/client/runtime/client").Decimal;
    }[];
} & {
    user_id: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    status: string;
    notes: string | null;
    stock_opname_id: string;
    opname_date: Date;
})[]>;
export declare const getIngredientMovements: (ingredientId: string, startDate: Date, endDate: Date) => Promise<{
    ingredient: {
        unit: {
            name: string;
        };
    } & {
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
    movements: ({
        user: {
            name: string;
        };
        supplier: {
            name: string;
        };
        stock_type: {
            name: string;
        };
    } & {
        user_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        ingredient_id: string;
        qty: import("@prisma/client/runtime/client").Decimal;
        stock_movement_id: string;
        supplier_id: string | null;
        stock_type_id: string;
        unit_cost: import("@prisma/client/runtime/client").Decimal | null;
        current_stock: import("@prisma/client/runtime/client").Decimal;
        notes: string | null;
    })[];
    openingBalance: number;
}>;
export declare const getLastRestockDates: (ingredientIds: string[]) => Promise<Map<string, Date>>;
export declare const reportInventoryRepository: {
    getAllIngredientsWithStatus: (ingredientType?: "raw" | "semi" | null, status?: "all" | "low" | "out" | null, limit?: number) => Promise<({
        unit: {
            name: string;
            unit_measure_id: string;
        };
    } & {
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
    })[]>;
    getStockMovementsForPeriod: (filter: ReportFilter) => Promise<({
        user: {
            user_id: string;
            name: string;
        };
        supplier: {
            name: string;
            supplier_id: string;
        };
        ingredient: {
            type: string;
            name: string;
            ingredient_id: string;
            avg_cost: import("@prisma/client/runtime/client").Decimal;
            unit: {
                name: string;
            };
        };
        stock_type: {
            name: string;
            stock_type_id: string;
        };
    } & {
        user_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        ingredient_id: string;
        qty: import("@prisma/client/runtime/client").Decimal;
        stock_movement_id: string;
        supplier_id: string | null;
        stock_type_id: string;
        unit_cost: import("@prisma/client/runtime/client").Decimal | null;
        current_stock: import("@prisma/client/runtime/client").Decimal;
        notes: string | null;
    })[]>;
    getStockOpnamesForPeriod: (filter: ReportFilter) => Promise<({
        user: {
            user_id: string;
            name: string;
        };
        items: {
            stock_opname_item_id: string;
            system_qty: import("@prisma/client/runtime/client").Decimal;
            physical_qty: import("@prisma/client/runtime/client").Decimal;
            difference: import("@prisma/client/runtime/client").Decimal;
        }[];
    } & {
        user_id: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
        status: string;
        notes: string | null;
        stock_opname_id: string;
        opname_date: Date;
    })[]>;
    getIngredientMovements: (ingredientId: string, startDate: Date, endDate: Date) => Promise<{
        ingredient: {
            unit: {
                name: string;
            };
        } & {
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
        movements: ({
            user: {
                name: string;
            };
            supplier: {
                name: string;
            };
            stock_type: {
                name: string;
            };
        } & {
            user_id: string;
            created_at: Date;
            updated_at: Date | null;
            deleted_at: Date | null;
            ingredient_id: string;
            qty: import("@prisma/client/runtime/client").Decimal;
            stock_movement_id: string;
            supplier_id: string | null;
            stock_type_id: string;
            unit_cost: import("@prisma/client/runtime/client").Decimal | null;
            current_stock: import("@prisma/client/runtime/client").Decimal;
            notes: string | null;
        })[];
        openingBalance: number;
    }>;
    getLastRestockDates: (ingredientIds: string[]) => Promise<Map<string, Date>>;
};
export default reportInventoryRepository;
//# sourceMappingURL=report-inventory.repository.d.ts.map