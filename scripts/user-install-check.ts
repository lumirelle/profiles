// 检查是否是用户安装而非开发环境
import { execSync } from 'node:child_process'
import process from 'node:process'

const isUserInstall = process.env.npm_config_user_agent && !process.env.npm_config_user_agent.includes('pnpm')

if (isUserInstall) {
  console.debug('Detected user installation, renaming gitignore...')
  execSync('tsx scripts/rename-gitignore.ts', { stdio: 'inherit' })
}
else {
  console.debug('Detected development environment, skipping gitignore renaming')
}
