import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load and expand environment variables before anything else
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Global mock for Prisma generated client to prevent import.meta.url errors in Jest (CJS)
jest.mock('../generated/prisma/client', () => ({
    PrismaClient: class PrismaClient { },
    Prisma: {
        PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error { },
        PrismaClientUnknownRequestError: class PrismaClientUnknownRequestError extends Error { },
        PrismaClientRustPanicError: class PrismaClientRustPanicError extends Error { },
        PrismaClientInitializationError: class PrismaClientInitializationError extends Error { },
        PrismaClientValidationError: class PrismaClientValidationError extends Error { },
    },
}));

// Set test environment variables
process.env.NODE_ENV = 'test';

// Mock console.error to keep test output clean (optional)
// Uncomment if you want to suppress console.error in tests
// jest.spyOn(console, 'error').mockImplementation(() => {});

// Global test timeout
jest.setTimeout(10000);
