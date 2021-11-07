import assert from 'node:assert'
import fs from 'node:fs'
import childProcess from 'node:child_process'
import {PassThrough} from 'node:stream'
import test from 'tape'
import {direction} from './index.js'

/** @type {{[key: string]: unknown, version: string}} */
const pkg = JSON.parse(String(fs.readFileSync('package.json')))

const fixtures = [
  {input: '0', output: 'neutral'},
  {input: '123', output: 'neutral'},
  {input: 'a', output: 'ltr'},
  {input: 'נ', output: 'rtl'},
  {input: '\u0000', output: 'neutral'},
  {input: ' ', output: 'neutral'},
  {input: '!', output: 'neutral'},
  {input: '@', output: 'neutral'},
  {input: '[', output: 'neutral'},
  {input: '`', output: 'neutral'},
  {input: 'A', output: 'ltr'},
  {input: 'english', output: 'ltr'},
  {input: 'sentence', output: 'ltr'},
  {input: 'Un', output: 'ltr'},
  {input: 'simple', output: 'ltr'},
  {input: 'anglais', output: 'ltr'},
  {input: 'phrase', output: 'ltr'},
  {input: 'أ', output: 'rtl'},
  {input: 'الجملة', output: 'rtl'},
  {input: 'الانجليزية', output: 'rtl'},
  {input: 'بسيطة', output: 'rtl'}
]

test('api', function (t) {
  let index = -1

  // @ts-ignore
  t.equal(direction(), 'neutral', 'should classify nullish as `neutral`')

  while (++index < fixtures.length) {
    t.equal(
      direction(fixtures[index].input),
      fixtures[index].output,
      'should classify `' +
        fixtures[index].input +
        '` as `' +
        fixtures[index].output +
        '`'
    )
  }

  t.end()
})

test('cli', function (t) {
  const input = new PassThrough()

  t.plan(7)

  childProcess.exec('./cli.js abc', function (error, stdout, stderr) {
    t.deepEqual([error, stderr, stdout], [null, '', 'ltr\n'], 'arguments')
  })

  childProcess.exec('./cli.js @', function (error, stdout, stderr) {
    t.deepEqual([error, stderr, stdout], [null, '', 'neutral\n'], 'neutral')
  })

  const subprocess = childProcess.exec(
    './cli.js',
    function (error, stdout, stderr) {
      t.deepEqual([error, stderr, stdout], [null, '', 'rtl\n'], 'stdin')
    }
  )

  assert(subprocess.stdin, 'expected stdin')
  input.pipe(subprocess.stdin)
  input.write('لة')
  setImmediate(function () {
    input.end('الجم')
  })

  help('-h')
  help('--help')

  /**
   * @param {string} flag
   */
  function help(flag) {
    childProcess.exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual(
        [error, stderr, /\s+Usage: direction/.test(stdout)],
        [null, '', true],
        flag
      )
    })
  }

  version('-v')
  version('--version')

  /**
   * @param {string} flag
   */
  function version(flag) {
    childProcess.exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual([error, stderr, stdout], [null, '', pkg.version + '\n'], flag)
    })
  }
})
