'use strict';

const { createApp } = require('../../src/app');

function createIndexPage(storage) {
  const app = createApp(storage);
  return {
    notes() { return app.list(); },
    add(title, content) { return app.add(title, content); },
    update(index, changes) { return app.update(index, changes); },
    remove(index) { return app.remove(index); }
  };
}

module.exports = { createIndexPage };
