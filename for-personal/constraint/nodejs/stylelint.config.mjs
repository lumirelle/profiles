/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order', '@stylistic/stylelint-config'],

  allowEmptyInput: true,

  ignoreFiles: [
    // CUSTOM: Add your custom ignored files here
  ],

  rules: {
    // We need custom at-rule, property, selector pattern
    'at-rule-no-unknown': null,
    'property-no-unknown': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,

    // We don't want to set a generic family when we use iconfont
    'font-family-no-missing-generic-family-keyword': null,

    // Warning for descending specificity, for better readability
    'no-descending-specificity': [true, { severity: 'warning' }],

    // We disable this rule because it doesn't provide auto-fix operation and it makes no sense
    'scss/double-slash-comment-whitespace-inside': null,

    // Stylistic rules
    '@stylistic/max-line-length': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
  },
}
