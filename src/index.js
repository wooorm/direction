import {direction} from 'direction'

/* eslint-env browser */

var $input = document.querySelector('textarea')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = direction($input.value)
}
