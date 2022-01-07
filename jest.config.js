module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/__tests__/config.ts'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: [
        '<rootDir>/__tests__/shim.ts',
        '<rootDir>/__tests__/config.ts',
        '<rootDir>/__tests__/helpers/',
        '<rootDir>/node_modules/',
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    collectCoverage: true,
};
