module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{jsx,tsx}',
      '!**/axiosGetRequest.ts',
      '!**/index.tsx',
      '!**/features/**',
      '!**/node_modules/**',
    ],
  };