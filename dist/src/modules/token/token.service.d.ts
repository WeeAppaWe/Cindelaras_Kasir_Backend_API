import { TokenPayload, DecodedToken, PublicTokenResult, AuthAccountResult } from './token.types';
import { AuthenticatedRequest } from '../../../types';
/**
 * Generate access key from user ID
 */
export declare const generateAccess: (text: string) => Promise<string>;
/**
 * Generate public token and key
 */
export declare const generatePublicToken: (keyAccess: string) => PublicTokenResult;
/**
 * Store token to Redis with TTL
 */
export declare const storeTokenToRedis: (key: string, payload: TokenPayload) => Promise<boolean>;
/**
 * Get access key from encrypted token
 */
export declare const getAccessKey: (token: string) => DecodedToken;
/**
 * Check if token is expired
 */
export declare const isExpired: (unixTimestamp: number) => number;
/**
 * Validate and check auth token
 */
export declare const checkAuthToken: (token: string, key: string) => Promise<string>;
/**
 * Get auth account from request headers
 */
export declare const getAuthAccount: (req: AuthenticatedRequest) => Promise<AuthAccountResult>;
/**
 * Remove token from Redis (logout)
 */
export declare const removeTokenFromRedis: (token: string, key: string) => Promise<number>;
/**
 * Remove Bearer prefix from token
 */
export declare const removeBearerPrefix: (tokenWithBearer: string) => string;
/**
 * Get token expired time in seconds
 */
export declare const getTokenExpiredTime: () => number;
export declare const tokenService: {
    generateAccess: (text: string) => Promise<string>;
    generatePublicToken: (keyAccess: string) => PublicTokenResult;
    storeTokenToRedis: (key: string, payload: TokenPayload) => Promise<boolean>;
    getAccessKey: (token: string) => DecodedToken;
    isExpired: (unixTimestamp: number) => number;
    checkAuthToken: (token: string, key: string) => Promise<string>;
    getAuthAccount: (req: AuthenticatedRequest) => Promise<AuthAccountResult>;
    removeTokenFromRedis: (token: string, key: string) => Promise<number>;
    removeBearerPrefix: (tokenWithBearer: string) => string;
    getTokenExpiredTime: () => number;
};
export default tokenService;
//# sourceMappingURL=token.service.d.ts.map