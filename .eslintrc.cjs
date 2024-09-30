module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "./tailwind.config.ts"],
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tailwind.config.ts"],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json", "./tailwind.config.ts"],
      },
    },
  },
  plugins: ["react", "prettier", "react-hooks", "@typescript-eslint"],
  rules: {
    semi: "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "warn",
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "no-param-reassign": 0,
    "global-require": 0,
    "no-underscore-dangle": "off",
    "no-console": ["warn", { allow: ["error"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
