'use strict';

const { escapeHtml, formatDate } = require('./utils');

function renderNote(note) {
  return `<article class="note" data-id="${escapeHtml(note.id)}"><h2>${escapeHtml(note.title)}</h2><p>${escapeHtml(note.content)}</p><time>${escapeHtml(formatDate(note.updatedAt))}</time></article>`;
}

function renderNotes(notes) {
  return notes.map(renderNote).join('');
}

module.exports = { renderNote, renderNotes };
