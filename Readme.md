# direction [![Build Status](https://travis-ci.org/wooorm/direction.svg?branch=master)](https://travis-ci.org/wooorm/direction) [![Coverage Status](https://img.shields.io/coveralls/wooorm/direction.svg)](https://coveralls.io/r/wooorm/direction?branch=master)

Detect direction: left-to-right, right-to-left, or neutral.

* Similar to [component/directionality](https://github.com/component/directionality) —  which does not support 'neutral';
* Based on [Google Closure Library](https://github.com/google/closure-library/blob/master/closure/goog/i18n/bidi.js) — the methodology.

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

## License

MIT © Titus Wormer
