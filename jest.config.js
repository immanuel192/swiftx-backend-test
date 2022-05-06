module.exports = {
  testEnvironment: 'node',
  globals: {},
  testMatch: [
    '<rootDir>/src/**/*.test.(js|ts)',
    '<rootDir>/test/**/*.test.(js|ts)',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  moduleNameMapper: {
    '#test/(.*)': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 95,
      lines: 100,
    },
  },
}
