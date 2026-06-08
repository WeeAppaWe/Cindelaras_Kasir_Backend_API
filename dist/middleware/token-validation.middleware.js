"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBearerPrefix = exports.tokenValidation = void 0;
const error_authentication_exception_1 = require("../exception/error-authentication.exception");
const token_service_1 = __importDefault(require("../src/modules/token/token.service"));
const auth_repository_1 = __importDefault(require("../src/modules/auth/auth.repository"));
const tokenValidation = async (req, res, next) => {
    try {
        // 1. Check token on header 'Authorization' and 'x-api-key'
        const token = req.get('Authorization');
        const key = req.get('x-api-key');
        const timezone = req.get('timezone');
        const utcOffset = req.get('utc-offset');
        if (!token || !key) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Authorization token or API key is missing!');
        }
        if (!token.startsWith('Bearer ')) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Invalid Bearer token format!');
        }
        const tokenRemoveBearer = token.substring(7);
        const userId = await token_service_1.default.checkAuthToken(tokenRemoveBearer, key);
        if (!userId) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('Token expired or not authorized.');
        }
        // 2. Get user from repository
        const resultAccount = await auth_repository_1.default.findById(userId);
        if (!resultAccount) {
            throw new error_authentication_exception_1.ErrorAuthenticationException('User not found.');
        }
        // 3. Attach timezone and UTC offset to user data
        const userWithTimezone = {
            ...resultAccount,
            timezone: timezone || 'Asia/Jakarta',
            utc_offset: utcOffset || '+07:00',
        };
        req.user = userWithTimezone;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.tokenValidation = tokenValidation;
const removeBearerPrefix = (tokenWithBearer) => {
    if (tokenWithBearer?.startsWith('Bearer ')) {
        return tokenWithBearer.substring(7);
    }
    else {
        throw new error_authentication_exception_1.ErrorAuthenticationException('Invalid Bearer token format!');
    }
};
exports.removeBearerPrefix = removeBearerPrefix;
exports.default = exports.tokenValidation;
//# sourceMappingURL=token-validation.middleware.js.map