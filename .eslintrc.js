module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
  },
  // $ npx install-peerdeps --dev eslint-config-airbnb
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'react-refresh', 'prettier', 'import'],
  ignorePatterns: ['node_modules', 'dist', 'build'],
  overrides: [],

  // 0 - off 1 - warn 2 - error
  rules: {
    indent: ['warn', 2],
    'prettier/prettier': 'warn',
    'linebreak-style': ['warn', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['warn', 'always'],
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'warn',
    'react/prefer-stateless-function': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx'] },
    ],
    'import/no-unresolved': ['error', { caseSensitive: false }],
    'no-unused-vars': 'warn',
    'space-before-function-paren': [
      'warn',
      { anonymous: 'always', named: 'never' },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
