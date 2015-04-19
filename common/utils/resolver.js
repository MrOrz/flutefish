var constants = require('../config/constants'),
    promises = [];

exports.addPromise = function(promise) {
  if (!constants.IS_BROWSER) {
    promises.push(promise);
  }
};

exports.clearPromises = function() {
  promises.length = 0;
};

exports.resolveAll = function() {
  return Promise.all(promises);
};
