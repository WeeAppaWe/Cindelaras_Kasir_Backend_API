"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRedisTokenPayload = exports.mockTokenData = exports.createMockPasswordResetOtpPayload = exports.mockResetPasswordRequest = exports.mockForgotPasswordRequest = exports.mockLoginRequest = exports.mockCashierUser = exports.mockInactiveUser = exports.mockActiveUser = void 0;
// Mock user data for testing
exports.mockActiveUser = {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'admin',
    password: '$2b$10$hashedPasswordHere', // bcrypt hashed 'password123'
    name: 'Administrator',
    phone_number: '6281234567890',
    role: {
        role_id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'ADMIN',
    },
    user_status: {
        user_status_id: '770e8400-e29b-41d4-a716-446655440002',
        name: 'ACTIVE',
    },
};
exports.mockInactiveUser = {
    user_id: '550e8400-e29b-41d4-a716-446655440003',
    username: 'inactive_user',
    password: '$2b$10$hashedPasswordHere',
    name: 'Inactive User',
    phone_number: '6281234567891',
    role: {
        role_id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'CASHIER',
    },
    user_status: {
        user_status_id: '770e8400-e29b-41d4-a716-446655440004',
        name: 'INACTIVE',
    },
};
exports.mockCashierUser = {
    user_id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'cashier',
    password: '$2b$10$hashedPasswordHere',
    name: 'Cashier User',
    phone_number: '6281234567892',
    role: {
        role_id: '660e8400-e29b-41d4-a716-446655440006',
        name: 'CASHIER',
    },
    user_status: {
        user_status_id: '770e8400-e29b-41d4-a716-446655440002',
        name: 'ACTIVE',
    },
};
// Mock login request data
exports.mockLoginRequest = {
    valid: {
        username: 'admin',
        password: 'password123',
    },
    invalidUsername: {
        username: 'nonexistent',
        password: 'password123',
    },
    invalidPassword: {
        username: 'admin',
        password: 'wrongpassword',
    },
    emptyUsername: {
        username: '',
        password: 'password123',
    },
    shortPassword: {
        username: 'admin',
        password: '123',
    },
};
// Mock forgot password request data
exports.mockForgotPasswordRequest = {
    valid: {
        phone_number: '081234567890',
    },
    invalidPhone: {
        phone_number: 'abc',
    },
    unregistered: {
        phone_number: '081111111111',
    },
};
// Mock reset password request data
exports.mockResetPasswordRequest = {
    valid: {
        phone_number: '081234567890',
        otp: '123456',
        password: 'newpassword123',
        confirm_password: 'newpassword123',
    },
    invalidOtp: {
        phone_number: '081234567890',
        otp: '000000',
        password: 'newpassword123',
        confirm_password: 'newpassword123',
    },
    invalidOtpLength: {
        phone_number: '081234567890',
        otp: '123',
        password: 'newpassword123',
        confirm_password: 'newpassword123',
    },
    mismatchPassword: {
        phone_number: '081234567890',
        otp: '123456',
        password: 'newpassword123',
        confirm_password: 'differentpassword123',
    },
};
// Mock Redis password reset OTP payload
const createMockPasswordResetOtpPayload = (overrides = {}) => ({
    user_id: exports.mockActiveUser.user_id,
    phone_number: '6281234567890',
    otp_hash: 'hashed-otp',
    attempts: 0,
    expires_at: Date.now() + 300000,
    ...overrides,
});
exports.createMockPasswordResetOtpPayload = createMockPasswordResetOtpPayload;
// Mock token data
exports.mockTokenData = {
    accessKey: 'mock-access-key-hash-123',
    publicKey: 'mock-public-key-abc',
    publicToken: 'encrypted-token-xyz',
};
// Mock Redis token payload
exports.mockRedisTokenPayload = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    key: 'mock-public-key-abc',
    login_time: 1703289600000,
    refresh_token: 1703289600000,
};
//# sourceMappingURL=auth.mock.js.map