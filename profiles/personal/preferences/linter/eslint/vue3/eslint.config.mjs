import antfu from '@antfu/eslint-config'

export default antfu(
  // The options for generating the ESLint configurations
  {
    // Disable typescript support
    typescript: false,

    // Enable formatters for html and markdown (requires `eslint-plugin-format`)
    formatters: {
      css: false, // Use stylelint instead
      html: true,
      markdown: true,
    },

    // `.eslintignore` is no longer supported in flat config, use `ignores` option instead
    // Build output, node_modules and other common ignored files are already included
    ignores: [
      // Assets and static files
      '**/assets/icon',
      '**/assets/images',
      '**/assets/lang',
      '**/assets/langs',
      '**/assets/json',
      '**/static',
      '**/public',
      '**/theme',
      '**/iconfont.*',
      // Nuxt html templates
      '**/app/view',
      '**/app.html',
      // Add your custom ignored files here
    ],
  },
)
  // Prepend a setup config with `globals`
  .prepend({
    name: 'lumirelle/setup',
    languageOptions: {
      globals: {
        // Add your custom global variables here
      },
    },
  })
  // Override rules of `@antfu/config`
  .override('antfu/javascript/rules', {
    rules: {
      // We need to use `console` in development environment, we can use build plugin to remove it in production environment
      'no-console': 'off',
    },
  })
  // FIXME: Fix these warnings progressively, because they are too many
  .override('antfu/javascript/rules', {
    rules: {
      'eqeqeq': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
    },
  })
  .override('antfu/vue/rules', {
    rules: {
      'vue/eqeqeq': 'warn',
      // Vue 3 recommends camelCase for custom event names
      'vue/custom-event-name-casing': ['warn', 'camelCase'],
      'vue/no-reserved-component-names': 'warn',
      'vue/no-unused-refs': 'warn',
    },
  })
