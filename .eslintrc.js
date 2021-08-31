module.exports = {
  env: {
    es2021: true
  },
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'prettier/prettier': 'warn'
  },
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  ignorePatterns: ['App.tsx', 'reportWebVitals.ts']
};
