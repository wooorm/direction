# direction [![Build Status](https://img.shields.io/travis/wooorm/direction.svg?style=flat)](https://travis-ci.org/wooorm/direction) [![Coverage Status](https://img.shields.io/coveralls/wooorm/direction.svg?style=flat)](https://coveralls.io/r/wooorm/direction?branch=master)

Detect direction: left-to-right, right-to-left, or neutral.

## Installation

npm:
```sh
$ npm install direction
```

Component:
```sh
$ component install wooorm/direction
```

Bower:
```sh
$ bower install direction
```

## Usage

```js
var direction = require('direction');

direction("A"); // "ltr"
direction("anglais"); // "ltr"
direction("بسيطة"); // "rtl"
direction("@"); // "neutral"
```

## CLI

Install:
```sh
$ npm install direction --global
```

Usage:
```
  Usage: direction [options] <file>
  
  Options:
  
    -h, --help           output usage information
    -v, --version        output version number
    -e, --exec <value>   output direction of <value>
  
  Usage:
  
  # output direction of given value
  $ direction -e "@"
  # neutral
  
  # output direction of in.txt to out.txt
  $ direction in.txt > out.txt
  
  # output direction from stdin to to out.txt
  $ echo "الانجليزية" | direction
  # rtl
```

## License

MIT © [Titus Wormer](http://wooorm.com)
