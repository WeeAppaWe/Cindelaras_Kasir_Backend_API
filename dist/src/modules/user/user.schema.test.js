"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const user_mock_1 = require("../../tests/mocks/user.mock");
// ============================================
// CREATE USER SCHEMA TESTS
// ============================================
describe('User Schema Validation', () => {
    describe('createUserSchema', () => {
        it('should pass validation with valid required fields', () => {
            const result = user_schema_1.createUserSchema.safeParse(user_mock_1.mockCreateUserData.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.username).toBe('testuser');
                expect(result.data.password).toBe('password123');
                expect(result.data.name).toBe('Test User');
                expect(result.data.role_id).toBe('550e8400-e29b-41d4-a716-446655440001');
            }
        });
        it('should pass validation with optional user_status_id', () => {
            const result = user_schema_1.createUserSchema.safeParse(user_mock_1.mockCreateUserData.withOptionalStatus);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.user_status_id).toBe('660e8400-e29b-41d4-a716-446655440002');
            }
        });
        it('should fail validation with empty username', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                username: '',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
            }
        });
        it('should fail validation with username less than 3 characters', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                username: 'ab',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
                expect(usernameError?.message).toContain('minimal');
            }
        });
        it('should fail validation with username more than 50 characters', () => {
            const longUsername = 'a'.repeat(51);
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                username: longUsername,
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
                expect(usernameError?.message).toContain('maksimal');
            }
        });
        it('should fail validation with username containing special characters', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                username: 'test@user!',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
                expect(usernameError?.message).toContain('huruf, angka, dan underscore');
            }
        });
        it('should pass validation with username containing underscore', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                username: 'test_user_123',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with password less than 6 characters', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                password: '12345',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find((issue) => issue.path.includes('password'));
                expect(passwordError).toBeDefined();
                expect(passwordError?.message).toContain('minimal');
            }
        });
        it('should fail validation with name less than 2 characters', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                name: 'A',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('minimal');
            }
        });
        it('should fail validation with name more than 100 characters', () => {
            const longName = 'a'.repeat(101);
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                name: longName,
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find((issue) => issue.path.includes('name'));
                expect(nameError).toBeDefined();
                expect(nameError?.message).toContain('maksimal');
            }
        });
        it('should fail validation with invalid UUID format for role_id', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                role_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const roleIdError = result.error.issues.find((issue) => issue.path.includes('role_id'));
                expect(roleIdError).toBeDefined();
                expect(roleIdError?.message).toContain('tidak valid');
            }
        });
        it('should fail validation with invalid UUID format for user_status_id', () => {
            const result = user_schema_1.createUserSchema.safeParse({
                ...user_mock_1.mockCreateUserData.valid,
                user_status_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const statusIdError = result.error.issues.find((issue) => issue.path.includes('user_status_id'));
                expect(statusIdError).toBeDefined();
                expect(statusIdError?.message).toContain('tidak valid');
            }
        });
        it('should fail validation with missing required fields', () => {
            const result = user_schema_1.createUserSchema.safeParse({});
            expect(result.success).toBe(false);
            if (!result.success) {
                // Should have at least 4 errors (username, password, name, role_id)
                expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
            }
        });
    });
    // ============================================
    // UPDATE USER SCHEMA TESTS
    // ============================================
    describe('updateUserSchema', () => {
        it('should pass validation with partial update (username only)', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                username: 'newusername',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.username).toBe('newusername');
            }
        });
        it('should pass validation with partial update (name only)', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                name: 'New Name',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('New Name');
            }
        });
        it('should pass validation with partial update (password only)', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                password: 'newpassword123',
            });
            expect(result.success).toBe(true);
        });
        it('should pass validation with empty object (no updates)', () => {
            const result = user_schema_1.updateUserSchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should pass validation with all fields provided', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                username: 'newusername',
                password: 'newpassword123',
                name: 'New Name',
                role_id: '550e8400-e29b-41d4-a716-446655440001',
                user_status_id: '660e8400-e29b-41d4-a716-446655440002',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid username format when provided', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                username: 'invalid@user',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const usernameError = result.error.issues.find((issue) => issue.path.includes('username'));
                expect(usernameError).toBeDefined();
            }
        });
        it('should fail validation with short password when provided', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                password: '123',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find((issue) => issue.path.includes('password'));
                expect(passwordError).toBeDefined();
            }
        });
        it('should fail validation with invalid UUID for role_id when provided', () => {
            const result = user_schema_1.updateUserSchema.safeParse({
                role_id: 'not-a-uuid',
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // USER ID PARAM SCHEMA TESTS
    // ============================================
    describe('userIdParamSchema', () => {
        it('should pass validation with valid UUID', () => {
            const result = user_schema_1.userIdParamSchema.safeParse({
                user_id: '550e8400-e29b-41d4-a716-446655440000',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.user_id).toBe('550e8400-e29b-41d4-a716-446655440000');
            }
        });
        it('should fail validation with invalid UUID format', () => {
            const result = user_schema_1.userIdParamSchema.safeParse({
                user_id: 'invalid-uuid-format',
            });
            expect(result.success).toBe(false);
            if (!result.success) {
                const userIdError = result.error.issues.find((issue) => issue.path.includes('user_id'));
                expect(userIdError).toBeDefined();
                expect(userIdError?.message).toContain('tidak valid');
            }
        });
        it('should fail validation with missing user_id', () => {
            const result = user_schema_1.userIdParamSchema.safeParse({});
            expect(result.success).toBe(false);
        });
        it('should fail validation with empty user_id', () => {
            const result = user_schema_1.userIdParamSchema.safeParse({
                user_id: '',
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // USER LIST QUERY SCHEMA TESTS
    // ============================================
    describe('userListQuerySchema', () => {
        it('should pass validation with empty query (uses defaults)', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({});
            expect(result.success).toBe(true);
        });
        it('should pass validation with batch and size', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                batch: '2',
                size: '20',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.batch).toBe(2);
                expect(result.data.size).toBe(20);
            }
        });
        it('should pass validation with search query', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                search: 'admin',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.search).toBe('admin');
            }
        });
        it('should pass validation with valid role_id filter', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                role_id: '550e8400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should pass validation with valid user_status_id filter', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                user_status_id: '660e8400-e29b-41d4-a716-446655440002',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid UUID for role_id', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                role_id: 'not-a-uuid',
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with invalid UUID for user_status_id', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                user_status_id: 'not-a-uuid',
            });
            expect(result.success).toBe(false);
        });
        it('should coerce string batch to number', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                batch: '5',
            });
            expect(result.success).toBe(true);
            if (result.success) {
                expect(typeof result.data.batch).toBe('number');
                expect(result.data.batch).toBe(5);
            }
        });
        it('should fail validation with batch less than 1', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                batch: '0',
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with size greater than 100', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                size: '101',
            });
            expect(result.success).toBe(false);
        });
        it('should pass validation with all query params', () => {
            const result = user_schema_1.userListQuerySchema.safeParse({
                batch: '1',
                size: '10',
                search: 'test',
                role_id: '550e8400-e29b-41d4-a716-446655440001',
                user_status_id: '660e8400-e29b-41d4-a716-446655440002',
            });
            expect(result.success).toBe(true);
        });
    });
    // ============================================
    // ENUM TESTS
    // ============================================
    describe('Enums', () => {
        describe('RoleName', () => {
            it('should have ADMIN value', () => {
                expect(user_schema_1.RoleName.ADMIN).toBe('ADMIN');
            });
            it('should have CASHIER value', () => {
                expect(user_schema_1.RoleName.CASHIER).toBe('CASHIER');
            });
        });
        describe('UserStatusName', () => {
            it('should have ACTIVE value', () => {
                expect(user_schema_1.UserStatusName.ACTIVE).toBe('ACTIVE');
            });
            it('should have INACTIVE value', () => {
                expect(user_schema_1.UserStatusName.INACTIVE).toBe('INACTIVE');
            });
            it('should have DELETED value', () => {
                expect(user_schema_1.UserStatusName.DELETED).toBe('DELETED');
            });
        });
    });
});
//# sourceMappingURL=user.schema.test.js.map