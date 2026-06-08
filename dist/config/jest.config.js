"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    // Set root directory to project root (one level up from config folder)
    rootDir: path_1.default.resolve(__dirname, '..'),
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
exports.default = config;
//# sourceMappingURL=jest.config.js.map