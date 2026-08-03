'use strict';

const MAX_TITLE_LENGTH = 80;
const MAX_CONTENT_LENGTH = 4000;
const MAX_NOTE_ID_LENGTH = 64;

function normalizeText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function validateNote(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const title = normalizeText(input.title, MAX_TITLE_LENGTH);
  const content = normalizeText(input.content, MAX_CONTENT_LENGTH);
  if (!title && !content) return null;

  const id = typeof input.id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(input.id)
    ? input.id
    : '';

  const createdAt = Number.isFinite(input.createdAt) && input.createdAt >= 0
    ? input.createdAt
    : Date.now();

  const updatedAt = Number.isFinite(input.updatedAt) && input.updatedAt >= createdAt
    ? input.updatedAt
    : createdAt;

  return { id, title, content, createdAt, updatedAt };
}

function isSafeIndex(index, length) {
  return Number.isInteger(index) && index >= 0 && index < length;
}

module.exports = {
  MAX_TITLE_LENGTH,
  MAX_CONTENT_LENGTH,
  MAX_NOTE_ID_LENGTH,
  normalizeText,
  validateNote,
  isSafeIndex
};
