var constants = require('../config/constants'),
    originalFetch = require('isomorphic-fetch'),
    assign = require('object-assign'),
    cookieStr;

module.exports = function fetch(input, init) {

  init = init || {};

  // Make node-fetch happy.
  if (!constants.IS_BROWSER) {
    input = constants.API_HOST + input;

    if (cookieStr) {
      init.headers = init.headers || {};
      init.headers.cookie = cookieStr;
    }
  }

  // Send cookies to server, please.
  init.credentials = 'same-origin';

  return originalFetch(input, init);
};

// Server-side only: let fetch() sends cookie from browser
//
module.exports.setCookie = function(str) {
  cookieStr = str;
}
