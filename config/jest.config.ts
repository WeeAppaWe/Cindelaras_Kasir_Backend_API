import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    // Set root directory to project root (one level up from config folder)
    rootDir: path.resolve(__dirname, '..'),

    preset: 'ts-jest',
    testEnvironment: 'node',

    // Test roots relative to rootDir
    roots: ['<rootDir>/src', '<rootDir>/utility'],

    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],

    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/generated/**',
        '!src/**/*.d.ts',
    ],

    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'clover'],

    verbose: true,
    clearMocks: true,
    resetMocks: true,

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^../types$': '<rootDir>/types',
        '^../types/(.*)$': '<rootDir>/types/$1',
    },

    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};

export default config;
