import { OpnameWithUser, OpnameWithDetails, OpnameItemWithDetails, IngredientForOpname } from '../../modules/opname/opname.types';
export declare const mockUserForOpname: {
    user_id: string;
    name: string;
};
export declare const mockUnitForOpname: {
    unit_measure_id: string;
    name: string;
};
export declare const mockUnitGram: {
    unit_measure_id: string;
    name: string;
};
export declare const mockIngredientForOpname1: IngredientForOpname;
export declare const mockIngredientForOpname2: IngredientForOpname;
export declare const mockIngredientForOpname3: IngredientForOpname;
export declare const mockIngredientsForOpname: IngredientForOpname[];
export declare const mockOpnameItem1: OpnameItemWithDetails;
export declare const mockOpnameItem2: OpnameItemWithDetails;
export declare const mockOpnameItem3: OpnameItemWithDetails;
export declare const mockOpnameItems: OpnameItemWithDetails[];
export declare const mockOpnameDraft: OpnameWithUser;
export declare const mockOpnameDraftWithDetails: OpnameWithDetails;
export declare const mockOpnameCompleted: OpnameWithUser;
export declare const mockOpnameCompletedWithDetails: OpnameWithDetails;
export declare const mockOpnameApplied: OpnameWithUser;
export declare const mockOpnameCancelled: OpnameWithUser;
export declare const mockOpnames: OpnameWithUser[];
export declare const mockCreateOpnameData: {
    valid: {
        opname_date: string;
        notes: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    validWithoutNotes: {
        opname_date: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    invalidDate: {
        opname_date: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    emptyItems: {
        opname_date: string;
        items: any[];
    };
    invalidIngredientId: {
        opname_date: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    negativePhysicalQty: {
        opname_date: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    longNotes: {
        opname_date: string;
        notes: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
};
export declare const mockUpdateOpnameData: {
    validNotesOnly: {
        notes: string;
    };
    validItemsOnly: {
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    validBoth: {
        notes: string;
        items: {
            ingredient_id: string;
            physical_qty: number;
        }[];
    };
    emptyItems: {
        items: any[];
    };
};
export declare const mockChangeStatusData: {
    toCompleted: {
        status: string;
    };
    toCancelled: {
        status: string;
    };
    invalidStatus: {
        status: string;
    };
    toApplied: {
        status: string;
    };
    toDraft: {
        status: string;
    };
};
export declare const createMockOpnameRequest: (overrides: {
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
//# sourceMappingURL=opname.mock.d.ts.map