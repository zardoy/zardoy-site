//@ts-check

/** @type {import('@jest/types/build/Config').InitialOptions} */
const config = {
    preset: 'ts-jest',
    roots: [
        '<rootDir>/src',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
    ],
    testEnvironment: 'jsdom',
    // transform: {
    //     '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // },
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    // resetMocks: true
};

module.exports = config;
