/* eslint-disable no-console */
import { constants, copyFileSync, existsSync, promises as fsPromises, lstatSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'

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

export async function createSymlink(sourcePath: string, targetPath: string, force = false): Promise<void> {
  if (existsSync(targetPath) && !force) {
    console.warn(`File already exists: ${targetPath}, skip`)
    return
  }

  if (existsSync(targetPath) && force) {
    console.warn(`File already exists: ${targetPath}, force override`)
    unlinkSync(targetPath)
  }

  try {
    ensureDir(dirname(targetPath))

    await fsPromises.symlink(sourcePath, targetPath, 'file')
    console.log(`Create symlink: ${targetPath} -> ${sourcePath}`)
  }
  catch (error) {
    console.error(`Create symlink failed: ${error}`)
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
      console.log(`Remove symlink: ${targetPath}`)
    }
    else {
      console.warn(`Target file is not a symlink: ${targetPath}, skip`)
    }
  }
  catch (error) {
    console.error(`Remove symlink failed: ${error}`)
  }
}

export function copyFile(sourcePath: string, targetPath: string, force = false): void {
  if (existsSync(targetPath) && !force) {
    console.warn(`File already exists: ${targetPath}, skip`)
    return
  }

  ensureDir(dirname(targetPath))

  try {
    copyFileSync(sourcePath, targetPath, force ? constants.COPYFILE_FICLONE : 0)
    console.log(`Copy file: from ${sourcePath} to ${targetPath}`)
  }
  catch (error) {
    console.error(`Copy file failed: ${error}`)
  }
}
