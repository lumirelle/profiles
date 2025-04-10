/**
 * @description Minimal ESLint Config for Nuxt2
 * @author Lumirelle (shabbyacc&#64;outlook.com)
 */
module.exports = {
  root: true,

  parserOptions: {
    parser: '@babel/eslint-parser',
    // you don't need any config for @babel/eslint-parser
    requireConfigFile: false,
  },

  extends: [
    // bundles eslint-plugin-vue
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // must put prettier last
    'prettier',
  ],

  rules: {
    // eslint-config-standard
    camelcase: 'warn',
    eqeqeq: 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    // eslint-plugin-import
    'import/namespace': ['error', { allowComputed: true }],
    // eslint-plugin-vue
    'vue/multi-word-component-names': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-mutating-props': 'warn',
  },
}
