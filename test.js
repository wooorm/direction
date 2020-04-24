'use strict'

var childProcess = require('child_process')
var PassThrough = require('stream').PassThrough
var test = require('tape')
var pkg = require('./package.json')
var direction = require('.')

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

test('api', function(t) {
  t.equal(direction(), 'neutral', 'should classify nullish as `neutral`')

  fixtures.forEach(function(check) {
    t.equal(
      direction(check.input),
      check.output,
      'should classify `' + check.input + '` as `' + check.output + '`'
    )
  })

  t.end()
})

test('cli', function(t) {
  var input = new PassThrough()
  var help = ['-h', '--help']
  var version = ['-v', '--version']

  t.plan(7)

  childProcess.exec('./cli.js abc', function(err, stdout, stderr) {
    t.deepEqual([err, stderr, stdout], [null, '', 'ltr\n'], 'arguments')
  })

  childProcess.exec('./cli.js @', function(err, stdout, stderr) {
    t.deepEqual([err, stderr, stdout], [null, '', 'neutral\n'], 'neutral')
  })

  var subprocess = childProcess.exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stderr, stdout], [null, '', 'rtl\n'], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('لة')
  setImmediate(function() {
    input.end('الجم')
  })

  help.forEach(function(flag) {
    childProcess.exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, stderr, /\s+Usage: direction/.test(stdout)],
        [null, '', true],
        flag
      )
    })
  })

  version.forEach(function(flag) {
    childProcess.exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stderr, stdout], [null, '', pkg.version + '\n'], flag)
    })
  })
})
