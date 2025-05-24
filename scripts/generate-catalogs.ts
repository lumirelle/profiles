import { writeFileSync } from 'node:fs'
import process from 'node:process'
import { globSync } from 'tinyglobby'
import { log } from '../src/utils'

const elements = globSync('profiles/**/*', {
  cwd: process.cwd(),
  dot: true,
  absolute: false,
  ignore: ['profiles/work/**/*'],
})

interface Catalog {
  [key: string]: Catalog | null
}

/**
 * Transform elements to catalog format
 *
 * from:
 *
 * [
 *  'aaa/1/x',
 *  'aaa/2',
 *  'aaa/3',
 *  'bbb/1',
 *  'bbb/2',
 *  'bbb/3',
 * ]
 *
 * to:
 *
 * {
 *   'aaa': {
 *     '1': {
 *       'x': null,
 *     },
 *     '2': null,
 *     '3': null,
 *   },
 *   'bbb': {
 *     '1': null,
 *     '2': null,
 *     '3': null,
 *   }
 * }
 */
const catalogs = elements.reduce<Catalog>((acc, path) => {
  const parts = path.split('/')
  let current = acc
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = null
    }
    else {
      current[part] = current[part] || {}
      current = current[part]
    }
  })
  return acc
}, {})

try {
  writeFileSync('CATALOGS.json', `${JSON.stringify(catalogs, null, 2)}\n`)
  log.success('Catalogs generated successfully')
}
catch (error) {
  if (error instanceof Error) {
    log.error(`Failed to generate catalogs: ${error.message}`)
  }
  process.exit(1)
}
