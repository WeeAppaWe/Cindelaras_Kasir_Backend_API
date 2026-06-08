import { SupplierData, SupplierWithDetails } from '../../modules/supplier/supplier.types';
export declare const mockSupplier: SupplierData;
export declare const mockSupplier2: SupplierData;
export declare const mockSupplier3: SupplierData;
export declare const mockSupplierWithDetails: SupplierWithDetails;
export declare const mockSupplierWithDetails2: SupplierWithDetails;
export declare const mockSupplierWithDetails3: SupplierWithDetails;
export declare const mockSuppliers: SupplierData[];
export declare const mockSuppliersWithDetails: SupplierWithDetails[];
export declare const mockCreateSupplierData: {
    valid: {
        name: string;
        phone: string;
        address: string;
    };
    validMinimal: {
        name: string;
    };
    emptyName: {
        name: string;
    };
    shortName: {
        name: string;
    };
    invalidPhone: {
        name: string;
        phone: string;
    };
    longName: {
        name: string;
    };
};
export declare const mockUpdateSupplierData: {
    valid: {
        name: string;
        phone: string;
    };
    validPartial: {
        phone: string;
    };
    emptyObject: {};
    invalidPhone: {
        phone: string;
    };
};
export declare const createMockSupplierRequest: (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => {
    params: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, unknown>;
};
//# sourceMappingURL=supplier.mock.d.ts.map