/**
 * @file Minimal ESLint Flat Config for Vue.js v2 Based Projects
 * @description This config is a minimal ESLint config for Vue.js v2 based projects, based on @antfu/eslint-config.
 * @author Lumirelle <https://github.com/Lumirelle>
 */

import antfu from '@antfu/eslint-config'

export default antfu(
  /**
   * Config Generation Options
   * @see https://github.com/antfu/eslint-config#vue-2
   */
  {
    // Vue Options
    vue: {
      // Disable sfc block detection for styles
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
      css: false, // Use stylelint for instead
      html: true,
      markdown: true,
    },

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      // The configuration already includes ignore configurations for build output and node_modules
      // Assets and static files
      '**/assets/icon',
      '**/assets/images',
      '**/assets/lang',
      '**/assets/langs',
      '**/static',
      '**/public',
      '**/theme',
      '**/iconfont.*',
      // Tests
      '**/tests',
      // Nuxt html templates
      '**/app/view',
      '**/app.html',
      // Other files
    ],
  },

  /**
   * ESLint User config, can be more than one
   * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files#using-flat-configuration-files
   */
  {
    // Language options
    languageOptions: {
      // Global variables
      globals: {
        // If you use gapi and other global variables, add them here, eg:
        // gapi: 'readonly',
      },
    },

    // Add custom rules here
    rules: {
      // We need to use `console` in development environment, we can use terser-webpack-plugin to remove it in production environment
      'no-console': 'off',

      // Vue.js v2 based projects doesn't support these rules
      // Use global variable `process` instead of `import process from 'process'`, because it's not supported in Vue.js v2 based projects
      'node/prefer-global/process': 'off',
      // Use `path` instead of `node:path`, because it's not supported in Vue.js v2 based projects
      'unicorn/prefer-node-protocol': 'off',

      // Use both `indexOf` and `includes`, because it's auto-fix behavior may cause some issues
      'unicorn/prefer-includes': 'off',
    },
  },
)
