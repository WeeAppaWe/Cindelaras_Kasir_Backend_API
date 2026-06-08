// User module types

// Filter options for user queries
export interface UserFilter {
    search?: string | null;
    role_id?: string | null;
    user_status_id?: string | null;
}

// Pagination options
export interface UserPaginationOptions {
    pagination: {
        limit: number;
        offset: number;
    };
}

// Create user request
export interface CreateUserRequest {
    username: string;
    password: string;
    name: string;
    phone_number?: string;
    role_id: string;
    user_status_id?: string;
}

// Update user request
export interface UpdateUserRequest {
    username?: string;
    password?: string;
    name?: string;
    phone_number?: string;
    role_id?: string;
    user_status_id?: string;
}

// User with relations - data returned from database
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

// User list response
export interface UserListResponse {
    page: {
        total_record_count: number;
        batch_number: number;
        batch_size: number;
        max_batch_size: number;
    };
    records: UserWithRelations[];
}

// User detail response (same as UserWithRelations)
export type UserDetailResponse = UserWithRelations;

// Create user response
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

// Update user response
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

// Delete user response
export interface DeleteUserResponse {
    success: boolean;
    message: string;
}

// Role reference (for dropdown/selection)
export interface RoleReference {
    role_id: string;
    name: string;
}

// User status reference (for dropdown/selection)
export interface UserStatusReference {
    user_status_id: string;
    name: string;
}
