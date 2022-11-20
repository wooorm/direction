import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import util from 'node:util'
import childProcess from 'node:child_process'
import {PassThrough} from 'node:stream'
import test from 'node:test'
import {direction} from './index.js'

const exec = util.promisify(childProcess.exec)

/** @type {import('type-fest').PackageJson} */
const pack = JSON.parse(String(await fs.readFile('package.json')))

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

test('api', function () {
  let index = -1

  // @ts-expect-error: missing argument.
  assert.equal(direction(), 'neutral', 'should classify nullish as `neutral`')

  while (++index < fixtures.length) {
    assert.equal(
      direction(fixtures[index].input),
      fixtures[index].output,
      'should classify `' +
        fixtures[index].input +
        '` as `' +
        fixtures[index].output +
        '`'
    )
  }
})

test('cli', async function () {
  assert.deepEqual(
    await exec('./cli.js abc'),
    {stdout: 'ltr\n', stderr: ''},
    'arguments'
  )

  assert.deepEqual(
    await exec('./cli.js @'),
    {stdout: 'neutral\n', stderr: ''},
    'neutral'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = childProcess.exec(
      './cli.js',
      function (error, stdout, stderr) {
        assert.deepEqual([error, stdout, stderr], [null, 'rtl\n', ''], 'stdin')
        setImmediate(resolve)
      }
    )
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('لة')
    setImmediate(function () {
      input.end('الجم')
    })
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: direction/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: direction/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})
