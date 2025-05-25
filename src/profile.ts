import type { ProfileCollection } from '.'
import { basename, dirname, join, normalize, relative } from 'node:path'
import process from 'node:process'
import prompts from '@posva/prompts'
import { globSync } from 'tinyglobby'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { copyFile, createSymlink, ensureDir, existsSync, isDirectory, removeFile, removeSymlink } from './fs'
import { format, log } from './utils'

/**
 * Process a profile collection, install or uninstall the profiles in the collection.
 * @param root - The root path of this package
 * @param collection - The profile collection to process
 * @param action - The action to perform, `install` or `uninstall`
 * @param override - Whether to override the existing profile
 * @returns A promise that resolves when the profile collection is processed
 */
export async function processProfileCollection(
  root: string,
  collection: ProfileCollection,
  action: 'install' | 'uninstall',
  override = false,
): Promise<void> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Profile collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve()
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
          if (matcher.installType === 'copy') {
            copyFile(profilePath, installProfilePath, override)
          }
          else {
            await createSymlink(root, profilePath, installProfilePath, override)
          }
        }
        else if (action === 'uninstall') {
          if (matcher.installType === 'copy') {
            removeFile(installProfilePath)
          }
          else {
            removeSymlink(installProfilePath)
          }
        }
      }
    }
  }

  return Promise.resolve()
}

/**
 * Find a profile in a profile collection.
 * @param root - The root path of this package
 * @param collection - The profile collection to search
 * @param sourceName - The name of the profile to find
 * @returns A promise that resolves with the path of the profile, or `null` if not found
 */
export async function findProfile(root: string, collection: ProfileCollection, sourceName: string): Promise<string | null> {
  const collectionPath = join(root, collection.source)
  if (!existsSync(collectionPath)) {
    log.warn(`Profile collection path not found: ${format.path(collectionPath)}, skip`)
    return Promise.resolve(null)
  }

  const matchedProfiles = globSync(`**/${sourceName}`, {
    cwd: collectionPath,
    absolute: true,
    dot: true,
    ignore: ['**/*.md'],
  }).map(profile => normalize(profile))

  if (matchedProfiles.length === 1) {
    return Promise.resolve(matchedProfiles[0])
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
    return Promise.resolve(profile)
  }

  return Promise.resolve(null)
}

/**
 * Copy a profile to a target path.
 *
 * If the target path is not specified, it will be copied to the current working directory.
 *
 * If the target path is a directory, the profile will be copied to the directory with the same name as the profile.
 *
 * If the target path is a file, it behaves like copy and rename.
 *
 * If the target directory is not exists, it will be created.
 *
 * @param root - The root path of this package
 * @param cwd - The current working directory
 * @param sourceName - The name of the profile to copy
 * @param targetPath - The target path to copy the profile to
 * @param override - Whether to override the existing profile
 * @returns A promise that resolves when the profile is copied
 */
export async function copyProfile(root: string, cwd: string, sourceName: string, targetPath: string, override: boolean): Promise<void> {
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
    return Promise.resolve()
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
    return Promise.resolve()
  }

  if (!targetPath) {
    targetPath = cwd
  }

  if (isDirectory(targetPath)) {
    targetPath = join(targetPath, basename(sourcePath))
  }

  ensureDir(dirname(targetPath))

  copyFile(sourcePath, targetPath, override)

  return Promise.resolve()
}
