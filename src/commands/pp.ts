import type { Parameter } from '../parse'
import type { RunnerContext } from '../runner'
import { getRoot } from '../fs'
import { extract } from '../parse'
import { copyProfile } from '../profile'
import { runCli } from '../runner'

runCli(async (context: RunnerContext, parameters: Parameter[]) => {
  const { cwd } = context

  const root = getRoot(import.meta.url)

  const sourceName = extract<string>(parameters, { matches: ['-s', '--source'], position: 0, required: true })
  const targetPath = extract<string>(parameters, { matches: ['-t', '--target'], position: 1 })
  const override = extract<boolean>(parameters, { matches: ['-o', '--override'] })

  await copyProfile(root, cwd, sourceName, targetPath, override)
})
