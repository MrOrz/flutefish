var createEmitter = require('../utils/createEmitter'),
    constants = require('../config/constants');

module.exports = function(context) {
  var currentRoute;

  return createEmitter({
    _onRouteChange: function(route) {
      currentRoute = route;
      this.emit(constants.CHANGE);
    },
    get: function() {
      return currentRoute;
    },

    dehydrate: function() {
      return currentRoute;
    },

    rehydrate: function(state) {
      currentRoute = state;
    }

  });
};
