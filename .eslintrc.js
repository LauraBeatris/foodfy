module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    validate: 'writable'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "camelcase": ["error", {allow: [".*_.*"], ignoreDestructuring: true}],
    "no-underscore-dangle": "off"
},
};
