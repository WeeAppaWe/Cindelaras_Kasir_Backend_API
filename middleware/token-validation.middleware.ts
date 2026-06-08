import { Response, NextFunction } from 'express';
import { ErrorAuthenticationException } from '../exception/error-authentication.exception';
import { AuthenticatedRequest } from '../types';
import tokenService from '../src/modules/token/token.service';
import authRepository from '../src/modules/auth/auth.repository';

export const tokenValidation = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // 1. Check token on header 'Authorization' and 'x-api-key'
        const token = req.get('Authorization');
        const key = req.get('x-api-key');
        const timezone = req.get('timezone');
        const utcOffset = req.get('utc-offset');

        if (!token || !key) {
            throw new ErrorAuthenticationException('Authorization token or API key is missing!');
        }

        if (!token.startsWith('Bearer ')) {
            throw new ErrorAuthenticationException('Invalid Bearer token format!');
        }

        const tokenRemoveBearer = token.substring(7);
        const userId = await tokenService.checkAuthToken(tokenRemoveBearer, key);

        if (!userId) {
            throw new ErrorAuthenticationException('Token expired or not authorized.');
        }

        // 2. Get user from repository
        const resultAccount = await authRepository.findById(userId);

        if (!resultAccount) {
            throw new ErrorAuthenticationException('User not found.');
        }

        // 3. Attach timezone and UTC offset to user data
        const userWithTimezone = {
            ...resultAccount,
            timezone: timezone || 'Asia/Jakarta',
            utc_offset: utcOffset || '+07:00',
        };

        req.user = userWithTimezone;

        next();
    } catch (error) {
        next(error);
    }
};

export const removeBearerPrefix = (tokenWithBearer: string): string => {
    if (tokenWithBearer?.startsWith('Bearer ')) {
        return tokenWithBearer.substring(7);
    } else {
        throw new ErrorAuthenticationException('Invalid Bearer token format!');
    }
};

export default tokenValidation;
