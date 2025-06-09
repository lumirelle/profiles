import antfu from '@antfu/eslint-config'

export default antfu(
  // The options for generating the ESLint configurations
  {
    // Set vue version to 2
    vue: {
      // Disable sfc block detection for styles, because it's not supported in vue@^2
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
      vueVersion: 2,
    },

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
      '**/_scripts',
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
  .override('antfu/node/rules', {
    rules: {
      // `vue@^2` compatible, because webpack doesn't support this rules
      // Use global variable `process` instead of `import process from 'process'`
      'node/prefer-global/process': 'off',
    },
  })
  .override('antfu/unicorn/rules', {
    rules: {
      // `vue@^2` compatible, because webpack doesn't support this rules
      // Use `path` instead of `node:path`
      'unicorn/prefer-node-protocol': 'off',
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
      // Vue 2 recommends kebab-case for custom event names
      'vue/custom-event-name-casing': ['warn', 'kebab-case'],
      'vue/no-reserved-component-names': 'warn',
      'vue/no-unused-refs': 'warn',
    },
  })
