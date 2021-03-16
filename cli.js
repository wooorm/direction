#!/usr/bin/env node
import fs from 'fs'

import {direction} from './index.js'

var pack = JSON.parse(fs.readFileSync('package.json'))

var argv = process.argv.slice(2)

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    console.log(direction(data))
  })
} else {
  console.log(direction(argv.join(' ')))
}

function help() {
  return [
    '',
    '  Usage: ' + pack.name + ' [options] <words...>',
    '',
    '  ' + pack.description,
    '',
    '  Options:',
    '',
    '    -h, --help           output usage information',
    '    -v, --version        output version number',
    '',
    '  Usage:',
    '',
    '  # output directionality',
    '  $ ' + pack.name + ' @',
    '  # ' + direction('@'),
    '',
    '  # output directionality from stdin',
    "  $ echo 'الانجليزية' | " + pack.name,
    '  # ' + direction('الانجليزية'),
    ''
  ].join('\n')
}
