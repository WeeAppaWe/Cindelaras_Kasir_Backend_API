import tokenService from './token.service';
import EncryptDecryptClass from '../../../utility/encrypt-decrypt';
import redis from '../../../database/redis.connection';
import { ErrorAuthenticationException } from '../../../exception/error-authentication.exception';

// Mock Redis token payload
const mockRedisTokenPayload = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    key: 'mock-public-key-abc',
    login_time: 1703289600000,
    refresh_token: 1703289600000,
};

// Mock dependencies
jest.mock('../../../utility/encrypt-decrypt');
jest.mock('../../../database/redis.connection', () => ({
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
}));
jest.mock('../../../config/token.config', () => ({
    __esModule: true,
    default: {
        expired: '2880',
    },
}));

describe('Token Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('generateAccess', () => {
        it('should generate an access key from user ID', async () => {
            const userId = 'test-user-id';
            const result = await tokenService.generateAccess(userId);

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBe(32); // MD5 hash length
        });

        it('should generate different keys for different inputs', async () => {
            const result1 = await tokenService.generateAccess('user1');
            const result2 = await tokenService.generateAccess('user2');

            expect(result1).not.toBe(result2);
        });
    });

    describe('generatePublicToken', () => {
        it('should generate public key and token', () => {
            // Arrange
            (EncryptDecryptClass.prototype.encrypt as jest.Mock).mockReturnValue('encrypted-token');

            // Act
            const result = tokenService.generatePublicToken('test-access-key');

            // Assert
            expect(result).toHaveProperty('public_key');
            expect(result).toHaveProperty('public_token');
            expect(result.public_token).toBe('encrypted-token');
        });
    });

    describe('storeTokenToRedis', () => {
        it('should store token in Redis with TTL', async () => {
            // Arrange
            (redis.set as jest.Mock).mockResolvedValue('OK');

            // Act
            const result = await tokenService.storeTokenToRedis('test-key', mockRedisTokenPayload);

            // Assert
            expect(result).toBe(true);
            expect(redis.set).toHaveBeenCalledWith(
                'test-key',
                JSON.stringify(mockRedisTokenPayload),
                'EX',
                expect.any(Number)
            );
        });

        it('should throw error when Redis fails', async () => {
            // Arrange
            (redis.set as jest.Mock).mockRejectedValue(new Error('Redis connection failed'));

            // Act & Assert
            await expect(tokenService.storeTokenToRedis('test-key', mockRedisTokenPayload))
                .rejects
                .toThrow();
        });
    });

    describe('getAccessKey', () => {
        it('should decode token and return access key with public key', () => {
            // Arrange
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('access-key-123-public-key-456');

            // Act
            const result = tokenService.getAccessKey('encrypted-token');

            // Assert
            expect(result).toHaveProperty('akses_key');
            expect(result).toHaveProperty('public_key');
        });

        it('should throw error for invalid token format', () => {
            // Arrange
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue(null);

            // Act & Assert
            expect(() => tokenService.getAccessKey('invalid-token'))
                .toThrow(ErrorAuthenticationException);
        });
    });

    describe('isExpired', () => {
        it('should return current time if token is not expired', () => {
            const currentTime = new Date().getTime();
            const result = tokenService.isExpired(currentTime);

            expect(result).toBeDefined();
            expect(typeof result).toBe('number');
        });

        it('should throw error if token is expired', () => {
            const expiredTime = new Date().getTime() - (200 * 24 * 60 * 60 * 1000); // 200 days ago

            expect(() => tokenService.isExpired(expiredTime))
                .toThrow('Token expired!');
        });
    });

    describe('checkAuthToken', () => {
        it('should return user ID for valid token', async () => {
            // Arrange - format is 'accessKey-publicKey' (first split by '-')
            // parts[0] = 'accesskey123', parts[1] = 'pubkey456'
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('accesskey123-pubkey456');
            (redis.get as jest.Mock).mockResolvedValue(JSON.stringify({
                ...mockRedisTokenPayload,
                key: 'pubkey456', // Must match parts[1] and the key parameter
                refresh_token: new Date().getTime(),
            }));
            (redis.set as jest.Mock).mockResolvedValue('OK');

            // Act - key must match public_key from getAccessKey (parts[1])
            const result = await tokenService.checkAuthToken('encrypted-token', 'pubkey456');

            // Assert
            expect(result).toBe(mockRedisTokenPayload.id);
        });

        it('should throw error when keys do not match', async () => {
            // Arrange
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('accesskey-wrongkey');

            // Act & Assert
            await expect(tokenService.checkAuthToken('encrypted-token', 'different-key'))
                .rejects
                .toThrow(ErrorAuthenticationException);
        });

        it('should throw error when token not found in Redis', async () => {
            // Arrange
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('accesskey-mypubkey');
            (redis.get as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(tokenService.checkAuthToken('encrypted-token', 'mypubkey'))
                .rejects
                .toThrow(ErrorAuthenticationException);
        });
    });

    describe('removeBearerPrefix', () => {
        it('should remove Bearer prefix from token', () => {
            const result = tokenService.removeBearerPrefix('Bearer my-token-here');

            expect(result).toBe('my-token-here');
        });

        it('should throw error for invalid Bearer format', () => {
            expect(() => tokenService.removeBearerPrefix('InvalidToken'))
                .toThrow(ErrorAuthenticationException);
        });
    });

    describe('getTokenExpiredTime', () => {
        it('should return token expired time in seconds', () => {
            const result = tokenService.getTokenExpiredTime();

            expect(result).toBe(2880 * 60); // 2880 minutes in seconds
        });
    });

    describe('removeTokenFromRedis', () => {
        it('should delete token from Redis', async () => {
            // Arrange - format 'accesskey-publickey'
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('accesskey123-pubkey456');
            (redis.del as jest.Mock).mockResolvedValue(1);

            // Act - key must match parts[1]
            const result = await tokenService.removeTokenFromRedis('encrypted-token', 'pubkey456');

            // Assert
            expect(result).toBe(1);
            expect(redis.del).toHaveBeenCalled();
        });

        it('should throw error when delete fails', async () => {
            // Arrange
            (EncryptDecryptClass.prototype.decrypt as jest.Mock).mockReturnValue('accesskey123-pubkey456');
            (redis.del as jest.Mock).mockResolvedValue(0);

            // Act & Assert
            await expect(tokenService.removeTokenFromRedis('encrypted-token', 'pubkey456'))
                .rejects
                .toThrow();
        });
    });
});
