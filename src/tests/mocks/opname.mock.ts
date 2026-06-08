import {
    OpnameWithUser,
    OpnameWithDetails,
    OpnameItemWithDetails,
    IngredientForOpname,
} from '../../modules/opname/opname.types';
import { OpnameStatus } from '../../modules/opname/opname.schema';

// ============================================
// USER MOCK FOR OPNAME
// ============================================

export const mockUserForOpname = {
    user_id: 'ff0e8400-e29b-41d4-a716-446655440001',
    name: 'Admin User',
};

// ============================================
// UNIT MOCK FOR INGREDIENTS
// ============================================

export const mockUnitForOpname = {
    unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440001',
    name: 'Kilogram',
};

export const mockUnitGram = {
    unit_measure_id: 'cc0e8400-e29b-41d4-a716-446655440002',
    name: 'Gram',
};

// ============================================
// INGREDIENT MOCK FOR OPNAME
// ============================================

export const mockIngredientForOpname1: IngredientForOpname = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    name: 'Beras',
    stock_qty: 100,
    unit: mockUnitForOpname,
};

export const mockIngredientForOpname2: IngredientForOpname = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
    name: 'Gula',
    stock_qty: 50,
    unit: mockUnitForOpname,
};

export const mockIngredientForOpname3: IngredientForOpname = {
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
    name: 'Tepung',
    stock_qty: 30,
    unit: mockUnitGram,
};

export const mockIngredientsForOpname: IngredientForOpname[] = [
    mockIngredientForOpname1,
    mockIngredientForOpname2,
    mockIngredientForOpname3,
];

// ============================================
// OPNAME ITEM MOCK DATA
// ============================================

export const mockOpnameItem1: OpnameItemWithDetails = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440001',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
    system_qty: 100,
    physical_qty: 98,
    difference: -2,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440001',
        name: 'Beras',
        unit: mockUnitForOpname,
    },
};

export const mockOpnameItem2: OpnameItemWithDetails = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440002',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
    system_qty: 50,
    physical_qty: 52,
    difference: 2,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440002',
        name: 'Gula',
        unit: mockUnitForOpname,
    },
};

export const mockOpnameItem3: OpnameItemWithDetails = {
    stock_opname_item_id: 'aa0e8400-e29b-41d4-a716-446655440003',
    ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
    system_qty: 30,
    physical_qty: 30,
    difference: 0,
    ingredient: {
        ingredient_id: 'bb0e8400-e29b-41d4-a716-446655440003',
        name: 'Tepung',
        unit: mockUnitGram,
    },
};

export const mockOpnameItems: OpnameItemWithDetails[] = [
    mockOpnameItem1,
    mockOpnameItem2,
    mockOpnameItem3,
];

// ============================================
// OPNAME MOCK DATA - DRAFT STATUS
// ============================================

export const mockOpnameDraft: OpnameWithUser = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440001',
    opname_date: new Date('2024-01-15'),
    status: OpnameStatus.DRAFT,
    notes: 'Opname akhir bulan Januari',
    created_at: new Date('2024-01-15'),
    updated_at: null,
    user: mockUserForOpname,
    _count: { items: 3 },
};

export const mockOpnameDraftWithDetails: OpnameWithDetails = {
    ...mockOpnameDraft,
    items: mockOpnameItems,
};

// ============================================
// OPNAME MOCK DATA - COMPLETED STATUS
// ============================================

export const mockOpnameCompleted: OpnameWithUser = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440002',
    opname_date: new Date('2024-01-20'),
    status: OpnameStatus.COMPLETED,
    notes: 'Opname sudah selesai',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
    user: mockUserForOpname,
    _count: { items: 2 },
};

export const mockOpnameCompletedWithDetails: OpnameWithDetails = {
    ...mockOpnameCompleted,
    items: [mockOpnameItem1, mockOpnameItem2],
};

// ============================================
// OPNAME MOCK DATA - APPLIED STATUS
// ============================================

export const mockOpnameApplied: OpnameWithUser = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440003',
    opname_date: new Date('2024-01-10'),
    status: OpnameStatus.APPLIED,
    notes: 'Adjustment sudah diaplikasikan',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-11'),
    user: mockUserForOpname,
    _count: { items: 2 },
};

// ============================================
// OPNAME MOCK DATA - CANCELLED STATUS
// ============================================

export const mockOpnameCancelled: OpnameWithUser = {
    stock_opname_id: 'ee0e8400-e29b-41d4-a716-446655440004',
    opname_date: new Date('2024-01-05'),
    status: OpnameStatus.CANCELLED,
    notes: 'Dibatalkan karena salah input',
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-05'),
    user: mockUserForOpname,
    _count: { items: 1 },
};

export const mockOpnames: OpnameWithUser[] = [
    mockOpnameDraft,
    mockOpnameCompleted,
    mockOpnameApplied,
    mockOpnameCancelled,
];

// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================

export const mockCreateOpnameData = {
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

export const mockUpdateOpnameData = {
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

export const mockChangeStatusData = {
    toCompleted: { status: 'COMPLETED' },
    toCancelled: { status: 'CANCELLED' },
    invalidStatus: { status: 'INVALID' },
    toApplied: { status: 'APPLIED' }, // Not allowed via changeStatus
    toDraft: { status: 'DRAFT' }, // Not allowed via changeStatus
};

// ============================================
// REQUEST MOCK HELPERS
// ============================================

export const createMockOpnameRequest = (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
    user?: { user_id: string; name: string };
}) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
    user: overrides.user || mockUserForOpname,
});
