/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: ['<rootDir>/__tests__/shim.ts', '<rootDir>/__tests__/helpers/', '<rootDir>/node_modules/'],
    transform: {
        '\\.[jt]sx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    },
    collectCoverage: true,
};
