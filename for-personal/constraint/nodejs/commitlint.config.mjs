/**
 * Git message structure:
 *
 * ```
 * <type>: <subject>
 * ```
 *
 * Eg:
 *
 * ```
 * feat: add a new feature
 * ```
 *
 * NOTE:
 * - `<type>` must be one of 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor','revert', 'style', 'test', 'merge', 'wip'.
 * - `<subject>` must in lower-case.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // <type>
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'merge', 'wip'],
    ],
    // <subject>
    'subject-case': [2, 'always', ['lower-case']],
  },
}
