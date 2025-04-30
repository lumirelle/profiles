import type { ProfileCollection } from '.'
import { existsSync } from 'node:fs'
import { basename, join, normalize, relative } from 'node:path'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { createSymlink, ensureDir, removeSymlink } from './fs'
import { format, log } from './utils'

export async function findProfile(root: string, collection: ProfileCollection, sourceName: string): Promise<string | null> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Profile collection path not found: ${format.path(collectionPath)}, skip`)
    return null
  }

  const matchedProfiles = globSync(`**/${sourceName}`, {
    cwd: collectionPath,
    absolute: true,
    dot: true,
    ignore: ['**/*.md'],
  }).map(profile => normalize(profile))

  if (matchedProfiles.length === 1) {
    return matchedProfiles[0]
  }
  else if (matchedProfiles.length > 1) {
    const { profile } = await prompts({
      type: 'select',
      name: 'profile',
      message: `Select a certain profile named ${format.highlight(sourceName)}:`,
      choices: matchedProfiles.map(profile => ({
        title: relative(collectionPath, profile),
        value: profile,
      })),
    })
    return profile
  }

  return null
}

export async function installOrUninstallProfile(
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

  for (const matcher of collection.installMatchers) {
    const installableProfilePaths = globSync(matcher.match, {
      cwd: collectionPath,
      absolute: true,
      dot: true,
    }).map(profile => normalize(profile))

    for (const profilePath of installableProfilePaths) {
      const profileName = basename(profilePath)
      const installFolderPath = matcher.installFolder

      if (action === 'symlink') {
        ensureDir(installFolderPath)
      }
      else if (action === 'remove' && !existsSync(installFolderPath)) {
        continue
      }

      const installProfilePath = join(installFolderPath, profileName)
      if (action === 'symlink') {
        await createSymlink(root, profilePath, installProfilePath, override)
      }
      else if (action === 'remove') {
        removeSymlink(installProfilePath)
      }
    }
  }
}
