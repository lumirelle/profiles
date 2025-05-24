import { BOOLEAN_PARAMETER_KEYS } from '.'

type ParameterKey = string
type ParameterValue = string | boolean | null

export interface Parameter {
  key: ParameterKey
  position?: number
  value: ParameterValue
}

export class UnsupportedCommand extends Error {
  constructor(command: string) {
    super(`Unsupported command: ${command}`)
  }
}

export class MissingValueParameter extends Error {
  constructor(parameter: string) {
    super(`Missing value for parameter: ${parameter}`)
  }
}

export class MissingParameter extends Error {
  constructor(parameter: string) {
    super(`Missing parameter: ${parameter}`)
  }
}

export function parseType(arg: string): 'boolean' | 'string' {
  if (BOOLEAN_PARAMETER_KEYS.includes(arg))
    return 'boolean'
  return 'string'
}

/**
 * Parse the arguments to parameters
 * @param args - The arguments received from `process.argv`
 * @returns The parsed parameters
 * @throws If you provide a string value parameter without a value
 */
export function parse(args: string[]): Parameter[] {
  const parameters: Parameter[] = []

  let positionIndex = 0
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    // specify parameter
    if (arg.startsWith('-')) {
      const type = parseType(arg)
      // boolean value parameter
      if (type === 'boolean') {
        parameters.push({ key: arg, value: true })
      }
      // string value parameter
      else if (type === 'string') {
        if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
          parameters.push({ key: arg, value: args[i + 1] })
          i++
        }
        else {
          throw new MissingValueParameter(arg)
        }
      }
    }
    // position parameter
    else {
      parameters.push({ key: '', value: arg, position: positionIndex })
      positionIndex++
    }
  }
  return parameters
}

export interface ExtractOptions {
  matches: string[]
  position?: number
  required?: boolean
  debug?: boolean
}

/**
 * Extract a value from an array
 * @param arr - The array to extract from
 * @param extractOptions - The options to extract
 * @returns The extracted value
 * @throws If you don't provide a required parameter
 */
export function extract<T>(arr: Parameter[], extractOptions: ExtractOptions): T {
  const { matches, position = -1, required = false } = extractOptions

  let result: ParameterValue = null

  // extract by matches
  if (matches.length > 0) {
    const index = arr.findIndex(item => matches.includes(item.key))
    if (index >= 0) {
      result = arr[index].value
      arr.splice(index, 1)
    }
  }

  // extract by position
  if (result === null && position >= 0) {
    const index = arr.findIndex(item => item.position === position)
    if (index >= 0) {
      result = arr[index].value
      arr.splice(index, 1)
    }
  }

  // throw if required and no result
  if (required && result === null)
    throw new MissingParameter(matches.join(', '))

  return result as T
}
