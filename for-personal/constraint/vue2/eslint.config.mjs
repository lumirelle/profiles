import antfu from '@antfu/eslint-config'

export default antfu(
  // The options for generating the ESLint configurations.
  {
    // Enable pnpm support
    pnpm: true,

    // Enable vue support
    vue: {
      // Disable sfc block detection for styles, because it's not supported in vue@^2
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
      // Set vue version to 2
      vueVersion: 2,
    },

    // Enable formatters for html and markdown (requires `eslint-plugin-format`)
    formatters: {
      css: false, // Use stylelint instead
      html: true,
      markdown: true,
    },
  },
)
  // Append your custom eslint config
  .append({
    // Language options
    languageOptions: {
      // Global variables
      globals: {
        // If you use gapi and other global variables, add them here, eg:
        // gapi: 'readonly',
        // CUSTOM: Add your custom global variables here
      },
    },

    // `.eslintignore` is no longer supported in flat config, use `ignores` option instead
    // Build output, node_modules and other common ignored files are already included
    ignores: [
      // Assets and static files
      '**/assets/icon',
      '**/assets/images',
      '**/assets/lang',
      '**/assets/langs',
      '**/static',
      '**/public',
      '**/theme',
      '**/iconfont.*',

      // Test files
      '**/tests',

      // Nuxt html templates
      '**/app/view',
      '**/app.html',

      // CUSTOM: Add your custom ignored files here
    ],

    rules: {
      // We have to use `console` in development environment, we can use build plugin to remove it in production environment
      'no-console': 'off',

      // `vue@^2` compatible, because webpack doesn't support these rules
      // Use global variable `process` instead of `import process from 'process'`
      'node/prefer-global/process': 'off',
      // Use `path` instead of `node:path`
      'unicorn/prefer-node-protocol': 'off',

      // Use both `indexOf` and `includes`, because it's auto-fix behavior may cause some errors
      'unicorn/prefer-includes': 'off',

      // CUSTOM: Add your custom rules here
    },
  })
