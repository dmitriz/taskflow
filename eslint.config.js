import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: {
  process: 'readonly',
  Buffer: 'readonly',
  require: 'readonly',
  module: 'readonly',
  URL: 'readonly',
  console: 'readonly',
  document: 'readonly',
  window: 'readonly',
}, } },
  tseslint.configs.recommended,
]);