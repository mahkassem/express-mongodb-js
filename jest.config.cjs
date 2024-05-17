module.exports = {
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(some-es6-module))" // Add modules you need to transform here
  ],
  // testEnvironment: "node"   // Set test environment to Node.js
};
