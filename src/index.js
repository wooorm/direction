'use strict'

/* eslint-env browser */

var direction = require('direction')

var $input = document.querySelector('textarea')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = direction($input.value)
}
