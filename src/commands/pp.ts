#!/usr/bin/env node
import type { RunnerContext } from '../runner'
import { basename, join } from 'node:path'
import process from 'node:process'
import prompts from '@posva/prompts'
import { copyFile } from '../fs'
import { findProfile } from '../profile'
import { runCli } from '../runner'
import { extract, extractBoolean } from '../utils'

runCli(async (context: RunnerContext, args: string[]) => {
  const { cwd, root } = context

  let sourceName = extract(args, '-s', '--source')
  let targetPath = extract(args, '-t', '--target')
  const override = extractBoolean(args, '-o', '--override')

  if (!sourceName) {
    const { source } = await prompts({
      type: 'text',
      name: 'source',
      message: 'Please enter the source file (e.g. ".editorconfig" or "nodejs/.editorconfig"):',
    })
    sourceName = source
  }

  if (!sourceName) {
    console.error('No source file provided, operation cancelled')
    process.exitCode = 1
    return
  }

  const sourcePath = await findProfile(root, sourceName)
  if (!sourcePath) {
    console.error(`The source file was not found in any configuration file folder: ${sourceName}`)
    process.exitCode = 1
    return
  }

  if (!targetPath) {
    targetPath = cwd
  }

  if (targetPath.match(/\/|\\$/)) {
    targetPath = join(targetPath, basename(sourcePath))
  }

  copyFile(sourcePath, targetPath, override)
})
