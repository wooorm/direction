/* eslint-env browser */

import {ok as assert} from 'devlop'
import {direction} from 'direction'

const $input = document.querySelector('textarea')
const $output = document.querySelector('output')
assert($input)
assert($output)

$output.before(' ')
$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  assert($input)
  assert($output)
  $output.textContent = direction($input.value)
}
