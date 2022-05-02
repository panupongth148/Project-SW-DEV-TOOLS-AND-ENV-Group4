module.exports = {
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ],
  transform: {
      "^.+\\.js$": "babel-jest",
      ".*\\.(vue)$": "vue-jest"
  },
  transformIgnorePatterns: [
      "/node_modules/(?!vue-loading-spinner)"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
      "**/*.{js,vue}",
      "!**/node_modules/**"
  ],
  testEnvironment: 'jsdom',
  reporters: [
      "default",
      [
          "./node_modules/jest-html-reporter",
          {
              pageTitle: "Test Report",
              outputPath: "./coverage/report.html",
          },
      ],
  ]
}
