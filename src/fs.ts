import { constants, copyFileSync, promises as fsPromises, lstatSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { format, log } from './utils'

export function getRoot(metaUrl: string): string {
  return resolve(dirname(fileURLToPath(metaUrl)), '..')
}

/**
 * Check if a file or directory exists. Does not dereference symlinks.
 * @param path - The path to check
 * @returns `true` if the file or directory exists, `false` otherwise
 */
export function existsSync(path: string): boolean {
  try {
    lstatSync(path)
    return true
  }
  catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      return false
    }
    else {
      throw error
    }
  }
}

export function isDirectory(path: string): boolean {
  return (existsSync(path) && lstatSync(path).isDirectory()) || path.match(/\/|\\$/) !== null
}

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
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
    await fsPromises.symlink(sourcePath, targetPath, 'file')
    log.success(`Created symlink: ${format.path(targetPath)} -> ${format.path(relative(root, sourcePath))}`)
  }
  catch (error) {
    log.error(`Failed to create symlink: ${error}`)
  }
}

export function removeSymlink(targetPath: string): void {
  if (!existsSync(targetPath)) {
    log.warn(`Target file not found: ${format.path(targetPath)}, skip`)
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

export function copyFile(sourcePath: string, targetPath: string, force: boolean = false): void {
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
