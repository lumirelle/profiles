import type { ProfileCollection } from '.'
import { basename, join, normalize, relative } from 'node:path'
import process from 'node:process'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { copyFile, createSymlink, existsSync, isDirectory, removeSymlink } from './fs'
import { format, log } from './utils'

export async function processProfileCollection(
  root: string,
  collection: ProfileCollection,
  action: 'install' | 'uninstall',
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

      // Support multiple install folders
      let installFolders
      if (!Array.isArray(matcher.installFolder)) {
        installFolders = [matcher.installFolder]
      }
      else {
        installFolders = matcher.installFolder
      }

      for (const installFolderPath of installFolders) {
        if (action === 'install' && !existsSync(installFolderPath)) {
          log.warn(`Install folder not exists, may be you haven't install the program who uses profile '${format.path(profileName)}' yet, skip`)
          continue
        }
        else if (action === 'uninstall' && !existsSync(installFolderPath)) {
          continue
        }

        const installProfilePath = join(installFolderPath, profileName)
        if (action === 'install') {
          await createSymlink(root, profilePath, installProfilePath, override)
        }
        else if (action === 'uninstall') {
          removeSymlink(installProfilePath)
        }
      }
    }
  }
}

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

export async function copyProfile(root: string, cwd: string, sourceName: string, targetPath: string, override: boolean) {
  if (!sourceName) {
    const { source } = await prompts({
      type: 'text',
      name: 'source',
      message: 'Please enter the source file (e.g. ".editorconfig" or "nodejs/.editorconfig"):',
    })
    sourceName = source
  }

  if (!sourceName) {
    log.error('No source file provided, operation cancelled')
    process.exitCode = 1
    return
  }

  let sourcePath: string | null = null
  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    sourcePath = await findProfile(root, collection, sourceName)
    if (sourcePath) {
      break
    }
  }

  if (!sourcePath) {
    log.error(`Source file not found in any profile collection: ${format.highlight(sourceName)}`)
    process.exitCode = 1
    return
  }

  if (!targetPath) {
    targetPath = cwd
  }

  if (isDirectory(targetPath)) {
    targetPath = join(targetPath, basename(sourcePath))
  }

  copyFile(sourcePath, targetPath, override)
}
