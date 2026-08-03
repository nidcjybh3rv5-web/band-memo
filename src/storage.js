'use strict';

const STORAGE_KEY = 'band-memo.notes.v1';
const MAX_NOTES = 100;

function safeParse(raw) {
  if (typeof raw !== 'string' || raw.length > 500000) return [];
  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.slice(0, MAX_NOTES);
  } catch (_) {
    return [];
  }
}

function load(storage) {
  if (!storage || typeof storage.getItem !== 'function') return [];
  return safeParse(storage.getItem(STORAGE_KEY));
}

function save(storage, notes) {
  if (!storage || typeof storage.setItem !== 'function') throw new TypeError('Invalid storage adapter.');
  if (!Array.isArray(notes) || notes.length > MAX_NOTES) throw new RangeError('Invalid notes.');
  storage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function clear(storage) {
  if (storage && typeof storage.removeItem === 'function') storage.removeItem(STORAGE_KEY);
}

module.exports = { STORAGE_KEY, MAX_NOTES, load, save, clear };
