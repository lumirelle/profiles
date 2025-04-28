/* eslint-disable no-console */
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import c from 'ansis'
import { version } from '../package.json'

export class UnsupportedCommand extends Error {
  constructor(command: string) {
    super(`Unsupported command: ${command}`)
  }
}

export interface RunnerContext {
  cwd: string
  root: string
}

export type Runner = (context: RunnerContext, args: string[]) => Promise<void>

/**
 * Run the CLI, handles exceptions, wrap the real `run` function
 * @param fn - The function to run
 */
export async function runCli(fn: Runner): Promise<void> {
  const args = process.argv.slice(2)
  try {
    await run(fn, args)
  }
  catch (error) {
    if (error instanceof UnsupportedCommand)
      console.log(c.red(`\u2717 ${error.message}`))
    process.exit(1)
  }
}

/**
 * The real `run` function, handles special arguments like `-h` and `-v`
 * @param fn - The function to run
 * @param args - The arguments received from `process.argv`
 */
export async function run(fn: Runner, args: string[]): Promise<void> {
  const context: RunnerContext = {
    cwd: process.cwd(),
    root: resolve(dirname(import.meta.url), '..'),
  }

  if (args.length === 0 && ['-h', '--help'].includes(args[0])) {
    const dash = c.dim('-')
    console.log(c.green.bold('@lumirelle/profiles') + c.dim` use the right package manager v${version}\n`)
    console.log(`pi    ${dash}  install`)
    console.log(`pu    ${dash}  uninstall`)
    console.log(`pp    ${dash}  copy`)
    console.log(`pi -h ${dash}  show help`)
    console.log(c.yellow('\ncheck https://github.com/lumirelle/profiles for more documentation.'))
    return
  }

  await fn(context, args)
}
