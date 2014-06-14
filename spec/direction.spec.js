'use strict';

var direction, assert, data;

direction = require('..');
assert = require('assert');

data = {
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

function classifyDirection(input, output) {
    it('should classify `' + input + '` as `' + output + '` ', function () {
        assert(direction(input) === output);
    });
}

describe('direction()', function () {
    it('should be of type `function`', function () {
        assert(typeof direction === 'function');
    });

    var value;
    for (value in data) {
        classifyDirection(value, data[value]);
    }
});
