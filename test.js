'use strict';

/**
 * Dependencies.
 */

var direction,
    assert;

direction = require('./');
assert = require('assert');

/**
 * Fixtures
 */

var fixtures;

fixtures = {
    'a' : 'ltr',
    '\u05e0' : 'rtl',
    '\u0000' : 'neutral',
    '\u0020' : 'neutral',
    '!' : 'neutral',
    '@' : 'neutral',
    '[' : 'neutral',
    '`' : 'neutral',
    '0' : 'neutral',
    '123' : 'neutral',
    'A' : 'ltr',
    'english' : 'ltr',
    'sentence' : 'ltr',
    'Un' : 'ltr',
    'simple' : 'ltr',
    'anglais' : 'ltr',
    'phrase' : 'ltr',
    'أ' : 'rtl',
    'الجملة' : 'rtl',
    'الانجليزية' : 'rtl',
    'بسيطة' : 'rtl'
};

/**
 * Tests.
 */

describe('direction(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof direction === 'function');
    });

    Object.keys(fixtures).forEach(function (fixture) {
        var result;

        result = fixtures[fixture];

        it('should classify `' + fixture + '` as `' + result + '` ',
            function () {
                assert(direction(fixture) === result);
            }
        );
    });
});
