import { homedir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { env } from 'node:process'

export interface ProfileCollection {
  source: string
  targetFolder: string | Record<string, string>
  ignores?: string[]
}

export const rootPath = resolve(dirname(import.meta.url), '..')
export const slash = sep

// 支持的配置文件集合
export const SUPPORTED_PROFILE_COLLECTIONS: ProfileCollection[] = [
  {
    // `source` 是相对于 `rootPath` 的集合路径
    source: `for-personal${slash}constraint`,
    // `targetFolder` 支持 `string` 和 `dictionary`
    targetFolder: homedir(),
    // `ignores` 是相对于 `source` 的路径，支持文件夹和文件
    ignores: [
      `common${slash}.gitattributes`,
      `common${slash}.markdownlint.yaml`,
      `nodejs${slash}.gitattributes`,
      `nodejs${slash}.gitignore`,
      `nodejs${slash}.npmrc`,
      `nodejs${slash}commitlint.config.mjs`,
      `nodejs${slash}eslint.config.mjs`,
      `nodejs${slash}jsconfig.json`,
      `nodejs${slash}stylelint.config.mjs`,
      `vue2${slash}eslint.config.mjs`,
      `vue3${slash}eslint.config.mjs`,
      `vue${slash}stylelint.config.mjs`,
      `webpack${slash}eslint.config.mjs`,
    ],
  },
  {
    source: `for-personal${slash}preferences`,
    targetFolder: {
      git: homedir(),
      maven: join(homedir(), '.m2'),
      neovim: join(env.LOCALAPPDATA || '', 'nvim'),
      powershell: env.USERPROFILE ? join(env.USERPROFILE, 'Documents', 'PowerShell') : '',
    },
    ignores: [
      `clash-for-windows${slash}`,
      `idea${slash}`,
      `vs${slash}`,
      `vscode${slash}`,
      `vscode-ws${slash}`,
      `windows-terminal${slash}`,
      `zsh${slash}`,
    ],
  },
  {
    source: `for-work${slash}constraint`,
    targetFolder: homedir(),
    ignores: [],
  },
  {
    source: `for-personal${slash}templates`,
    targetFolder: '',
    ignores: [],
  },
]
