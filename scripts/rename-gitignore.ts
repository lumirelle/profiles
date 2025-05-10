import { existsSync, readdirSync, renameSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 处理 resources/personal/preferences/vcs/git 目录下的所有 gitignore 文件
// 因为 npm 会自动将 .gitignore 重命名为 .npmignore
// See https://github.com/npm/npm/issues/1862
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const gitignorePath = join(rootDir, 'resources/personal/preferences/vcs/git')

// 递归查找并重命名文件
function renameGitignoreFiles(dir: string) {
  if (!existsSync(dir))
    return

  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      renameGitignoreFiles(fullPath)
    }
    else if (entry.name === 'gitignore') {
      const newPath = join(dir, '.gitignore')
      console.debug(`Renaming ${fullPath} to ${newPath}`)
      try {
        renameSync(fullPath, newPath)
      }
      catch (error) {
        console.error(`Failed to rename ${fullPath}:`, error)
      }
    }
  }
}

// 执行重命名操作
renameGitignoreFiles(gitignorePath)
console.debug('Gitignore files renamed successfully.')
