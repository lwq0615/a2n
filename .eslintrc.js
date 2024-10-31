
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceMap: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: ['**/dist', '**/node_modules', 'package.json', 'tsconfig.json'],
  rules: {
    'semi': ['error', 'never'],
    'no-console': 'off',
    'quotes': ['error', 'single'],
    'space-infix-ops': 'error',
    'no-const-assign': 'error',
    'no-var': 'error',
    'array-callback-return': 'error',
    'keyword-spacing': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'key-spacing': ['error', {
      afterColon: true,
    }],
    'indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'no-require-imports': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-trailing-spaces': 'error',
    '@typescript-eslint/no-wrapper-object-types': 'off',
  },
}