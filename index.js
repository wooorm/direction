var rtlRange = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
var ltrRange =
  'A-Za-z\u00C0-\u00D6\u00D8-\u00F6' +
  '\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' +
  '\uFE00-\uFE6F\uFEFD-\uFFFF'

var rtl = new RegExp('^[^' + ltrRange + ']*[' + rtlRange + ']')
var ltr = new RegExp('^[^' + rtlRange + ']*[' + ltrRange + ']')

export function direction(value) {
  var source = String(value || '')
  return rtl.test(source) ? 'rtl' : ltr.test(source) ? 'ltr' : 'neutral'
}
