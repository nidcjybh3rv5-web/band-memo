const MAX_INPUT_LENGTH = 4096

function sanitizeText(value, maxLength = MAX_INPUT_LENGTH) {
  if (typeof value !== 'string') return ''
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .slice(0, maxLength)
}

module.exports = {
  MAX_INPUT_LENGTH,
  sanitizeText
}
