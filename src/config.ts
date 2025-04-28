import { homedir } from 'node:os'
import { join } from 'node:path'
import { env } from 'node:process'

export interface ProfileCollection {
  source: string
  targetFolder: string | Record<string, string>
  ignores?: string[]
}

/**
 * Supported profile collections
 *
 * `source` is the collection path relative to `rootPath`
 *
 * `targetFolder` supports `string` and `dictionary`
 *
 * `ignores` is the path relative to `source`, supports folder and file
 *
 * FIXME: Need test in unix & linux system
 */
export const SUPPORTED_PROFILE_COLLECTIONS: ProfileCollection[] = [
  {
    source: `resources/for-personal/constraint`,
    targetFolder: homedir(),
    ignores: [
      `common/.gitattributes`,
      `common/.markdownlint.yaml`,
      `nodejs/.gitattributes`,
      `nodejs/.gitignore`,
      `nodejs/.npmrc`,
      `nodejs/commitlint.config.mjs`,
      `nodejs/eslint.config.mjs`,
      `nodejs/jsconfig.json`,
      `nodejs/stylelint.config.mjs`,
      `vue2/eslint.config.mjs`,
      `vue3/eslint.config.mjs`,
      `vue/stylelint.config.mjs`,
      `webpack/eslint.config.mjs`,
    ],
  },
  {
    source: `resources/for-personal/preferences`,
    targetFolder: {
      git: homedir(),
      maven: join(homedir(), '.m2'),
      neovim: join(env.LOCALAPPDATA || '', 'nvim'),
      powershell: env.USERPROFILE ? join(env.USERPROFILE, 'Documents', 'PowerShell') : '',
    },
    ignores: [
      `clash-for-windows/`,
      `idea/`,
      `vs/`,
      `vscode/`,
      `vscode-ws/`,
      `windows-terminal/`,
      `zsh/`,
    ],
  },
  {
    source: `resources/for-work/constraint`,
    targetFolder: homedir(),
    ignores: [],
  },
  {
    source: `resources/for-personal/templates`,
    targetFolder: '',
    ignores: [],
  },
]
