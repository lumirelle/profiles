import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  typescript: true,
  formatters: true,
}).append({
  ignores: [
    // CUSTOM: Add your custom ignored files here
  ],
  rules: {
    // CUSTOM: Add your custom rules here
  },
})
