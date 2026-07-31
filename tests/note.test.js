const assert = require('assert');
const { createNote, updateNote } = require('../src/note');

const note = createNote('Band', 'Memo', 1000);
assert.strictEqual(note.title, 'Band');
assert.strictEqual(note.createdAt, 1000);

const updated = updateNote(note, { content: 'Changed' }, 2000);
assert.strictEqual(updated.id, note.id);
assert.strictEqual(updated.createdAt, 1000);
assert.strictEqual(updated.updatedAt, 2000);
console.log('note tests passed');
