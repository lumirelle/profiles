#!/usr/bin/env node
/* eslint-disable no-console */
import { SUPPORTED_PROFILE_COLLECTIONS } from '../index'
import { processProfileCollection } from '../profile'
import { runCli } from '../runner'

runCli(async (context) => {
  const { root } = context

  console.log('Start to remove profile...')

  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await processProfileCollection(root, collection, 'remove')
  }
})
