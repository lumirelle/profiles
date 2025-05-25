/* eslint-disable no-console */
import type { Parameter } from './parse'
import process from 'node:process'
import c from 'ansis'
import { version } from '../package.json'
import { extract, parse } from './parse'
import { format, log } from './utils'

export interface RunnerContext {
  cwd: string
}

export type Runner = (context: RunnerContext, parameters: Parameter[]) => Promise<void>

/**
 * Run the CLI, handles exceptions, wrap the real `run` function
 * @param fn - The function to run
 */
export async function runCli(fn: Runner): Promise<void> {
  const args = process.argv.slice(2)
  const parameters = parse(args)
  try {
    await run(fn, parameters)
  }
  catch (error) {
    if (error instanceof Error)
      log.error(error.message)
    process.exit(1)
  }
}

/**
 * The real `run` function, handles special arguments like `-h` and `-v`
 * @param fn - The function to run
 * @param parameters - The parameters received from cli
 */
export async function run(fn: Runner, parameters: Parameter[]): Promise<void> {
  const debug = extract<boolean>(parameters, { matches: ['-?'] })

  const context: RunnerContext = {
    cwd: process.cwd(),
  }

  if (debug) {
    log.debug(`Running with parameters: ${JSON.stringify(parameters, null, 2)}`)
    log.debug(`Running with context: ${JSON.stringify(context, null, 2)}`)
  }

  if (parameters.length === 1 && ['-h', '--help'].includes(parameters[0].key)) {
    const dash = c.dim('-')
    console.log(format.title('@lumirelle/profiles') + c.dim` use the right profile v${version}\n`)
    console.log(`pi    ${dash}  install profiles`)
    console.log(`pu    ${dash}  uninstall profiles`)
    console.log(`pp    ${dash}  copy and paste profile`)
    console.log(`pi -h ${dash}  show help`)
    console.log(format.additional('\ncheck https://github.com/lumirelle/profiles for more documentation.'))
    return
  }

  await fn(context, parameters)
}
