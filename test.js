import fs from 'fs'
import childProcess from 'child_process'
import {PassThrough} from 'stream'
import test from 'tape'
import {direction} from './index.js'

/** @type {{[key: string]: unknown, version: string}} */
var pkg = JSON.parse(String(fs.readFileSync('package.json')))

var fixtures = [
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
  var index = -1

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
  var input = new PassThrough()
  var help = ['-h', '--help']
  var version = ['-v', '--version']

  t.plan(7)

  childProcess.exec('./cli.js abc', function (error, stdout, stderr) {
    t.deepEqual([error, stderr, stdout], [null, '', 'ltr\n'], 'arguments')
  })

  childProcess.exec('./cli.js @', function (error, stdout, stderr) {
    t.deepEqual([error, stderr, stdout], [null, '', 'neutral\n'], 'neutral')
  })

  var subprocess = childProcess.exec(
    './cli.js',
    function (error, stdout, stderr) {
      t.deepEqual([error, stderr, stdout], [null, '', 'rtl\n'], 'stdin')
    }
  )

  input.pipe(subprocess.stdin)
  input.write('لة')
  setImmediate(function () {
    input.end('الجم')
  })

  help.forEach(function (flag) {
    childProcess.exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual(
        [error, stderr, /\s+Usage: direction/.test(stdout)],
        [null, '', true],
        flag
      )
    })
  })

  version.forEach(function (flag) {
    childProcess.exec('./cli.js ' + flag, function (error, stdout, stderr) {
      t.deepEqual([error, stderr, stdout], [null, '', pkg.version + '\n'], flag)
    })
  })
})
