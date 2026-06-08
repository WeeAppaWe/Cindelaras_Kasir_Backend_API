"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockRequest = exports.mockUpdateUserData = exports.mockCreateUserData = exports.mockInactiveUser = exports.mockUser2 = exports.mockUser = exports.mockUserStatuses = exports.mockDeletedStatus = exports.mockInactiveStatus = exports.mockActiveStatus = exports.mockRoles = exports.mockCashierRole = exports.mockRole = void 0;
// ============================================
// ROLE MOCK DATA
// ============================================
exports.mockRole = {
    role_id: '660e8400-e29b-41d4-a716-446655440001',
    name: 'ADMIN',
};
exports.mockCashierRole = {
    role_id: '660e8400-e29b-41d4-a716-446655440010',
    name: 'CASHIER',
};
exports.mockRoles = [exports.mockRole, exports.mockCashierRole];
// ============================================
// USER STATUS MOCK DATA
// ============================================
exports.mockActiveStatus = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440002',
    name: 'ACTIVE',
};
exports.mockInactiveStatus = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440003',
    name: 'INACTIVE',
};
exports.mockDeletedStatus = {
    user_status_id: '770e8400-e29b-41d4-a716-446655440004',
    name: 'DELETED',
};
exports.mockUserStatuses = [exports.mockActiveStatus, exports.mockInactiveStatus, exports.mockDeletedStatus];
// ============================================
// USER MOCK DATA
// ============================================
exports.mockUser = {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'admin',
    name: 'Administrator',
    last_login: null,
    created_at: new Date('2024-01-01'),
    updated_at: null,
    role: exports.mockRole,
    user_status: exports.mockActiveStatus,
};
exports.mockUser2 = {
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'cashier1',
    name: 'Cashier One',
    last_login: null,
    created_at: new Date('2024-01-02'),
    updated_at: null,
    role: exports.mockCashierRole,
    user_status: exports.mockActiveStatus,
};
exports.mockInactiveUser = {
    user_id: '550e8400-e29b-41d4-a716-446655440010',
    username: 'inactive_user',
    name: 'Inactive User',
    last_login: null,
    created_at: new Date('2024-01-03'),
    updated_at: null,
    role: exports.mockCashierRole,
    user_status: exports.mockInactiveStatus,
};
// ============================================
// SCHEMA VALIDATION MOCK DATA
// ============================================
exports.mockCreateUserData = {
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
exports.mockUpdateUserData = {
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
const createMockRequest = (overrides) => ({
    params: overrides.params || {},
    query: overrides.query || {},
    body: overrides.body || {},
});
exports.createMockRequest = createMockRequest;
//# sourceMappingURL=user.mock.js.map