import { constants, copyFileSync, promises as fsPromises, lstatSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { format, log } from './utils'

/**
 * Get the root directory of the command `.ts` file.
 *
 * @param metaUrl - The meta URL of the command `.ts` file
 * @returns The root directory of the command `.ts` file
 */
export function getCommandRoot(metaUrl: string): string {
  const grandParentDir = resolve(dirname(fileURLToPath(metaUrl)), '..')
  // Compatible with stubbed build mode
  if (grandParentDir.includes('src')) {
    return resolve(grandParentDir, '..')
  }
  return grandParentDir
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

  await fsPromises.symlink(sourcePath, targetPath, 'file')
}

export function removeSymlink(targetPath: string): void {
  if (!existsSync(targetPath)) {
    log.warn(`Target file not found: ${format.path(targetPath)}, skip`)
    return
  }

  const stats = lstatSync(targetPath)
  if (stats.isSymbolicLink()) {
    unlinkSync(targetPath)
  }
  else {
    log.warn(`Target file is not a symlink: ${format.path(targetPath)}, skip`)
  }
}

export function copyFile(sourcePath: string, targetPath: string, force: boolean = false): void {
  if (existsSync(targetPath) && !force) {
    log.warn(`File already exists: ${format.path(targetPath)}, skip`)
    return
  }

  copyFileSync(sourcePath, targetPath, force ? constants.COPYFILE_FICLONE : 0)
}

export function removeFile(targetPath: string): void {
  if (!existsSync(targetPath)) {
    log.warn(`Target file not found: ${format.path(targetPath)}, skip`)
    return
  }

  unlinkSync(targetPath)
}
