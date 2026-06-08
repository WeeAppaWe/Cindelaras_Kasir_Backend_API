// Auth module types

// Login request
export interface LoginRequest {
    username: string;
    password: string;
}

// Login response
export interface LoginResponse {
    token: TokenInfo;
    user: UserInfo;
}

export interface TokenInfo {
    access_token: string;
    api_key: string;
    token_type: string;
    expires_in: number;
}

export interface UserInfo {
    user_id: string;
    username: string;
    name: string;
    phone_number?: string | null;
    role: RoleInfo;
    status: StatusInfo;
}

export interface RoleInfo {
    role_id: string;
    name: string;
}

export interface StatusInfo {
    user_status_id: string;
    name: string;
}

// User with relations - only fields selected from database
export interface UserWithRelations {
    user_id: string;
    username: string;
    password?: string; // Optional: only included in findByUsername, not findById
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
}

// Logout response
export interface LogoutResponse {
    success: boolean;
    message: string;
}

// Forgot password request OTP
export interface ForgotPasswordRequestOtpRequest {
    phone_number: string;
}

export interface ForgotPasswordRequestOtpResponse {
    success: boolean;
    message: string;
    expires_in: number;
}

// Reset password with OTP
export interface ResetPasswordRequest {
    phone_number: string;
    otp: string;
    password: string;
    confirm_password: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

// Redis payload for password reset OTP
export interface PasswordResetOtpPayload {
    user_id: string;
    phone_number: string;
    otp_hash: string;
    attempts: number;
    expires_at: number;
    locked_until?: number;
}
