"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockSupplierRequest = exports.mockUpdateSupplierData = exports.mockCreateSupplierData = exports.mockSuppliersWithDetails = exports.mockSuppliers = exports.mockSupplierWithDetails3 = exports.mockSupplierWithDetails2 = exports.mockSupplierWithDetails = exports.mockSupplier3 = exports.mockSupplier2 = exports.mockSupplier = void 0;
// ============================================
// SUPPLIER MOCK DATA
// ============================================
exports.mockSupplier = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'PT Supplier Jaya',
    phone: '021-1234567',
    address: 'Jl. Raya No. 123, Jakarta',
    created_at: new Date('2024-01-01'),
    updated_at: null,
};
exports.mockSupplier2 = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'CV Bahan Makanan',
    phone: '022-7654321',
    address: 'Jl. Sudirman No. 456, Bandung',
    created_at: new Date('2024-01-02'),
    updated_at: null,
};
exports.mockSupplier3 = {
    supplier_id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Toko Sembako Makmur',
    phone: null,
    address: null,
    created_at: new Date('2024-01-03'),
    updated_at: null,
};
exports.mockSupplierWithDetails = {
    ...exports.mockSupplier,
    _count: {
        stock_movements: 5,
    },
};
exports.mockSupplierWithDetails2 = {
    ...exports.mockSupplier2,
    _count: {
        stock_movements: 10,
    },
};
exports.mockSupplierWithDetails3 = {
    ...exports.mockSupplier3,
    _count: {
        stock_movements: 0,
    },
};
exports.mockSuppliers = [exports.mockSupplier, exports.mockSupplier2, exports.mockSupplier3];
exports.mockSuppliersWithDetails = [
    exports.mockSupplierWithDetails,
    exports.mockSupplierWithDetails2,
    exports.mockSupplierWithDetails3,
];
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockCreateSupplierData = {
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
exports.mockUpdateSupplierData = {
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
const createMockSupplierRequest = (overrides) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
exports.createMockSupplierRequest = createMockSupplierRequest;
//# sourceMappingURL=supplier.mock.js.map