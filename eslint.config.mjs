import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  formatters: true,
  ignores: [
    'CATALOGS.json',
    '!resources/**/*',
  ],
})
