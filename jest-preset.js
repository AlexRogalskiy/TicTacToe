{
    "preset": "@babel/preset-react",
    "coverageDirectory": "./coverage/",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/index.js",
      "!src/helpers/*.js"
    ],
    "collectCoverage": true,
    "globals": {
      "development": true
    },
	"testRegex": ".*-test\\.js$",
	"testEnvironment": "node"
  