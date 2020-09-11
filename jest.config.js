module.exports = {
    setupFiles: ['<rootDir>/__tests__/shim.js', '<rootDir>/__tests__/config.js'],
    testPathIgnorePatterns: [
        '<rootDir>/__tests__/shim.js',
        '<rootDir>/__tests__/config.js',
        '<rootDir>/__tests__/helpers/',
        '<rootDir>/node_modules/',
    ],
    collectCoverage: true,
};
