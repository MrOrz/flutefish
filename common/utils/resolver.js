// Singleton resolver that collects all data-fetching promises in React
// components in their `componentWillMount` callback.
//
// An idea from [iam4x/isomorphic-flux-boilerplate](http://goo.gl/OeSgP5).
//
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
