/**
 * Type declarations for third-party packages that ship without TypeScript types.
 * These are minimal declarations — just enough to satisfy strict TypeScript.
 */

// eslint-plugin-jsx-a11y does not ship @types — declare module manually.
declare module 'eslint-plugin-jsx-a11y' {
  import type { Linter } from 'eslint';
  const plugin: {
    configs: {
      recommended: {
        rules: Record<string, Linter.RuleEntry>;
      };
      strict: {
        rules: Record<string, Linter.RuleEntry>;
      };
    };
    rules: Record<string, Linter.RuleEntry>;
  };
  export default plugin;
}
