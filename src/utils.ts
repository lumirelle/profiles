import type { ProfileCollection } from './config'
import { constants, copyFileSync, existsSync, promises as fsPromises, lstatSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { stdout } from 'node:process'
import { green, red, white, yellow } from 'ansis'
import { rootPath, slash, SUPPORTED_PROFILE_COLLECTIONS } from './config'

/**
 * 在控制台显示提示信息
 */
export function log(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
  const colorMap = {
    info: white,
    success: green,
    warning: yellow,
    error: red,
  }

  // 根据消息类型使用不同的控制台方法
  if (type === 'error') {
    console.error(colorMap[type](message))
  }
  else if (type === 'warning') {
    console.warn(colorMap[type](message))
  }
  else {
    stdout.write(`${colorMap[type](message)}\n`)
  }
}

/**
 * 检查路径是否存在，如果不存在则创建
 */
export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * 创建符号链接
 */
export async function createSymlink(sourcePath: string, targetPath: string, force = false): Promise<void> {
  // 如果目标路径已存在且不强制覆盖，则跳过
  if (existsSync(targetPath) && !force) {
    log(`文件已存在: ${targetPath}, 将跳过`, 'warning')
    return
  }

  // 如果目标路径已存在且强制覆盖，则删除目标文件
  if (existsSync(targetPath) && force) {
    log(`文件已存在: ${targetPath}, 将强制覆盖`, 'warning')
    unlinkSync(targetPath)
  }

  try {
    // 确保目标目录存在
    ensureDir(dirname(targetPath))

    // 创建符号链接
    await fsPromises.symlink(sourcePath, targetPath, 'file')
    log(`创建符号链接: ${targetPath} -> ${sourcePath}`, 'success')
  }
  catch (error) {
    log(`创建符号链接失败: ${error}`, 'error')
  }
}

/**
 * 删除符号链接
 */
export function removeSymlink(targetPath: string): void {
  // 如果目标文件不存在，跳过
  if (!existsSync(targetPath)) {
    return
  }

  try {
    // 检查是否为符号链接
    const stats = lstatSync(targetPath)
    if (stats.isSymbolicLink()) {
      unlinkSync(targetPath)
      log(`删除符号链接: ${targetPath}`, 'success')
    }
    else {
      log(`目标文件不是符号链接: ${targetPath}, 跳过`, 'warning')
    }
  }
  catch (error) {
    log(`删除符号链接失败: ${error}`, 'error')
  }
}

/**
 * 复制文件
 */
export function copyFile(sourcePath: string, targetPath: string, force = false): void {
  // 如果目标路径已存在且不强制覆盖，则跳过
  if (existsSync(targetPath) && !force) {
    log(`文件已存在: ${targetPath}, 将跳过`, 'warning')
    return
  }

  // 确保目标目录存在
  ensureDir(dirname(targetPath))

  try {
    copyFileSync(sourcePath, targetPath, force ? constants.COPYFILE_FICLONE : 0)
    log(`复制文件: ${basename(sourcePath)} -> ${targetPath}`, 'success')
  }
  catch (error) {
    log(`复制文件失败: ${error}`, 'error')
  }
}

/**
 * 查找匹配的配置文件路径
 */
export function findProfilePath(sourcePattern: string): string | null {
  // 如果源文件不包含 / 或 \，则添加 common/ 前缀
  if (!sourcePattern.match(/[\\/]/)) {
    sourcePattern = `common${slash}${sourcePattern}`
  }

  // 遍历支持的配置文件集合
  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    const collectionFullPath = join(rootPath, collection.source)
    if (!existsSync(collectionFullPath)) {
      log(`配置文件集合路径不存在: ${collectionFullPath}, 跳过`, 'warning')
      continue
    }

    // 寻找匹配的配置文件
    const profileFullPath = join(collectionFullPath, sourcePattern)
    if (existsSync(profileFullPath)) {
      return profileFullPath
    }
  }

  return null
}

/**
 * 处理配置文件集合
 */
export async function processProfileCollection(
  collection: ProfileCollection,
  action: 'symlink' | 'remove',
  override = false,
): Promise<void> {
  const collectionFullPath = join(rootPath, collection.source)
  if (!existsSync(collectionFullPath)) {
    log(`配置文件集合路径不存在: ${collectionFullPath}, 跳过`, 'warning')
    return
  }

  // 遍历集合中的文件夹
  const folders = readdirSync(collectionFullPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())

  for (const folder of folders) {
    const folderFullPath = join(collectionFullPath, folder.name)
    const folderName = folder.name

    // 递归获取所有文件
    const getFilesRecursively = (dir: string): string[] => {
      const dirents = readdirSync(dir, { withFileTypes: true })
      const files = dirents.map((dirent) => {
        const res = join(dir, dirent.name)
        return dirent.isDirectory() ? getFilesRecursively(res) : [res]
      })
      return Array.prototype.concat(...files)
    }

    const profiles = getFilesRecursively(folderFullPath)

    // 遍历每个配置文件
    for (const profileFullPath of profiles) {
      const profileName = basename(profileFullPath)
      const relativePath = relative(collectionFullPath, profileFullPath)
      const profileKey = join(folderName, relativePath)

      // 检查是否在忽略列表中
      if (collection.ignores) {
        let shouldIgnore = false
        for (const ignore of collection.ignores) {
          if (profileKey.startsWith(ignore)) {
            shouldIgnore = true
            break
          }
        }
        if (shouldIgnore) {
          continue
        }
      }

      // 获取目标文件夹
      let targetFolderFullPath: string
      if (typeof collection.targetFolder === 'object') {
        targetFolderFullPath = collection.targetFolder[folderName]
      }
      else {
        targetFolderFullPath = collection.targetFolder
      }

      // 如果目标文件夹不存在，则创建或跳过
      if (!targetFolderFullPath) {
        continue
      }

      if (action === 'symlink') {
        ensureDir(targetFolderFullPath)
      }
      else if (action === 'remove' && !existsSync(targetFolderFullPath)) {
        continue
      }

      // 构建目标文件的完整路径
      const targetProfileFullPath = join(targetFolderFullPath, profileName)

      // 执行相应的操作
      if (action === 'symlink') {
        await createSymlink(profileFullPath, targetProfileFullPath, override)
      }
      else if (action === 'remove') {
        removeSymlink(targetProfileFullPath)
      }
    }
  }
}
