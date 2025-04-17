/**
 * @file Minimal ESLint Flat Config for Vue.js v2 Based Projects
 * @description This config is a minimal ESLint config for Vue.js v2 based projects, based on @antfu/eslint-config.
 * @author Lumirelle <https://github.com/Lumirelle>
 */

import antfu from '@antfu/eslint-config'

export default antfu(
  /**
   * Options Config
   * @see https://github.com/antfu/eslint-config#vue-2
   */
  {
    // Set vue version to 2
    vue: {
      vueVersion: 2,
    },

    // Enable formatters for html and markdown
    formatters: {
      css: false, // Use stylelint for instead
      html: true,
      markdown: true,
    },

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      // Build output
      '.nuxt',
      // Assets and static files
      'assets/icon',
      'assets/images',
      'assets/lang',
      'static',
      '**/iconfont.*',
      // Node.js modules
      'node_modules',
      // Nuxt app
      'app/view',
      'app.html',
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
        // If you use gapi and other global variables, add them here
        gapi: 'readonly',
      },
    },

    // Add custom rules here
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
    },
  }
)
