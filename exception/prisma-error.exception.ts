import { Prisma } from '../src/generated/prisma/client';

export class PrismaErrorException extends Error {
    public statusCode: number;
    public code: string;
    public response_code: string;
    public metaData: any;

    constructor(error: any) {
        super(error.message);
        this.name = 'PrismaErrorException';
        this.statusCode = 500;
        this.code = 'INTERNAL_SERVER_ERROR';
        this.response_code = '0001';
        this.metaData = {};

        this.handleError(error);
    }

    private handleError(error: any): void {
        this.message = error.message;

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            this.handleKnownRequestError(error);
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            this.handleUnknownRequestError(error);
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
            this.handleRustPanicError(error);
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
            this.handleInitializationError(error);
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            this.handleValidationError(error);
        } else {
            this.statusCode = 500;
            this.message = 'An unexpected error occurred.';
        }
    }

    private handleKnownRequestError(error: Prisma.PrismaClientKnownRequestError): void {
        this.code = error.code;
        this.metaData = error.meta;

        switch (error.code) {
            // Common
            case 'P1000': // Authentication failed
            case 'P1001': // Can't reach database server
            case 'P1002': // Database server timeout
            case 'P1003': // Database does not exist
            case 'P1008': // Operations timed out
            case 'P1009': // Database already exists
            case 'P1010': // User denied access
            case 'P1011': // TLS connection error
            case 'P1012': // Schema validation error
            case 'P1013': // Invalid database string
            case 'P1014': // Model does not exist
            case 'P1015': // Unsupported features
            case 'P1016': // Incorrect number of parameters
            case 'P1017': // Server closed connection
                this.statusCode = 500;
                this.message = `Database connection or configuration error: ${error.message}`;
                break;

            // Query Engine
            case 'P2000': // Value too long
                this.statusCode = 400;
                this.message = `The provided value for the column is too long.`;
                break;
            case 'P2001': // Record not found (where)
                this.statusCode = 404;
                this.message = `The record searched for in the where condition does not exist.`;
                this.response_code = '5574';
                break;
            case 'P2002': // Unique constraint failed
                this.statusCode = 409;
                this.message = `Unique constraint failed on the fields: ${(error.meta?.target as string[])?.join(', ') || 'unknown'}`;
                this.response_code = '5542';
                break;
            case 'P2003': // Foreign key constraint failed
                this.statusCode = 409; // or 422
                this.message = `Foreign key constraint failed on the field: ${error.meta?.field_name || 'unknown'}`;
                break;
            case 'P2004': // Constraint failed
                this.statusCode = 422;
                this.message = `A constraint failed on the database.`;
                break;
            case 'P2005': // Invalid value for field type
                this.statusCode = 400;
                this.message = `The value stored in the database for the field is invalid for the field's type.`;
                break;
            case 'P2006': // Invalid value for field
                this.statusCode = 400;
                this.message = `The provided value for the field is not valid.`;
                break;
            case 'P2007': // Data validation error
                this.statusCode = 400;
                this.message = `Data validation error.`;
                break;
            case 'P2008': // Query parsing failed
                this.statusCode = 400;
                this.message = `Failed to parse the query.`;
                break;
            case 'P2009': // Query validation failed
                this.statusCode = 400;
                this.message = `Failed to validate the query.`;
                break;
            case 'P2010': // Raw query failed
                this.statusCode = 500;
                this.message = `Raw query failed.`;
                break;
            case 'P2011': // Null constraint violation
                this.statusCode = 400;
                this.message = `Null constraint violation.`;
                break;
            case 'P2012': // Missing required value
                this.statusCode = 400;
                this.message = `Missing a required value.`;
                break;
            case 'P2013': // Missing required argument
                this.statusCode = 400;
                this.message = `Missing the required argument.`;
                break;
            case 'P2014': // Relation violation
                this.statusCode = 400;
                this.message = `The change you are trying to make would violate the required relation.`;
                break;
            case 'P2015': // Related record not found
                this.statusCode = 404;
                this.message = `A related record could not be found.`;
                break;
            case 'P2016': // Query interpretation error
                this.statusCode = 400;
                this.message = `Query interpretation error.`;
                break;
            case 'P2017': // Records not connected
                this.statusCode = 400;
                this.message = `The records for relation are not connected.`;
                break;
            case 'P2018': // Required connected records not found
                this.statusCode = 404;
                this.message = `The required connected records were not found.`;
                break;
            case 'P2019': // Input error
                this.statusCode = 400;
                this.message = `Input error.`;
                break;
            case 'P2020': // Value out of range
                this.statusCode = 400;
                this.message = `Value out of range for the type.`;
                break;
            case 'P2021': // Table does not exist
                this.statusCode = 500;
                this.message = `The table does not exist in the current database.`;
                break;
            case 'P2022': // Column does not exist
                this.statusCode = 500;
                this.message = `The column does not exist in the current database.`;
                break;
            case 'P2023': // Inconsistent column data
                this.statusCode = 500;
                this.message = `Inconsistent column data.`;
                break;
            case 'P2024': // Connection pool timeout
                this.statusCode = 503; // Service Unavailable
                this.message = `Timed out fetching a new connection from the connection pool.`;
                break;
            case 'P2025': // Record to update/delete not found
                this.statusCode = 404;
                this.message = `An operation failed because it depends on one or more records that were required but not found.`;
                this.response_code = '5574';
                break;
            case 'P2026': // Feature not supported
                this.statusCode = 500;
                this.message = `The current database provider doesn't support a feature that the query used.`;
                break;
            case 'P2027': // Multiple errors
                this.statusCode = 500;
                this.message = `Multiple errors occurred on the database during query execution.`;
                break;
            case 'P2028': // Transaction API error
                this.statusCode = 500;
                this.message = `Transaction API error.`;
                break;
            case 'P2029': // Query parameter limit exceeded
                this.statusCode = 400;
                this.message = `Query parameter limit exceeded error.`;
                break;
            case 'P2030': // Fulltext index missing
                this.statusCode = 500;
                this.message = `Cannot find a fulltext index to use for the search.`;
                break;
            case 'P2031': // MongoDB replica set required
                this.statusCode = 500;
                this.message = `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.`;
                break;
            case 'P2033': // Number too large
                this.statusCode = 400;
                this.message = `A number used in the query does not fit into a 64 bit signed integer.`;
                break;
            case 'P2034': // Transaction conflict/deadlock
                this.statusCode = 409;
                this.message = `Transaction failed due to a write conflict or a deadlock. Please retry your transaction.`;
                break;
            case 'P2035': // Assertion violation
                this.statusCode = 500;
                this.message = `Assertion violation on the database.`;
                break;
            case 'P2036': // External connector error
                this.statusCode = 500;
                this.message = `Error in external connector.`;
                break;
            case 'P2037': // Too many connections
                this.statusCode = 503;
                this.message = `Too many database connections opened.`;
                break;

            // Migration Engine
            case 'P3000': // Failed to create database
            case 'P3001': // Destructive changes possible
            case 'P3002': // Migration rolled back
            case 'P3003': // Migration format changed
            case 'P3004': // System database
            case 'P3005': // Database not empty
            case 'P3006': // Migration failed to apply to shadow db
            case 'P3007': // Preview features blocked
            case 'P3008': // Migration already applied
            case 'P3009': // Failed migrations found
            case 'P3010': // Migration name too long
            case 'P3011': // Migration cannot be rolled back (never applied)
            case 'P3012': // Migration cannot be rolled back (not failed)
            case 'P3013': // Datasource provider arrays deprecated
            case 'P3014': // Shadow database creation failed
            case 'P3015': // Migration file not found
            case 'P3016': // Fallback reset failed
            case 'P3017': // Migration not found
            case 'P3018': // Migration failed to apply
            case 'P3019': // Datasource provider mismatch
            case 'P3020': // Shadow database disabled on Azure SQL
            case 'P3021': // Foreign keys not allowed
            case 'P3022': // Direct DDL disabled
            case 'P3023': // Invalid external identifier (fully qualified)
            case 'P3024': // Invalid external identifier (simple)
                this.statusCode = 500;
                this.message = `Migration engine error: ${error.message}`;
                break;

            // Introspection Engine
            case 'P4000': // Introspection failed
            case 'P4001': // Introspected database empty
            case 'P4002': // Inconsistent schema
                this.statusCode = 500;
                this.message = `Introspection engine error: ${error.message}`;
                break;

            // Prisma Accelerate
            case 'P5011': // Too Many Requests
                this.statusCode = 429;
                this.message = `Too many requests. Please try again later.`;
                break;

            case 'P6000': // ServerError
            case 'P6001': // InvalidDataSource
            case 'P6006': // VersionNotSupported
            case 'P6008': // ConnectionError
                this.statusCode = 500;
                this.message = `Prisma Accelerate system error: ${error.message}`;
                break;

            case 'P6002': // Unauthorized
                this.statusCode = 401;
                this.message = `Unauthorized: Invalid API Key.`;
                break;

            case 'P6003': // PlanLimitReached
            case 'P6009': // ResponseSizeLimitExceeded
                this.statusCode = 429;
                this.message = `Prisma Accelerate usage limit exceeded: ${error.message}`;
                break;

            case 'P6004': // QueryTimeout
                this.statusCode = 504;
                this.message = `Query timed out.`;
                break;

            case 'P6005': // InvalidParameters
                this.statusCode = 400;
                this.message = `Invalid parameters: ${error.message}`;
                break;

            case 'P6010': // ProjectDisabledError
                this.statusCode = 403;
                this.message = `Prisma Accelerate project is disabled.`;
                break;

            default:
                this.statusCode = 500;
                this.message = `Unknown Prisma error: ${error.message}`;
                break;
        }
    }

    private handleUnknownRequestError(error: Prisma.PrismaClientUnknownRequestError): void {
        this.statusCode = 500;
        this.message = `Unknown request error: ${error.message}`;
    }

    private handleRustPanicError(error: Prisma.PrismaClientRustPanicError): void {
        this.statusCode = 500;
        this.message = `Critial system error (Rust Panic): ${error.message}`;
    }

    private handleInitializationError(error: Prisma.PrismaClientInitializationError): void {
        this.statusCode = 500;
        this.message = `Failed to initialize database connection: ${error.message}`;
    }

    private handleValidationError(error: Prisma.PrismaClientValidationError): void {
        this.statusCode = 422;
        this.message = `Validation error: ${error.message}`;
        this.response_code = '5505';
    }
}
