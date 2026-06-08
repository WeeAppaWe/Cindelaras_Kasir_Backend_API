"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = exports.getTokenExpiredTime = exports.removeBearerPrefix = exports.removeTokenFromRedis = exports.getAuthAccount = exports.checkAuthToken = exports.isExpired = exports.getAccessKey = exports.storeTokenToRedis = exports.generatePublicToken = exports.generateAccess = void 0;
const md5_1 = __importDefault(require("md5"));
const uniqid_1 = __importDefault(require("uniqid"));
const encrypt_decrypt_1 = __importDefault(require("../../../utility/encrypt-decrypt"));
const redis_connection_1 = __importDefault(require("../../../database/redis.connection"));
const token_config_1 = __importDefault(require("../../../config/token.config"));
const error_authentication_exception_1 = require("../../../exception/error-authentication.exception");
const error_code_exception_1 = require("../../../exception/error-code.exception");
// Token expired time in seconds (from config in minutes)
const TokenExpiredTime = (parseInt(token_config_1.default.expired || '2880', 10)) * 60;
/**
 * Generate access key from user ID
 */
const generateAccess = async (text) => {
    return (0, md5_1.default)(text + new Date().getTime());
};
exports.generateAccess = generateAccess;
/**
 * Generate public token and key
 */
const generatePublicToken = (keyAccess) => {
    const encDec = new encrypt_decrypt_1.default();
    const publicKey = uniqid_1.default.process();
    return {
        public_key: publicKey,
        public_token: encDec.encrypt(`${keyAccess}-${publicKey}`),
    };
};
exports.generatePublicToken = generatePublicToken;
/**
 * Store token to Redis with TTL
 */
const storeTokenToRedis = async (key, payload) => {
    try {
        await redis_connection_1.default.set(key, JSON.stringify(payload), 'EX', TokenExpiredTime + 60);
        return true;
    }
    catch (error) {
        throw new Error(String(error));
    }
};
exports.storeTokenToRedis = storeTokenToRedis;
/**
 * Get access key from encrypted token
 */
const getAccessKey = (token) => {
    try {
        const encDec = new encrypt_decrypt_1.default();
        const decodeToken = encDec.decrypt(token);
        if (!decodeToken) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Invalid token format');
        }
        const parts = decodeToken.split('-');
        return {
            akses_key: parts[0],
            public_key: parts[1],
        };
    }
    catch (error) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Invalid token format');
    }
};
exports.getAccessKey = getAccessKey;
/**
 * Check if token is expired
 */
const isExpired = (unixTimestamp) => {
    const currentMillis = new Date().getTime();
    const expiredTime = unixTimestamp + TokenExpiredTime * 1000;
    if (currentMillis > expiredTime) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired!');
    }
    return currentMillis;
};
exports.isExpired = isExpired;
/**
 * Validate and check auth token
 */
const checkAuthToken = async (token, key) => {
    // 1. Decode token and validate key match
    const decToken = (0, exports.getAccessKey)(token);
    if (decToken.public_key !== key) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
    }
    // 2. Get token data from Redis
    const getRecord = await redis_connection_1.default.get(decToken.akses_key);
    if (getRecord === null) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
    }
    // 3. Validate key matches Redis record
    const parseRecord = JSON.parse(getRecord);
    if (parseRecord.key !== key) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
    }
    // 4. Check expiration and get refresh time
    const refreshTokenTime = (0, exports.isExpired)(parseRecord.refresh_token);
    // 5. Update token in Redis with new refresh time
    const payloadRefreshToken = {
        id: parseRecord.id,
        key: parseRecord.key,
        login_time: parseRecord.login_time,
        refresh_token: refreshTokenTime,
    };
    await (0, exports.storeTokenToRedis)(decToken.akses_key, payloadRefreshToken);
    return parseRecord.id;
};
exports.checkAuthToken = checkAuthToken;
/**
 * Get auth account from request headers
 */
const getAuthAccount = async (req) => {
    const key = req.get('x-api-key');
    const authorization = req.get('Authorization');
    if (!authorization || !key) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token not found!');
    }
    const tokenRemoveBearer = (0, exports.removeBearerPrefix)(authorization);
    const id = await (0, exports.checkAuthToken)(tokenRemoveBearer, key);
    if (!id) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
    }
    return {
        id,
        key,
        tokenRemoveBearer,
    };
};
exports.getAuthAccount = getAuthAccount;
/**
 * Remove token from Redis (logout)
 */
const removeTokenFromRedis = async (token, key) => {
    const decToken = (0, exports.getAccessKey)(token);
    if (decToken.public_key !== key) {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
    }
    const deleteResult = await redis_connection_1.default.del(decToken.akses_key);
    if (!deleteResult) {
        throw new error_code_exception_1.ErrorCodeException('Failed delete token!');
    }
    return deleteResult;
};
exports.removeTokenFromRedis = removeTokenFromRedis;
/**
 * Remove Bearer prefix from token
 */
const removeBearerPrefix = (tokenWithBearer) => {
    if (tokenWithBearer?.startsWith('Bearer ')) {
        return tokenWithBearer.substring(7);
    }
    throw new error_authentication_exception_1.ErrorAuthenticationException('Invalid Bearer token format!');
};
exports.removeBearerPrefix = removeBearerPrefix;
/**
 * Get token expired time in seconds
 */
const getTokenExpiredTime = () => {
    return TokenExpiredTime;
};
exports.getTokenExpiredTime = getTokenExpiredTime;
exports.tokenService = {
    generateAccess: exports.generateAccess,
    generatePublicToken: exports.generatePublicToken,
    storeTokenToRedis: exports.storeTokenToRedis,
    getAccessKey: exports.getAccessKey,
    isExpired: exports.isExpired,
    checkAuthToken: exports.checkAuthToken,
    getAuthAccount: exports.getAuthAccount,
    removeTokenFromRedis: exports.removeTokenFromRedis,
    removeBearerPrefix: exports.removeBearerPrefix,
    getTokenExpiredTime: exports.getTokenExpiredTime,
};
exports.default = exports.tokenService;
//# sourceMappingURL=token.service.js.map