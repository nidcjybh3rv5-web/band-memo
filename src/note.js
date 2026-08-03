'use strict';

const { validateNote } = require('./security');

let sequence = 0;

function makeId(now = Date.now()) {
  sequence = (sequence + 1) % 1000000;
  return `${now.toString(36)}-${sequence.toString(36)}`;
}

function createNote(title, content, now = Date.now()) {
  const note = validateNote({
    id: makeId(now),
    title,
    content,
    createdAt: now,
    updatedAt: now
  });
  if (!note) throw new TypeError('A note must contain a title or content.');
  return note;
}

function updateNote(note, changes, now = Date.now()) {
  if (!note || typeof note !== 'object' || !changes || typeof changes !== 'object' || Array.isArray(changes)) {
    throw new TypeError('Invalid note update.');
  }

  const merged = {
    id: note.id,
    title: Object.prototype.hasOwnProperty.call(changes, 'title') ? changes.title : note.title,
    content: Object.prototype.hasOwnProperty.call(changes, 'content') ? changes.content : note.content,
    createdAt: note.createdAt,
    updatedAt: now
  };

  const result = validateNote(merged);
  if (!result) throw new TypeError('Invalid note.');
  return result;
}

module.exports = { createNote, updateNote };
