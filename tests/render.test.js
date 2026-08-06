const assert = require('assert');
const { escapeHtml } = require('../src/security');

assert.strictEqual(escapeHtml('<script>'), '&lt;script&gt;');
assert.strictEqual(escapeHtml('a & b'), 'a &amp; b');
assert.strictEqual(escapeHtml('\"quote\"'), '&quot;quote&quot;');
console.log('render/escape tests passed');
