import { homedir } from 'node:os'
import { join } from 'node:path'
import { env } from 'node:process'

export const BOOLEAN_PARAMETER_KEYS = ['-?', '-h', '-v', '-o']

export interface ProfileCollection {
  source: string
  targetFolder: string | Record<string, string>
  matches: string[]
}

/**
 * Supported profile collections
 *
 * `source` is the collection path relative to `rootPath`
 *
 * `targetFolder` supports `string` and `dictionary`
 *
 * `matches` is a list of glob patterns to exclude files,
 * each pattern is relative to the folder inside `source`
 *
 * FIXME: Need test in unix & linux system
 */
export const SUPPORTED_PROFILE_COLLECTIONS: ProfileCollection[] = [
  {
    source: 'resources/personal/constraint',
    targetFolder: homedir(),
    matches: [
      '**',
      '!**/common/.gitattributes',
      '!**/common/.markdownlint.yaml',
      '!**/nodejs/.gitattributes',
      '!**/nodejs/.gitignore',
      '!**/nodejs/.npmrc',
      '!**/nodejs/commitlint.config.mjs',
      '!**/nodejs/eslint.config.mjs',
      '!**/nodejs/jsconfig.json',
      '!**/nodejs/stylelint.config.mjs',
      '!**/vue2/eslint.config.mjs',
      '!**/vue3/eslint.config.mjs',
      '!**/vue/stylelint.config.mjs',
      '!**/webpack/eslint.config.mjs',
    ],
  },
  {
    source: 'resources/personal/preferences',
    targetFolder: {
      git: homedir(),
      maven: join(homedir(), '.m2'),
      neovim: join(env.LOCALAPPDATA || '', 'nvim'),
      powershell: env.USERPROFILE ? join(env.USERPROFILE, 'Documents', 'PowerShell') : '',
    },
    matches: [
      '**',
      '!clash-windows/**',
      '!idea/**',
      '!vs/**',
      '!vscode/**',
      '!vscode-ws/**',
      '!windows-terminal/**',
      '!zsh/**',
    ],
  },
  {
    source: 'resources/work/constraint',
    targetFolder: homedir(),
    matches: [
      '**',
    ],
  },
  {
    source: 'resources/personal/templates',
    targetFolder: '',
    matches: [
      '!**',
    ],
  },
]
