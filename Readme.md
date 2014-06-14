# direction [![Build Status](https://travis-ci.org/wooorm/direction.svg?branch=master)](https://travis-ci.org/wooorm/direction) [![Coverage Status](https://img.shields.io/coveralls/wooorm/direction.svg)](https://coveralls.io/r/wooorm/direction?branch=master)

[![browser support](https://ci.testling.com/wooorm/parse-english.png) ](https://ci.testling.com/wooorm/parse-english)

See [Browser Support](#browser-support) for more information (a.k.a. don’t worry about those grey icons above).

---

Detect direction: left-to-right, right-to-left, or neutral.

* Similar to [component/directionality](https://github.com/component/directionality) —  which does not support 'neutral';
* Based on [Google Closure Library](https://github.com/google/closure-library/blob/master/closure/goog/i18n/bidi.js) — the methodology.

## Installation

NPM:
```sh
$ npm install direction
```

Component.js:
```sh
$ component install wooorm/direction
```

## Usage

```js
var direction = require('direction');

direction("A"); // "ltr"
direction("anglais"); // "ltr"
direction("بسيطة"); // "rtl"
direction("@"); // "neutral"
```

## Browser Support
Pretty much every browser (available through browserstack) runs all parse-english unit tests.

## License

  MIT
