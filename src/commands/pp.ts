import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { basename, join } from 'node:path'
import process from 'node:process'
import prompts from '@posva/prompts'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { copyFile, isDirectory } from '../fs'
import { extract } from '../parse'
import { findProfile } from '../profile'
import { runCli } from '../runner'
import { format, log } from '../utils'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { cwd, root } = context

  let sourceName = extract<string>(parameters, { matches: ['-s', '--source'], position: 0, required: true })
  let targetPath = extract<string>(parameters, { matches: ['-t', '--target'], position: 1 })
  const override = extract<boolean>(parameters, { matches: ['-o', '--override'] })

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
})
