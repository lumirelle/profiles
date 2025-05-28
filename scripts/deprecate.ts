import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const command = `npx npm deprecate "lumirelle-profiles@<${pkg.version}" "Just a little bit obsessive-compulsive."`

execSync(command, { stdio: 'inherit' })
