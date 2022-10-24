const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup jest
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Don't test any next tests or tests in the modules
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest', // babel .js or .jsx files
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub', // anything style related is ignored and mapped to jest-transform-stub module
  },
};
module.exports = createJestConfig(customJestConfig);
