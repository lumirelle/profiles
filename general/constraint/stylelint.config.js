/**
 * @description Minimal StyleLint Config for Nuxt2
 * @author Lumirelle (shabbyacc&#64;outlook.com)
 */
module.exports = {
  extends: [
    // bundles postcss-scss custom syntax
    'stylelint-config-recommended-scss',
    // bundled postcss-html custom syntax
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],

  rules: {
    // FIXME: You'd better fix these rules instead of change the severity to 'warn'
    // stylelint-config-recommended
    'block-no-empty': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    // stylelint-config-recommended-scss
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
    'scss/comment-no-empty': [true, { severity: 'warning' }],

    // Recommended rules
    // stylelint-config-recommended
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'property-no-unknown': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
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
  ],
}
