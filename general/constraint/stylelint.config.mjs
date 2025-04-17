/**
 * @file Minimal StyleLint Config for for Vue.js v2 Based Projects
 * @description This config is a minimal StyleLint config for Vue.js v2 based projects.
 * @author Lumirelle <https://github.com/Lumirelle>
 */

/** @type {import('stylelint').Config} */
export default {
  extends: [
    // Bundles postcss-scss custom syntax
    'stylelint-config-standard-scss',
    // Bundled postcss-html custom syntax
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
    // Style formatter
    '@stylistic/stylelint-config',
  ],

  rules: {
    // FIXME: You'd better fix these rules instead of change the severity to 'warn'
    // stylelint-config-standard
    'block-no-empty': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    // stylelint-config-standard-scss
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
    'scss/at-mixin-pattern': [
      '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected mixin name to be kebab-case',
        severity: 'warning',
      },
    ],
    'scss/comment-no-empty': [true, { severity: 'warning' }],
    'scss/dollar-variable-pattern': [
      '^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected variable to be kebab-case',
        severity: 'warning',
      },
    ],

    // Recommended rules
    // stylelint-config-standard
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': [true, { severity: 'warning' }],
    'property-no-unknown': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
    ],
    // stylelint-config-standard-scss
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/no-global-function-names': null,
    // @stylistic/stylelint-config
    '@stylistic/max-line-length': null,
    '@stylistic/block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
  },

  allowEmptyInput: true,

  ignoreFiles: [
    // Build output
    '.nuxt/**/*',
    // Assets and static files
    'assets/icon/**/*',
    'assets/images/**/*',
    'assets/lang/**/*',
    'static/**/*',
    '**/iconfont.*',
    // Node modules
    'node_modules/**/*',
    // Nuxt app
    'app/view/**/*',
    'app.html',
    // Other files
  ],
}
