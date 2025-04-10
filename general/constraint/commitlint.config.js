/**
 * Git message structure:
 *
 * `type: subject`
 *
 * Eg:
 *
 * `feat: add new feature`
 *
 * Type must be one of 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor','revert', 'style', 'test', 'merge'.
 *
 * Subject must in lower-case.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'merge'],
    ],
    // subject
    'subject-case': [2, 'always', ['lower-case']],
  },
}
