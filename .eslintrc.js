
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
  ignorePatterns: ['**/dist'],
  rules: {
    // 可以根据需要自定义具体规则，这里先保持默认推荐规则
    'no-console': 'off',
    'quotes': ['error', 'single'],
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
  },
};