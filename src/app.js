'use strict';

const { load, save } = require('./storage');
const { createNote, updateNote } = require('./note');
const { isSafeIndex } = require('./security');

function createApp(storage) {
  let notes = load(storage);

  return {
    list() { return notes.slice(); },
    add(title, content) {
      const note = createNote(title, content);
      notes = [note, ...notes].slice(0, 100);
      save(storage, notes);
      return note;
    },
    update(index, changes) {
      if (!isSafeIndex(index, notes.length)) throw new RangeError('Invalid note index.');
      notes[index] = updateNote(notes[index], changes);
      save(storage, notes);
      return notes[index];
    },
    remove(index) {
      if (!isSafeIndex(index, notes.length)) throw new RangeError('Invalid note index.');
      const removed = notes.splice(index, 1)[0];
      save(storage, notes);
      return removed;
    }
  };
}

module.exports = { createApp };
