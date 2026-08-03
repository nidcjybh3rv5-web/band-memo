'use strict';

const { validateNote } = require('./security');

const STORAGE_KEY = 'band-memo.notes.v1';
const MAX_NOTES = 100;
const MAX_STORAGE_BYTES = 500000;

function safeParse(raw) {
  if (typeof raw !== 'string' || raw.length > MAX_STORAGE_BYTES) return [];

  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];

    return value
      .slice(0, MAX_NOTES)
      .map(validateNote)
      .filter(Boolean);
  } catch (_) {
    return [];
  }
}

function load(storage) {
  if (!storage || typeof storage.getItem !== 'function') return [];
  return safeParse(storage.getItem(STORAGE_KEY));
}

function save(storage, notes) {
  if (!storage || typeof storage.setItem !== 'function') {
    throw new TypeError('Invalid storage adapter.');
  }
  if (!Array.isArray(notes) || notes.length > MAX_NOTES) {
    throw new RangeError('Invalid notes.');
  }

  const sanitized = notes.map(validateNote).filter(Boolean);
  const serialized = JSON.stringify(sanitized);

  if (serialized.length > MAX_STORAGE_BYTES) {
    throw new RangeError('Storage payload too large.');
  }

  storage.setItem(STORAGE_KEY, serialized);
}

function clear(storage) {
  if (storage && typeof storage.removeItem === 'function') {
    storage.removeItem(STORAGE_KEY);
  }
}

module.exports = {
  STORAGE_KEY,
  MAX_NOTES,
  MAX_STORAGE_BYTES,
  load,
  save,
  clear
};
