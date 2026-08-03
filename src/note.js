'use strict';

const { validateNote } = require('./security');

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function createNote(title, content, now = Date.now()) {
  const note = validateNote({ id: makeId(), title, content, createdAt: now, updatedAt: now });
  if (!note) throw new TypeError('A note must contain a title or content.');
  return note;
}

function updateNote(note, changes, now = Date.now()) {
  const merged = { ...note, ...changes, id: note.id, createdAt: note.createdAt, updatedAt: now };
  const result = validateNote(merged);
  if (!result) throw new TypeError('Invalid note.');
  return result;
}

module.exports = { createNote, updateNote };
