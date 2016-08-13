/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module direction
 * @fileoverview Test suite for `direction`.
 */

'use strict';

/* Dependencies. */
var PassThrough = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var version = require('./package').version;
var direction = require('./');

/* Fixtures. */
var fixtures = {
  'a': 'ltr',
  '\u05e0': 'rtl',
  '\u0000': 'neutral',
  '\u0020': 'neutral',
  '!': 'neutral',
  '@': 'neutral',
  '[': 'neutral',
  '`': 'neutral',
  '0': 'neutral',
  '123': 'neutral',
  'A': 'ltr',
  'english': 'ltr',
  'sentence': 'ltr',
  'Un': 'ltr',
  'simple': 'ltr',
  'anglais': 'ltr',
  'phrase': 'ltr',
  'أ': 'rtl',
  'الجملة': 'rtl',
  'الانجليزية': 'rtl',
  'بسيطة': 'rtl'
};

/* API. */
test('api', function (t) {
  t.equal(
    direction(),
    'neutral',
    'should classify nully as `neutral`'
  );

  Object.keys(fixtures).forEach(function (value) {
    t.equal(
      direction(value),
      fixtures[value],
      'should classify `' + value + '` as `' + fixtures[value] + '`'
    );
  });

  t.end();
});

/* CLI. */
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
