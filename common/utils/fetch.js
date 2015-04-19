var constants = require('../config/constants'),
    originalFetch = require('isomorphic-fetch');

module.exports = function fetch(input, init) {

  // Make node-fetch happy.
  input = constants.API_HOST + input;
  init = init || {};

  // Send cookies to server, please.
  init.credentials = 'same-origin';

  return originalFetch(input, init);
};
