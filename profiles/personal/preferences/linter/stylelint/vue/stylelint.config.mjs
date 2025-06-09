/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    // Stylistic rules support
    '@stylistic/stylelint-config',
    'stylelint-config-recess-order',
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
    '**/assets/langs/**/*',
    '**/assets/json/**/*',
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
    // We don't want to set a generic family in some cases, like when we use iconfont
    'font-family-no-missing-generic-family-keyword': null,

    // It's recommended to use BEM class & id selector pattern
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: selector => `Expected class selector "${selector}" to be BEM case`,
        severity: 'warning',
      },
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: selector => `Expected id selector "${selector}" to be BEM case`,
        severity: 'warning',
      },
    ],

    // Support pseudo classes and elements provided by vue, webpack and element-ui
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted', 'export'] },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted', 'input-placeholder'] },
    ],

    // It's recommended to use kebab-case for keyframe name
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: name => `Expected keyframe name "${name}" to be kebab-case`,
        severity: 'warning',
      },
    ],

    // Warning for descending specificity, for better maintainability
    // Actually, some times this rule may give false positives, and it's not so worth fixing it
    'no-descending-specificity': [true, { severity: 'warning' }],

    'scss/dollar-variable-pattern': [
      '^(-|--)?[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'Expected variable to be kebab-case, start with "-" or "--"',
      },
    ],

    // We disable this rule because it doesn't provide auto-fix operation and it's not worth fixing it
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
