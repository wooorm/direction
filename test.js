'use strict';

var PassThrough = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var version = require('./package.json').version;
var direction = require('.');

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
];

test('api', function (t) {
  t.equal(
    direction(),
    'neutral',
    'should classify nully as `neutral`'
  );

  fixtures.forEach(function (check) {
    t.equal(
      direction(check.input),
      check.output,
      'should classify `' + check.input + '` as `' + check.output + '`'
    );
  });

  t.end();
});

test('cli', function (t) {
  var input = new PassThrough();

  t.plan(7);

  execa.stdout('./cli.js', ['   ', 'abc']).then(function (result) {
    t.equal(result, 'ltr', 'arguments');
  });

  execa.stdout('./cli.js', ['   ', '\t']).then(function (result) {
    t.equal(result, 'neutral', 'neutral');
  });

  execa.stdout('./cli.js', {input: input}).then(function (result) {
    t.equal(result, 'rtl', 'stdin');
  });

  input.write('لة');

  setImmediate(function () {
    input.end('الجم');
  });

  ['-h', '--help'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.ok(/\s+Usage: direction/.test(result), flag);
    });
  });

  ['-v', '--version'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.equal(result, version, flag);
    });
  });
});
