import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { SUPPORTED_PROFILE_COLLECTIONS } from '.'
import { extract } from '../parse'
import { installOrUninstallProfile } from '../profile'
import { runCli } from '../runner'
import { format, log } from '../utils'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { root } = context

  const override = extract(parameters, { matches: ['-o', '--override'] }) as boolean

  log.info(`Starting to install profiles ${override ? format.highlight('in override mode ') : ''}...`)

  for (const collection of SUPPORTED_PROFILE_COLLECTIONS) {
    await installOrUninstallProfile(root, collection, 'symlink', override)
  }
})
