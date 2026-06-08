import md5 from 'md5';
import uniqid from 'uniqid';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import redis from '../../../database/redis.connection';
import tokenConfig from '../../../config/token.config';
import { ErrorAuthenticationException } from '../../../exception/error-authentication.exception';
import { ErrorCodeException } from '../../../exception/error-code.exception';
import { TokenPayload, DecodedToken, PublicTokenResult, AuthAccountResult } from './token.types';
import { AuthenticatedRequest } from '../../../types';

// Token expired time in seconds (from config in minutes)
const TokenExpiredTime = (parseInt(tokenConfig.expired || '2880', 10)) * 60;

/**
 * Generate access key from user ID
 */
export const generateAccess = async (text: string): Promise<string> => {
    return md5(text + new Date().getTime());
};

/**
 * Generate public token and key
 */
export const generatePublicToken = (keyAccess: string): PublicTokenResult => {
    const encDec = new EncryptDecryptClass();
    const publicKey = uniqid.process();

    return {
        public_key: publicKey,
        public_token: encDec.encrypt(`${keyAccess}-${publicKey}`),
    };
};

/**
 * Store token to Redis with TTL
 */
export const storeTokenToRedis = async (key: string, payload: TokenPayload): Promise<boolean> => {
    try {
        await redis.set(
            key,
            JSON.stringify(payload),
            'EX',
            TokenExpiredTime + 60
        );
        return true;
    } catch (error) {
        throw new Error(String(error));
    }
};

/**
 * Get access key from encrypted token
 */
export const getAccessKey = (token: string): DecodedToken => {
    try {
        const encDec = new EncryptDecryptClass();
        const decodeToken = encDec.decrypt(token);

        if (!decodeToken) {
            throw new ErrorAuthenticationException('Invalid token format');
        }

        const parts = decodeToken.split('-');

        return {
            akses_key: parts[0],
            public_key: parts[1],
        };
    } catch (error) {
        throw new ErrorAuthenticationException('Invalid token format');
    }
};

/**
 * Check if token is expired
 */
export const isExpired = (unixTimestamp: number): number => {
    const currentMillis = new Date().getTime();
    const expiredTime = unixTimestamp + TokenExpiredTime * 1000;

    if (currentMillis > expiredTime) {
        throw new ErrorAuthenticationException('Token expired!');
    }

    return currentMillis;
};

/**
 * Validate and check auth token
 */
export const checkAuthToken = async (token: string, key: string): Promise<string> => {
    // 1. Decode token and validate key match
    const decToken = getAccessKey(token);
    if (decToken.public_key !== key) {
        throw new ErrorAuthenticationException('Token expired or not authorized.');
    }

    // 2. Get token data from Redis
    const getRecord = await redis.get(decToken.akses_key);
    if (getRecord === null) {
        throw new ErrorAuthenticationException('Token expired or not authorized.');
    }

    // 3. Validate key matches Redis record
    const parseRecord: TokenPayload = JSON.parse(getRecord);
    if (parseRecord.key !== key) {
        throw new ErrorAuthenticationException('Token expired or not authorized.');
    }

    // 4. Check expiration and get refresh time
    const refreshTokenTime = isExpired(parseRecord.refresh_token);

    // 5. Update token in Redis with new refresh time
    const payloadRefreshToken: TokenPayload = {
        id: parseRecord.id,
        key: parseRecord.key,
        login_time: parseRecord.login_time,
        refresh_token: refreshTokenTime,
    };
    await storeTokenToRedis(decToken.akses_key, payloadRefreshToken);

    return parseRecord.id;
};

/**
 * Get auth account from request headers
 */
export const getAuthAccount = async (req: AuthenticatedRequest): Promise<AuthAccountResult> => {
    const key = req.get('x-api-key');
    const authorization = req.get('Authorization');

    if (!authorization || !key) {
        throw new ErrorAuthenticationException('Token not found!');
    }

    const tokenRemoveBearer = removeBearerPrefix(authorization);
    const id = await checkAuthToken(tokenRemoveBearer, key);

    if (!id) {
        throw new ErrorAuthenticationException('Token expired or not authorized.');
    }

    return {
        id,
        key,
        tokenRemoveBearer,
    };
};

/**
 * Remove token from Redis (logout)
 */
export const removeTokenFromRedis = async (token: string, key: string): Promise<number> => {
    const decToken = getAccessKey(token);
    if (decToken.public_key !== key) {
        throw new ErrorAuthenticationException('Token expired or not authorized.');
    }

    const deleteResult = await redis.del(decToken.akses_key);
    if (!deleteResult) {
        throw new ErrorCodeException('Failed delete token!');
    }

    return deleteResult;
};

/**
 * Remove Bearer prefix from token
 */
export const removeBearerPrefix = (tokenWithBearer: string): string => {
    if (tokenWithBearer?.startsWith('Bearer ')) {
        return tokenWithBearer.substring(7);
    }
    throw new ErrorAuthenticationException('Invalid Bearer token format!');
};

/**
 * Get token expired time in seconds
 */
export const getTokenExpiredTime = (): number => {
    return TokenExpiredTime;
};

export const tokenService = {
    generateAccess,
    generatePublicToken,
    storeTokenToRedis,
    getAccessKey,
    isExpired,
    checkAuthToken,
    getAuthAccount,
    removeTokenFromRedis,
    removeBearerPrefix,
    getTokenExpiredTime,
};

export default tokenService;
