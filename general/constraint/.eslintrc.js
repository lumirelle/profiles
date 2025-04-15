/**
 * @description Minimal ESLint Config for Nuxt2
 * @author Lumirelle (shabbyacc&#64;outlook.com)
 */
module.exports = {
  root: true,

  parserOptions: {
    parser: '@babel/eslint-parser',
    // You don't need any config for @babel/eslint-parser
    requireConfigFile: false,
  },

  globals: {
    // If you use gapi and other global variables, add them here
    gapi: 'readonly',
  },

  extends: [
    // It bundles eslint-plugin-vue
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // `prettier` must be placed last
    'prettier',
  ],

  rules: {
    // FIXME: You'd better fix these rules instead of change the severity to 'warn'
    // eslint-config-standard
    camelcase: 'warn',
    eqeqeq: 'warn',
    'no-unused-vars': 'warn',
    // eslint-plugin-import
    'import/namespace': ['error', { allowComputed: true }],
    // eslint-plugin-vue
    'vue/multi-word-component-names': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-mutating-props': 'warn',

    // Recommended rules
    // eslint-config-standard
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  ignorePatterns: [
    // Build output
    '.nuxt',
    // Assets and static files
    'assets/icon',
    'assets/images',
    'assets/lang',
    'static',
    '**/iconfont.*',
    // Node modules
    'node_modules',
    // Nuxt app
    'app/view',
    'app.html',
  ],
}
