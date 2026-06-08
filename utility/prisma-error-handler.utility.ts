import { Prisma } from '../src/generated/prisma/client';
import { PrismaErrorException } from '../exception/prisma-error.exception';

/**
 * Type guard to check if an error is a Prisma error
 */
export const isPrismaError = (error: unknown): boolean => {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError ||
        error instanceof Prisma.PrismaClientRustPanicError ||
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientValidationError
    );
};

/**
 * Convert Prisma error to PrismaErrorException
 * Use this when you want to manually convert errors
 */
export const toPrismaException = (error: unknown): PrismaErrorException | null => {
    if (isPrismaError(error)) {
        return new PrismaErrorException(error);
    }
    return null;
};

/**
 * Handle Prisma error - throws PrismaErrorException if it's a Prisma error,
 * otherwise re-throws the original error
 */
export const handlePrismaError = (error: unknown): never => {
    if (isPrismaError(error)) {
        throw new PrismaErrorException(error);
    }
    throw error;
};

/**
 * Wrapper function to execute Prisma operations with automatic error handling.
 * This is useful for wrapping any async operation that uses Prisma.
 * 
 * @example
 * // Instead of:
 * try {
 *   const user = await prisma.user.create({ data: { email: 'test@test.com' } });
 * } catch (error) {
 *   if (error instanceof Prisma.PrismaClientKnownRequestError) {
 *     // handle...
 *   }
 *   throw error;
 * }
 * 
 * // You can simply do:
 * const user = await withPrismaErrorHandler(() => 
 *   prisma.user.create({ data: { email: 'test@test.com' } })
 * );
 */
export const withPrismaErrorHandler = async <T>(
    operation: () => Promise<T>
): Promise<T> => {
    try {
        return await operation();
    } catch (error) {
        handlePrismaError(error);
    }
};

/**
 * Check if an error is a specific Prisma error code
 * 
 * @example
 * try {
 *   await prisma.user.create({ data: { email: 'existing@email.com' } });
 * } catch (error) {
 *   if (isPrismaErrorCode(error, 'P2002')) {
 *     // Handle unique constraint violation
 *     throw new ErrorDataAlreadyExistException('Email sudah terdaftar');
 *   }
 *   throw error;
 * }
 */
export const isPrismaErrorCode = (error: unknown, code: string): boolean => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return error.code === code;
    }
    return false;
};

/**
 * Get meta information from Prisma error (useful for unique constraint violations)
 * 
 * @example
 * try {
 *   await prisma.user.create({ data: { email: 'existing@email.com' } });
 * } catch (error) {
 *   const meta = getPrismaErrorMeta(error);
 *   if (meta?.target) {
 *     console.log('Fields that caused the error:', meta.target);
 *   }
 * }
 */
export const getPrismaErrorMeta = (error: unknown): Record<string, unknown> | null => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return error.meta as Record<string, unknown> || null;
    }
    return null;
};

/**
 * Common Prisma error codes for easy reference
 */
export const PrismaErrorCodes = {
    // Common
    AUTHENTICATION_FAILED: 'P1000',
    SERVER_UNREACHABLE: 'P1001',
    SERVER_TIMEOUT: 'P1002',
    DATABASE_NOT_FOUND: 'P1003',
    OPERATIONS_TIMEOUT: 'P1008',
    DATABASE_EXISTS: 'P1009',
    ACCESS_DENIED: 'P1010',
    TLS_ERROR: 'P1011',
    SCHEMA_VALIDATION: 'P1012',
    INVALID_DB_STRING: 'P1013',
    MODEL_NOT_FOUND: 'P1014',
    UNSUPPORTED_FEATURES: 'P1015',
    WRONG_PARAM_COUNT: 'P1016',
    CONNECTION_CLOSED: 'P1017',

    // Query Engine
    VALUE_TOO_LONG: 'P2000',
    RECORD_NOT_FOUND: 'P2001',
    UNIQUE_CONSTRAINT: 'P2002',
    FOREIGN_KEY_CONSTRAINT: 'P2003',
    CONSTRAINT_FAILED: 'P2004',
    INVALID_STORED_VALUE: 'P2005',
    INVALID_VALUE: 'P2006',
    DATA_VALIDATION: 'P2007',
    QUERY_PARSE_FAILED: 'P2008',
    QUERY_VALIDATION_FAILED: 'P2009',
    RAW_QUERY_FAILED: 'P2010',
    NULL_CONSTRAINT: 'P2011',
    MISSING_REQUIRED_VALUE: 'P2012',
    MISSING_REQUIRED_ARGUMENT: 'P2013',
    RELATION_VIOLATION: 'P2014',
    RELATED_RECORD_NOT_FOUND: 'P2015',
    QUERY_INTERPRETATION_ERROR: 'P2016',
    RECORDS_NOT_CONNECTED: 'P2017',
    REQUIRED_CONNECTED_RECORDS_NOT_FOUND: 'P2018',
    INPUT_ERROR: 'P2019',
    VALUE_OUT_OF_RANGE: 'P2020',
    TABLE_NOT_FOUND: 'P2021',
    COLUMN_NOT_FOUND: 'P2022',
    INCONSISTENT_COLUMN_DATA: 'P2023',
    CONNECTION_POOL_TIMEOUT: 'P2024',
    REQUIRED_RECORD_NOT_FOUND: 'P2025',
    FEATURE_NOT_SUPPORTED: 'P2026',
    MULTIPLE_ERRORS: 'P2027',
    TRANSACTION_API_ERROR: 'P2028',
    QUERY_PARAM_LIMIT: 'P2029',
    FULLTEXT_INDEX_NOT_FOUND: 'P2030',
    MONGODB_REPLICA_SET_REQUIRED: 'P2031',
    NUMBER_TOO_LARGE: 'P2033',
    TRANSACTION_CONFLICT: 'P2034',
    ASSERTION_VIOLATION: 'P2035',
    EXTERNAL_CONNECTOR_ERROR: 'P2036',
    TOO_MANY_CONNECTIONS: 'P2037',

    // Prisma Accelerate
    TOO_MANY_REQUESTS: 'P5011',
    ACCELERATE_SERVER_ERROR: 'P6000',
    ACCELERATE_INVALID_DATASOURCE: 'P6001',
    ACCELERATE_UNAUTHORIZED: 'P6002',
    ACCELERATE_PLAN_LIMIT: 'P6003',
    ACCELERATE_QUERY_TIMEOUT: 'P6004',
    ACCELERATE_INVALID_PARAMS: 'P6005',
    ACCELERATE_VERSION_NOT_SUPPORTED: 'P6006',
    ACCELERATE_CONNECTION_ERROR: 'P6008',
    ACCELERATE_RESPONSE_SIZE_LIMIT: 'P6009',
    ACCELERATE_PROJECT_DISABLED: 'P6010',
} as const;

export default {
    isPrismaError,
    toPrismaException,
    handlePrismaError,
    withPrismaErrorHandler,
    isPrismaErrorCode,
    getPrismaErrorMeta,
    PrismaErrorCodes,
};
