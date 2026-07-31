'use strict';

const { STORAGE_KEY } = require('../../src/storage');

function createSettings() {
  return {
    storageKey: STORAGE_KEY,
    version: 1
  };
}

module.exports = { createSettings };
