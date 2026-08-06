const assert = require('assert');
const { normalizeText, validateNote, isSafeIndex, escapeHtml } = require('../src/security');

assert.strictEqual(escapeHtml(normalizeText('<script>', 100)), '&lt;script&gt;');
assert.strictEqual(validateNote({ title: '', content: '' }), null);
assert.ok(validateNote({ title: '測試', content: '內容' }));
assert.strictEqual(isSafeIndex(0, 1), true);
assert.strictEqual(isSafeIndex(-1, 1), false);
assert.strictEqual(isSafeIndex(1, 1), false);
// invalid id when provided should be rejected
assert.strictEqual(validateNote({ id: 'bad id', title: 'x', content: 'y' }), null);
console.log('security tests passed');
