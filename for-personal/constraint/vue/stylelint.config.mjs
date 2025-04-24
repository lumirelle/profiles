/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
    // Style formatter
    '@stylistic/stylelint-config',
    // It bundles postcss-html custom syntax for `.html` like files
    'stylelint-config-html',
  ],

  allowEmptyInput: true,

  ignoreFiles: [
    // Build output
    '**/.nuxt/**/*',
    '**/dist/**/*',
    // Assets and static files
    '**/assets/icon/**/*',
    '**/assets/images/**/*',
    '**/assets/lang/**/*',
    '**/static/**/*',
    '**/public/**/*',
    '**/theme/**/*',
    '**/iconfont.*',
    // Node modules
    '**/node_modules/**/*',
    // Nuxt app
    '**/app/view/**/*',
    '**/app.html',
    // Add your custom ignore files here
  ],

  rules: {
    // We need custom at-rule, property, selector pattern
    'at-rule-no-unknown': null,
    'property-no-unknown': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,

    // We don't want to set a generic family when we use iconfont
    'font-family-no-missing-generic-family-keyword': null,

    // Warning for descending specificity, for better maintainability
    'no-descending-specificity': [true, { severity: 'warning' }],

    // Support pseudo classes and elements provided by vue, webpack and element-ui
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted', 'export'] },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [
          'v-deep',
          'v-global',
          'v-slotted',
          'input-placeholder',
        ],
      },
    ],

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

    // Add your custom rules here
  },
}
