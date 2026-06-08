import { SupplierData, SupplierWithDetails } from '../../modules/supplier/supplier.types';

// ============================================
// SUPPLIER MOCK DATA
// ============================================

export const mockSupplier: SupplierData = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'PT Supplier Jaya',
    phone: '021-1234567',
    address: 'Jl. Raya No. 123, Jakarta',
    created_at: new Date('2024-01-01'),
    updated_at: null,
};

export const mockSupplier2: SupplierData = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'CV Bahan Makanan',
    phone: '022-7654321',
    address: 'Jl. Sudirman No. 456, Bandung',
    created_at: new Date('2024-01-02'),
    updated_at: null,
};

export const mockSupplier3: SupplierData = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Toko Sembako Makmur',
    phone: null,
    address: null,
    created_at: new Date('2024-01-03'),
    updated_at: null,
};

export const mockSupplierWithDetails: SupplierWithDetails = {
    ...mockSupplier,
    _count: {
        stock_movements: 5,
    },
};

export const mockSupplierWithDetails2: SupplierWithDetails = {
    ...mockSupplier2,
    _count: {
        stock_movements: 10,
    },
};

export const mockSupplierWithDetails3: SupplierWithDetails = {
    ...mockSupplier3,
    _count: {
        stock_movements: 0,
    },
};

export const mockSuppliers: SupplierData[] = [mockSupplier, mockSupplier2, mockSupplier3];
export const mockSuppliersWithDetails: SupplierWithDetails[] = [
    mockSupplierWithDetails,
    mockSupplierWithDetails2,
    mockSupplierWithDetails3,
];

// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================

export const mockCreateSupplierData = {
    valid: {
        name: 'PT Supplier Jaya',
        phone: '021-1234567',
        address: 'Jl. Raya No. 123, Jakarta',
    },
    validMinimal: {
        name: 'Toko Bahan Makanan',
    },
    emptyName: {
        name: '',
    },
    shortName: {
        name: 'A',
    },
    invalidPhone: {
        name: 'Supplier Test',
        phone: 'invalid-phone-abc',
    },
    longName: {
        name: 'a'.repeat(101),
    },
};

export const mockUpdateSupplierData = {
    valid: {
        name: 'PT Supplier Makmur',
        phone: '022-7654321',
    },
    validPartial: {
        phone: '031-9999999',
    },
    emptyObject: {},
    invalidPhone: {
        phone: 'not-a-phone!@#',
    },
};

// ============================================
// REQUEST MOCK HELPERS
// ============================================

export const createMockSupplierRequest = (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
