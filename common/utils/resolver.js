// Singleton resolver that collects all data-fetching promises in React
// components in their `componentWillMount` callback.
//
// An idea from [iam4x/isomorphic-flux-boilerplate](http://goo.gl/OeSgP5).
//
var constants = require('../config/constants'),
    promises = [];

exports.addPromise = function(promise) {
  if (!constants.IS_BROWSER) {
    // Only accumulate promises during server-side rendering
    //
    promises.push(promise);
  }

  return promise;
};

exports.clearPromises = function() {
  promises.length = 0;
};

// Promise.all() returns a new promise that resolves after the resolution of
// all collected promises.
// After calling resolveAll(), mutating `promises` array (e.g. clearing it)
// would not affect the promise returned by resolveAll.
//
exports.resolveAll = function() {
  return Promise.all(promises);
};
