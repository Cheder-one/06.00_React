module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  ignorePatterns: ["node_modules", "dist", "build"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react-refresh", "react", "prettier", "import"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": [2, { caseSensitive: false }],
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always"
      }
    ],
    indent: ["error", 2],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "prettier/prettier": "error",
    "linebreak-style": [0, "windows"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: [2, "always"]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"], // Указывает расширение файлов, которые можно импортировать.
        moduleDirectory: ["node_modules", "src/"] // Пути для поиска модулей при импорте.
      }
    }
  }
};
