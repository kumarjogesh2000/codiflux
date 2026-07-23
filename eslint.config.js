// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';
// eslint-plugin-jsx-a11y has no @types — declared in src/types/declarations.d.ts
import jsxA11y from 'eslint-plugin-jsx-a11y';

/** @type {import('typescript-eslint').ConfigArray} */
const config = [
  // ── Global Ignores ─────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '*.min.js',
      'public/**',
    ],
  },

  // ── Base JavaScript Rules ───────────────────────────────────────
  eslint.configs.recommended,

  // ── TypeScript Rules ────────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ── Astro Rules ─────────────────────────────────────────────────
  ...astroPlugin.configs.recommended,

  // ── JSX Accessibility Rules ─────────────────────────────────────
  // Applies only to React (.tsx) files.
  {
    files: ['**/*.tsx'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // ── Custom Rules ────────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx,astro}'],
    rules: {
      // ── TypeScript ───────────────────────────────────────────────
      // Allow function params/return types to be inferred where obvious
      '@typescript-eslint/no-inferrable-types': 'warn',
      // Prefer const — catches accidental mutation
      'prefer-const': 'error',
      // No unused vars (catches dead code)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Allow explicit any in rare cases but warn
      '@typescript-eslint/no-explicit-any': 'warn',

      // ── Code Quality ─────────────────────────────────────────────
      // No console.log left in production code
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Consistent use of === over ==
      eqeqeq: ['error', 'always'],
    },
  },
];

export default config;
