import { PrismaErrorException } from '../exception/prisma-error.exception';
/**
 * Type guard to check if an error is a Prisma error
 */
export declare const isPrismaError: (error: unknown) => boolean;
/**
 * Convert Prisma error to PrismaErrorException
 * Use this when you want to manually convert errors
 */
export declare const toPrismaException: (error: unknown) => PrismaErrorException | null;
/**
 * Handle Prisma error - throws PrismaErrorException if it's a Prisma error,
 * otherwise re-throws the original error
 */
export declare const handlePrismaError: (error: unknown) => never;
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
export declare const withPrismaErrorHandler: <T>(operation: () => Promise<T>) => Promise<T>;
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
export declare const isPrismaErrorCode: (error: unknown, code: string) => boolean;
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
export declare const getPrismaErrorMeta: (error: unknown) => Record<string, unknown> | null;
/**
 * Common Prisma error codes for easy reference
 */
export declare const PrismaErrorCodes: {
    readonly AUTHENTICATION_FAILED: "P1000";
    readonly SERVER_UNREACHABLE: "P1001";
    readonly SERVER_TIMEOUT: "P1002";
    readonly DATABASE_NOT_FOUND: "P1003";
    readonly OPERATIONS_TIMEOUT: "P1008";
    readonly DATABASE_EXISTS: "P1009";
    readonly ACCESS_DENIED: "P1010";
    readonly TLS_ERROR: "P1011";
    readonly SCHEMA_VALIDATION: "P1012";
    readonly INVALID_DB_STRING: "P1013";
    readonly MODEL_NOT_FOUND: "P1014";
    readonly UNSUPPORTED_FEATURES: "P1015";
    readonly WRONG_PARAM_COUNT: "P1016";
    readonly CONNECTION_CLOSED: "P1017";
    readonly VALUE_TOO_LONG: "P2000";
    readonly RECORD_NOT_FOUND: "P2001";
    readonly UNIQUE_CONSTRAINT: "P2002";
    readonly FOREIGN_KEY_CONSTRAINT: "P2003";
    readonly CONSTRAINT_FAILED: "P2004";
    readonly INVALID_STORED_VALUE: "P2005";
    readonly INVALID_VALUE: "P2006";
    readonly DATA_VALIDATION: "P2007";
    readonly QUERY_PARSE_FAILED: "P2008";
    readonly QUERY_VALIDATION_FAILED: "P2009";
    readonly RAW_QUERY_FAILED: "P2010";
    readonly NULL_CONSTRAINT: "P2011";
    readonly MISSING_REQUIRED_VALUE: "P2012";
    readonly MISSING_REQUIRED_ARGUMENT: "P2013";
    readonly RELATION_VIOLATION: "P2014";
    readonly RELATED_RECORD_NOT_FOUND: "P2015";
    readonly QUERY_INTERPRETATION_ERROR: "P2016";
    readonly RECORDS_NOT_CONNECTED: "P2017";
    readonly REQUIRED_CONNECTED_RECORDS_NOT_FOUND: "P2018";
    readonly INPUT_ERROR: "P2019";
    readonly VALUE_OUT_OF_RANGE: "P2020";
    readonly TABLE_NOT_FOUND: "P2021";
    readonly COLUMN_NOT_FOUND: "P2022";
    readonly INCONSISTENT_COLUMN_DATA: "P2023";
    readonly CONNECTION_POOL_TIMEOUT: "P2024";
    readonly REQUIRED_RECORD_NOT_FOUND: "P2025";
    readonly FEATURE_NOT_SUPPORTED: "P2026";
    readonly MULTIPLE_ERRORS: "P2027";
    readonly TRANSACTION_API_ERROR: "P2028";
    readonly QUERY_PARAM_LIMIT: "P2029";
    readonly FULLTEXT_INDEX_NOT_FOUND: "P2030";
    readonly MONGODB_REPLICA_SET_REQUIRED: "P2031";
    readonly NUMBER_TOO_LARGE: "P2033";
    readonly TRANSACTION_CONFLICT: "P2034";
    readonly ASSERTION_VIOLATION: "P2035";
    readonly EXTERNAL_CONNECTOR_ERROR: "P2036";
    readonly TOO_MANY_CONNECTIONS: "P2037";
    readonly TOO_MANY_REQUESTS: "P5011";
    readonly ACCELERATE_SERVER_ERROR: "P6000";
    readonly ACCELERATE_INVALID_DATASOURCE: "P6001";
    readonly ACCELERATE_UNAUTHORIZED: "P6002";
    readonly ACCELERATE_PLAN_LIMIT: "P6003";
    readonly ACCELERATE_QUERY_TIMEOUT: "P6004";
    readonly ACCELERATE_INVALID_PARAMS: "P6005";
    readonly ACCELERATE_VERSION_NOT_SUPPORTED: "P6006";
    readonly ACCELERATE_CONNECTION_ERROR: "P6008";
    readonly ACCELERATE_RESPONSE_SIZE_LIMIT: "P6009";
    readonly ACCELERATE_PROJECT_DISABLED: "P6010";
};
declare const _default: {
    isPrismaError: (error: unknown) => boolean;
    toPrismaException: (error: unknown) => PrismaErrorException | null;
    handlePrismaError: (error: unknown) => never;
    withPrismaErrorHandler: <T>(operation: () => Promise<T>) => Promise<T>;
    isPrismaErrorCode: (error: unknown, code: string) => boolean;
    getPrismaErrorMeta: (error: unknown) => Record<string, unknown> | null;
    PrismaErrorCodes: {
        readonly AUTHENTICATION_FAILED: "P1000";
        readonly SERVER_UNREACHABLE: "P1001";
        readonly SERVER_TIMEOUT: "P1002";
        readonly DATABASE_NOT_FOUND: "P1003";
        readonly OPERATIONS_TIMEOUT: "P1008";
        readonly DATABASE_EXISTS: "P1009";
        readonly ACCESS_DENIED: "P1010";
        readonly TLS_ERROR: "P1011";
        readonly SCHEMA_VALIDATION: "P1012";
        readonly INVALID_DB_STRING: "P1013";
        readonly MODEL_NOT_FOUND: "P1014";
        readonly UNSUPPORTED_FEATURES: "P1015";
        readonly WRONG_PARAM_COUNT: "P1016";
        readonly CONNECTION_CLOSED: "P1017";
        readonly VALUE_TOO_LONG: "P2000";
        readonly RECORD_NOT_FOUND: "P2001";
        readonly UNIQUE_CONSTRAINT: "P2002";
        readonly FOREIGN_KEY_CONSTRAINT: "P2003";
        readonly CONSTRAINT_FAILED: "P2004";
        readonly INVALID_STORED_VALUE: "P2005";
        readonly INVALID_VALUE: "P2006";
        readonly DATA_VALIDATION: "P2007";
        readonly QUERY_PARSE_FAILED: "P2008";
        readonly QUERY_VALIDATION_FAILED: "P2009";
        readonly RAW_QUERY_FAILED: "P2010";
        readonly NULL_CONSTRAINT: "P2011";
        readonly MISSING_REQUIRED_VALUE: "P2012";
        readonly MISSING_REQUIRED_ARGUMENT: "P2013";
        readonly RELATION_VIOLATION: "P2014";
        readonly RELATED_RECORD_NOT_FOUND: "P2015";
        readonly QUERY_INTERPRETATION_ERROR: "P2016";
        readonly RECORDS_NOT_CONNECTED: "P2017";
        readonly REQUIRED_CONNECTED_RECORDS_NOT_FOUND: "P2018";
        readonly INPUT_ERROR: "P2019";
        readonly VALUE_OUT_OF_RANGE: "P2020";
        readonly TABLE_NOT_FOUND: "P2021";
        readonly COLUMN_NOT_FOUND: "P2022";
        readonly INCONSISTENT_COLUMN_DATA: "P2023";
        readonly CONNECTION_POOL_TIMEOUT: "P2024";
        readonly REQUIRED_RECORD_NOT_FOUND: "P2025";
        readonly FEATURE_NOT_SUPPORTED: "P2026";
        readonly MULTIPLE_ERRORS: "P2027";
        readonly TRANSACTION_API_ERROR: "P2028";
        readonly QUERY_PARAM_LIMIT: "P2029";
        readonly FULLTEXT_INDEX_NOT_FOUND: "P2030";
        readonly MONGODB_REPLICA_SET_REQUIRED: "P2031";
        readonly NUMBER_TOO_LARGE: "P2033";
        readonly TRANSACTION_CONFLICT: "P2034";
        readonly ASSERTION_VIOLATION: "P2035";
        readonly EXTERNAL_CONNECTOR_ERROR: "P2036";
        readonly TOO_MANY_CONNECTIONS: "P2037";
        readonly TOO_MANY_REQUESTS: "P5011";
        readonly ACCELERATE_SERVER_ERROR: "P6000";
        readonly ACCELERATE_INVALID_DATASOURCE: "P6001";
        readonly ACCELERATE_UNAUTHORIZED: "P6002";
        readonly ACCELERATE_PLAN_LIMIT: "P6003";
        readonly ACCELERATE_QUERY_TIMEOUT: "P6004";
        readonly ACCELERATE_INVALID_PARAMS: "P6005";
        readonly ACCELERATE_VERSION_NOT_SUPPORTED: "P6006";
        readonly ACCELERATE_CONNECTION_ERROR: "P6008";
        readonly ACCELERATE_RESPONSE_SIZE_LIMIT: "P6009";
        readonly ACCELERATE_PROJECT_DISABLED: "P6010";
    };
};
export default _default;
//# sourceMappingURL=prisma-error-handler.utility.d.ts.map