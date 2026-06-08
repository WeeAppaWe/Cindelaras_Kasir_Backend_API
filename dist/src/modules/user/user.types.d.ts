export interface UserFilter {
    search?: string | null;
    role_id?: string | null;
    user_status_id?: string | null;
}
export interface UserPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}
export interface CreateUserRequest {
    username: string;
    password: string;
    name: string;
    phone_number?: string;
    role_id: string;
    user_status_id?: string;
}
export interface UpdateUserRequest {
    username?: string;
    password?: string;
    name?: string;
    phone_number?: string;
    role_id?: string;
    user_status_id?: string;
}
export interface UserWithRelations {
    user_id: string;
    username: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | null;
    created_at: Date;
    updated_at?: Date | null;
    role: {
        role_id: string;
        name: string;
    };
    user_status: {
        user_status_id: string;
        name: string;
    };
}
export interface UserListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: UserWithRelations[];
}
export type UserDetailResponse = UserWithRelations;
export interface CreateUserResponse {
    user_id: string;
    username: string;
    name: string;
    phone_number?: string | null;
    role: {
        role_id: string;
        name: string;
    };
    user_status: {
        user_status_id: string;
        name: string;
    };
    created_at: Date;
}
export interface UpdateUserResponse {
    user_id: string;
    username: string;
    name: string;
    phone_number?: string | null;
    role: {
        role_id: string;
        name: string;
    };
    user_status: {
        user_status_id: string;
        name: string;
    };
    updated_at: Date;
}
export interface DeleteUserResponse {
    success: boolean;
    message: string;
}
export interface RoleReference {
    role_id: string;
    name: string;
}
export interface UserStatusReference {
    user_status_id: string;
    name: string;
}
//# sourceMappingURL=user.types.d.ts.map