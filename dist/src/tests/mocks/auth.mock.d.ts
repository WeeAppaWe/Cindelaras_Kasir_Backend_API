import { UserWithRelations } from '../../modules/auth/auth.types';
export declare const mockActiveUser: UserWithRelations;
export declare const mockInactiveUser: UserWithRelations;
export declare const mockCashierUser: UserWithRelations;
export declare const mockLoginRequest: {
    valid: {
        username: string;
        password: string;
    };
    invalidUsername: {
        username: string;
        password: string;
    };
    invalidPassword: {
        username: string;
        password: string;
    };
    emptyUsername: {
        username: string;
        password: string;
    };
    shortPassword: {
        username: string;
        password: string;
    };
};
export declare const mockForgotPasswordRequest: {
    valid: {
        phone_number: string;
    };
    invalidPhone: {
        phone_number: string;
    };
    unregistered: {
        phone_number: string;
    };
};
export declare const mockResetPasswordRequest: {
    valid: {
        phone_number: string;
        otp: string;
        password: string;
        confirm_password: string;
    };
    invalidOtp: {
        phone_number: string;
        otp: string;
        password: string;
        confirm_password: string;
    };
    invalidOtpLength: {
        phone_number: string;
        otp: string;
        password: string;
        confirm_password: string;
    };
    mismatchPassword: {
        phone_number: string;
        otp: string;
        password: string;
        confirm_password: string;
    };
};
export declare const createMockPasswordResetOtpPayload: (overrides?: Record<string, unknown>) => {
    user_id: string;
    phone_number: string;
    otp_hash: string;
    attempts: number;
    expires_at: number;
};
export declare const mockTokenData: {
    accessKey: string;
    publicKey: string;
    publicToken: string;
};
export declare const mockRedisTokenPayload: {
    id: string;
    key: string;
    login_time: number;
    refresh_token: number;
};
//# sourceMappingURL=auth.mock.d.ts.map