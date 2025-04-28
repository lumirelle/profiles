#!/usr/bin/env node
/* eslint-disable no-console */
import type { RunnerContext } from '../runner'
import { SUPPORTED_PROFILE_COLLECTIONS } from '../index'
import { processProfileCollection } from '../profile'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, args: string[]) => {
  const { root } = context

  const override = args.includes('-o') || args.includes('--override')

  console.log('Start to install profile...')

  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await processProfileCollection(root, collection, 'symlink', override)
  }
})
