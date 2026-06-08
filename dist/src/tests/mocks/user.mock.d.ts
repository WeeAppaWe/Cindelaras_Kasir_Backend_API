import { UserWithRelations, RoleReference, UserStatusReference } from '../../modules/user/user.types';
export declare const mockRole: RoleReference;
export declare const mockCashierRole: RoleReference;
export declare const mockRoles: RoleReference[];
export declare const mockActiveStatus: UserStatusReference;
export declare const mockInactiveStatus: UserStatusReference;
export declare const mockDeletedStatus: UserStatusReference;
export declare const mockUserStatuses: UserStatusReference[];
export declare const mockUser: UserWithRelations;
export declare const mockUser2: UserWithRelations;
export declare const mockInactiveUser: UserWithRelations;
export declare const mockCreateUserData: {
    valid: {
        username: string;
        password: string;
        name: string;
        role_id: string;
    };
    withOptionalStatus: {
        username: string;
        password: string;
        name: string;
        role_id: string;
        user_status_id: string;
    };
};
export declare const mockUpdateUserData: {
    valid: {
        username: string;
        name: string;
    };
    validWithPassword: {
        password: string;
    };
};
export declare const createMockRequest: (overrides: {
    params?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, unknown>;
}) => {
    params: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, unknown>;
};
//# sourceMappingURL=user.mock.d.ts.map