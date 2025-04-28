import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  formatters: true,
  ignores: [
    '!for-work/**',
  ],
})
