import type { ProfileCollection } from '.'

import { existsSync } from 'node:fs'
import { basename, join, normalize, relative } from 'node:path'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { createSymlink, ensureDir, removeSymlink } from './fs'
import { format, log } from './utils'

export async function findProfile(root: string, sourceName: string): Promise<string | null> {
  // For each collection
  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    const collectionPath = join(root, collection.source)
    if (!existsSync(collectionPath)) {
      log.warn(`Profile collection path not found: ${format.path(collectionPath)}, skip`)
      continue
    }

    const profiles = globSync(`**/${sourceName}`, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
      followSymbolicLinks: false,
    }).map(profile => normalize(profile))

    if (profiles.length === 1) {
      return profiles[0]
    }
    else if (profiles.length > 1) {
      const { profile } = await prompts({
        type: 'select',
        name: 'profile',
        message: `Select a certain profile named ${format.highlight(sourceName)}:`,
        choices: profiles.map(profile => ({
          title: relative(collectionPath, profile),
          value: profile,
        })),
      })
      return profile
    }
  }

  return null
}

export async function processProfileCollection(
  root: string,
  collection: ProfileCollection,
  action: 'symlink' | 'remove',
  override = false,
): Promise<void> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Profile collection path not found: ${format.path(collectionPath)}, skip`)
    return
  }

  const allProfilePaths = globSync(action === 'symlink' ? collection.matches : '**', {
    cwd: collectionPath,
    absolute: true,
    dot: true,
  })

  for (const profilePath of allProfilePaths) {
    const relativePath = relative(collectionPath, profilePath)
    const parts = relativePath.split(/[/\\]/)
    const folderName = parts[0]
    const profileName = basename(profilePath)

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
      await createSymlink(root, profilePath, targetProfilePath, override)
    }
    else if (action === 'remove') {
      removeSymlink(targetProfilePath)
    }
  }
}
