const assert = require('assert');
const { normalizeText, validateNote, isSafeIndex } = require('../src/security');

assert.strictEqual(normalizeText('<script>', 100), '<script>');
assert.strictEqual(validateNote({ title: '', content: '' }), null);
assert.ok(validateNote({ title: '測試', content: '內容' }));
assert.strictEqual(isSafeIndex(0, 1), true);
assert.strictEqual(isSafeIndex(-1, 1), false);
assert.strictEqual(isSafeIndex(1, 1), false);
console.log('security tests passed');
