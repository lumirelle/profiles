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
      'assets/icon',
      'assets/images',
      'assets/lang',
      'static',
      '**/iconfont.*',
      // Nuxt html templates
      'app/view',
      'app.html',
      // Other files
      'assets/utils/yidun-captcha.js',
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
