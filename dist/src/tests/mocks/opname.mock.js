"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockOpnameRequest = exports.mockChangeStatusData = exports.mockUpdateOpnameData = exports.mockCreateOpnameData = exports.mockOpnames = exports.mockOpnameCancelled = exports.mockOpnameApplied = exports.mockOpnameCompletedWithDetails = exports.mockOpnameCompleted = exports.mockOpnameDraftWithDetails = exports.mockOpnameDraft = exports.mockOpnameItems = exports.mockOpnameItem3 = exports.mockOpnameItem2 = exports.mockOpnameItem1 = exports.mockIngredientsForOpname = exports.mockIngredientForOpname3 = exports.mockIngredientForOpname2 = exports.mockIngredientForOpname1 = exports.mockUnitGram = exports.mockUnitForOpname = exports.mockUserForOpname = void 0;
const opname_schema_1 = require("../../modules/opname/opname.schema");
// ============================================
// USER MOCK FOR OPNAME
// ============================================
exports.mockUserForOpname = {
    user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
    name: 'Admin User',
};
// ============================================
// UNIT MOCK FOR INGREDIENTS
// ============================================
exports.mockUnitForOpname = {
    unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440001',
    name: 'Kilogram',
};
exports.mockUnitGram = {
    unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440002',
    name: 'Gram',
};
// ============================================
// INGREDIENT MOCK FOR OPNAME
// ============================================
exports.mockIngredientForOpname1 = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    name: 'Beras',
    stock_qty: 100,
    unit: exports.mockUnitForOpname,
};
exports.mockIngredientForOpname2 = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
    name: 'Gula',
    stock_qty: 50,
    unit: exports.mockUnitForOpname,
};
exports.mockIngredientForOpname3 = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
    name: 'Tepung',
    stock_qty: 30,
    unit: exports.mockUnitGram,
};
exports.mockIngredientsForOpname = [
    exports.mockIngredientForOpname1,
    exports.mockIngredientForOpname2,
    exports.mockIngredientForOpname3,
];
// ============================================
// OPNAME ITEM MOCK DATA
// ============================================
exports.mockOpnameItem1 = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440001',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    system_qty: 100,
    physical_qty: 98,
    difference: -2,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        name: 'Beras',
        unit: exports.mockUnitForOpname,
    },
};
exports.mockOpnameItem2 = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440002',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
    system_qty: 50,
    physical_qty: 52,
    difference: 2,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
        name: 'Gula',
        unit: exports.mockUnitForOpname,
    },
};
exports.mockOpnameItem3 = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440003',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
    system_qty: 30,
    physical_qty: 30,
    difference: 0,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
        name: 'Tepung',
        unit: exports.mockUnitGram,
    },
};
exports.mockOpnameItems = [
    exports.mockOpnameItem1,
    exports.mockOpnameItem2,
    exports.mockOpnameItem3,
];
// ============================================
// OPNAME MOCK DATA - DRAFT STATUS
// ============================================
exports.mockOpnameDraft = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440001',
    opname_date: new Date('2024-01-15'),
    status: opname_schema_1.OpnameStatus.DRAFT,
    notes: 'Opname akhir bulan Januari',
    created_at: new Date('2024-01-15'),
    updated_at: null,
    user: exports.mockUserForOpname,
    _count: { items: 3 },
};
exports.mockOpnameDraftWithDetails = {
    ...exports.mockOpnameDraft,
    items: exports.mockOpnameItems,
};
// ============================================
// OPNAME MOCK DATA - COMPLETED STATUS
// ============================================
exports.mockOpnameCompleted = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440002',
    opname_date: new Date('2024-01-20'),
    status: opname_schema_1.OpnameStatus.COMPLETED,
    notes: 'Opname sudah selesai',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
    user: exports.mockUserForOpname,
    _count: { items: 2 },
};
exports.mockOpnameCompletedWithDetails = {
    ...exports.mockOpnameCompleted,
    items: [exports.mockOpnameItem1, exports.mockOpnameItem2],
};
// ============================================
// OPNAME MOCK DATA - APPLIED STATUS
// ============================================
exports.mockOpnameApplied = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440003',
    opname_date: new Date('2024-01-10'),
    status: opname_schema_1.OpnameStatus.APPLIED,
    notes: 'Adjustment sudah diaplikasikan',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-11'),
    user: exports.mockUserForOpname,
    _count: { items: 2 },
};
// ============================================
// OPNAME MOCK DATA - CANCELLED STATUS
// ============================================
exports.mockOpnameCancelled = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440004',
    opname_date: new Date('2024-01-05'),
    status: opname_schema_1.OpnameStatus.CANCELLED,
    notes: 'Dibatalkan karena salah input',
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-05'),
    user: exports.mockUserForOpname,
    _count: { items: 1 },
};
exports.mockOpnames = [
    exports.mockOpnameDraft,
    exports.mockOpnameCompleted,
    exports.mockOpnameApplied,
    exports.mockOpnameCancelled,
];
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockCreateOpnameData = {
    valid: {
        opname_date: '2024-01-15',
        notes: 'Opname akhir bulan',
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 98 },
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002', physical_qty: 52 },
        ],
    },
    validWithoutNotes: {
        opname_date: '2024-01-15',
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
        ],
    },
    invalidDate: {
        opname_date: '15-01-2024', // Wrong format
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
        ],
    },
    emptyItems: {
        opname_date: '2024-01-15',
        items: [],
    },
    invalidIngredientId: {
        opname_date: '2024-01-15',
        items: [
            { ingredient_id: 'invalid-uuid', physical_qty: 100 },
        ],
    },
    negativePhysicalQty: {
        opname_date: '2024-01-15',
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: -5 },
        ],
    },
    longNotes: {
        opname_date: '2024-01-15',
        notes: 'a'.repeat(501), // Exceeds 500 chars
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
        ],
    },
};
exports.mockUpdateOpnameData = {
    validNotesOnly: {
        notes: 'Updated notes',
    },
    validItemsOnly: {
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
        ],
    },
    validBoth: {
        notes: 'Updated notes with items',
        items: [
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001', physical_qty: 100 },
            { ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002', physical_qty: 50 },
        ],
    },
    emptyItems: {
        items: [],
    },
};
exports.mockChangeStatusData = {
    toCompleted: { status: 'COMPLETED' },
    toCancelled: { status: 'CANCELLED' },
    invalidStatus: { status: 'INVALID' },
    toApplied: { status: 'APPLIED' }, // Not allowed via changeStatus
    toDraft: { status: 'DRAFT' }, // Not allowed via changeStatus
};
// ============================================
// REQUEST MOCK HELPERS
// ============================================
const createMockOpnameRequest = (overrides) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
    user: overrides.user || exports.mockUserForOpname,
});
exports.createMockOpnameRequest = createMockOpnameRequest;
//# sourceMappingURL=opname.mock.js.map