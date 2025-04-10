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
    'stylelint-config-clean-order',
  ],

  rules: {
    // stylelint-config-recommended
    'block-no-empty': [true, { severity: 'warning' }],
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],
    'no-descending-specificity': [true, { severity: 'warning' }],
    'no-empty-source': [true, { severity: 'warning' }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
    ],
    // stylelint-config-recommended-scss
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],
    'scss/comment-no-empty': [true, { severity: 'warning' }],
    // stylelint-config-clean-order
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['first-nested', 'blockless-after-same-name-blockless', 'after-comment'],
        ignoreAtRules: ['if', 'else'],
        severity: 'warning',
      },
    ],
    'order/order': [
      [
        { type: 'at-rule', name: 'use' },
        { type: 'at-rule', name: 'import' },
        { type: 'at-rule', name: 'forward' },
        'dollar-variables',
        'at-variables',
        'custom-properties',
        { type: 'at-rule', name: 'custom-media' },
        { type: 'at-rule', name: 'function' },
        { type: 'at-rule', name: 'mixin' },
        { type: 'at-rule', name: 'extend' },
        'declarations',
        {
          type: 'rule',
          selector: /^&::[\w-]+/,
          hasBlock: true,
        },
        'rules',
        { type: 'at-rule', name: 'media', hasBlock: true },
      ],
      {
        severity: 'warning',
      },
    ],
  },
}
