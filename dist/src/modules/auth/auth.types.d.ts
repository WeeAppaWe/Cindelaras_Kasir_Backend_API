export interface LoginRequest {
    username: string;
    password: string;
}
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
export interface UserWithRelations {
    user_id: string;
    username: string;
    password?: string;
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
export interface LogoutResponse {
    success: boolean;
    message: string;
}
export interface ForgotPasswordRequestOtpRequest {
    phone_number: string;
}
export interface ForgotPasswordRequestOtpResponse {
    success: boolean;
    message: string;
    expires_in: number;
}
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
export interface PasswordResetOtpPayload {
    user_id: string;
    phone_number: string;
    otp_hash: string;
    attempts: number;
    expires_at: number;
    locked_until?: number;
}
//# sourceMappingURL=auth.types.d.ts.map