#!/usr/bin/env node
import { existsSync, statSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { argv, cwd, exit } from 'node:process'
import prompts from '@posva/prompts'
import { copyFile, ensureDir, findProfilePath, log } from '../index'

/**
 * 主函数
 */
async function main(): Promise<void> {
  // 解析命令行参数
  const args = argv.slice(2)

  // 查找源文件参数
  let source = ''
  let target = ''
  let override = false

  // 解析源文件参数 (-s 或 --source)
  const sourceIndex = args.findIndex(arg => arg === '-s' || arg === '--source')
  if (sourceIndex !== -1 && sourceIndex + 1 < args.length) {
    source = args[sourceIndex + 1]
  }

  // 解析目标路径参数 (-t 或 --target)
  const targetIndex = args.findIndex(arg => arg === '-t' || arg === '--target')
  if (targetIndex !== -1 && targetIndex + 1 < args.length) {
    target = args[targetIndex + 1]
  }

  // 解析强制覆盖参数 (-o 或 --override)
  override = args.includes('-o') || args.includes('--override')

  // 如果没有提供源文件参数，交互式提示
  if (!source) {
    const response = await prompts({
      type: 'text',
      name: 'source',
      message: '请输入要复制的配置文件（例如：.editorconfig 或 nodejs/.editorconfig）:',
    })
    source = response.source
  }

  // 如果没有提供源文件或用户取消，退出
  if (!source) {
    log('未提供配置文件，操作取消', 'warning')
    return
  }

  // 查找匹配的配置文件
  const sourceFullPath = findProfilePath(source)
  if (!sourceFullPath) {
    log(`在任何配置文件文件夹中都找不到源配置文件: ${source}`, 'error')
    exit(1)
  }

  const profileName = basename(sourceFullPath)

  // 如果没有提供目标路径，使用当前目录
  if (!target) {
    target = cwd()
  }

  // 处理目标路径
  let targetFullPath: string

  // 如果目标是目录（以斜杠或反斜杠结尾或存在且是目录）
  if (target.endsWith('/') || target.endsWith('\\') || (existsSync(target) && statSync(target).isDirectory())) {
    // 确保目标目录存在
    ensureDir(target)
    // 使用源文件名作为目标文件名
    targetFullPath = join(target, profileName)
  }
  else {
    // 目标是文件路径
    const targetDir = dirname(target)
    // 确保目标目录存在
    ensureDir(targetDir)
    targetFullPath = target
  }

  // 复制文件
  copyFile(sourceFullPath, targetFullPath, override)
}

// 执行主函数
main().catch((error) => {
  log(`执行过程中发生错误: ${error}`, 'error')
  exit(1)
})
