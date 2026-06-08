import { UserWithRelations, RoleReference, UserStatusReference } from '../../modules/user/user.types';

// ============================================
// ROLE MOCK DATA
// ============================================

export const mockRole: RoleReference = {
    role_id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'ADMIN',
};

export const mockCashierRole: RoleReference = {
    role_id: '660e8400-e29b-41d4-a716-446655440010',
    name: 'CASHIER',
};

export const mockRoles: RoleReference[] = [mockRole, mockCashierRole];

// ============================================
// USER STATUS MOCK DATA
// ============================================

export const mockActiveStatus: UserStatusReference = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440002',
    name: 'ACTIVE',
};

export const mockInactiveStatus: UserStatusReference = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440003',
    name: 'INACTIVE',
};

export const mockDeletedStatus: UserStatusReference = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440004',
    name: 'DELETED',
};

export const mockUserStatuses: UserStatusReference[] = [mockActiveStatus, mockInactiveStatus, mockDeletedStatus];

// ============================================
// USER MOCK DATA
// ============================================

export const mockUser: UserWithRelations = {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'admin',
    name: 'Administrator',
    last_login: null,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    role: mockRole,
    user_status: mockActiveStatus,
};

export const mockUser2: UserWithRelations = {
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'cashier1',
    name: 'Cashier One',
    last_login: null,
    created_at: new Date('2024-01-02'),
    updated_at: null,
    role: mockCashierRole,
    user_status: mockActiveStatus,
};

export const mockInactiveUser: UserWithRelations = {
    user_id: '550e8400-e29b-41d4-a716-446655440010',
    username: 'inactive_user',
    name: 'Inactive User',
    last_login: null,
    created_at: new Date('2024-01-03'),
    updated_at: null,
    role: mockCashierRole,
    user_status: mockInactiveStatus,
};

// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================

export const mockCreateUserData = {
    valid: {
        username: 'testuser',
        password: 'password123',
        name: 'Test User',
        role_id: '550e8400-e29b-41d4-a716-446655440001',
    },
    withOptionalStatus: {
        username: 'testuser2',
        password: 'password123',
        name: 'Test User With Status',
        role_id: '550e8400-e29b-41d4-a716-446655440001',
        user_status_id: '660e8400-e29b-41d4-a716-446655440002',
    },
};

export const mockUpdateUserData = {
    valid: {
        username: 'updateduser',
        name: 'Updated User',
    },
    validWithPassword: {
        password: 'newpassword123',
    },
};

// ============================================
// REQUEST MOCK HELPERS
// ============================================

export const createMockRequest = (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
