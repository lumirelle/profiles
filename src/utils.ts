/* eslint-disable no-console */
import process from 'node:process'
import { bold, cyan, dim, green, magenta, red, reset, yellow } from 'ansis'

const characters: Record<string, Record<string, string>> = {
  win: {
    success: '√',
    warn: '×',
    error: '×',
    debug: '•',
  },
  other: {
    success: '✔',
    warn: '✖',
    error: '✖',
    debug: '•',
  },
}

function getCharacter(key: string) {
  const type = process.platform === 'win32' ? 'win' : 'other'
  return characters[type][key]
}

export const log = {
  info: (message: string): void => {
    console.log(`${message}`)
  },
  success: (message: string): void => {
    console.log(green(`${getCharacter('success')} ${message}`))
  },
  warn: (message: string): void => {
    console.warn(yellow(`${getCharacter('warn')} ${message}`))
  },
  error: (message: string): void => {
    console.error(red(`${getCharacter('error')} ${message}`))
  },
  debug: (message: string): void => {
    console.log(magenta(`${getCharacter('debug')} ${dim(message)}`))
  },
}

export const format = {
  path: (path: string): string => {
    return bold(cyan(path))
  },
  title: (title: string): string => {
    return bold(green(title))
  },
  highlight: (text: string): string => {
    return magenta(text)
  },
  additional: (text: string): string => {
    return yellow(text)
  },
}

export const resetStyle = reset
