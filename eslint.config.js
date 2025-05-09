// .eslintrc.js
import js from "@eslint/js";
//import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
  ignores: ["dist"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      plugins: {
        react: react,
        "react-hooks": reactHooks,
        "@typescript-eslint": tsEslint,
      },
      extends: [
        js.configs.recommended,
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
      ],
      settings: {
        react: {
          version: "detect",
          pragma: "React",
          jsxRuntime: "automatic",    // ← New JSX transform
        },
      },
      rules: {
        // turn off “React must be in scope” errors
        "react/react-in-jsx-scope": "off",

        // your existing React hook and TS rules
        ...reactHooks.configs.recommended.rules,
        ...tsEslint.configs.recommended.rules,

        // optional: only warn on unused vars
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
      },
      env: {
        browser: true,
        es2021: true,
      },
    },
  ],
};
