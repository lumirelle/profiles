import type { ProfileCollection } from './config'

import { existsSync, readdirSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { SUPPORTED_PROFILE_COLLECTIONS } from './config'
import { createSymlink, ensureDir, getFilePathsRecursively, removeSymlink } from './fs'

export async function findProfile(root: string, sourceName: string): Promise<string | null> {
  // For each collection
  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    const collectionPath = collection.source
    if (!existsSync(collectionPath)) {
      console.warn(`Profile collection path not found: ${collectionPath}, skip`)
      continue
    }

    const profiles = globSync(`**/${sourceName}`, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
      ignore: collection.ignores,
    })

    if (profiles.length > 0) {
      return profiles[0]
    }

    const { profile } = await prompts({
      type: 'select',
      name: 'profile',
      message: `Select a profile for ${sourceName}`,
      choices: profiles.map(profile => ({
        title: basename(profile),
        value: profile,
      })),
    })

    return profile
  }

  return null
}

export async function processProfileCollection(
  root: string,
  collection: ProfileCollection,
  action: 'symlink' | 'remove',
  override = false,
): Promise<void> {
  const collectionPath = collection.source
  if (!existsSync(collectionPath)) {
    console.warn(`Profile collection path not found: ${collectionPath}, skip`)
    return
  }

  const folders = readdirSync(collectionPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())

  for (const folder of folders) {
    const folderPath = join(collectionPath, folder.name)
    const folderName = folder.name

    const profilePaths = getFilePathsRecursively(folderPath)

    for (const profilePath of profilePaths) {
      const profileName = basename(profilePath)
      const relativePath = relative(collectionPath, profilePath)
      const profileKey = join(folderName, relativePath)

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

      let targetFolderPath: string
      if (typeof collection.targetFolder === 'object') {
        targetFolderPath = collection.targetFolder[folderName]
      }
      else {
        targetFolderPath = collection.targetFolder
      }

      if (!targetFolderPath) {
        continue
      }

      if (action === 'symlink') {
        ensureDir(targetFolderPath)
      }
      else if (action === 'remove' && !existsSync(targetFolderPath)) {
        continue
      }

      const targetProfilePath = join(targetFolderPath, profileName)

      if (action === 'symlink') {
        await createSymlink(profilePath, targetProfilePath, override)
      }
      else if (action === 'remove') {
        removeSymlink(targetProfilePath)
      }
    }
  }
}
