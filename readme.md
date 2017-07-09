# direction [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Detect direction: left-to-right, right-to-left, or neutral.

## API

Install:

```bash
npm install direction
```

Use:

```js
var direction = require('direction');

direction('A'); //=> 'ltr'
direction('anglais'); //=> 'ltr'
direction('بسيطة'); //=> 'rtl'
direction('@'); //=> 'neutral'
```

## CLI

Install:

```sh
npm install -g direction
```

Use:

```txt
Usage: direction [options] <words...>

Detect directionality: left-to-right, right-to-left, or neutral

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output directionality
$ direction @
# neutral

# output directionality from stdin
$ echo 'الانجليزية' | direction
# rtl
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/direction.svg

[travis]: https://travis-ci.org/wooorm/direction

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/direction.svg

[codecov]: https://codecov.io/github/wooorm/direction

[license]: LICENSE

[author]: http://wooorm.com
