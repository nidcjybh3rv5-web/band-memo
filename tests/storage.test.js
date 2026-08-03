const assert = require('assert');
const { STORAGE_KEY, load, save, clear } = require('../src/storage');

const data = new Map();
const storage = {
  getItem: key => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, value),
  removeItem: key => data.delete(key)
};

const notes = [{ id: 'a', title: 'A', content: 'B', createdAt: 1, updatedAt: 1 }];
save(storage, notes);
assert.deepStrictEqual(load(storage), notes);
assert.ok(typeof data.get(STORAGE_KEY) === 'string');

data.set(STORAGE_KEY, '{broken');
assert.deepStrictEqual(load(storage), []);
clear(storage);
assert.strictEqual(data.has(STORAGE_KEY), false);
console.log('storage tests passed');
