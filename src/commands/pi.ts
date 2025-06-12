import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { getCommandRoot } from '../fs'
import { extract } from '../parse'
import { processProfileCollection } from '../profile'
import { runCli } from '../runner'
import { format, log } from '../utils'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const root = getCommandRoot(import.meta.url)

  const override = extract<boolean>(parameters, { matches: ['-o', '--override'] })

  log.info(`Starting to install profiles ${override ? format.highlight('in override mode ') : ''}...`)

  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await processProfileCollection(root, collection, 'install', override)
  }
})
