var constants = require('../config/constants'),
    originalFetch = require('isomorphic-fetch'),
    assign = require('object-assign');

module.exports = function fetch(input, init) {

  init = init || {};

  // Send cookies to server, please.
  init.credentials = 'same-origin';

  return originalFetch(input, init);
};
