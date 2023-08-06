module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  root: true,
  extends: ["eslint:recommended"],
  plugins: [],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
  ignorePatterns: [],
  settings: {
    "import/parsers": {},
    "import/resolver": {},
  },
};
