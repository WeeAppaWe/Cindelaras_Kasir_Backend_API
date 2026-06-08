import { UserWithRelations } from './auth.types';
/**
 * Find user by username for login
 * Select only required fields for authentication and response
 */
export declare const findByUsername: (username: string) => Promise<UserWithRelations | null>;
/**
 * Find user by ID
 * Used for token validation middleware
 */
export declare const findById: (userId: string) => Promise<UserWithRelations | null>;
/**
 * Find active user by phone number
 * Used for forgot password OTP flow
 */
export declare const findByPhoneNumber: (phoneNumber: string) => Promise<UserWithRelations | null>;
/**
 * Update user password
 */
export declare const updatePassword: (userId: string, hashedPassword: string) => Promise<void>;
/**
 * Update last login timestamp
 */
export declare const updateLastLogin: (userId: string) => Promise<void>;
export declare const authRepository: {
    findByUsername: (username: string) => Promise<UserWithRelations | null>;
    findById: (userId: string) => Promise<UserWithRelations | null>;
    findByPhoneNumber: (phoneNumber: string) => Promise<UserWithRelations | null>;
    updatePassword: (userId: string, hashedPassword: string) => Promise<void>;
    updateLastLogin: (userId: string) => Promise<void>;
};
export default authRepository;
//# sourceMappingURL=auth.repository.d.ts.map