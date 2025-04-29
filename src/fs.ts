import { constants, copyFileSync, existsSync, promises as fsPromises, lstatSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { format, log } from './utils'

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

export function getFilePathsRecursively(dir: string): string[] {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const res = join(dir, dirent.name)
    return dirent.isDirectory() ? getFilePathsRecursively(res) : [res]
  })
  return Array.prototype.concat(...files)
}

export async function createSymlink(root: string, sourcePath: string, targetPath: string, force = false): Promise<void> {
  if (existsSync(targetPath)) {
    if (force) {
      unlinkSync(targetPath)
    }
    else {
      log.warn(`File already exists: ${format.path(targetPath)}, skip`)
      return
    }
  }

  try {
    ensureDir(dirname(targetPath))

    await fsPromises.symlink(sourcePath, targetPath, 'file')
    log.success(`Created symlink: ${format.path(targetPath)} -> ${format.path(relative(root, sourcePath))}`)
  }
  catch (error) {
    log.error(`Failed to create symlink: ${error}`)
  }
}

export function removeSymlink(targetPath: string): void {
  if (!existsSync(targetPath)) {
    return
  }

  try {
    const stats = lstatSync(targetPath)
    if (stats.isSymbolicLink()) {
      unlinkSync(targetPath)
      log.success(`Removed symlink: ${format.path(targetPath)}`)
    }
    else {
      log.warn(`Target file is not a symlink: ${format.path(targetPath)}, skip`)
    }
  }
  catch (error) {
    log.error(`Failed to remove symlink: ${error}`)
  }
}

export function copyFile(sourcePath: string, targetPath: string, force: boolean | null = false): void {
  if (existsSync(targetPath) && !force) {
    log.warn(`File already exists: ${format.path(targetPath)}, skip`)
    return
  }

  ensureDir(dirname(targetPath))

  try {
    copyFileSync(sourcePath, targetPath, force ? constants.COPYFILE_FICLONE : 0)
    log.success(`Copied file: ${format.path(sourcePath)} >> ${format.path(targetPath)}`)
  }
  catch (error) {
    log.error(`Failed to copy file: ${error}`)
  }
}
