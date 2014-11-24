#!/usr/bin/env node
'use strict';

var pack = require('./package.json');
var direction = require('./');
var argv = process.argv.slice(2);

function help() {
    console.log([
        '',
        'Usage: direction [options] <file>',
        '',
        'Options:',
        '',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '  -e, --exec <value>   output direction of <value>',
        '',
        'Usage:',
        '',
        '# output direction of given value',
        '$ direction -e "@"',
        '# neutral',
        '',
        '# output direction of in.txt to out.txt',
        '$ direction in.txt > out.txt',
        '',
        '# output direction from stdin to to out.txt',
        '$ echo "الانجليزية" | direction',
        '# rtl'
    ].join('\n  ') + '\n');
}

if (
    argv.indexOf('--help') === 0 ||
    argv.indexOf('-h') === 0
) {
    help();
} else if (
    argv.indexOf('--version') === 0 ||
    argv.indexOf('-v') === 0
) {
    console.log(pack.version);
} else if (
    argv.indexOf('--exec') === 0 ||
    argv.indexOf('-e') === 0
) {
    if (argv[1]) {
        console.log(direction(argv[1]));
    } else {
        help();
    }
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        console.log(direction(data));
    });
}
