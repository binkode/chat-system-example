module.exports = {
  root: true,
  extends: [
    "plugin:import/errors",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  settings: {
    jest: {
      version: "latest",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true,
  },
  globals: {},
  plugins: ["react", "import", "jest"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-shadow": 0,
    "no-eval": 0,
    "react-hooks/exhaustive-deps": 0,
    "import/no-cycle": "error",
    "jest/no-commented-out-tests": 0,
  },
};
