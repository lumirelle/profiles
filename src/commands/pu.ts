#!/usr/bin/env node
import type { RunnerContext } from '../runner'
import { SUPPORTED_PROFILE_COLLECTIONS } from '../index'
import { processProfileCollection } from '../profile'
import { runCli } from '../runner'
import { log } from '../utils'

runCli(async (context: RunnerContext) => {
  const { root } = context

  log.info('Starting to remove profiles...')

  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await processProfileCollection(root, collection, 'remove')
  }
})
